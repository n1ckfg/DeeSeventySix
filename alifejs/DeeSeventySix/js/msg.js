"use strict";

window.onload = function() {
    let msg = document.getElementById("msg");

    if (!util.checkForMouse()) {
    	msg.innerHTML = "Pull down to refresh";
    } else {
    	msg.innerHTML = "Press enter or drag-drop";
    }

    document.addEventListener('keydown', function() {    	
        document.getElementById('msg').style.display = 'none';
    });
}
