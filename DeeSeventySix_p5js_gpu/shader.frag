#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;

uniform sampler2D u_tex;
uniform vec2 u_resolution;
uniform float u_progress;
uniform bool u_isColor;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float hash3(vec2 p, float c) {
    return hash(p + vec2(c * 13.1, c * 17.7));
}

void main() {
    // In p5.js WebGL mode, textures are usually mapped upside down on rectangles.
    vec2 uv = vTexCoord;
    // uv.y = 1.0 - uv.y;

    vec3 color = texture2D(u_tex, uv).rgb;
    
    // Pixel coordinates to create per-pixel grain noise
    vec2 pixelPos = floor(uv * u_resolution);

    vec3 outColor = vec3(1.0); // Start with white canvas (emulating paper)
    
    if (u_isColor) {
        // Density corresponds to how dark the color is (1.0 - color)
        // Red uses Cyan dots (Cyan absorbs red)
        float r_rand = hash3(pixelPos, 1.0);
        float r_reveal = hash3(pixelPos, 4.0);
        if (r_rand < 1.0 - color.r && r_reveal < u_progress) {
            outColor.r = 0.0;
        }
        
        // Green uses Magenta dots (Magenta absorbs green)
        float g_rand = hash3(pixelPos, 2.0);
        float g_reveal = hash3(pixelPos, 5.0);
        if (g_rand < 1.0 - color.g && g_reveal < u_progress) {
            outColor.g = 0.0;
        }
        
        // Blue uses Yellow dots (Yellow absorbs blue)
        float b_rand = hash3(pixelPos, 3.0);
        float b_reveal = hash3(pixelPos, 6.0);
        if (b_rand < 1.0 - color.b && b_reveal < u_progress) {
            outColor.b = 0.0;
        }
    } else {
        // Black and white emulation mode
        float luma = dot(color, vec3(0.299, 0.587, 0.114));
        float randBW = hash3(pixelPos, 1.0);
        float revealBW = hash3(pixelPos, 4.0);
        if (randBW < 1.0 - luma && revealBW < u_progress) {
            outColor = vec3(0.0);
        }
    }
    
    gl_FragColor = vec4(outColor, 1.0);
}
