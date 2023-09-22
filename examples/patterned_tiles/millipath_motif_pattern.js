// Flower motif
let linePaths = [];
let x = 0;
let y = 0;
let l = 7;
let theta = 0;
let nbPoints = 5;

for (let i = 0; i < 3; i++){
    theta = i*PI/3;
    linePaths.push(new LinePath(x,y,l, nbPoints, theta, theta, "PARABOLA"));
    //linePaths.push(new LinePath(x+l/2*cos(theta),y+l/2*sin(theta),l/2, nbPoints, theta, theta, 1));
}

mvts[0] = new Movement(0,0,0);
mvts[0].makePath(linePaths);

let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;
boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/8;
console.log(gridSizeX);
gridSizeY = sizeY/8;
grids[0] = new Grid(0,offsetX,offsetY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY-1, 0.25);

rotations = [];
//randomX = [];
//randomY = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  //randomX[i] = [];
  //randomY[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    rotations[i][j] = random(0, -PI/3);
    //randomX[i][j] = 2;
    //randomY[i][j] = 1;
  }
}
grids[0].addRotations(rotations);
//grids[0].addRandomX(randomX);
//grids[0].addRandomY(randomY);

// Four line squares
linePaths = [];
x = 0;
y = 0;
l = 16;
theta = 0;
nbPoints = 5;

for (let i = 0; i < 4; i++){
    linePaths.push(new LinePath(x-l/2,y+i*4-6,l, nbPoints, theta));
}

mvts[1] = new Movement(0,0,0);
mvts[1].makePath(linePaths);

let offsetTileX = sizeX + 2*offsetX;
let offsetTileY = sizeY + 2*offsetY;

boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/6;
console.log(gridSizeX);
gridSizeY = sizeY/6;
grids[1] = new Grid(1,offsetTileX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

rotations = [];
randomZ = [];
for (let i = 0; i < grids[1].row; i ++){
  rotations[i] = [];
  randomZ[i] = [];
  for (let j = 0; j < grids[1].column; j++){
    if ((i+j) % 2 == 0){
      //print(())
        rotations[i][j] = PI/2;
    } else {
    	rotations[i][j] = 0;
    }
    randomZ[i][j] = 2;
  }
}
grids[1].addRotations(rotations);
grids[1].addRandomZ(randomZ);

// Chevron line
let linePaths2 = [];
x = 0;
y = 0;
l = 15;
theta = 0;
nbPoints = 5;

//for (let i = 0; i < 1; i++){
    linePaths2.push(new LinePath(x+l/3,y,l, nbPoints, PI/6));
    linePaths2.push(new LinePath(x-l/3,y,l, nbPoints, 5*PI/6));

//}

mvts[2] = new Movement(0,0,0);
mvts[2].makePath(linePaths2);

boundaries[2] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/3;
gridSizeY = sizeY/16;
grids[2] = new Grid(2,offsetX,offsetTileY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

rotations = [];
randomZ = [];
for (let i = 0; i < grids[2].row; i ++){
  rotations[i] = [];
  randomZ[i] = [];
  for (let j = 0; j < grids[2].column; j++){
    if (i % 2 == 0){
      //print(())
        rotations[i][j] = PI/6;
    } else {
    	rotations[i][j] = -PI/6;
    }
    randomZ[i][j] = 2;
  }
}
//grids[2].addRotations(rotations);
grids[2].addRandomZ(randomZ);

// Four line square random rotation
linePaths = [];
x = 0;
y = 0;
l = 16;
theta = 0;
nbPoints = 5;

for (let i = 0; i < 4; i++){
    linePaths.push(new LinePath(x-l/2,y+i*4-6,l, nbPoints, theta));
}

mvts[3] = new Movement(0,0,0);
mvts[3].makePath(linePaths);

boundaries[3] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/7;
gridSizeY = sizeY/7;
grids[3] = new Grid(3,offsetTileX,offsetTileY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.25);

rotations = [];
randomZ = [];
for (let i = 0; i < grids[3].row; i ++){
  rotations[i] = [];
  randomZ[i] = [];
  for (let j = 0; j < grids[3].column; j++){
    rotations[i][j] = random(0,2*PI);
    randomZ[i][j] = 2;
  }
}
grids[3].addRotations(rotations);
grids[3].addRandomZ(randomZ);