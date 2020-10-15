"use strict";

let darkroom;  // Darkroom
let toggleImg = false;  
let ready;  // bool
let img;
let url  = "./images/blockbuster_mid.jpg";

function reset() {
    ready = false;
    img = new field2D(256, 256);
    img.loadImage(url, function() { 
        darkroom = new Darkroom(img);
                
        darkroom.expose();
        console.log("* exposed *");

        ready = true;
    });
}

function update(dt) {    
    if (ready) {
        darkroom.develop();
    }
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
