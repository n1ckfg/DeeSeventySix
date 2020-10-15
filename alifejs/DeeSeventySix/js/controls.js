"use strict";

window.addEventListener("keydown", function(event) {
	//  
});

window.addEventListener("keyup", function(event) {
    switch(util.getKeyCode(event)) {
        case 's':
            saveCanvasToPNG();
            console.log("saving image");
            break;
        case ' ':
            toggleImg = !toggleImg;
            console.log("show source image: " + toggleImg);
            break;
        case 'c':
        	isColor = !isColor;
        	console.log("use color: " + isColor);
        	break;
        case 'd':
            darkroom.diffuse();
            console.log("Applying diffusion");
            break;
        case 'n':
            darkroom.normalize();
            console.log("Applying normalization");
            break;
    } 
});
