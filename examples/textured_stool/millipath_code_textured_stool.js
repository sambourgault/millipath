// CREATING A CUSTOM BOUNDARY FOR A JOINT
let sizeX = 100;
let sizeY = 100;
let sideOffset = 20;
boundaries[0] = new Boundary("RECTANGLE", sizeX/2+sideOffset, sizeY/2+sideOffset, sizeX/2, sizeY/2);
let sizeOpeningX = 30;
let sizeOpeningY = sizeY/2;
boundaries[1] = new Boundary("RECTANGLE", sizeX/2+sideOffset, sizeY/2+sideOffset+sizeY/4, sizeOpeningX/2, sizeOpeningY/2);
boundaries[1].reverseBoundary(true);
let radiusSlot1 = 5;
boundaries[2] = new Boundary("CIRCLE", sizeX/2+sideOffset-sizeOpeningX/2+radiusSlot1, sizeY/2+sideOffset+sizeY/4-sizeOpeningY/2, radiusSlot1);
boundaries[3] = new Boundary("CIRCLE", sizeX/2+sideOffset+sizeOpeningX/2-radiusSlot1, sizeY/2+sideOffset+sizeY/4-sizeOpeningY/2, radiusSlot1);
boundaries[2].reverseBoundary(true);
boundaries[3].reverseBoundary(true);


{
    let offsetX = 0;
    let offsetY = 0;
    let materialSize = 18.15;
    let sizeX = 457.2+toolSizeMm;
    let sizeY = 457.2+toolSizeMm;
    let posX = sizeX/2 + offsetX;
    let posY = sizeY/2 + offsetY;
    
    // stool side
    mvts[0] = new Movement(0,0,1);
    mvts[0].makeRectanglePath(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return 0;}, true);
    boundaries[0] = new Boundary("NONE",0,0,250,130);
    grids[0] = new Grid(0,posX,posY,"LINEAR",1,1,1,1);

    // joints
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
    mvts[1] = new Movement(0,0,1);
    mvts[1].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return 0}, true);
    boundaries[1] = new Boundary("NONE",0,0,250,130);
    grids[1] = new Grid(1,posXJoint,posYJoint,"LINEAR",1,1,1,1);
    grids[1].addRotations(rotations);
    
}

{
    let offsetX = 0;
let offsetY = 0;
let materialSize = 18.15;
let sizeX = 457.2+toolSizeMm;
let sizeY = 457.2+toolSizeMm;
let posX = sizeX/2 + offsetX;
let posY = sizeY/2 + offsetY;

// stool side
for (let i = 0; i < 4; i++){
    mvts[i] = new Movement(0,0,1);
    //makeRectanglePath(sx,sy,nbPoints,theta,zMode,customZMode = null){
    mvts[i].makeRectanglePath(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return -(i+1);});

    boundaries[i] = new Boundary("NONE",0,0,250,130);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    grids[i] = new Grid(i,posX,posY,"LINEAR",1,1,1,1);
}

// tab level
mvts[4] = new Movement(0,0,1);
mvts[4].makeRectanglePathWithTab(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return -(4+1);})
boundaries[4] = new Boundary("NONE",0,0,250,130);
grids[4] = new Grid(4,posX,posY,"LINEAR",1,1,1,1);

// joints
for (let i = 0; i < 4; i++){
    mvts[i] = new Movement(0,0,1);
    //makeDogBonePath(rx,ry,nbPoints,theta,boneMode,zMode,customZMode = null){
    mvts[i].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return -(i+1);});

    boundaries[i] = new Boundary("NONE",0,0,250,130);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    grids[i] = new Grid(i,posXJoint,posYJoint,"LINEAR",1,1,1,1);
    grids[i].addRotations(rotations);
}
}