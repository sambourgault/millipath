// crisscross pattern

let sizeX = 250;
let sizeY = 100;
let offsetX = 10;
let offsetY = 0;

// grid 3
mvts[0] = new Movement(0,0, 5);
//makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
mvts[0].makeLinePath(-sizeY/2,0, 200, 20,0);

//boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
//gridSizeX = sizeX/15;
//gridSizeY = 1.1*sizeY;
gridSizeX = (sizeX - 30)/36;
gridSizeX = 120/12;
gridSizeY = sizeY;
//grids[0] = new Grid(0,offsetTileX,offsetTileY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);
grids[0] = new Grid(0,offsetX-.25*sizeX,offsetY+sizeY/2,"LINEAR",gridSizeX,gridSizeY,1.5*sizeX,sizeY);

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
    rotations[i][j] = -PI/2+random(-PI/8, PI/8);
    randomX[i][j] = 2;
    randomY[i][j] = 1;
    randomZ[i][j] = 1;
  }
}
grids[0].addRotations(rotations);
grids[0].addRandomX(randomX);
grids[0].addRandomY(randomY);
//grids[3].addRandomZ(randomZ);


//
mvts[1] = new Movement(0,0, 5);
mvts[1].makeLinePath(-sizeX/2,0, 275, 30,0);

//boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);

//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX;
gridSizeY = 120/12;

grids[1] = new Grid(1,offsetX+sizeX/2,offsetY-.25*sizeY,"LINEAR",gridSizeX,gridSizeY,sizeX,1.5*sizeY);

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
    rotations[i][j] = 0+random(-PI/8, PI/8);
    randomX[i][j] = 1;
    randomY[i][j] = 2;
    randomZ[i][j] = 1;
  }
}

grids[1].addRotations(rotations);
grids[1].addRandomX(randomX);
grids[1].addRandomY(randomY);