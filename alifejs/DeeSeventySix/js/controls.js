"use strict";

window.addEventListener("keydown", function(event) {
	//  
});

window.addEventListener("keyup", function(event) {
    switch(getKeyCode(event)) {
        case 's':
            save("test.png");
            break;
        case ' ':
            toggleImg = !toggleImg;
            break;
    } 
});