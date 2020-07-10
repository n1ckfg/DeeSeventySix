#include "Darkroom.h"

Darkroom::Darkroom(string _url) {
    isColor = true;
    grainResolution = 3;
    frameScale = 2;
    alpha = 3;
    grainSize = 0.001;
    crystalThreshold = 10;
    minCrystals = 15; //15;
    maxCrystals = 25; //25;
    renderSteps = 1000;
    strokeColor = ofColor(255);
    solarizeThreshold = 60;

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

    frame = createGraphics(img.getWidth() * frameScale, img.getHeight() * frameScale, P2D);
    frame.beginDraw();
    frame.blendMode(NORMAL);
    frame.background(0);
    frame.blendMode(ADD);
    frame.endDraw();

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
    frame.beginDraw();

    for (int i=0; i<renderSteps; i++) {
        for (int h=0; h<emulsions.size(); h++) {
            switch(emulsions[h].emulsionType) {
                case "r":
                    strokeColor = ofColor(255, 0, 0);
                    break;
                case "g":
                    strokeColor = ofColor(0, 255, 0);
                    break;
                case "b":
                    strokeColor = ofColor(0, 0, 255);
                    break;
                default:
                    strokeColor = ofColor(255);
                    break;
            }
            
            int grain = (int) ofRandom(emulsions[h].grains.size());
            if (emulsions[h].grains[grain].exposed && !emulsions[h].grains[grain].developed) {
                for (int j=0; j<emulsions[h].grains[grain].crystals.size(); j++) {
                    if (emulsions[h].grains[grain].crystals[j].exposed) {
                        float x = emulsions[h].grains[grain].crystals[j].x * frame.getWidth();
                        float y = emulsions[h].grains[grain].crystals[j].y * frame.getHeight();
                        frame.strokeWeight(frameScale*2);
                        frame.stroke(strokeColor, alpha/2);
                        frame.point(x, y);
                        frame.strokeWeight(frameScale);
                        frame.stroke(strokeColor, alpha);
                        frame.point(x, y);
                    }
                }
                
                emulsions[h].grains[grain].developed = true;
            }
        }
    }

    frame.endDraw();
}

void Darkroom::drawSource() {
    image(img, 0, 0, width, height);
}

void Darkroom::draw() {
    image(frame, 0, 0, width, height);
}
