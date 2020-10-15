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
        this.isColor = _isColor;  
        this.grainResolution = 3; // 3
        this.frameScale = 3;
        this.grainSize =  0.01;  //  0.001
        this.crystalThreshold = 10;
        this.minCrystals = 15; // 15;
        this.maxCrystals = 25; // 25;
        this.renderSteps = 1000;
        this.solarizeThreshold = 254/255;

        this.channelScaleR = 1;
        this.channelScaleG = 1;
        this.channelScaleB = 1;
        this.channelScaleBW = 1;

        this.sourceField = _img;
        
        this.exposureCounter = 0;
        this.emulsions = [];
        
        if (this.isColor) {
            this.emulsions.push(new Emulsion(this.sourceField, "r", this.grainResolution, this.minCrystals, this.maxCrystals, this.grainSize));
            this.emulsions.push(new Emulsion(this.sourceField, "b", this.grainResolution, this.minCrystals, this.maxCrystals, this.grainSize));
            this.emulsions.push(new Emulsion(this.sourceField, "g", this.grainResolution, this.minCrystals, this.maxCrystals, this.grainSize));
        } else {
            this.emulsions.push(new Emulsion(this.sourceField, "bw", this.grainResolution, this.minCrystals, this.maxCrystals, this.grainSize));
        }
        
        this.destField = new field2D(this.sourceField.width * this.frameScale, this.sourceField.height * this.frameScale);
        
        console.log("width: " + this.destField.width + "     height: " + this.destField.height);
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
                let grain = parseInt(random(this.emulsions[h].grains.length));
                if (this.emulsions[h].grains[grain].exposed && !this.emulsions[h].grains[grain].developed) {
                    for (let j=0; j<this.emulsions[h].grains[grain].crystals.length; j++) {
                        if (this.emulsions[h].grains[grain].crystals[j].exposed) {
                            let sourceX = this.emulsions[h].grains[grain].crystals[j].x * this.sourceField.width;
                            let sourceY = this.emulsions[h].grains[grain].crystals[j].y * this.sourceField.height;

                            let destX = this.emulsions[h].grains[grain].crystals[j].x * this.destField.width;
                            let destY = this.emulsions[h].grains[grain].crystals[j].y * this.destField.height;

                            let col;

                            if(this.emulsions[h].type === "bw") {
                                col = this.destField.get(destX, destY);
                                col += this.sourceField.sample(sourceX, sourceY, 0) * this.channelScaleBW;
                            } else {
                                col = this.destField.cell(destX, destY);

                                switch(this.emulsions[h].type) {
                                    case "r":
                                        col[0] += this.sourceField.sample(sourceX, sourceY, 0) * this.channelScaleR;
                                        break;
                                    case "g":
                                        col[1] += this.sourceField.sample(sourceX, sourceY, 1) * this.channelScaleG;
                                        break;
                                    case "b":
                                        col[2] += this.sourceField.sample(sourceX, sourceY, 2) * this.channelScaleB;
                                        break;
                                }
                            }

                            this.destField.set(col, destX, destY);
                        }
                    }
                    this.emulsions[h].grains[grain].developed = true;
                }
            }
        }    

        this.destField.diffuse(this.destField, 0.01, 2);
    }
    
    diffuse() {
        this.destField.diffuse(this.destField, 0.1, 10); // sourcefield, diffusion, passes
    }

    normalize() {
        this.destField.normalize();       
    }

    drawSource() {
        this.sourceField.draw();
    }
    
    draw() {
        this.destField.draw();
    }
    
}
