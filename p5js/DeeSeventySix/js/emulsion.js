"use strict";

class Emulsion {
            
    constructor(_img, _type, _grainResolution, _minCrystals, _maxCrystals, _grainSize) {  // PImage, string, int, int, int, float
        this.img = _img;
        this.img.loadPixels();

        this.grainResolution = _grainResolution;
        this.type = _type;
        
        this.numGrains = this.img.pixels.length * this.grainResolution;
        
        this.numCrystals = 0;
        this.minCrystals = _minCrystals;
        this.maxCrystals = _maxCrystals;
        this.grainSize = _grainSize;
                
        this.grains = [];
        for (let i=0; i<this.numGrains; i++) {
            let x = random(this.img.width);
            let normX = x / this.img.width;
            
            let y = random(this.img.height);
            let normY = y / this.img.height;
            
            let loc = 4 * (parseInt(x) + parseInt(y) * this.img.width);

            let c = color(this.img.pixels[loc], this.img.pixels[loc+1], this.img.pixels[loc+2]);
            let energy = 0;

            switch (this.type) {
                case "r":
                    energy = red(c) / 255.0;
                    break;
                case "g":
                    energy = green(c) / 255.0;
                    break;
                case "b":
                    energy = blue(c) / 255.0;
                    break;
                default:
                    energy = brightness(c) / 255.0;
                    break;
            }

            this.grains.push(new Grain(normX, normY, energy, this.grainSize, this.minCrystals, this.maxCrystals));
        
            this.numCrystals += this.grains[i].crystals.length;
        }
        
    }
    
}
