//diagonal crisscross lines
let sizeX = 300;
let sizeY = 100;
let offsetX = 10;
let offsetY = 0;

mvts[0] = new Movement(0,0, 5);
//makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
//mvts[0].makeLinePath(0,0, 200, 15,0);
mvts[0].makePointPath(0,0);

//boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
//gridSizeX = sizeX/15;
//gridSizeY = 1.1*sizeY;
gridSizeX = (sizeX - 30)/36;
gridSizeX = sizeX/40
console.log(gridSizeX)
gridSizeY = gridSizeX;
//grids[0] = new Grid(0,offsetTileX,offsetTileY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);
grids[0] = new Grid(0,offsetX,offsetY+2,"SIN",gridSizeX,gridSizeY,sizeX,sizeY, 0.25);

/*mvts[3] = new Movement(0,0);
// parameters: x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null
mvts[3].makeLinePath(0,0, sizeX, 10,0);
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[3] = new Boundary("RECTANGLE",sizeX/2+offsetX+(sizeX+offsetX),sizeY/2+offsetY+(sizeY+offsetY),sizeX/2+2, sizeY/2);
gridSizeX = 1.1*sizeX;
gridSizeY = bitWidth-1;
// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[3] = new Grid(3,sizeX+2*offsetX,sizeY+2*offsetY+gridSizeY/2,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);
*/

// Add rotation of -PI/2 and randomization on X and Y
rotations = [];
randomX = [];
randomY = [];
randomZ = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  randomX[i] = [];
  randomY[i] = [];
  randomZ[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    rotations[i][j] = -PI/3;
    randomX[i][j] = 2;
    randomY[i][j] = 1;
    randomZ[i][j] = 1;
  }
}
grids[0].addRotations(rotations);
//grids[0].addRandomX(randomX);
//grids[0].addRandomY(randomY);
//grids[0].addRandomZ(randomZ);

// grid 3
/*mvts[1] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
//  makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
mvts[1].makeLinePath(0,0, 275, 10,0);

//boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);

//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX;
gridSizeY = 120/15;

grids[1] = new Grid(1,offsetX+2,offsetY+2,"LINEAR",gridSizeX,gridSizeY,sizeX,sizeY);
//grids[4] = new Grid(4,offsetTileX,offsetTileY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

// Add rotation of -PI/2 and randomization on X and Y
rotations = [];
randomX = [];
randomY = [];
randomZ = [];
for (let i = 0; i < grids[1].row; i ++){
  rotations[i] = [];
  randomX[i] = [];
  randomY[i] = [];
  randomZ[i] = [];
  for (let j = 0; j < grids[1].column; j++){
    rotations[i][j] = 0;
    randomX[i][j] = 1;
    randomY[i][j] = 2;
    randomZ[i][j] = 1;
  }
}
//grids[1].addRotations(rotations);
//grids[1].addRandomX(randomX);
//grids[1].addRandomY(randomY);
grids[1].addRandomZ(randomZ);*/