#include "ofApp.h"

void ofApp::setup() {
    settings.loadFile("settings.xml");    
	imageUrl = settings.getValue("settings:image_url", "blockbuster_mid.jpg");
    isColor = (bool) settings.getValue("settings:color_film", 0);
	grainResolution = settings.getValue("settings:grain_resolution", 2);
	frameScale = settings.getValue("settings:frame_scale", 2);
	grainSize = settings.getValue("settings:grain_size", 0.01);

    toggleImg = false;
    darkroom = Darkroom(imageUrl, isColor);

	darkroom.grainResolution = grainResolution;
	darkroom.frameScale = frameScale;
	darkroom.grainSize = grainSize;

    ofSetWindowShape(darkroom.img.getWidth(), darkroom.img.getHeight());
    darkroom.expose();
    
    ofSetVerticalSync(false);
    ofSetFrameRate(60);
}

void ofApp::update() {
    darkroom.develop();
}

void ofApp::draw() {
    if (toggleImg) {
      darkroom.drawSource();
    } else {
      darkroom.draw();
    }

	ofSetWindowTitle(ofToString(ofGetFrameRate()));
}

void ofApp::keyPressed(int key) {
    switch(key) {
      case 's':
        ofSaveFrame("test.png");
        break;
      case ' ':
        toggleImg = !toggleImg;
        break;
    }
}

