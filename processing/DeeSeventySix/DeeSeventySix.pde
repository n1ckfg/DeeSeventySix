Darkroom darkroom;
boolean toggleImg;
Settings settings;
boolean isColor = false;

void setup() {
  size(50, 50, P2D);
  settings = new Settings("settings.txt");
  darkroom = new Darkroom("blockbuster_mid.jpg", isColor);
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
