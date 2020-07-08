Darkroom darkroom;

void setup() {
  size(50, 50, P2D);
  darkroom = new Darkroom("blockbuster_small.jpg", 1, 4); // url, grain resolution, window scale
  surface.setSize(darkroom.frame.width, darkroom.frame.height);
  
  darkroom.expose();
  
  darkroom.develop();
}

void draw() {
  background(0);
  
  darkroom.draw();
  
  surface.setTitle("" + frameRate);
}
