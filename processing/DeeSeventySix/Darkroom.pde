class Darkroom {
  
  String url;
  Emitter emitter;
  Emulsion emulsion;
  int resolution;
  int frameScale;
  PGraphics frame;
  
  Darkroom(String _url) {
    url = _url;
    resolution = 1;
    frameScale = 400;
    
    emitter = new Emitter(url);
    
    emulsion = new Emulsion(emitter.numPhotons, resolution, emitter.w, emitter.h);
    
    frame = createGraphics((int) (emitter.w * frameScale), (int) (emitter.h * frameScale), P2D);
  
    println("width: " + frame.width + "   height: " + frame.height + "   photons: " + emitter.numPhotons + "   grains: " + emulsion.numGrains + "   crystals: " + emulsion.numCrystals);
  }
  
  void update() {
     
  }
  
  void draw() {
    frame.beginDraw();
    for (int i=0; i<emulsion.grains.length; i++) {
      for (int j=0; j<emulsion.grains[i].crystals.length; j++) {
        
      }
    }
    frame.endDraw();
    image(frame, 0, 0, width, height);
  }
  
  void run() {
    update();
    draw();
  }
  
}
