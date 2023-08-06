"use strict";

class Darkroom {

    /* 
    1. Crystals can be 0.2um–2um, with most being 0.5um–1.0um. Grains can be 15um–25um.
    If we assume crystals are all 1um, then each grain can have 15-25 crystals.
    
    2. A crystal acquires a latent exposure when four or more of its silver halide atoms are hit by photons.
    The odds of an exposure for each crystal are represented here by the energy value in the grain object.
    
    3. Once past a threshold number of crystals exposed, all crystals in the grain are exposed.
    */

    constructor(_img, _isColor) {  // PImage, bool
        this.isColor = _isColor;  // bool
        this.grainResolution = 1;
        this.frameScale = 1;
        this.grainSize = 0.01;
        this.crystalThreshold = 4;
        this.minCrystals = 15; //15;
        this.maxCrystals = 25; //25;
        this.renderSteps = 1000;
        this.strokeColor;
        this.solarizeThreshold = 90.0;
        
        this.img = _img;
        this.img.loadPixels();
        
        this.exposureCounter = 0;
        this.emulsions = [];
        
        if (this.isColor) {
            this.emulsions.push(new Emulsion(this.img, "r", this.grainResolution, this.minCrystals, this.maxCrystals, this.grainSize));
            this.emulsions.push(new Emulsion(this.img, "b", this.grainResolution, this.minCrystals, this.maxCrystals, this.grainSize));
            this.emulsions.push(new Emulsion(this.img, "g", this.grainResolution, this.minCrystals, this.maxCrystals, this.grainSize));
        } else {
            this.emulsions.push(new Emulsion(this.img, "bw", this.grainResolution, this.minCrystals, this.maxCrystals, this.grainSize));
        }
        
        this.frame = createGraphics(this.img.width * this.frameScale, this.img.height * this.frameScale);

        this.frame.blendMode(BLEND);
        this.frame.background(255);
        this.frame.blendMode(MULTIPLY);

        
        console.log("width: " + this.frame.width + "     height: " + this.frame.height);
        for (let i=0; i<this.emulsions.length; i++) {
            console.log("channel " + (i+1) + " -- grains: " + this.emulsions[i].numGrains + "     crystals: " + this.emulsions[i].numCrystals);    
        }
    }

    expose() {    
        for (let h=0; h<this.emulsions.length; h++) {
            for (let i=0; i<this.emulsions[h].grains.length; i++) {
                let crystalsExposed = 0;
                for (let j=0; j<this.emulsions[h].grains[i].crystals.length; j++) {
                    if ((this.emulsions[h].grains[i].energy * this.emulsions[h].grains[i].crystals.length < this.solarizeThreshold) && 
                    (crystalsExposed > this.crystalThreshold || this.emulsions[h].grains[i].energy > random(1))) {
                        this.emulsions[h].grains[i].crystals[j].exposed = true;
                        this.emulsions[h].grains[i].exposed = true;
                        crystalsExposed++;
                        this.exposureCounter++;
                    }
                }
            }
        }
    }

    develop() {       
        for (let i=0; i<this.renderSteps; i++) {
            for (let h=0; h<this.emulsions.length; h++) {
                switch(this.emulsions[h].type) {
                    case "r":
                        this.strokeColor = color(0, 255, 255);
                        break;
                    case "g":
                        this.strokeColor = color(255, 0, 255);
                        break;
                    case "b":
                        this.strokeColor = color(255, 255, 0);
                        break;
                    default:
                        this.strokeColor = color(0);
                        break;
                }
                let grain = parseInt(random(this.emulsions[h].grains.length));
                this.frame.strokeWeight(1);
                this.frame.stroke(this.strokeColor);
                
                if (this.emulsions[h].grains[grain].exposed && !this.emulsions[h].grains[grain].developed) {
                    for (let j=0; j<this.emulsions[h].grains[grain].crystals.length; j++) {
                        if (!this.emulsions[h].grains[grain].crystals[j].exposed) {
                            let x = this.emulsions[h].grains[grain].crystals[j].x * this.frame.width;
                            let y = this.emulsions[h].grains[grain].crystals[j].y * this.frame.height;
                            this.frame.point(x, y);
                        }
                    }
                    this.emulsions[h].grains[grain].developed = true;
                }
            }
        }        
    }
    
    drawSource() {
        image(this.img, 0, 0, width, height);
    }
    
    draw() {
        image(this.frame, 0, 0, width, height);
    }
    
}
