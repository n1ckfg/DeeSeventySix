#pragma once

#include "ofMain.h"
#include "Emulsion.h"

class Darkroom {
    
    public:
        Darkroom();
        Darkroom(string _url, bool _isColor);
        void expose();
        void develop();
        void drawSource();
        void draw();
    
        /*
        1. Crystals can be 0.2um–2um, with most being 0.5um–1.0um. Grains can be 15um–25um.
        If we assume crystals are all 1um, then each grain can have 15-25 crystals.

        2. A crystal acquires a latent exposure when four or more of its silver halide atoms are hit by photons.
        The odds of an exposure for each crystal are represented here by the energy value in the grain object.

        3. Once past a threshold number of crystals exposed, all crystals in the grain are exposed.
        */
        int minCrystals, maxCrystals, crystalThreshold;

        string url;
        bool isColor;

        vector<Emulsion> emulsions;
        int grainResolution, frameScale, exposureCounter, renderSteps;
        ofColor strokeColor;
        float grainSize, solarizeThreshold;

        ofImage img;
        ofFbo frame;
    
};
