let customZ = function randomZ(){
    return random(-1,0);
  }


mvts[0] = new Movement(0,0);
mvts[0].makeLinePath(0,0,30,5,0,0,"CUSTOM", customZ);

let posX = 10;
let posY = 10;
let sizeX = 120;
let sizeY = 120;
let gridSize = 20;
//mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[0] = new Boundary("RECTANGLE", posX+sizeX/2, posY+sizeY/2, sizeX/2, sizeY/2);
//id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[0] = new Grid(0, posX, posY, "LINEAR", gridSize, gridSize, sizeX+gridSize, sizeY+gridSize);
  