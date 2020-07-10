#pragma once

#include "ofMain.h"
#include "Grain.h"

class Emulsion {
    
    public:
        Emulsion(ofImage& _img, string _emulsionType, int _grainResolution, int _minCrystals, int _maxCrystals, float _grainSize);
    
        int grainResolution;
        int numGrains, numCrystals;
        vector<Grain> grains;
        int minCrystals, maxCrystals;
        float grainSize;
        string emulsionType;
      
};
