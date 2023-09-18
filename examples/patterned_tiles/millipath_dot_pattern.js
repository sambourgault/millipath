let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;
mvts[0] = new Movement(0,0, 5);
//mvts[0].makePointPath(0,0);
//to remove the speed-zero notch use a circle instead
mvts[0].makeArcPath(1,360,5,0);

boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/15;
console.log(gridSizeX);
gridSizeY = sizeY/15;
grids[0] = new Grid(0,offsetX,offsetY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.25);

let offsetTileX = sizeX + 2*offsetX;
let offsetTileY = sizeY + 2*offsetY;
mvts[1] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
//mvts[1].makePointPath(0,0);
mvts[1].makeArcPath(1,360,5,0);

boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/15;
gridSizeY = sizeY/15;
grids[1] = new Grid(1,offsetTileX,offsetY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.25);
// Add random scaling Z 
scalesZ = [];
for (let i = 0; i < grids[1].row; i ++){
  scalesZ[i] = [];
  for (let j = 0; j < grids[1].column; j++){
    	scalesZ[i][j] = random(0.3,1);
  }
}

grids[1].addScalesZ(scalesZ);

mvts[2] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
//mvts[2].makePointPath(0,0);
mvts[2].makeArcPath(2,360,5,0);

boundaries[2] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/15;
gridSizeY = sizeY/15;
grids[2] = new Grid(2,offsetX,offsetTileY,"RANDOM",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.5);

// Add random scaling Z 
scalesZ = [];
for (let i = 0; i < grids[2].row; i ++){
  scalesZ[i] = [];
  for (let j = 0; j < grids[2].column; j++){
    	scalesZ[i][j] = random(0.3,1);
  }
}

grids[2].addScalesZ(scalesZ);


// grid 3
mvts[3] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
//  makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
//mvts[3].makeLinePath(0,0,40,5,0);
mvts[3].makeArcPath(10,70,5,0);

boundaries[3] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/10;
gridSizeY = sizeY/10;
grids[3] = new Grid(3,offsetTileX,offsetTileY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.25);

// Add rotation of random increment of PI/4
rotations = [];
for (let i = 0; i < grids[3].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[3].column; j++){
    //rotations[i][j] = floor(random(0,8))*PI/4;
    rotations[i][j] = random(0,8)*PI/4;
  }
}

grids[3].addRotations(rotations);
