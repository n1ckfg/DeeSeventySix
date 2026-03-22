"use strict";

function keyPressed() {
    switch(key) {
        case 's':
            save("test.png");
            break;
        case ' ':
            toggleImg = !toggleImg;
            break;
        case 'g':
            grainScale = max(10.0, grainScale - 10.0);
            console.log("grainScale: " + grainScale);
            break;
        case 'G':
            grainScale = min(500.0, grainScale + 10.0);
            console.log("grainScale: " + grainScale);
            break;
        case 'o':
            solarizeLimit = max(1.0, solarizeLimit - 5.0);
            console.log("solarizeLimit: " + solarizeLimit);
            break;
        case 'O':
            solarizeLimit = min(200.0, solarizeLimit + 5.0);
            console.log("solarizeLimit: " + solarizeLimit);
            break;
        case 'r':
            resetAccumulator();
            break;
    }
}
