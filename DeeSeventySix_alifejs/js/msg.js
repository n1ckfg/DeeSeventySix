"use strict";

let msg;

const controlinfo = "<br><br>C: Colour<br>D: Diffuse<br>N: Normalize<br>S: Save image<br>space: source image";

const linkinfo = "<br><br><a href='../../DeeSeventySix_ml5js/'>ml5.js</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='../../DeeSeventySix_p5js/'>p5.js</a>"

window.onload = function() {
    msg = document.getElementById("msg");

    if (!util.checkForMouse()) {
    	msg.innerHTML = "reload for demo<br>more options on desktop";
    } else {
    	msg.innerHTML = "press enter for demo<br>or drag-drop an image" + controlinfo + linkinfo;
    }

    document.addEventListener('keydown', function() {    	
        msg.style.display = 'none';
    });
}