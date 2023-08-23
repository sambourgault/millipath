// square marching
let sizeX = 100;
let sizeY = 100;
let sideOffset = 20;
boundaries[0] = new Boundary(3, sizeX/2+sideOffset, sizeY/2+sideOffset, sizeX/2, sizeY/2);
let sizeOpeningX = 30;
let sizeOpeningY = sizeY/2;
boundaries[1] = new Boundary(3, sizeX/2+sideOffset, sizeY/2+sideOffset+sizeY/4, sizeOpeningX/2, sizeOpeningY/2);
let radiusSlot1 = 5;
boundaries[2] = new Boundary(1, sizeX/2+sideOffset-sizeOpeningX/2+radiusSlot1, sizeY/2+sideOffset+sizeY/4-sizeOpeningY/2, radiusSlot1);
boundaries[3] = new Boundary(1, sizeX/2+sideOffset+sizeOpeningX/2-radiusSlot1, sizeY/2+sideOffset+sizeY/4-sizeOpeningY/2, radiusSlot1);


/// CUSTOM BOUNDARIES
mvts[0] = new Movement(0,0);

let bb = function circleBoundary(x,y){
  cx = 100;
  cy = 100;
  rx = 50;
  
  let d = dist(cx, cy, -x, y);

    if (d < rx){
      return -1.;
    } else if (d > rx){
      return 1.;
    } else if (d == rx){
      return 0;
    }
}

boundaries[0] = new Boundary(-1, 100,100,50,50, bb);
grids[0] = new Grid(0, 0, 0, 0, 20, 20, 400, 400);


// custom Z modemvts[0] = new Movement(0,0);

let zz = function randomZ(){
  return random(-1,0);
}

mvts[0].makeLinePath(0,0,30,5,0,0,-1,zz)

// TEST TILES WITH GUI

// with rotation
mvts[0] = new Movement(0,0);
//nbPoints, theta, zMode = 0
mvts[0].makeGuiPath(1,0,3);

boundaries[0] = new Boundary(3, 120, 60, 120, 60);

grids[0] = new Grid(0, 0, 0, 0, 20, 20, 240, 120);

rotations = [];

for (let i = 0; i < grids[0].row; i++){
  rotations[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    if ((i+j) % 2 == 0){
    rotations[i][j] = 0;
    } else {
    rotations[i][j] = PI/2;
    }
  }
}

grids[0].addRotations(rotations);


// ADD ROTATIONS && SCALING && MVT VISIBILITY
mvts[0] = new Movement(0,0);
mvts[0].makeGuiPath(2,0, "FLAT");
boundaries[0] = new Boundary(0,0,0,250,130);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
grids[0] = new Grid(0,10,10,0,20,20,250,130);

rotations = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    if ((i+j) % 2 == 0){
    	rotations[i][j] = 0;
    } else {
    	rotations[i][j] = PI/2;
    }
  }
}

scales = [];
for (let i = 0; i < grids[0].row; i ++){
  scales[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    	scales[i][j] = 1-abs(grids[0].row/2 - i)/(grids[0].row/2) +0.5;
  }
}

vis = [];
for (let i = 0; i < grids[0].row; i ++){
  vis[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    let r = random(1.);
    if (r < 0.2){
    	vis[i][j] = 0;
    } else {
    	vis[i][j] = 1;
    }
  }
}

grids[0].addMvtVisibility(vis);
grids[0].addRotations(rotations);
grids[0].addScales(scales);