Darkroom darkroom;

void setup() {
  size(50, 50, P2D);
  darkroom = new Darkroom("blockbuster.jpg");
  surface.setSize(darkroom.frame.width, darkroom.frame.height);
}

void draw() {
  darkroom.run();
}
