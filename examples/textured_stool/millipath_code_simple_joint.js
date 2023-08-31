let offsetX = 10;
let offsetY = 10;
let materialSize = 12.2;
let sizeX = 100+toolSizeMm;
let sizeY = 100+toolSizeMm;
let posX = sizeX + offsetX;
let posY = sizeY + offsetY;
let sizeJointX = sizeX/2;
let sizeJointY = materialSize - toolSizeMm/2;
let posXJoint = posX;
let posYJoint = posY + sizeJointX/2 + toolSizeMm/4;

// Joint Part
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
}