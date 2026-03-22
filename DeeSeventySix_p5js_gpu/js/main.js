"use strict";

let theShader;
let toggleImg;
let img;
let progress = 0;

function preload() {
    img = loadImage("./images/blockbuster_mid.jpg");
    theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(img.width, img.height, WEBGL);
    noStroke();
    
    toggleImg = false;
}

function draw() {
    background(0);
    
    if (toggleImg) {
        resetShader();
        image(img, -width/2, -height/2, width, height);
    } else {
        progress += 0.005; // Simulate developing time
        if (progress > 1.0) progress = 1.0;
        
        shader(theShader);
        theShader.setUniform('u_tex', img);
        theShader.setUniform('u_resolution', [width, height]);
        theShader.setUniform('u_progress', progress);
        theShader.setUniform('u_isColor', true);
        
        rect(-width/2, -height/2, width, height);
    }    
}
