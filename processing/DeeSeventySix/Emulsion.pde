class Emulsion {
  
  String url;
  int resolution;
  PImage img;
  int numGrains, numCrystals;
  Grain[] grains;
  int minCrystals, maxCrystals;
  float grainSize;
    
  Emulsion(String _url, int _resolution, int _minCrystals, int _maxCrystals, float _grainSize) {
    url = _url;
    resolution = _resolution;
    
    img = loadImage(url);
    img.loadPixels();
    
    numGrains = img.pixels.length * resolution;
    
    numCrystals = 0;
    minCrystals = _minCrystals;
    maxCrystals = _maxCrystals;
    grainSize = _grainSize;
        
    grains = new Grain[numGrains];
    for (int i=0; i<grains.length; i++) {
      float x = random(img.width);
      float normX = x / (float)img.width;
      
      float y = random(img.height);
      float normY = y / (float)img.height;
      
      int loc = (int) x + (int) y * img.width;
      color c = img.pixels[loc];
      float energy = ((red(c) + green(c) + blue(c))/ 3.0) / 255.0;

      grains[i] = new Grain(normX, normY, energy, grainSize, minCrystals, maxCrystals);
    
      numCrystals += grains[i].crystals.length;
    }
    
  }
  
}
