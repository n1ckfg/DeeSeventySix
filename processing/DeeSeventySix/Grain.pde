class Grain {  
  int numCrystals, minCrystals, maxCrystals;
  float x, y;
  Crystal[] crystals;
  float grainSize;
  
  Grain(float _x, float _y, float _grainSize, int _minCrystals, int _maxCrystals) {
    x = _x;
    y = _y;
    minCrystals = _minCrystals;
    maxCrystals = _maxCrystals;
    
    grainSize = _grainSize;
    numCrystals = (int) random(minCrystals, maxCrystals);
    crystals = new Crystal[numCrystals];
    
    for (int i=0; i<crystals.length; i++) {
      crystals[i] = new Crystal(x + random(grainSize) - random(grainSize), y + random(grainSize) - random(grainSize));
    }
  }
  
}
