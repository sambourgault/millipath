/*let offsetX = 10;
let offsetY = 10;
let materialSize = 12.2;
let sizeX = 100+toolSizeMm;
let sizeY = 100+toolSizeMm;
let posX = sizeX/2 + offsetX;
let posY = sizeY/2 + offsetY;
let sizeJointX = sizeX/2;
let sizeJointY = materialSize - toolSizeMm/2;
let posXJoint = posX;
let posYJoint = posY + sizeJointX/2 + toolSizeMm/4;

// 1. Pattern
mvts[0] = new Movement(0,0,10);
mvts[0].makeGuiPath(3, 0, "PARABOLA");

boundaries[0] = new Boundary("NONE",0,0,250,130);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
let gridSize = sizeX - 20;
let gridSpaceSize = (gridSize)/5;
grids[0] = new Grid(0,posX - sizeX/2+10,posY - sizeY/2+10,"LINEAR",gridSpaceSize,gridSpaceSize,gridSpaceSize*6,gridSpaceSize*6);

// Add rotation of random increment of PI/4
let rotations = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    let d = atan((j-(grids[0].column-1)/2)/(i-(grids[0].row-1)/2));
    //console.log(d)
    if (i < 3){
    	rotations[i][j] = -d;
    } else {
    	rotations[i][j] = PI - d;
    }
  }
}
grids[0].addRotations(rotations);

// 2. Joint Part
rotations = [];
for (let i = 0; i < 1; i++){
  rotations[i] = [];
  for (let j = 0; j < 1; j++){
    rotations[i][j] = PI/2;
  }
}

for (let i = 0; i < 4; i++){
    mvts[i] = new Movement(0,0,1);
    //makeDogBonePath(rx,ry,nbPoints,theta,boneMode,zMode,customZMode = null){
    mvts[i].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return -(i+1);});

    boundaries[i] = new Boundary("NONE",0,0,250,130);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    grids[i] = new Grid(i,posXJoint,posYJoint,"LINEAR",1,1,1,1);
    grids[i].addRotations(rotations);
}


// Main Part
for (let i = 4; i < 8; i++){
    mvts[i] = new Movement(0,0,1);
    //makeRectanglePath(rx,ry,nbPoints,theta,zMode,customZMode = null){
    mvts[i].makeRectanglePath(sizeX + toolSizeMm/2, sizeY + toolSizeMm/2, 1, 0, "CUSTOM", function (j){return -(i-3);});

    boundaries[i] = new Boundary("NONE",0,0,250,130);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    grids[i] = new Grid(i,posX,posY,"LINEAR",1,1,1,1);
}*/


//// V2
{
// 1. Pattern
let offsetX = 10;
let offsetY = 10;
let materialSize = 14.75;
let sizeX = 100+toolSizeMm;
let sizeY = 100+toolSizeMm;
let posX = sizeX/2 + offsetX;
let posY = sizeY/2 + offsetY;
let sizeJointX = sizeX/2 - toolSizeMm;
let sizeJointY = materialSize - toolSizeMm;
let posXJoint = posX;
let posYJoint = posY + sizeJointX/2 + toolSizeMm/2;

mvts[0] = new Movement(0,0,10);
//mvts[0].makeGuiPath(3, 0, "PARABOLA");
mvts[0].makeLinePath(0,0,10,5,0,0,"PARABOLA");

let excludeJointBoundary = function(x,y){
  let pX = posX;
  let pY = posY+sizeY/4;
  let rX = sizeJointY/2;
  let rY = sizeX/4;
  let state = boundaryRectangle(x,y,pX,pY,rX,rY,false);
  return state;
}

//boundaries[0] = new Boundary("NONE",0,0,250,130);
boundaries[0] = new Boundary("CUSTOM",0,0,0,0, excludeJointBoundary);
boundaries[1] = new Boundary("RECTANGLE",posX,posY+sizeY/4,sizeJointY/2,sizeX/4);


//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
let gridSize = sizeX - 20;
let gridSpaceSize = (gridSize)/6;
grids[0] = new Grid(0,posX - sizeX/2+10,posY - sizeY/2+10,"LINEAR",gridSpaceSize,gridSpaceSize,gridSpaceSize*7,gridSpaceSize*7);

// Add rotation of random increment of PI/4
let rotations = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    let d = atan((j-(grids[0].column-1)/2)/(i-(grids[0].row-1)/2));
    //console.log(d)
    if (i < 3){
    	rotations[i][j] = -d;
    } else {
    	rotations[i][j] = PI - d;
    }
  }
}
grids[0].addRotations(rotations);
}

// 2. Joint Part
{
let offsetX = 10;
let offsetY = 10;
let materialSize = 14.75;
let sizeX = 100+toolSizeMm;
let sizeY = 100+toolSizeMm;
let posX = sizeX/2 + offsetX;
let posY = sizeY/2 + offsetY;
let sizeJointX = sizeX/2 - toolSizeMm;
let sizeJointY = materialSize - toolSizeMm;
let posXJoint = posX;
let posYJoint = posY + sizeJointX/2 + toolSizeMm/2;

rotations = [];
for (let i = 0; i < 1; i++){
  rotations[i] = [];
  for (let j = 0; j < 1; j++){
    rotations[i][j] = PI/2;
  }
}

for (let i = 0; i < 4; i++){
    mvts[i] = new Movement(0,0,1);
    //makeDogBonePath(rx,ry,nbPoints,theta,boneMode,zMode,customZMode = null){
    mvts[i].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return -(i+1);});

    boundaries[i] = new Boundary("NONE",0,0,250,130);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    grids[i] = new Grid(i,posXJoint,posYJoint,"LINEAR",1,1,1,1);
    grids[i].addRotations(rotations);
}

//tab level
mvts[4] = new Movement(0,0,1);
//makeDogBonePath(rx,ry,nbPoints,theta,boneMode,zMode,customZMode = null){
mvts[4].makeDogBonePathWithTab(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return -(4+1);});

boundaries[4] = new Boundary("NONE",0,0,250,130);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
grids[4] = new Grid(4,posXJoint,posYJoint,"LINEAR",1,1,1,1);
grids[4].addRotations(rotations);


// Main Part
for (let i = 5; i < 9; i++){
    mvts[i] = new Movement(0,0,1);
    //makeRectanglePath(sx,sy,nbPoints,theta,zMode,customZMode = null){
    mvts[i].makeRectanglePath(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return -(i-4);});

    boundaries[i] = new Boundary("NONE",0,0,250,130);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    grids[i] = new Grid(i,posX,posY,"LINEAR",1,1,1,1);
}

// tab level
mvts[9] = new Movement(0,0,1);
mvts[9].makeRectanglePathWithTab(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return -(9-4);})
boundaries[9] = new Boundary("NONE",0,0,250,130);
grids[9] = new Grid(9,posX,posY,"LINEAR",1,1,1,1);
}
