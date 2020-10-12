"use strict";

let darkroom;  // Darkroom
let toggleImg;  // bool
const isColor = false;
let ready = false;
let img;
let url  = loadImage("./images/blockbuster_small.jpg");

function reset() {
    img = new field2D(256, 256);
    img.loadiMage(url, function() { 
        darkroom = new Darkroom(img, isColor);
        //createCanvas(darkroom.frame.width, darkroom.frame.height);
        
        toggleImg = false;
        
        darkroom.expose();

        ready = true;
    });

}

function update(dt) {    
    if (ready) darkroom.develop();
}

function draw() {
    if (ready) {
        if (toggleImg) {
            darkroom.drawSource();
        } else {
            darkroom.draw();
        }    
    }
}
