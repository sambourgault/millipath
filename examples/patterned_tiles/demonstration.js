let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;
boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);

// Four line squares
let linePaths = [];
let x = 0;
let y = 0;
let l = 16;
let theta = 0;
let nbPoints = 5;

for (let i = 0; i < 4; i++){
    linePaths.push(new LinePath(x-l/2,y+i*4-6,l, nbPoints, theta,theta, "PARABOLA"));
}

mvts[0] = new Movement(0,0,0);
mvts[0].makePath(linePaths);

gridSizeX = sizeX/6; // /7;
gridSizeY = sizeY/6; // /7;
grids[0] = new Grid(0,offsetX,offsetY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY, 0.25);


rotations = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    if ((i+j) % 2 == 0){
        rotations[i][j] = PI/2;
    } else {
    	rotations[i][j] = 0;
    }
  }
}
grids[0].addRotations(rotations);

// %%%%%%%%% change the rotation  %%%%%%%%% //

rotations = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    rotations[i][j] = random(0,2*PI);
  }
}
grids[0].addRotations(rotations);