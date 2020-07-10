#include "Emulsion.h"

Emulsion::Emulsion(ofImage _img, string _emulsionType, int _grainResolution, int _minCrystals, int _maxCrystals, float _grainSize) {
    grainResolution = _grainResolution;
    emulsionType = _emulsionType;

    numGrains = _img.pixels.length * grainResolution;

    numCrystals = 0;
    minCrystals = _minCrystals;
    maxCrystals = _maxCrystals;
    grainSize = _grainSize;
      
    for (int i=0; i<numGrains; i++) {
        float x = ofRandom(_img.getWidth());
        float normX = x / (float)_img.getWidth();

        float y = ofRandom(_img.getHeight());
        float normY = y / (float)_img.getHeight();

        int loc = (int) x + (int) y * _img.getWidth();
        ofColor c = _img.pixels[loc];
        float energy = 0;
        switch (emulsionType) {
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

        grains.push_back(Grain(normX, normY, energy, grainSize, minCrystals, maxCrystals));

        numCrystals += grains[i].crystals.size();
    }
}
