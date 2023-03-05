"use strict";

let darkroom;  // Darkroom
let toggleImg;  // bool
let img;  // PImage

function preload() {
    img = loadImage("./images/blockbuster_mid.jpg");
}

function setup() {
    darkroom = new Darkroom(img);
    createCanvas(darkroom.img.width, darkroom.img.height);
    
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
