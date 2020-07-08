class Darkroom {

  String url;
  Emitter emitter;
  Emulsion emulsion;
  int resolution, frameScale, atomicLimit, exposureCounter, renderSteps;  
  float grainSize, exposureSize;
  
  /* Crystals can be 0.2um–2um, with most being 0.5um–1.0um. Grains can be 15um–25um.
  A crystal acquires a latent exposure when four or more of its silver halide atoms are hit by photos.
  If we assume crystals are 1um, then grains can have 15-25 crystals.
  The odds of an exposure happening are represented here by the energy value in the Ray object.
  */
  int minCrystals, maxCrystals; 

  PGraphics frame;

  Darkroom(String _url, int _resolution, int _frameScale) {
    resolution = _resolution;
    frameScale = _frameScale;
    minCrystals = 15; //15;
    maxCrystals = 25; //25;
    grainSize = 0.2;
    exposureSize = 0.01;
    renderSteps = 1000;
    
    url = _url;
    exposureCounter = 0;
    emitter = new Emitter(url, resolution);
    emulsion = new Emulsion(emitter.numRays, minCrystals, maxCrystals, grainSize);

    frame = createGraphics(emitter.img.width * frameScale, emitter.img.height * frameScale, P2D);
    frame.beginDraw();
    frame.background(0);
    frame.endDraw();
    
    println("width: " + frame.width + "   height: " + frame.height + "   rays: " + emitter.numRays + "   grains: " + emulsion.numGrains + "   crystals: " + emulsion.numCrystals);    
  }

  void expose() {
    int exposeTime = millis()/1000;
    
    /*
    for (int i=0; i<emulsion.grains.length; i++) {
      for (int j=0; j<emitter.rays.length; j++) {
        for (int k=0; k<emulsion.grains[i].crystals.length; k++) {
          if (dist(emulsion.grains[i].crystals[k].x, emulsion.grains[i].crystals[k].y, emitter.rays[j].x, emitter.rays[j].y) < exposureSize) {
            if (emitter.rays[j].energy > random(1) && !emulsion.grains[i].crystals[k].exposed) {
              emulsion.grains[i].crystals[k].exposed = true;
              emulsion.grains[i].exposed = true;
              exposureCounter++;
            }
          }
        }
      }
    }
    */
    for (int i=0; i<emulsion.grains.length; i++) {
      for (int j=0; j<emulsion.grains[i].crystals.length; j++) {
        boolean hit = false;
        // TODO use quadtrees for more efficient hit testing
        for (int k=0; k<emitter.rays.length; k++) {
          if (dist(emulsion.grains[i].crystals[j].x, emulsion.grains[i].crystals[j].y, emitter.rays[k].x, emitter.rays[k].y) < exposureSize) {
            if (emitter.rays[k].energy > random(1)) {
              hit = true;
              break;
            }
          }
        }
        if (hit) {
          emulsion.grains[i].crystals[j].exposed = true;
          emulsion.grains[i].exposed = true;
          exposureCounter++;
        }
      }
    }
    
    println("Exposed " + exposureCounter + " / " + emulsion.numCrystals + " crystals in " + (millis()/1000 - exposeTime) + " seconds.");
  }

  void develop() {
    frame.beginDraw();
    frame.stroke(255, 25);
    frame.strokeWeight(3);
    
    for (int i=0; i<renderSteps; i++) {
      int grain = (int) random(emulsion.grains.length);
      if (emulsion.grains[grain].exposed && !emulsion.grains[grain].developed) {
        for (int j=0; j<emulsion.grains[grain].crystals.length; j++) {
          if (emulsion.grains[grain].crystals[j].exposed) {
            float x = emulsion.grains[grain].crystals[j].x * frame.width;
            float y = emulsion.grains[grain].crystals[j].y * frame.height;
            
            frame.point(x, y);
          }
        }
        emulsion.grains[grain].developed = true;
      }
    }
    frame.endDraw();

    image(frame, 0, 0, width, height);
  }
  
}
