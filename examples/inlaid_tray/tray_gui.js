let posX = 10;
let posY = 10;
let sizeX = 120;
let sizeY = 120;
let gridSize = 20;

mvts[0] = new Movement(0,0, gridSize/4);
//nbPoints, theta, zMode = 0
mvts[0].makeGuiPath(3,0,"PARABOLA");
//mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[0] = new Boundary("RECTANGLE", posX+sizeX/2, posY+sizeY/2, sizeX/2, sizeY/2);
//id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[0] = new Grid(0, posX, posY, "SIN", gridSize/2, gridSize, sizeX+gridSize, sizeY+gridSize, 0.25);

rotations = [];
scales = [];

for (let i = 0; i < grids[0].row; i++){
  rotations[i] = [];
  scales[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    scales[i][j] = 0.5;
    if ((i+j) % 2 == 0){
    rotations[i][j] = 0;
    } else {
    rotations[i][j] = 0;//PI/2;
    }
  }
}
grids[0].addRotations(rotations);
grids[0].addScales(scales);