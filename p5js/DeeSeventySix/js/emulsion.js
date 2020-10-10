"use strict";

class Emulsion {
            
    constructor(_img, _type, _grainResolution, _minCrystals, _maxCrystals, _grainSize) {  // PImage, string, int, int, int, float
        this.grainResolution = _grainResolution;
        this.type = _type;
        
        this.numGrains = _img.pixels.length * this.grainResolution;
        
        this.numCrystals = 0;
        this.minCrystals = _minCrystals;
        this.maxCrystals = _maxCrystals;
        this.grainSize = _grainSize;
                
        this.grains = [];
        for (let i=0; i<this.numGrains; i++) {
            let x = random(_img.width);
            let normX = x / _img.width;
            
            let y = random(_img.height);
            let normY = y / _img.height;
            
            let loc = x + y * _img.width;
            let c = _img.pixels[loc];
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

            grains.push(new Grain(normX, normY, energy, this.grainSize, this.minCrystals, this.maxCrystals));
        
            this.numCrystals += grains[i].crystals.length;
        }
        
    }
    
}
