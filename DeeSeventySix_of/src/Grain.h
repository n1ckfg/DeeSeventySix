#pragma once

#include "ofMain.h"
#include "Crystal.h"

class Grain {
    
    public:
        Grain(float _x, float _y, float _energy, float _grainSize, int _minCrystals, int _maxCrystals);
    
        int numCrystals, minCrystals, maxCrystals;
        float x, y;
        vector<Crystal> crystals;
        float grainSize, energy;
        bool exposed, developed;
    
};
