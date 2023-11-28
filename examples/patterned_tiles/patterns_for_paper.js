let bitAngle = 90;
let bitDepth = 4; //mm
let bitWidth = vBitWidth(bitDepth,bitAngle);
bitWidth;

//** DOTS 1 **//
{
let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;

// 1. ordered dots on linear grid
mvts[0] = new Movement(0,0,10);
// parameters: r, arcAngle, nbSides, theta, zMode = "FLAT", customZMode = null
mvts[0].makeArcPath(1,360,5,0);

boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2-1,sizeY/2-1);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/12;
gridSizeY = sizeY/12;
grids[0] = new Grid(0,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

// 2. ordered dots on sin grid
let offsetTileX = sizeX + 2*offsetX;
let offsetTileY = sizeY + 2*offsetY;
mvts[1] = new Movement(0,0, 5);
mvts[1].makeArcPath(1,360,5,0);

boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetY,sizeX/2-1,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/12;
gridSizeY = sizeY/12;
grids[1] = new Grid(1,offsetTileX,offsetY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.25);

// 3. disordered dots on random grid
mvts[2] = new Movement(0,0, 5);
mvts[2].makeArcPath(1,360,5,0);

boundaries[2] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/12;
gridSizeY = sizeY/12;
grids[2] = new Grid(2,offsetX,offsetTileY,"RANDOM",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.5);

// add random scaling Z 
scalesZ = [];
for (let i = 0; i < grids[2].row; i ++){
  scalesZ[i] = [];
  for (let j = 0; j < grids[2].column; j++){
    	scalesZ[i][j] = random(0.3,1);
  }
}

grids[2].addScalesZ(scalesZ);

// 4. perlin displacement  of grid
mvts[3] = new Movement(0,0);
mvts[3].makeArcPath(1,360,5,0);
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[3] = new Boundary("RECTANGLE",sizeX/2+offsetX+(sizeX+offsetX),sizeY/2+offsetY+(sizeY+offsetY),sizeX/2+2, sizeY/2);
gridSizeX = sizeX/12;
gridSizeY = sizeY/12;
// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[3] = new Grid(3,sizeX+2*offsetX,sizeY+2*offsetY+gridSizeY/2,"PERLIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,2,[4,10]);

/*let n,  mapp;
let translateX = [];
let translateY = [];
for (let i = 0; i < grids[3].row; i ++){
    
    translateX[i] = [];
    translateY[i] = [];
    for (let j = 0; j < grids[3].column; j++){
        n = noise(i / 10, j / 10);
        mapp = map(n, 0, 1, -2, 2);
        translateX[i][j] = 2;
        translateY[i][j] = 2;
    }
}
grids[3].addTranslateX(translateX);
grids[3].addTranslateY(translateY);*/

}

