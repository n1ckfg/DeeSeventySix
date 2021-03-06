Darkroom darkroom;
boolean toggleImg;
Settings settings;
boolean isColor = false;
String imageUrl;
int repsCounter = 0;
int repsCounterMax = 2000;

void setup() {
  size(50, 50, P2D);
  settings = new Settings("settings.txt");
  chooseFolderDialog();
  
  init();
}

void draw() {
  if (firstRun) {
    filesLoadedChecker();
  } else {
    background(0);
    
    darkroom.develop();
    
    if (toggleImg) {
      darkroom.drawSource();
    } else {
      darkroom.draw();
    }

    repsCounter++;
    if (repsCounter > repsCounterMax) fileLoop();
  }
  
  surface.setTitle("" + frameRate);
}

void init() {
  repsCounter = 0;
  
  darkroom = new Darkroom(imageUrl, isColor);
  surface.setSize(darkroom.frame.width, darkroom.frame.height);
  
  toggleImg = false;
  
  darkroom.expose();
}
