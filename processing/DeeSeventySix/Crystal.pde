class Crystal {
  // Crystals can be 0.2um–2um with most being 0.5um–1.0um
  // Here we'll assume crystals are all 1um.
  
  int hits;
  int limit;
  float x, y;
  boolean exposed;
  
  Crystal(float _x, float _y) {
    x = _x;
    y = _y;
    hits = 0;
    limit = 4;
    exposed = false;
  }
  
}
