class Emulsion {
  
  int numGrains, numCrystals;
  Grain[] grains;
  int minCrystals, maxCrystals;
  float grainSize;
    
  Emulsion(int _numRays, int _minCrystals, int _maxCrystals, float _grainSize) {
    numGrains = _numRays;
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
