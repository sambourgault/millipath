let sizeX = 300;
let sizeY = 140;
let offsetX = 20;
let offsetY = 20;
mvts[0] = new Movement(0,0, 5);
//  makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
mvts[0].makeLinePath(0,0, 110, 10,0);

boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = (sizeX - 30)/36;
console.log(gridSizeX);
gridSizeY = sizeY;
grids[0] = new Grid(0,offsetX+15,offsetY+15,"LINEAR",gridSizeX,gridSizeY,sizeX-20,sizeY);

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
    randomX[i][j] = 1;
    randomY[i][j] = 3;
  }
}

grids[0].addRotations(rotations);
grids[0].addRandomX(randomX);
grids[0].addRandomY(randomY);
