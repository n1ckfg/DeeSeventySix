"use strict";

let darkroom;  // Darkroom
let toggleImg = false;  
let isColor = false;
let ready;  // bool
let img;
const url  = "./images/blockbuster_mid.jpg";
let startTime;
const developTime = 8;

function reset() {
    ready = false;
    img = new field2D(256, 256);
    img.loadImage(url, function() { 
        darkroom = new Darkroom(img, isColor);
                
        darkroom.expose();
        console.log("* exposed *");

        setupAgents();
        startTime = util.millis();

        ready = true;
    });
}

function update(dt) {  
    try {  
        if (ready) {
            if (util.millis() < startTime + (developTime * 1000)) {
                darkroom.develop();
            } else {
                updateAgents(dt);
            }
        }
    } catch (e) {
        console.log(e);
        window.location.reload();
    }
}

function draw() {
    if (ready) {
        if (toggleImg) {
            darkroom.drawSource();
        } else {
            darkroom.draw();
            if (debugAgents) drawAgents();
        }   
    } 
}
