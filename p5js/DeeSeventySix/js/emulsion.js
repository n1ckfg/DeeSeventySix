class Emulsion {
  
  int grainResolution;
  int numGrains, numCrystals;
  Grain[] grains;
  int minCrystals, maxCrystals;
  float grainSize;
  String type;
    
  Emulsion(PImage _img, String _type, int _grainResolution, int _minCrystals, int _maxCrystals, float _grainSize) {
    grainResolution = _grainResolution;
    type = _type;
    
    numGrains = _img.pixels.length * grainResolution;
    
    numCrystals = 0;
    minCrystals = _minCrystals;
    maxCrystals = _maxCrystals;
    grainSize = _grainSize;
        
    grains = new Grain[numGrains];
    for (int i=0; i<grains.length; i++) {
      float x = random(_img.width);
      float normX = x / (float)_img.width;
      
      float y = random(_img.height);
      float normY = y / (float)_img.height;
      
      int loc = (int) x + (int) y * _img.width;
      color c = _img.pixels[loc];
      float energy = 0;
      switch (type) {
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

      grains[i] = new Grain(normX, normY, energy, grainSize, minCrystals, maxCrystals);
    
      numCrystals += grains[i].crystals.length;
    }
    
  }
  
}
