class Darkroom {

  String url;
  Emitter emitter;
  Emulsion emulsion;
  int resolution, frameScale, atomicLimit, exposureCounter;  
  float grainSize, exposureSize;
  
  /* Crystals can be 0.2um–2um, with most being 0.5um–1.0um. Grains can be 15um–25um.
  A crystal acquires a latent exposure when four or more of its silver halide atoms are hit by photons.
  If we assume crystals are 1um, then grains can have 15-25 crystals.
  The odds of an exposure happening are represented here by the energy value in the Photon object.
  */
  int minCrystals, maxCrystals; 

  PGraphics frame;

  Darkroom(String _url) {
    resolution = 1;
    frameScale = 4;
    minCrystals = 15;
    maxCrystals = 25;
    grainSize = 0.2;
    exposureSize = 0.01;
    
    url = _url;
    exposureCounter = 0;
    emitter = new Emitter(url);
    emulsion = new Emulsion(emitter.numPhotons, resolution, minCrystals, maxCrystals, grainSize);

    frame = createGraphics(emitter.img.width * frameScale, emitter.img.height * frameScale, P2D);

    println("width: " + frame.width + "   height: " + frame.height + "   photons: " + emitter.numPhotons + "   grains: " + emulsion.numGrains + "   crystals: " + emulsion.numCrystals);
  }

  void expose() {
    int exposeTime = millis()/1000;
    for (int i=0; i<emulsion.grains.length; i++) {
      for (int j=0; j<emulsion.grains[i].crystals.length; j++) {
        // TODO use quadtrees for more efficient hit testing
        for (int k=0; k<emitter.photons.length; k++) {
          if (dist(emulsion.grains[i].crystals[j].x, emulsion.grains[i].crystals[j].y, emitter.photons[k].x, emitter.photons[k].y) < exposureSize) {
            if (emitter.photons[k].energy > random(1)) {
              emulsion.grains[i].crystals[j].exposed = true;
              exposureCounter++;
            }
          }
        }
      }
    }
    println("Exposed " + exposureCounter + " / " + emulsion.numCrystals + " crystals in " + (millis()/1000 - exposeTime) + " seconds.");
  }

  void develop() {
    int developTime = millis() / 1000;
    frame.beginDraw();
    frame.background(255);
    frame.stroke(0);
    frame.strokeWeight(1);
    
    for (int i=0; i<emulsion.grains.length; i++) {
      for (int j=0; j<emulsion.grains[i].crystals.length; j++) {
        if (emulsion.grains[i].crystals[j].exposed) {
          float x = emulsion.grains[i].crystals[j].x * frame.width;
          float y = emulsion.grains[i].crystals[j].y * frame.height;
          frame.point(x, y);
        }
      }
    }
    frame.filter(INVERT);
    frame.endDraw();
    println("Developed image in " + (millis()/1000 - developTime) + " seconds.");
  }

  void draw() {
    image(frame, 0, 0, width, height);
  }
}
