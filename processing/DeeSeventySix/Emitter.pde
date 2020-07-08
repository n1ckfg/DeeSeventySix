class Emitter {
  
  int numPhotons;
  PImage img;
  Photon[] photons;
  
  Emitter(String url) {
    img = loadImage(url);
    img.loadPixels();
    numPhotons = img.pixels.length;
    photons = new Photon[numPhotons];
  
    for (int x = 0; x < img.width; x++) {
      for (int y = 0; y < img.height; y++) {
        int loc = x + y * img.width;
        
        float normX = ((float) x / (float) img.width);
        float normY = ((float) y / (float) img.height);
        color c = img.pixels[loc];
        float energy = ((red(c) + green(c) + blue(c))/ 3.0) / 255.0;
        photons[loc] = new Photon(normX, normY, energy);
      }
    }
  }
  
}