//** DOTS 2 **//
{
    let sizeX = 120;
    let sizeY = 120;
    let offsetX = 20;
    let offsetY = 20;
    
    // 1. ordered dots on linear grid with random depth
    mvts[0] = new Movement(0,0,10);
    // parameters: r, arcAngle, nbSides, theta, zMode = "FLAT", customZMode = null
    mvts[0].makeArcPath(1,360,5,0);
    
    boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2-1,sizeY/2-1);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    gridSizeX = sizeX/10;
    gridSizeY = sizeY/10;
    grids[0] = new Grid(0,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);
    
    let scaleZ= [];
    for (let i = 0; i < grids[0].row; i ++){
        scaleZ[i] = [];
        for (let j = 0; j < grids[0].column; j++){
            scaleZ[i][j] = random(0,1);
        }
    }
    grids[0].addScalesZ(scaleZ);
    
    // 2. ordered dots on linear grid with perlin depth
    let offsetTileX = sizeX + 2*offsetX;
    let offsetTileY = sizeY + 2*offsetY;
    
    mvts[1] = new Movement(0,0, 5);
    mvts[1].makeArcPath(1,360,5,0);
    
    boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetTileX,sizeY/2+offsetY,sizeX/2-1,sizeY/2);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    gridSizeX = sizeX/10;
    gridSizeY = sizeY/10;
    grids[1] = new Grid(1,offsetTileX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);
    
    let n;
    scaleZ= [];
    for (let i = 0; i < grids[1].row; i ++){
        scaleZ[i] = [];
        for (let j = 0; j < grids[1].column; j++){
            n = noise(i / 10, j / 10);
            scaleZ[i][j] = n;
        }
    }
    grids[1].addScalesZ(scaleZ);
    
    // 3. ordered dots on linear grid with circle depth
    mvts[2] = new Movement(0,0, 5);
    mvts[2].makeArcPath(1,360,5,0);
    
    boundaries[2] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetTileY,sizeX/2,sizeY/2);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    gridSizeX = sizeX/10;
    gridSizeY = sizeY/10;
    grids[2] = new Grid(2,offsetX,offsetTileY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);
    
    // add circular depth
    let d;
    scalesZ = [];
    let visibility = [];
    for (let i = 0; i < grids[2].row; i ++){
      scalesZ[i] = [];
      visibility[i] = [];
      for (let j = 0; j < grids[2].column; j++){
            d = dist(5,5,i,j);
    
            if (d<=4){
                visibility[i][j] = 1;
            } else {
                visibility[i][j] = 0;
            }
            console.log(d)
            scalesZ[i][j] = 1-map(d,0,2.5,0,1);
      }
    }
    grids[2].addMvtVisibility(visibility);
    grids[2].addScalesZ(scalesZ);


    // 4. perlin displacement  of grid
    mvts[3] = new Movement(0,0);
    mvts[3].makeArcPath(1,360,5,0);
    // parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
    boundaries[3] = new Boundary("RECTANGLE",sizeX/2+offsetX+(sizeX+offsetX),sizeY/2+offsetY+(sizeY+offsetY),sizeX/2, sizeY/2);
    gridSizeX = sizeX/20;
    gridSizeY = sizeY/20;
    // parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
    grids[3] = new Grid(3,sizeX+2*offsetX,sizeY+2*offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

    scaleZ= [];
    visibility = [];
    for (let i = 0; i < grids[3].row; i ++){
        scaleZ[i] = [];
        visibility[i] = [];
        for (let j = 0; j < grids[3].column; j++){
            n = noise(i / 5, j / 2);
            if (n < 0.5){
                scaleZ[i][j] = 1;
                visibility[i][j] = 1;
            } else{
                scaleZ[i][j] = 0;
                visibility[i][j] = 0;
            }
        }
    }
    grids[3].addScalesZ(scaleZ);
    grids[3].addMvtVisibility(visibility);
}

//** LINES 1 **//
{
let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;

// 1. long straight lines
mvts[0] = new Movement(0,0);
// parameters: x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null
mvts[0].makeLinePath(0,0, sizeX, 10,0);
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2);
gridSizeX = 1.1*sizeX;
gridSizeY = bitWidth;

// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[0] = new Grid(0,offsetX,offsetY+gridSizeY/2,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

// 2. long straight lines with random XY variations
mvts[1] = new Movement(0,0);
// parameters: x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null
mvts[1].makeLinePath(0,0, sizeX, 10,0);
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetX+(sizeX+offsetX),sizeY/2+offsetY,sizeX/2+2, sizeY/2);
gridSizeX = 1.1*sizeX;
gridSizeY = bitWidth;
// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[1] = new Grid(1,sizeX+2*offsetX,offsetY+gridSizeY/2,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

randomX = [];
randomY = [];
for (let i = 0; i < grids[1].row; i ++){
  randomX[i] = [];
  randomY[i] = [];
  for (let j = 0; j < grids[1].column; j++){
    randomX[i][j] = 2;
    randomY[i][j] = 2;
  }
}
grids[1].addRandomX(randomX);
grids[1].addRandomY(randomY);

// 3. long straight lines with depth change
mvts[2] = new Movement(0,0);
// parameters: x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null
mvts[2].makeLinePath(0,0, sizeX, 10,0);
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[2] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY+(sizeY+offsetY),sizeX/2, sizeY/2);
gridSizeX = 1.1*sizeX;
gridSizeY = bitWidth;
// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[2] = new Grid(2,offsetX,sizeY+2*offsetY+gridSizeY/2,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

randomZ = [];
for (let i = 0; i < grids[2].row; i ++){
  randomZ[i] = [];
  for (let j = 0; j < grids[2].column; j++){
    randomZ[i][j] = 3;
  }
}
grids[2].addRandomZ(randomZ);

// 4. long straight lines with random XY variations and with depth change
mvts[3] = new Movement(0,0);
// parameters: x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null
mvts[3].makeLinePath(0,0, sizeX, 10,0);
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[3] = new Boundary("RECTANGLE",sizeX/2+offsetX+(sizeX+offsetX),sizeY/2+offsetY+(sizeY+offsetY),sizeX/2+2, sizeY/2);
gridSizeX = 1.1*sizeX;
gridSizeY = bitWidth;
// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[3] = new Grid(3,sizeX+2*offsetX,sizeY+2*offsetY+gridSizeY/2,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

