class Emulsion {
  
  int numGrains, resolution, numCrystals;
  float w, h;
  Grain[] grains;
  
  Emulsion(int _numPhotons, int _resolution, float _w, float _h) {
    resolution = _resolution;
    numGrains = _numPhotons * resolution;
    numCrystals = 0;
    w = _w;
    h = _h;
    
    grains = new Grain[numGrains];
    for (int i=0; i<grains.length; i++) {
      grains[i] = new Grain(random(1), random(1));
      numCrystals += grains[i].crystals.length;
    }
  }
  
}
