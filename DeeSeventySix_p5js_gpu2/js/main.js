"use strict";

let theShader;
let toggleImg;
let vid;
let progress = 0;
let isVideoLoaded = false;
let isColor = true;

// Grain and solarization parameters
let grainScale = 100.0;    // Voronoi cell density - higher = smaller grains
let solarizeLimit = 90.0;  // Overexposure threshold (matches CPU default)

// Accumulation buffer for overdevelopment effect
let accumBuffer;
let shaderBuffer;

function preload() {
    theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    // Create a default canvas, will be resized when video loads
    createCanvas(640, 480, WEBGL);
    noStroke();

    // Buffer to render shader output
    shaderBuffer = createGraphics(width, height, WEBGL);
    shaderBuffer.noStroke();

    // Accumulation buffer starts white (unexposed paper)
    accumBuffer = createGraphics(width, height);
    accumBuffer.background(255);

    // Load video with a string path and call videoLoaded when ready
    vid = createVideo('./images/bjork_tv.mp4', videoLoaded);
    vid.hide();

    toggleImg = false;
}

function videoLoaded() {
    // Explicitly mute before playing to bypass browser autoplay policies
    vid.elt.muted = true;
    vid.elt.loop = true;
    vid.elt.setAttribute('playsinline', '');
    
    // Play the video using the native DOM method to avoid p5.js promise wrapping bugs
    vid.elt.play().catch(e => console.warn("Autoplay prevented:", e));
    
    // Resize canvas to match video dimensions once loaded
    resizeCanvas(vid.width, vid.height);
    
    // Recreate buffers with correct video size
    shaderBuffer = createGraphics(vid.width, vid.height, WEBGL);
    shaderBuffer.noStroke();

    accumBuffer = createGraphics(vid.width, vid.height);
    accumBuffer.background(255);

    isVideoLoaded = true;
}

function draw() {
    background(0);

    // Don't attempt to draw or use the shader until the video is fully loaded
    if (!isVideoLoaded || vid.width === 0) {
        return;
    }

    if (toggleImg) {
        resetShader();
        image(vid, -width/2, -height/2, width, height);
    } else {
        progress += 0.005; // Simulate developing time

        // Render current frame's grain exposure to shader buffer
        shaderBuffer.shader(theShader);
        theShader.setUniform('u_tex', vid);
        theShader.setUniform('u_resolution', [width, height]);
        theShader.setUniform('u_progress', min(progress, 1.0));
        theShader.setUniform('u_isColor', isColor);
        theShader.setUniform('u_grainScale', grainScale);
        theShader.setUniform('u_solarizeLimit', solarizeLimit);
        theShader.setUniform('u_frame', float(frameCount));
        shaderBuffer.rect(-width/2, -height/2, width, height);

        // Fade existing accumulation towards white to prevent blacking out
        accumBuffer.blendMode(BLEND);
        accumBuffer.noStroke();
        accumBuffer.fill(255, 127); // 50% opacity white
        accumBuffer.rect(0, 0, width, height);

        // Multiply new exposure onto accumulation buffer (darkens over time)
        accumBuffer.blendMode(MULTIPLY);
        accumBuffer.image(shaderBuffer, 0, 0);
        accumBuffer.blendMode(BLEND);

        // Display accumulated result
        resetShader();
        image(accumBuffer, -width/2, -height/2, width, height);
    }
}

function resetAccumulator() {
    accumBuffer.background(255);
    progress = 0;
}