randomZ = [];
randomX = [];
randomY = [];
for (let i = 0; i < grids[3].row; i ++){
    randomX[i] = [];
    randomY[i] = [];
    randomZ[i] = [];
    for (let j = 0; j < grids[3].column; j++){
        randomX[i][j] = 2;
        randomY[i][j] = 2;
        randomZ[i][j] = 3;
    }
}
grids[3].addRandomX(randomX);
grids[3].addRandomY(randomY);
grids[3].addRandomZ(randomZ);

}

//** MOTIFS 1 **//
{
let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;
maxDepthCut = 3; //mm


// 1. long straight lines
mvts[0] = new Movement(0,0);
// parameters: x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null
mvts[0].makeLinePath(0,0, sizeX/10, 5,0, 0, "PARABOLA");
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2);
gridSizeX = sizeX/10;
gridSizeY = sizeY/10;

// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[0] = new Grid(0,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

let rotations = [];
let scales = [];
    for (let i = 0; i < grids[0].row; i ++){
        rotations[i] = [];
        scales[i] = [];
        for (let j = 0; j < grids[0].column; j++){
            let r = int(random(8));
            rotations[i][j] = r*PI/4;
            if (r % 2 == 0){
                scales[i][j] = 1;
            } else {
                scales[i][j] = 2/sqrt(2);
            }
        }
    }
grids[0].addRotations(rotations);
grids[0].addScales(scales);

// 2. flower with slight random rotations on sinus grid
let linePaths = [];
let x = 0;
let y = 0;
let l = 9;
let theta = 0;
let nbPoints = 5;

for (let i = 0; i < 3; i++){
    theta = i*PI/3;
    linePaths.push(new LinePath(x,y,l, nbPoints, theta, theta, "PARABOLA"));
}
mvts[1] = new Movement(0,0,0);
mvts[1].makePath(linePaths);
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetX+(sizeX+offsetX),sizeY/2+offsetY,sizeX/2, sizeY/2);
gridSizeX = sizeX/8;
gridSizeY = sizeY/8;
// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[1] = new Grid(1,sizeX+2*offsetX,offsetY+0.25*gridSizeY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY,0.25);

rotations = [];
for (let i = 0; i < grids[1].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[1].column; j++){
    rotations[i][j] = random(0, -PI/3);
  }
}
grids[1].addRotations(rotations);

// 3. straight etches with gradient in visibility
mvts[2] = new Movement(0,0);
// parameters: x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null
mvts[2].makeLinePath(0,0, 20, 5,PI/2);
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[2] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY+(sizeY+offsetY),sizeX/2, sizeY/2);
gridSizeX = sizeX/20;
gridSizeY = sizeY/8;
// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[2] = new Grid(2,offsetX,sizeY+2*offsetY,"RANDOM",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,-0.25);

rotations = [];
visibility = [];
for (let i = 0; i < grids[2].row; i ++){
  rotations[i] = [];
  visibility[i] = [];
  for (let j = 0; j < grids[2].column; j++){
    rotations[i][j] = random(-PI/8, PI/8);
    let r = random(0,j);
    if (r < 2.5){
    	visibility[i][j] = 1;
    } else {
    	visibility[i][j] = 0;
    }
  }
}
grids[2].addRotations(rotations);
grids[2].addMvtVisibility(visibility);

// 3. straight etches with gradient in visibility
mvts[2] = new Movement(0,0);
// parameters: x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null
mvts[2].makeLinePath(0,0, 20, 5,PI/2);
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[2] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY+(sizeY+offsetY),sizeX/2, sizeY/2);
gridSizeX = sizeX/20;
gridSizeY = sizeY/8;
// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[2] = new Grid(2,offsetX,sizeY+2*offsetY,"RANDOM",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,-0.25);

rotations = [];
visibility = [];
for (let i = 0; i < grids[2].row; i ++){
  rotations[i] = [];
  visibility[i] = [];
  for (let j = 0; j < grids[2].column; j++){
    rotations[i][j] = random(-PI/8, PI/8);
    let r = random(0,j);
    if (r < 2.5){
    	visibility[i][j] = 1;
    } else {
    	visibility[i][j] = 0;
    }
  }
}
grids[2].addRotations(rotations);
grids[2].addMvtVisibility(visibility);

