let sizeX = 120*2;
let sizeY = 120*2;
let offsetX = 20;
let offsetY = 20;
mvts[0] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
mvts[0].makeLinePath(0,0, 2*120, 10,0);

boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/10;
console.log(gridSizeX);
gridSizeY = 1.1*sizeY;
grids[0] = new Grid(0,offsetX+gridSizeX+1,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

// Add rotation of -PI/2 and randomization on X and Y
rotations = [];
randomZ = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  randomZ[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    rotations[i][j] = -PI/2;
    randomZ[i][j] = 15;
  }
}
grids[0].addRotations(rotations);
grids[0].addRandomZ(randomZ);
