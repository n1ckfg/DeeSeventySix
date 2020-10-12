"use strict";

class Emulsion {
            
    constructor(_img, _type, _grainResolution, _minCrystals, _maxCrystals, _grainSize) {  // PImage, string, int, int, int, float
        this.img = _img;

        this.grainResolution = _grainResolution;
        this.type = _type;
        
        this.numGrains = this.img.length * this.grainResolution;
        
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

            let c = [this.img.array[loc], this.img.array[loc+1], this.img.array[loc+2]];
            let energy = 0;

            switch (this.type) {
                case "r":
                    energy = c[0];
                    break;
                case "g":
                    energy = c[1];
                    break;
                case "b":
                    energy = c[2];
                    break;
                default:
                    energy = (c[0] + c[1] + c[2]) / 3.0;
                    break;
            }

            this.grains.push(new Grain(normX, normY, energy, this.grainSize, this.minCrystals, this.maxCrystals));
        
            this.numCrystals += this.grains[i].crystals.length;
        }
        
    }
    
}