// 4. hypertrochoid
mvts[3] = new Movement(0,0);
// parameters: R, r, d, limit, resolution, nbPoints, theta, zMode =  "FLAT", customZMode = null
mvts[3].makeHypotrochoidPath(10,2,6,21, 360/20, 1, 0);
// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[3] = new Boundary("RECTANGLE",sizeX/2+offsetX+(sizeX+offsetX),sizeY/2+offsetY+(sizeY+offsetY),sizeX/2+2, sizeY/2+2);
gridSizeX = sizeX/4;
gridSizeY = sizeY/4;
// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
grids[3] = new Grid(3,sizeX+2*offsetX,sizeY+2*offsetY+gridSizeY/2-0.25*gridSizeY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.25);

rotations = [];
for (let i = 0; i < grids[3].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[3].column; j++){
    rotations[i][j] = random(2*PI/5);
  }
}
grids[3].addRotations(rotations);

}

//** MOTIFS 2 **//
{
let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;

// 1. alterning strips
let linePaths = [];
let x = 0;
let y = 0;
let l = 16;
let theta = 0;
let nbPoints = 5;

for (let i = 0; i < 4; i++){
    linePaths.push(new LinePath(x-l/2,y+i*4-6,l, nbPoints, theta));
}

mvts[0] = new Movement(0,0);
mvts[0].makePath(linePaths);

// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);

gridSizeX = sizeX/6;
gridSizeY = sizeY/6;
grids[0] = new Grid(0,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);


// parameters: id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0
//grids[0] = new Grid(0,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

let rotations = [];
for (let i = 0; i < grids[0].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[0].column; j++){
    if ((i+j) % 2 == 0){
      //print(())
        rotations[i][j] = PI/2;
    } else {
    	rotations[i][j] = 0;
    }
  }
}
grids[0].addRotations(rotations);

// 2. alterning strips with random depth
mvts[1] = new Movement(0,0,0);
mvts[1].makePath(linePaths);

