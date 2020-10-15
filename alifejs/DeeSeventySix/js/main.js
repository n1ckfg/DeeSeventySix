"use strict";

let darkroom;  // Darkroom
let toggleImg = false;  
let isColor = false;
let ready;  // bool
let img;
const url  = "./images/blockbuster_mid.jpg";
let startTime;
const developTime = 8;

let dropZone;
dropZone = document.getElementsByTagName("body")[0];
dropZone.addEventListener('dragover', onDragOver);
dropZone.addEventListener('drop', onDrop);

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

// Show the copy icon when dragging over.  Seems to only work for chrome.
function onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';    
}

function onDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    let files = e.dataTransfer.files; // Array of all files
    for (let i=0, file; file=files[i]; i++) {
        let reader = new FileReader();
        reader.onload = function(e2) {
            //if (telidon.length >= maxLength) telidon.splice(0,1);
            //telidon.push(new TelidonDraw([e2.target.result], sW, sW));
            //recording = true;
            //preview.style.backgroundImage = null;
        }
        reader.readAsText(file, 'UTF-8');
    }      
}
