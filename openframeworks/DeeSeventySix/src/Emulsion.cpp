#include "Emulsion.h"

Emulsion::Emulsion(ofImage& _img, string _emulsionType, int _grainResolution, int _minCrystals, int _maxCrystals, float _grainSize) {
    grainResolution = _grainResolution;
    emulsionType = _emulsionType;

    numGrains = _img.getPixels().size() * grainResolution;

    numCrystals = 0;
    minCrystals = _minCrystals;
    maxCrystals = _maxCrystals;
    grainSize = _grainSize;
      
    for (int i=0; i<numGrains; i++) {
		float w = (float) _img.getWidth();
        float x = ofRandom(w);
        float normX = x / w;

		float h = (float) _img.getHeight();
        float y = ofRandom(h);
        float normY = y / h;

        ofColor c = _img.getColor(x, y);
        float energy = 0;
        if (emulsionType == "r") {
            energy = c.r / 255.0;
        } else if (emulsionType == "g") {
            energy = c.g / 255.0;
        } else if (emulsionType == "b") {
            energy = c.b / 255.0;
        } else {
            energy = c.getBrightness() / 255.0;
        }

		grains.push_back(Grain(normX, normY, energy, grainSize, minCrystals, maxCrystals));

        numCrystals += grains[i].crystals.size();
    }
}
