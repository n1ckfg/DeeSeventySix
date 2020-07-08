class Emitter {
  
  int numRays;
  String url;
  int resolution;
  PImage img;
  Ray[] rays;
  
  Emitter(String _url, int _resolution) {
    url = _url;
    resolution = _resolution;
    
    img = loadImage(url);
    img.loadPixels();
    
    numRays = img.pixels.length * resolution;
    rays = new Ray[numRays];
  
    for (int i=0; i<numRays; i++) {
      float x = random(img.width);
      float normX = x / (float)img.width;
      
      float y = random(img.height);
      float normY = y / (float)img.height;
      
      int loc = (int) x + (int) y * img.width;
      color c = img.pixels[loc];
      float energy = ((red(c) + green(c) + blue(c))/ 3.0) / 255.0;
      
      rays[i] = new Ray(normX, normY, energy);
    }
  }
  
}
