class Darkroom {

  String url;
  Emulsion emulsion;
  int resolution, frameScale, atomicLimit, exposureCounter, renderSteps, alpha, sWeight;  
  float grainSize, exposureSize;
  
  /* Crystals can be 0.2um–2um, with most being 0.5um–1.0um. Grains can be 15um–25um.
  A crystal acquires a latent exposure when four or more of its silver halide atoms are hit by photos.
  If we assume crystals are 1um, then grains can have 15-25 crystals.
  The odds of an exposure happening are represented here by the energy value in the Ray object.
  */
  int minCrystals, maxCrystals; 

  PGraphics frame;

  Darkroom(String _url) {
    resolution = 3;
    frameScale = 1;
    minCrystals = 15; //15;
    maxCrystals = 25; //25;
    grainSize = 0.02;
    renderSteps = 1000;
    alpha = 10;
    sWeight = 1;
    
    url = _url;
    exposureCounter = 0;
    emulsion = new Emulsion(url, resolution, minCrystals, maxCrystals, grainSize);

    frame = createGraphics(emulsion.img.width * frameScale, emulsion.img.height * frameScale, P2D);
    frame.beginDraw();
    frame.background(0);
    frame.endDraw();
    
    println("width: " + frame.width + "   height: " + frame.height + "   grains: " + emulsion.numGrains + "   crystals: " + emulsion.numCrystals);    
  }

  void expose() {    
    for (int i=0; i<emulsion.grains.length; i++) {
      for (int j=0; j<emulsion.grains[i].crystals.length; j++) {
        if (emulsion.grains[i].energy > random(1)) {
          emulsion.grains[i].crystals[j].exposed = true;
          emulsion.grains[i].exposed = true;
          exposureCounter++;
        }
      }
    }
  }

  void develop() {
    frame.beginDraw();
    
    for (int i=0; i<renderSteps; i++) {
      int grain = (int) random(emulsion.grains.length);
      if (emulsion.grains[grain].exposed && !emulsion.grains[grain].developed) {
        for (int j=0; j<emulsion.grains[grain].crystals.length; j++) {
          if (emulsion.grains[grain].crystals[j].exposed) {
            float x = emulsion.grains[grain].crystals[j].x * frame.width;
            float y = emulsion.grains[grain].crystals[j].y * frame.height;
            
            frame.stroke(255, alpha);
            frame.strokeWeight(sWeight);
            frame.point(x, y);
          }
        }
        emulsion.grains[grain].developed = true;
      }
    }
    frame.endDraw();
  }
  
  void drawSource() {
    image(emulsion.img, 0, 0, width, height);
  }
  
  void draw() {
    image(frame, 0, 0, width, height);
  }
  
}
