#include "Grain.h"

Grain::Grain(float _x, float _y, float _energy, float _grainSize, int _minCrystals, int _maxCrystals) {
    x = _x;
    y = _y;
    minCrystals = _minCrystals;
    maxCrystals = _maxCrystals;
    energy = _energy;
    exposed = false;
    developed = false;
    grainSize = _grainSize;
    numCrystals = (int) ofRandom(minCrystals, maxCrystals);

    for (int i=0; i<numCrystals; i++) {
        crystals.push_back(Crystal(x + ofRandom(grainSize) - random(grainSize), y + random(grainSize) - random(grainSize)));
    }
}
