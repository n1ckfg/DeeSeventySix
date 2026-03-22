"use strict";

let theShader;
let toggleImg;
let img;
let progress = 0;

// Grain and solarization parameters
let grainScale = 100.0;    // Voronoi cell density - higher = smaller grains
let solarizeLimit = 90.0;  // Overexposure threshold (matches CPU default)

// Accumulation buffer for overdevelopment effect
let accumBuffer;
let shaderBuffer;

function preload() {
    img = loadImage("./images/blockbuster_mid.jpg");
    theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(img.width, img.height, WEBGL);
    noStroke();

    // Buffer to render shader output
    shaderBuffer = createGraphics(img.width, img.height, WEBGL);
    shaderBuffer.noStroke();

    // Accumulation buffer starts white (unexposed paper)
    accumBuffer = createGraphics(img.width, img.height);
    accumBuffer.background(255);

    toggleImg = false;
}

function draw() {
    background(0);

    if (toggleImg) {
        resetShader();
        image(img, -width/2, -height/2, width, height);
    } else {
        progress += 0.005; // Simulate developing time

        // Render current frame's grain exposure to shader buffer
        shaderBuffer.shader(theShader);
        theShader.setUniform('u_tex', img);
        theShader.setUniform('u_resolution', [width, height]);
        theShader.setUniform('u_progress', min(progress, 1.0));
        theShader.setUniform('u_isColor', true);
        theShader.setUniform('u_grainScale', grainScale);
        theShader.setUniform('u_solarizeLimit', solarizeLimit);
        theShader.setUniform('u_frame', float(frameCount));
        shaderBuffer.rect(-width/2, -height/2, width, height);

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
