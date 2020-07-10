Darkroom darkroom;
boolean toggleImg;

void setup() {
  size(50, 50, P2D);
  darkroom = new Darkroom("blockbuster_mid.jpg");
  surface.setSize(darkroom.frame.width, darkroom.frame.height);
  
  toggleImg = false;
  
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
