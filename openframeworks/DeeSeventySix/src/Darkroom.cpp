#include "Darkroom.h"

Darkroom::Darkroom() {
    //
}

Darkroom::Darkroom(string _url, bool _isColor) {
    isColor = _isColor;
    grainResolution = 2;
    frameScale = 2;
    grainSize = 0.01;
    crystalThreshold = 4;
    minCrystals = 15; //15;
    maxCrystals = 25; //25;
    renderSteps = 1000;
    solarizeThreshold = 90;

    url = _url;
    img.load(url);

    exposureCounter = 0;

    if (isColor) {
        emulsions.push_back(Emulsion(img, "r", grainResolution, minCrystals, maxCrystals, grainSize));
        emulsions.push_back(Emulsion(img, "b", grainResolution, minCrystals, maxCrystals, grainSize));
        emulsions.push_back(Emulsion(img, "g", grainResolution, minCrystals, maxCrystals, grainSize));
    } else {
        emulsions.push_back(Emulsion(img, "bw", grainResolution, minCrystals, maxCrystals, grainSize));
    }

    frame.allocate(img.getWidth() * frameScale, img.getHeight() * frameScale, GL_RGB);
    frame.begin();
    ofBackground(255);
	frame.end();

    cout << "width: " << frame.getWidth() << "   height: " << frame.getHeight() << endl;
    for (int i=0; i<emulsions.size(); i++) {
        cout << "channel " << (i+1) << " -- grains: " << emulsions[i].numGrains << "   crystals: " << emulsions[i].numCrystals << endl;
    }
}

void Darkroom::expose() {
    for (int h=0; h<emulsions.size(); h++) {
        for (int i=0; i<emulsions[h].grains.size(); i++) {
            int crystalsExposed = 0;
            for (int j=0; j<emulsions[h].grains[i].crystals.size(); j++) {
                if ((emulsions[h].grains[i].energy * emulsions[h].grains[i].crystals.size() < solarizeThreshold) &&
                (crystalsExposed > crystalThreshold || emulsions[h].grains[i].energy > ofRandom(1))) {
                    emulsions[h].grains[i].crystals[j].exposed = true;
                    emulsions[h].grains[i].exposed = true;
                    crystalsExposed++;
                    exposureCounter++;
                }
            }
        }
    }
}

void Darkroom::develop() {
    frame.begin();
	ofEnableBlendMode(OF_BLENDMODE_MULTIPLY);

    for (int i=0; i<renderSteps; i++) {
        for (int h=0; h<emulsions.size(); h++) {
            if (emulsions[h].emulsionType == "r") {
                strokeColor = ofColor(0, 255, 255);
            } else if (emulsions[h].emulsionType == "g") {
                strokeColor = ofColor(255, 0, 255);
            } else if (emulsions[h].emulsionType == "b") {
                strokeColor = ofColor(255, 255, 0);
            } else {
                strokeColor = ofColor(0);
            }
            int grain = (int) ofRandom(emulsions[h].grains.size());
			ofSetColor(strokeColor);

			if (emulsions[h].grains[grain].exposed && !emulsions[h].grains[grain].developed) {
                for (int j=0; j<emulsions[h].grains[grain].crystals.size(); j++) {
                    if (!emulsions[h].grains[grain].crystals[j].exposed) {
                        float x = emulsions[h].grains[grain].crystals[j].x * frame.getWidth();
                        float y = emulsions[h].grains[grain].crystals[j].y * frame.getHeight();
                        ofDrawCircle(x, y, frameScale);
                    }
                }
                
                emulsions[h].grains[grain].developed = true;
            }
        }
    }

    frame.end();
}

void Darkroom::drawSource() {
    img.draw(0, 0, ofGetWidth(), ofGetHeight());
}

void Darkroom::draw() {
    frame.draw(0, 0, ofGetWidth(), ofGetHeight());
}
