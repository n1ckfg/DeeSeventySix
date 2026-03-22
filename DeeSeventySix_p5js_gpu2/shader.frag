#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;

uniform sampler2D u_tex;
uniform vec2 u_resolution;
uniform float u_progress;
uniform bool u_isColor;
uniform float u_grainScale;      // Controls Voronoi cell size (grain clump size)
uniform float u_solarizeLimit;   // Threshold for overexposure/solarization effect
uniform float u_frame;           // Frame counter for temporal variation

// Basic hash function
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Hash with channel and frame offset - varies each frame for accumulation
float hash3(vec2 p, float c) {
    return hash(p + vec2(c * 13.1 + u_frame * 0.1, c * 17.7 + u_frame * 0.07));
}

// 2D hash returning vec2 for Voronoi cell centers
vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
}

// Voronoi cellular noise - returns cell ID and distance to edge
// Crystals in the same cell share the same grain energy
vec3 voronoi(vec2 x, float scale) {
    vec2 p = x * scale;
    vec2 ip = floor(p);
    vec2 fp = fract(p);

    float minDist = 1.0;
    vec2 minCell = vec2(0.0);

    // Check 3x3 neighborhood for nearest cell center
    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 neighbor = vec2(float(i), float(j));
            vec2 cellId = ip + neighbor;
            vec2 cellCenter = neighbor + hash2(cellId) - fp;
            float dist = length(cellCenter);

            if (dist < minDist) {
                minDist = dist;
                minCell = cellId;
            }
        }
    }

    // Return cell ID (x,y) and distance to center
    return vec3(minCell, minDist);
}

// PROCESS_ENERGY macro - implements solarization/overexposure effect
// When energy exceeds the solarize limit, the crystal doesn't expose
// This creates the classic photographic solarization where bright areas invert
#define PROCESS_ENERGY(energy, numCrystals, solarizeLimit) \
    ((energy) * (numCrystals) < (solarizeLimit) ? (energy) : 0.0)

// Sobel edge detection to find edges in the image
float edgeDetection(sampler2D tex, vec2 uv, vec2 resolution) {
    vec2 offset = 1.0 / resolution;
    
    float t00 = dot(texture2D(tex, uv + vec2(-offset.x, -offset.y)).rgb, vec3(0.299, 0.587, 0.114));
    float t10 = dot(texture2D(tex, uv + vec2( 0.0,      -offset.y)).rgb, vec3(0.299, 0.587, 0.114));
    float t20 = dot(texture2D(tex, uv + vec2( offset.x, -offset.y)).rgb, vec3(0.299, 0.587, 0.114));
    float t01 = dot(texture2D(tex, uv + vec2(-offset.x,  0.0)).rgb, vec3(0.299, 0.587, 0.114));
    float t21 = dot(texture2D(tex, uv + vec2( offset.x,  0.0)).rgb, vec3(0.299, 0.587, 0.114));
    float t02 = dot(texture2D(tex, uv + vec2(-offset.x,  offset.y)).rgb, vec3(0.299, 0.587, 0.114));
    float t12 = dot(texture2D(tex, uv + vec2( 0.0,       offset.y)).rgb, vec3(0.299, 0.587, 0.114));
    float t22 = dot(texture2D(tex, uv + vec2( offset.x,  offset.y)).rgb, vec3(0.299, 0.587, 0.114));
    
    float sx = -1.0 * t00 - 2.0 * t01 - 1.0 * t02 + 1.0 * t20 + 2.0 * t21 + 1.0 * t22;
    float sy = -1.0 * t00 - 2.0 * t10 - 1.0 * t20 + 1.0 * t02 + 2.0 * t12 + 1.0 * t22;
    
    return sqrt(sx * sx + sy * sy);
}

void main() {
    vec2 uv = vTexCoord;
    vec3 color = texture2D(u_tex, uv).rgb;

    // Pixel coordinates for noise
    vec2 pixelPos = floor(uv * u_resolution);

    // Find edge strength at this pixel
    float edge = edgeDetection(u_tex, uv, u_resolution);

    // Disrupt Voronoi regularity near edges by jittering the UV and scaling the grain
    vec2 jitter = vec2(hash3(pixelPos, 10.0), hash3(pixelPos, 11.0)) * 2.0 - 1.0;
    vec2 voronoiUv = uv + jitter * edge * 0.02;
    float localGrainScale = u_grainScale + edge * 50.0;

    // Get Voronoi cell for this pixel - all pixels in same cell share grain properties
    vec3 cellInfo = voronoi(voronoiUv, localGrainScale);
    vec2 cellId = cellInfo.xy;

    // Grain properties derived from cell ID (shared by all crystals in grain)
    float grainRand = hash(cellId);
    float numCrystals = 15.0 + grainRand * 10.0; // 15-25 crystals per grain like CPU version

    vec3 outColor = vec3(1.0); // White paper base

    if (u_isColor) {
        // Sample color at grain center for consistent energy within grain
        vec2 grainCenter = (cellId + 0.5) / localGrainScale;
        vec3 grainColor = texture2D(u_tex, clamp(grainCenter, 0.0, 1.0)).rgb;

        // Red channel -> Cyan dye
        float r_energy = 1.0 - grainColor.r;
        float r_processed = PROCESS_ENERGY(r_energy, numCrystals, u_solarizeLimit);
        float r_crystalRand = hash3(pixelPos, 1.0);
        float r_reveal = hash3(cellId, 4.0); // Reveal timing shared by grain
        if (r_crystalRand < r_processed && r_reveal < u_progress) {
            outColor.r = 0.0;
        }

        // Green channel -> Magenta dye
        float g_energy = 1.0 - grainColor.g;
        float g_processed = PROCESS_ENERGY(g_energy, numCrystals, u_solarizeLimit);
        float g_crystalRand = hash3(pixelPos, 2.0);
        float g_reveal = hash3(cellId, 5.0);
        if (g_crystalRand < g_processed && g_reveal < u_progress) {
            outColor.g = 0.0;
        }

        // Blue channel -> Yellow dye
        float b_energy = 1.0 - grainColor.b;
        float b_processed = PROCESS_ENERGY(b_energy, numCrystals, u_solarizeLimit);
        float b_crystalRand = hash3(pixelPos, 3.0);
        float b_reveal = hash3(cellId, 6.0);
        if (b_crystalRand < b_processed && b_reveal < u_progress) {
            outColor.b = 0.0;
        }
    } else {
        // Black and white mode
        vec2 grainCenter = (cellId + 0.5) / localGrainScale;
        vec3 grainColor = texture2D(u_tex, clamp(grainCenter, 0.0, 1.0)).rgb;
        float luma = dot(grainColor, vec3(0.299, 0.587, 0.114));

        float bw_energy = 1.0 - luma;
        float bw_processed = PROCESS_ENERGY(bw_energy, numCrystals, u_solarizeLimit);
        float crystalRand = hash3(pixelPos, 1.0);
        float reveal = hash3(cellId, 4.0);

        if (crystalRand < bw_processed && reveal < u_progress) {
            outColor = vec3(0.0);
        }
    }

    gl_FragColor = vec4(outColor, 1.0);
}
