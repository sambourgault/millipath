// 1. Facing operation
let sizeX0 = 337;
let sizeY0 = 235;
let stepoverX = 1/5*toolSizeMm;
mvts[0] = new Movement(0,0, 5);
//  makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
mvts[0].makePointPath(0,0,-0.1);
boundaries[0] = new Boundary("NONE",0,0,0,0);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
grids[0] = new Grid(0,0,0,"LINEAR",stepoverX,sizeY0,sizeX0,2*sizeY0);
grids[0].linkState = true;

// 2. Simple Pattern Generated with the Gui Function
let sizeX = 300;
let sizeY = 140;
let offsetX = 20;
let offsetY = 20;
mvts[0] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
mvts[0].makePointPath(0,0);

boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = (sizeX - 30)/16;
console.log(gridSizeX);
gridSizeY = (sizeY - 30)/7;
grids[0] = new Grid(0,offsetX+15,offsetY+15,"LINEAR",gridSizeX,gridSizeY,sizeX,sizeY);


// Add rotation of random increment of PI/4
rotations = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    rotations[i][j] = floor(random(0,8))*PI/4;
  }
}

//grids[0].addRotations(rotations);

// Add random scaling Z 
scalesZ = [];
for (let i = 0; i < grids[0].row; i ++){
  scalesZ[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    	scalesZ[i][j] = random(0,1);
  }
}

grids[0].addScalesZ(scalesZ);

// Add scaling based on position along the x axis
scales = [];
for (let i = 0; i < grids[0].row; i ++){
  scales[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    	scales[i][j] = 1-abs(grids[0].row/2 - i)/(grids[0].row/2) +0.5;
  }
}

grids[0].addScales(scales);

// Add random visibility
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

// Add reflection around the middle row // not working yet
reflections = [];
for (let i = 0; i < grids[0].row; i ++){
  reflections[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    if (i+1 >  grids[0].row/2){
    	reflections[i][j] = 0;
    } else {
    	reflections[i][j] = PI/2;
    }
  }
}

grids[0].addReflections(reflections);


/// 
// 2. Simple Pattern Generated with the Gui Function
/*let sizeX = 300;
let sizeY = 140;
let offsetX = 20;
let offsetY = 20;*/
mvts[0] = new Movement(0,0, 5);
//mvts[0].makeGuiPath(2,0,"PARABOLA");
mvts[0].makePointPath(0,0);

boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = (sizeX - 30)/40;
console.log(gridSizeX);
gridSizeY = (sizeY - 30)/20;
grids[0] = new Grid(0,offsetX+15,offsetY+15,"SIN",gridSizeX,gridSizeY,sizeX-3*gridSizeX,sizeY-4*gridSizeY,0.25);


// Add rotation of random increment of PI/4
rotations = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    rotations[i][j] = floor(random(0,8))*PI/4;
  }
}

//grids[0].addRotations(rotations);

// Add random scaling Z 
scalesZ = [];
for (let i = 0; i < grids[0].row; i ++){
  scalesZ[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    	scalesZ[i][j] = random(0,1);
  }
}

grids[0].addScalesZ(scalesZ);