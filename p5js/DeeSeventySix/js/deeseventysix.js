Darkroom darkroom;
boolean toggleImg;
Settings settings;
boolean isColor = false;
String imageUrl;

void setup() {
  size(50, 50, P2D);
  settings = new Settings("settings.txt");
  darkroom = new Darkroom(imageUrl, isColor);
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
