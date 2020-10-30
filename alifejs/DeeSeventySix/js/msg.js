"use strict";

let msg;

let controlinfo = "<br><br>C: Colour<br>D: Diffuse<br>N: Normalize<br>S: Save image<br>space: source image";

window.onload = function() {
    msg = document.getElementById("msg");

    if (!util.checkForMouse()) {
    	msg.innerHTML = "reload for demo<br>more options on desktop";
    } else {
    	msg.innerHTML = "press enter for demo<br>or drag-drop an image" + controlinfo;
    }

    document.addEventListener('keydown', function() {    	
        msg.style.display = 'none';
    });
}
