class Emitter {
  
  int numPhotons;
  float w, h;
  PImage img;
  Photon[] photons;
  
  Emitter(String url) {
    img = loadImage(url);
    img.loadPixels();
    numPhotons = img.pixels.length;
    photons = new Photon[numPhotons];
    
    if (img.height > img.width) {
      w = (float) img.width / (float) img.height;
      h = 1.0;
    } else if (img.width > img.height) {
      w = 1.0;
      h = (float) img.height / (float) img.width;
    } else {
      w = 1.0;
      h = 1.0;
    }
  
    for (int x = 0; x < img.width; x++) {
      for (int y = 0; y < img.height; y++) {
        int loc = x + y * img.width;
        
        float normX = ((float) x / (float) img.width) * w;
        float normY = ((float) y / (float) img.height) * h;
        color c = img.pixels[loc];
        int freq = (int) ((red(c) + green(c) + blue(c))/ 3.0);
        photons[loc] = new Photon(normX, normY, freq);
      }
    }
  }
  
}
