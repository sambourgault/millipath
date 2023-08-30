let offsetX = 10;
let offsetY = 10;
let sizeX = 50;
let sizeY = 50;
let posX = sizeX + offsetX;
let posY = sizeY + offsetY;
let posXJoint = posX;
let posYJoint = posY + sizeY/2 + toolSizeMm/2;
let posXOpening = offsetX + sizeX -toolSizeMm/2 - sizeX/4 + toolSizeMm/2;
let posYOpening = posYJoint - sizeY/2 - toolSizeMm/2;
let materialSize = 19.05;
// Tool Relief Part
/*for (let i = 0; i < 4; i++){
mvts[i] = new Movement(0,0,1);
  mvts[i].makePointPath(0,0,-(i+1));
//makePolygonPath(r, nbSides, nbPoints, theta, zMode = "FLAT", customZMode = null){
//mvts[i].makePolygonPath(toolSizeMm*1.5, 8, 1, 0, "CUSTOM", function (j){return -(i+1);});

boundaries[i] = new Boundary("NONE",0,0,250,130);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
grids[i] = new Grid(i,posXOpening,posYOpening,"LINEAR",sizeX/2,1,sizeX+toolSizeMm,1);
}*/

rotations = [];

for (let i = 0; i < grids[0].row; i++){
  rotations[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    rotations[i][j] = PI/2;
  }
}


// Opening Part
for (let i = 0; i < 3; i++){
mvts[i] = new Movement(0,0,1);
//   makeRectanglePath(rx,ry,nbPoints,theta,zMode,customZMode = null){
//mvts[i].makeRectanglePath(sizeX/4 + toolSizeMm/2, sizeY/2 + toolSizeMm/2, 1, 0, "CUSTOM", function (j){return -(i-3);});
//makeDogBonePath(rx,ry,nbPoints,theta,boneMode,zMode,customZMode = null){
    mvts[i].makeDogBonePath(sizeX/2,materialSize - toolSizeMm/2,1,0,"ONE_SIDE", "CUSTOM", function (j){return -(i+1);});

boundaries[i] = new Boundary("NONE",0,0,250,130);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
grids[i] = new Grid(i,posXJoint,posYJoint,"LINEAR",1,1,1,1);
grids[i].addRotations(rotations);

}





// Main Part
for (let i = 3; i < 6; i++){
mvts[i] = new Movement(0,0,1);
//   makeRectanglePath(rx,ry,nbPoints,theta,zMode,customZMode = null){
mvts[i].makeRectanglePath(sizeX + toolSizeMm/2, sizeY + toolSizeMm/2, 1, 0, "CUSTOM", function (j){return -(i-2);});

boundaries[i] = new Boundary("NONE",0,0,250,130);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
grids[i] = new Grid(i,posX,posY,"LINEAR",1,1,1,1);
}