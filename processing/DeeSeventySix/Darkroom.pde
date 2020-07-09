class Darkroom {

  String url;
  boolean isColor;
  
  Emulsion[] emulsions;
  int resolution, frameScale, exposureCounter, renderSteps, alpha;  
  float grainSize, exposureSize;
  color strokeColor;
  
  /* Crystals can be 0.2um–2um, with most being 0.5um–1.0um. Grains can be 15um–25um.
  A crystal acquires a latent exposure when four or more of its silver halide atoms are hit by photos.
  If we assume crystals are 1um, then grains can have 15-25 crystals.
  The odds of an exposure happening are represented here by the energy value in the Ray object.
  */
  int minCrystals, maxCrystals; 
  
  PImage img;
  PGraphics frame;

  Darkroom(String _url) {
    isColor = true;
    resolution = 2;
    frameScale = 1;
    alpha = 10;
    grainSize = 0.01;
    minCrystals = 15; //15;
    maxCrystals = 25; //25;
    renderSteps = 1000;
    strokeColor = color(255);
    
    url = _url;
    img = loadImage(url);
    img.loadPixels();
    
    exposureCounter = 0;
    
    if (isColor) {
      emulsions = new Emulsion[3];
      emulsions[0] = new Emulsion(img, "r", resolution, minCrystals, maxCrystals, grainSize);
      emulsions[1] = new Emulsion(img, "b", resolution, minCrystals, maxCrystals, grainSize);
      emulsions[2] = new Emulsion(img, "g", resolution, minCrystals, maxCrystals, grainSize);
    } else {
      emulsions = new Emulsion[1];
      emulsions[0] = new Emulsion(img, "bw", resolution, minCrystals, maxCrystals, grainSize);
    }
    
    frame = createGraphics(img.width * frameScale, img.height * frameScale, P2D);
    frame.beginDraw();
    frame.blendMode(NORMAL);
    frame.background(0);
    frame.blendMode(ADD);
    frame.endDraw();
    
    println("width: " + frame.width + "   height: " + frame.height);
    for (int i=0; i<emulsions.length; i++) {
      println("channel " + (i+1) + " -- grains: " + emulsions[i].numGrains + "   crystals: " + emulsions[i].numCrystals);  
    }
  }

  void expose() {  
    for (int h=0; h<emulsions.length; h++) {
      for (int i=0; i<emulsions[h].grains.length; i++) {
        for (int j=0; j<emulsions[h].grains[i].crystals.length; j++) {
          if (emulsions[h].grains[i].energy > random(1)) {
            emulsions[h].grains[i].crystals[j].exposed = true;
            emulsions[h].grains[i].exposed = true;
            exposureCounter++;
          }
        }
      }
    }
  }

  void develop() {
    frame.beginDraw();
    
    for (int i=0; i<renderSteps; i++) {
      for (int h=0; h<emulsions.length; h++) {
        switch(emulsions[h].type) {
          case "r":
            strokeColor = color(255, 0, 0);
            break;
          case "g":
            strokeColor = color(0, 255, 0);
            break;
          case "b":
            strokeColor = color(0, 0, 255);
            break;
          default:
            strokeColor = color(255);
            break;
        }
        int grain = (int) random(emulsions[h].grains.length);
        if (emulsions[h].grains[grain].exposed && !emulsions[h].grains[grain].developed) {
          for (int j=0; j<emulsions[h].grains[grain].crystals.length; j++) {
            if (emulsions[h].grains[grain].crystals[j].exposed) {
              float x = emulsions[h].grains[grain].crystals[j].x * frame.width;
              float y = emulsions[h].grains[grain].crystals[j].y * frame.height;
              frame.strokeWeight(frameScale*2);
              frame.stroke(strokeColor, alpha/2);
              frame.point(x, y);
              frame.strokeWeight(frameScale);
              frame.stroke(strokeColor, alpha);
              frame.point(x, y);
            }
          }
          emulsions[h].grains[grain].developed = true;
        }
      }
    }
    
    frame.endDraw();
  }
  
  void drawSource() {
    image(img, 0, 0, width, height);
  }
  
  void draw() {
    image(frame, 0, 0, width, height);
  }
  
}
