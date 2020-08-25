#include "ofApp.h"

void ofApp::setup() {
    settings.loadFile("settings.xml");
    imageUrl = settings.getValue("settings:image_url", "blockbuster_mid.jpg");
    isColor = (bool) settings.getValue("settings:color_film", 0);
    toggleImg = false;
    darkroom = Darkroom(imageUrl, isColor);
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

