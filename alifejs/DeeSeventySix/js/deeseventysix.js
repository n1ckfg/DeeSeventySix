"use strict";

let darkroom;  // Darkroom
let toggleImg;  // bool
const isColor = false;
let ready = false;
let img;
let url  = "./images/blockbuster_small.jpg";

function reset() {
    img = new field2D(256, 256);
    img.loadImage(url, function() { 
        darkroom = new Darkroom(img, isColor);
        
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

    img.draw();
}
