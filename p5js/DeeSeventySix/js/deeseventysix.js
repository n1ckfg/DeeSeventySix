"use strict";

let darkroom;  // Darkroom
let toggleImg;  // bool
const isColor = false;
let img;  // PImage

function preload() {
    img = loadImage("./images/blockbuster_small.jpg");
}

function setup() {
    darkroom = new Darkroom(img, isColor);
    createCanvas(darkroom.frame.width, darkroom.frame.height);
    
    toggleImg = false;
    
    darkroom.expose();
}

function draw() {
    background(0);
    
    darkroom.develop();
    
    if (toggleImg) {
        darkroom.drawSource();
    } else {
        darkroom.draw();
    }    
}
