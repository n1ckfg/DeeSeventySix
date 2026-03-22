"use strict";

function keyPressed() {
    switch(key) {
        case 's':
            save("test.png");
            break;
        case ' ':
            toggleImg = !toggleImg;
            break;
    } 
}
