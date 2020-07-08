Darkroom darkroom;

void setup() {
  size(50, 50, P2D);
  darkroom = new Darkroom("blockbuster_small.jpg", 3, 6); // url, grain resolution, window scale
  surface.setSize(darkroom.frame.width, darkroom.frame.height);
  
  darkroom.expose();
}

void draw() {
  background(0);
  
  darkroom.develop();
  
  surface.setTitle("" + frameRate);
}
