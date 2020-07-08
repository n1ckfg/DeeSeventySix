class Emulsion {
  
  int numGrains, resolution, numCrystals;
  Grain[] grains;
  int minCrystals, maxCrystals;
  float grainSize;
    
  Emulsion(int _numPhotons, int _resolution, int _minCrystals, int _maxCrystals, float _grainSize) {
    resolution = _resolution;
    numGrains = _numPhotons * resolution;
    numCrystals = 0;
    minCrystals = _minCrystals;
    maxCrystals = _maxCrystals;
    grainSize = _grainSize;
        
    grains = new Grain[numGrains];
    for (int i=0; i<grains.length; i++) {
      grains[i] = new Grain(random(1), random(1), grainSize, minCrystals, maxCrystals);
      numCrystals += grains[i].crystals.length;
    }
    
  }
  
}
