let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;
mvts[0] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
mvts[0].makeLinePath(0,0, 120, 10,0);

boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/15;
console.log(gridSizeX);
gridSizeY = 1.1*sizeY;
grids[0] = new Grid(0,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

// Add rotation of -PI/2 and randomization on X and Y
rotations = [];
randomX = [];
randomY = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  randomX[i] = [];
  randomY[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    rotations[i][j] = -PI/2;
    randomX[i][j] = 2;
    randomY[i][j] = 1;
  }
}
grids[0].addRotations(rotations);
grids[0].addRandomX(randomX);
grids[0].addRandomY(randomY);

let offsetTileX = sizeX + 2*offsetX;
let offsetTileY = sizeY + 2*offsetY;
mvts[1] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
mvts[1].makeLinePath(0,0, 120, 10,0);

boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/20;
console.log(gridSizeX);
gridSizeY = 1.1*sizeY;
grids[1] = new Grid(1,offsetTileX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

// Add rotation of -PI/2 and randomization on X and Y
rotations = [];
randomX = [];
randomY = [];
for (let i = 0; i < grids[1].row; i ++){
  rotations[i] = [];
  randomX[i] = [];
  randomY[i] = [];
  for (let j = 0; j < grids[1].column; j++){
    rotations[i][j] = -PI/2;
    randomX[i][j] = 1;
    randomY[i][j] = 1;
  }
}
grids[1].addRotations(rotations);
grids[1].addRandomX(randomX);
grids[1].addRandomY(randomY);

// tile 3
mvts[2] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
mvts[2].makeLinePath(0,0, 120, 10,0);

boundaries[2] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/15;
gridSizeY = 1.1*sizeY;
grids[2] = new Grid(2,offsetX,offsetTileY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

// Add rotation of -PI/2 and randomization on X and Y
rotations = [];
randomX = [];
randomY = [];
randomZ = [];
for (let i = 0; i < grids[2].row; i ++){
  rotations[i] = [];
  randomX[i] = [];
  randomY[i] = [];
  randomZ[i] = [];
  for (let j = 0; j < grids[2].column; j++){
    rotations[i][j] = -PI/2;
    randomX[i][j] = 3;
    randomY[i][j] = 1;
    randomZ[i][j] = 1;
  }
}
grids[2].addRotations(rotations);
grids[2].addRandomX(randomX);
grids[2].addRandomY(randomY);
grids[2].addRandomZ(randomZ);

// grid 3
mvts[3] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
//  makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
mvts[3].makeLinePath(0,0, 120, 5,0);

boundaries[3] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/15;
gridSizeY = 1.1*sizeY;
grids[3] = new Grid(3,offsetTileX,offsetTileY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

// Add rotation of -PI/2 and randomization on X and Y
rotations = [];
randomX = [];
randomY = [];
randomZ = [];
for (let i = 0; i < grids[3].row; i ++){
  rotations[i] = [];
  randomX[i] = [];
  randomY[i] = [];
  randomZ[i] = [];
  for (let j = 0; j < grids[3].column; j++){
    rotations[i][j] = -PI/2;
    randomX[i][j] = 2;
    randomY[i][j] = 1;
    randomZ[i][j] = 1;
  }
}
grids[3].addRotations(rotations);
grids[3].addRandomX(randomX);
grids[3].addRandomY(randomY);
//grids[3].addRandomZ(randomZ);

// grid 3
mvts[4] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
//  makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
mvts[4].makeLinePath(0,0, 120, 5,0);

boundaries[4] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = 1.1*sizeX;
gridSizeY = sizeY/15;
grids[4] = new Grid(4,offsetTileX,offsetTileY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

// Add rotation of -PI/2 and randomization on X and Y
rotations = [];
randomX = [];
randomY = [];
randomZ = [];
for (let i = 0; i < grids[4].row; i ++){
  rotations[i] = [];
  randomX[i] = [];
  randomY[i] = [];
  randomZ[i] = [];
  for (let j = 0; j < grids[4].column; j++){
    rotations[i][j] = 0;
    randomX[i][j] = 1;
    randomY[i][j] = 2;
    randomZ[i][j] = 1;
  }
}
grids[4].addRotations(rotations);
grids[4].addRandomX(randomX);
grids[4].addRandomY(randomY);
//grids[4].addRandomZ(randomZ);