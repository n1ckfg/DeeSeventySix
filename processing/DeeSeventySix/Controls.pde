void keyPressed() {
  switch(key) {
    case 's':
      saveFrame("test.png");
      break;
    case ' ':
      toggleImg = !toggleImg;
      break;
  } 
}
