#pragma once

#include "ofMain.h"
#include "ofxXmlSettings.h"
#include "Darkroom.h"

class ofApp : public ofBaseApp {
    
    public:
        void setup();
        void update();
        void draw();
        void keyPressed(int key);
    
        Darkroom darkroom;
        bool toggleImg, isColor;
        ofxXmlSettings settings;

};
