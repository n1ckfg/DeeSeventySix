class Grain {
  // Crystals can be 0.2um–2um with most being 0.5um–1.0um
  // Grains can be 15um–25um
  // If we assume crystals are 1um then grains can have 15-25 crystals.
  
  int numCrystals, minCrystals, maxCrystals;
  float x, y;
  Crystal[] crystals;
  float grainSize;
  
  Grain(float _x, float _y) {
    x = _x;
    y = _y;
    minCrystals = 15;
    maxCrystals = 25;
    grainSize = 0.001;
    numCrystals = (int) random(minCrystals, maxCrystals);
    crystals = new Crystal[numCrystals];
    
    for (int i=0; i<crystals.length; i++) {
      crystals[i] = new Crystal(x + random(grainSize) - random(grainSize), y + random(grainSize) - random(grainSize));
    }
  }
  
}
