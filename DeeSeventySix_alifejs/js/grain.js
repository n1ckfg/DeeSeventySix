"use strict";

class Grain {    
    
    constructor(_x, _y, _energy, _grainSize, _minCrystals, _maxCrystals) {  // float, float, float, float, int, int
        this.x = _x;
        this.y = _y;
        this.minCrystals = _minCrystals;
        this.maxCrystals = _maxCrystals;
        this.energy = _energy;
        this.exposed = false;
        this.developed = false;
        this.grainSize = _grainSize;
        this.numCrystals = parseInt(random(this.minCrystals, this.maxCrystals));
        this.crystals = [];
        
        for (let i=0; i<this.numCrystals; i++) {
            this.crystals.push(new Crystal(this.x + random(-this.grainSize, this.grainSize), this.y + random(-this.grainSize, this.grainSize)));
        }
    }
    
}
