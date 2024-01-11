import processing.video.*;

Capture video;
int captureIndex = 0;
boolean preview;
PShader shader_delay;
PGraphics buffer0, buffer1;
int textureSampleMode = 3;

float delaySpeed = 0.3;
float lumaThreshold = 0.2;
float alphaMin = 0.1;
float alphaMax = 1.0;

int camW = 1920;
int camH = 1080;
int camFps = 24;
int baseW = 1440;
int baseH = camH;

void setup() {
  size(1280, 960, P2D);
  ((PGraphicsOpenGL)g).textureSampling(textureSampleMode); 
  noSmooth();
 
  shader_delay = loadShader("delay.glsl");
  
  buffer0 = createGraphics(baseW, baseH, P2D);
  ((PGraphicsOpenGL)buffer0).textureSampling(textureSampleMode); 
  buffer0.noSmooth();

  buffer1 = createGraphics(baseW, baseH, P2D);
  ((PGraphicsOpenGL)buffer1).textureSampling(textureSampleMode); 
  buffer1.noSmooth();
  buffer1.beginDraw();
  buffer1.background(127);
  buffer1.endDraw();
   
  shader_delay.set("iResolution", float(buffer0.width), float(buffer0.height));
  shader_delay.set("tex0", buffer0);
  shader_delay.set("tex1", buffer1);
  shader_delay.set("delaySpeed", delaySpeed);
  shader_delay.set("lumaThreshold", lumaThreshold);
  shader_delay.set("alphaMin", alphaMin);
  shader_delay.set("alphaMax", alphaMax);
  

  video = new Capture(this, camW, camH, Capture.list()[captureIndex], camFps);
  video.start(); 
}

void draw() {
  background(0);
  float time = (float) millis() / 1000.0;
  
  // 0. Original video image
  buffer0.beginDraw();
  buffer0.image(video, 0, 0, buffer0.width, buffer0.height);
  buffer0.filter(shader_delay);
  buffer0.endDraw();
  
  // 1. Delay effect
  buffer1.beginDraw();
  buffer1.image(buffer0, 0, 0);
  buffer1.endDraw();
  
  if (preview) {
    image(video, 0, 0, width, height);
  } else {
    image(buffer1, 0, 0, width, height);
  }
    
  surface.setTitle("" + frameRate);
}

void captureEvent(Capture c) {
  c.read();
}
