"use strict";

window.addEventListener("keydown", function(event) {
	//  
});

window.addEventListener("keyup", function(event) {
    switch(util.getKeyCode(event)) {
        case 's':
            saveCanvasToPNG();
            break;
        case ' ':
            toggleImg = !toggleImg;
            break;
    } 
});
