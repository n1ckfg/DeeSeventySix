"use strict";

let msg;

window.onload = function() {
    msg = document.getElementById("msg");

    if (!util.checkForMouse()) {
    	msg.innerHTML = "Pull down to refresh";
    } else {
    	msg.innerHTML = "Press enter or drag-drop";
    }

    document.addEventListener('keydown', function() {    	
        msg.style.display = 'none';
    });
}
