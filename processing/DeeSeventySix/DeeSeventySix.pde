Darkroom darkroom;
boolean toggleImg = false;

void setup() {
  size(50, 50, P2D);
  darkroom = new Darkroom("blockbuster.jpg"); // url, grain resolution, window scale
  surface.setSize(darkroom.frame.width, darkroom.frame.height);
  
  darkroom.expose();
}

void draw() {
  background(0);
  
  darkroom.develop();
  
  if (toggleImg) {
    darkroom.drawSource();
  } else {
    darkroom.draw();
  }
  
  surface.setTitle("" + frameRate);
}