boundaries[1] = new Boundary("RECTANGLE",sizeX/2+(sizeX+offsetX),sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/6;
console.log(gridSizeX);
gridSizeY = sizeY/6;
grids[1] = new Grid(1,sizeX+2*offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

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

// 3. chevron lines
let linePaths2 = [];
x = 0;
y = 0;
l = 12;
theta = 0;
nbPoints = 5;

linePaths2.push(new LinePath(x+l/4,y,l, nbPoints, PI/6));
linePaths2.push(new LinePath(x-l/4,y,l, nbPoints, 5*PI/6));

mvts[2] = new Movement(0,0,0);
mvts[2].makePath(linePaths2);

boundaries[2] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY+(sizeY+offsetY),sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/4;
gridSizeY = sizeY/16;
grids[2] = new Grid(2,offsetX,sizeY+2*offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

rotations = [];
randomZ = [];
for (let i = 0; i < grids[2].row; i ++){
  rotations[i] = [];
  randomZ[i] = [];
  for (let j = 0; j < grids[2].column; j++){
    if (i % 2 == 0){
        rotations[i][j] = PI;
    }
    randomZ[i][j] = 2;
  }
}
grids[2].addRandomZ(randomZ);

// 4. Four line square random rotation
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

boundaries[3] = new Boundary("RECTANGLE",sizeX/2+offsetX+(sizeX+offsetX),sizeY/2+offsetY+(sizeY+offsetY), sizeX/2, sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/7;
gridSizeY = sizeY/7;
grids[3] = new Grid(3,sizeX+2*offsetX,sizeY+2*offsetY+gridSizeY/2-0.25*gridSizeY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.25);

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

}

//** TRIANGLES 1 **//
{
// 1. diamonds
let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;

let diamondWidth = vBitWidth(5,90);

mvts[0] = new Movement(0,0);
//makeDiamondForVBit(x,y,l,nbPoints, theta){
mvts[0].makeDiamondForVBit(0,0,20,2,0);

// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);

gridSizeX = sizeX/7;
gridSizeY = (sizeY-diamondWidth)/7;
grids[0] = new Grid(0,offsetX,offsetY+diamondWidth/2,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY, 0.25);

// 2. chevron
mvts[1] = new Movement(0,0,0);
mvts[1].makeChevronForVBit(0,0,16,2,0,60);

boundaries[1] = new Boundary("RECTANGLE",sizeX/2+offsetX+(sizeX+offsetX),sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/5;
gridSizeX -= 0.4*gridSizeX/5;
gridSizeY = sizeY/5;
grids[1] = new Grid(1,sizeX+2*offsetX+0.2*gridSizeX,offsetY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.25);

let rotations = [];
for (let i = 0; i < grids[1].row; i ++){
  rotations[i] = [];
  for (let j = 0; j < grids[1].column; j++){
    if (i % 2 == 0){
        rotations[i][j] = PI+PI/2;
    } else {
    	rotations[i][j] = PI/2;
    }
  }
}
grids[1].addRotations(rotations);

// 3. chevron lines
let linePaths2 = [];

//chevron
mvts[2] = new Movement(0,0,0);
mvts[2].makeDiamondForVBit(0,0,20,2,0);

// x's
for (let i = 0; i < 4; i++){
    linePaths2.push(new LinePath(0,0,8, 2, i*PI/2, i*PI/2, "LINEAR_UP"));
}

mvts[3] = new Movement(0,0,0);
mvts[3].makePath(linePaths2);

boundaries[2] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY+(sizeY+offsetY),sizeX/2,sizeY/2-2);
boundaries[3] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY+(sizeY+offsetY),sizeX/2,sizeY/2-2);

//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/4;
gridSizeY = sizeY/4;
grids[2] = new Grid(2,offsetX,sizeY+2*offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);
grids[3] = new Grid(3,offsetX+gridSizeX/2,sizeY+2*offsetY+gridSizeY/2,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);

// 4. kumiko-inspired-design
let linePaths3 = [];
let x = 0;
let offset = 5;
let y = 0;
let l = 17.8;
let theta = 0;
let nbPoints = 2;
for (let i = 0; i < 3; i++){
    theta = PI/6+i*PI/3;
    linePaths3.push(new LinePath(x+offset*cos(theta),y+offset*sin(theta),l, nbPoints, theta, theta, "PARABOLA"));
    //linePaths3.push(new LinePath(x+l/2*cos(theta)+offset*cos(theta),y+l/2*sin(theta)+offset*sin(theta),l/2, nbPoints, theta, theta, 1));
}
mvts[4] = new Movement(0,0,0);
mvts[4].makePath(linePaths3);
boundaries[4] = new Boundary("RECTANGLE",sizeX/2+offsetX+(sizeX+offsetX),sizeY/2+offsetY+(sizeY+offsetY), sizeX/2-2, sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/5;
gridSizeY = sizeY/5;
grids[4] = new Grid(4,sizeX+2*offsetX,sizeY+2*offsetY+0.25*gridSizeY,"SIN",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY,0.25);

}

//** BOOLEAN & SUPERPOSITION **//
{
//  1. circle in circle
let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;

let diamondWidth = vBitWidth(5,90);

// inside circle
mvts[0] = new Movement(0,0);
mvts[0].makeLinePath(0,0,sizeY,10,PI/2);

// parameters: mode, x, y, rX, rY = rX, checkCustomBoundary = null
boundaries[0] = new Boundary("CIRCLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/3);

gridSizeX = diamondWidth;
gridSizeY = sizeY/7;
grids[0] = new Grid(0,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,gridSizeY);

// outside border
mvts[1] = new Movement(0,0);
mvts[1].makeLinePath(0,0,sizeY,10,0);

let bb = function outsideCircleBoundary(x,y){
    let cx = sizeX/2+offsetX;
    let cy = sizeY/2+offsetY;
    let rIn = sizeX/3;
    let rOut = sizeX/2;
    
    // inner circle
    let state1 = 0;
    let dIn = dist(cx, cy, -x, y);
    if (dIn <= rIn){
        state1 = 1.;
    } else {
        state1 = -1.;
    }

    // outter square
    let state2 = 0;
    let dOutX = abs(-x+cx) - rOut;
    let dOutY = abs(y-cy) - rOut;
    let dOut = sqrt((max(dOutX, 0))^2 + max(dOutY, 0)^2) + min(max(dOutX,dOutY),0);
    
    if (dOut <= 0){
        state2 = 1.
    } else {
        state2=  -1.
    }

    if (state1+state2<0){
        // inside the region
        return -1.;
    } else {
        // outside the region
        return 1;
    }
}

boundaries[1] = new Boundary("CUSTOM",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2, sizeY/2,bb);

gridSizeX = sizeX/7;
gridSizeY = diamondWidth;
grids[1] = new Grid(1,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,gridSizeX,sizeY+gridSizeY);


}