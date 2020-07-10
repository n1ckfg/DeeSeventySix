#include "ofApp.h"

void ofApp::setup() {
    toggleImg = false;
    darkroom = Darkroom("blockbuster_mid.jpg");
    darkroom.expose();
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

