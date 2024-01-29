//side cut
{
    let borderSize = 20 + 2*6.35; // to take into accunt the flat pass
    let sizeX = 300+borderSize;
    let sizeY = 2*300/3+borderSize;
    let posX = sizeX/2;
    let posY = sizeY/2

    mvts[0] = new Movement(0,0,1);
    mvts[0].makeRectanglePath(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return 0;}, true);
    boundaries[0] = new Boundary("NONE",0,0,250,130);
    grids[0] = new Grid(0,posX,posY,"LINEAR",1,1,1,1);
    
}


// flat pass
{
    let borderSize = 20 + 2*6.35;
    let offset = borderSize/2;
    let sizeX = 300;
    let sizeY = 2*sizeX/3;
    let stepoverX = 1/2*6.35;//.5 tool?
    mvts[0] = new Movement(0,0);
    //  makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
    mvts[0].makePointPath(0,0);
    boundaries[0] = new Boundary("NONE",0,0,0,0);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    grids[0] = new Grid(0,offset,offset,"LINEAR",stepoverX,sizeY,sizeX+2*stepoverX,2*sizeY);
    grids[0].linkState = true;

}

// test distances
{
    let borderSize = 20 + 2*6.35; // to take into accunt the flat pass
    let sizeX = 330+borderSize;
    let sizeY = 2*330/3+borderSize;
    let posX = sizeX/2;
    let posY = sizeY/2

    mvts[0] = new Movement(0,0,1);
    mvts[0].makeRectanglePath(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return 0;}, true);
    boundaries[0] = new Boundary("NONE",0,0,0,0);
    grids[0] = new Grid(0,posX,posY,"LINEAR",1,1,1,1);

    let offset = borderSize/2;
    let sizeX2 = 330;
    let sizeY2 = 2*sizeX2/3;
    let stepoverX = 1/2*6.35;//.5 tool?
    mvts[1] = new Movement(0,0, 1);
    //  makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
    mvts[1].makePointPath(0,0);
    boundaries[1] = new Boundary("NONE",0,0,0,0);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    grids[1] = new Grid(1,offset,offset,"LINEAR",stepoverX,sizeY2,sizeX2+2*stepoverX,2*sizeY2);
    grids[1].linkState = true;


}

// initial version
{
    let x = -18/4;
    let y = 0;
    let l = 18/2;
    let theta = 0;
    let nbPoints = 5;
    
    let linePaths = [];
    linePaths.push(new LinePath(x,y,l,1,0,0,'FLAT'));
    
    let maxI = 1;
    for (let i = 0; i < maxI; i++){
        mvts[i] = new Movement(0,0,0);
        mvts[i].makePath(linePaths);
    }
    
    let sizeOffset = 15;
    let sizeX = 325-2*sizeOffset; // 450 before
    let sizeY = 2*sizeX/3;
    let offsetX = sizeOffset;
    let offsetY = sizeOffset;
    
    for (let i = 0; i < maxI; i++){
        boundaries[i] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
    }
    
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    gridSizeX = sizeX/15/2;
    gridSizeY = sizeX/15/2;
    
    for (let i = 0; i < maxI; i++){
        grids[i] = new Grid(i,offsetX+gridSizeX+i*gridSizeX/2,offsetY+gridSizeY+i*gridSizeY/2,"LINEAR",gridSizeX,gridSizeY,sizeX-(i+1)*gridSizeX,sizeY-(i+1)*gridSizeY);
    }
    
    //// optional
    let rotations = [];
    let scales = [];
    let translatesX = [];
    let translatesY = [];
    let visibility = [];
    for (let n = 0; n < maxI; n++){
        rotations[n] = [];
        scales[n] = [];
        translatesX[n] = [];
        translatesY[n] = [];
        visibility[n] = [];
        for (let i = 0; i < grids[n].row; i ++){
            rotations[n][i] = [];
            scales[n][i] = [];
            translatesX[n][i] = [];
            translatesY[n][i] = [];
            visibility[n][i] = [];
            for (let j = 0; j < grids[n].column; j++){
                let r = int(random(8));
                rotations[n][i][j] = r*PI/4;
              
                if (r % 2 == 0){
                    scales[n][i][j] = 1;
                } else {
                    scales[n][i][j] = 2/sqrt(2);
                }
    
    
                if (r == 2){
                    translatesX[n][i][j] = l/2;
                } else if (r == 6){
                    translatesX[n][i][j] = -l/2;
                } else {
                    translatesX[n][i][j] = 0;
                }
             
    
                if (r == 0){
                    translatesY[n][i][j] = -l/2;
                } else if (r == 4){
                    translatesY[n][i][j] = l/2;
                } else {
                    translatesY[n][i][j] = 0;
                }
    
                let v = int(abs(random((i))));
                if (v > 5){
                    visibility[n][i][j] = 0;
                } else {
                    visibility[n][i][j] = 1;
                }
            }
        }  
        grids[n].addRotations(rotations[n]);
        grids[n].addScales(scales[n]);
        grids[n].addTranslateX(translatesX[n]);
        grids[n].addTranslateY(translatesY[n]);
        grids[n].addVisibility(visibility[n]);
    }
}

// facebook one
{
let ll = 15
let x = 0;
let y = 0;
let l = ll;
let theta = 0;
let nbPoints = 5;

let linePaths = [];
linePaths.push(new LinePath(x,y,l,1,0,0,'FLAT'));

let maxI = 1;
for (let i = 0; i < maxI; i++){
    mvts[i] = new Movement(0,0,0);
    mvts[i].makePath(linePaths);
}

let sizeOffset = 15;
let sizeX = 450-2*sizeOffset;
let sizeY = 2*sizeX/3;
let offsetX = sizeOffset;
let offsetY = sizeOffset;

for (let i = 0; i < maxI; i++){
	boundaries[i] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
}

//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = ll//sizeX/15/2;
gridSizeY = ll//sizeX/15/2;

for (let i = 0; i < maxI; i++){
	grids[i] = new Grid(i,offsetX+gridSizeX+i*gridSizeX/2,offsetY+gridSizeY+i*gridSizeY/2,"LINEAR",gridSizeX,gridSizeY,sizeX-(i+1)*gridSizeX,sizeY-(i+1)*gridSizeY);
}

//// optional
let rotations = [];
let scales = [];
let translatesX = [];
let translatesY = [];
let visibility = [];
for (let n = 0; n < maxI; n++){
    rotations[n] = [];
    scales[n] = [];
    translatesX[n] = [];
    translatesY[n] = [];
    visibility[n] = [];
    for (let i = 0; i < grids[n].row; i ++){
        rotations[n][i] = [];
        scales[n][i] = [];
        translatesX[n][i] = [];
        translatesY[n][i] = [];
        visibility[n][i] = [];
        for (let j = 0; j < grids[n].column; j++){
            //let r = int(random(8));
          let r = int(random(2));
            rotations[n][i][j] = (2*r+1)*PI/4;
            if (r % 2 == 0){
                scales[n][i][j] = 2/sqrt(2);
            } else {
                scales[n][i][j] = 2/sqrt(2);
            }
          
          if (r == 1){
            translatesX[n][i][j] = l;
            } else {
            translatesX[n][i][j] = 0;
          }


            /*if (r == 2){
                translatesX[n][i][j] = -l/2;
            } else if (r == 6){
                translatesX[n][i][j] = l/2;
            } else {
                translatesX[n][i][j] = 0;
            }*/

            if (r == 0){
                translatesY[n][i][j] = -l/2;
            } else if (r == 4){
                translatesY[n][i][j] = l/2;
            } else {
                translatesY[n][i][j] = 0;
            }

            let v = int(abs(random((i))));
            if (v > 5){
                visibility[n][i][j] = 0;
            } else {
                visibility[n][i][j] = 1;
            }
        }
    }

    grids[n].addRotations(rotations[n]);
    grids[n].addScales(scales[n]);
    grids[n].addTranslateX(translatesX[n]);
    //grids[n].addTranslateY(translatesY[n]);
    grids[n].addVisibility(visibility[n]);
}

}


// rune like
{
let borderSize = 20 + 2*6.35; // to take into accunt the flat pass
let offset = borderSize/2;
let ll = 12
let x = 0;
let y = 0;
let l = ll;
let theta = 0;
let nbPoints = 5;

let linePaths = [];
linePaths.push(new LinePath(x,y,l,1,0,0,'FLAT'));

mvts[0] = new Movement(0,0,0);
mvts[0].makePath(linePaths);

let sizeOffset = 24;
let realSizeX = 300;
let realSizeY = 2*realSizeX/3;
let sizeX = 300-2*sizeOffset; // 450 before
let sizeY = 2*sizeX/3;
let offsetX = sizeOffset+offset;
let offsetY = 22+offset;

boundaries[0] = new Boundary("RECTANGLE",realSizeX/2+offset,realSizeY/2+offset,realSizeX/2,realSizeY/2);


//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = ll//sizeX/15/2;
gridSizeY = ll//sizeX/15/2;

grids[0] = new Grid(0,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY);


//// optional
let rotations = [];
let scales = [];
let translatesX = [];
let translatesY = [];
let visibility = [];
for (let n = 0; n < 1; n++){
    rotations[n] = [];
    scales[n] = [];
    translatesX[n] = [];
    translatesY[n] = [];
    visibility[n] = [];
    for (let i = 0; i < grids[n].row; i ++){
        rotations[n][i] = [];
        scales[n][i] = [];
        translatesX[n][i] = [];
        translatesY[n][i] = [];
        visibility[n][i] = [];
        for (let j = 0; j < grids[n].column; j++){
            let r = int(random(8));
            rotations[n][i][j] = r*PI/4;
            if (r % 2 == 0){
                scales[n][i][j] = 1;
            } else {
                scales[n][i][j] = 2/sqrt(2);
            }
          
        

            if (r == 2){
                translatesX[n][i][j] = -l/2;
            } else if (r == 6){
                translatesX[n][i][j] = l/2;
            } else {
                translatesX[n][i][j] = 0;
            }

            if (r == 0){
                translatesY[n][i][j] = -l/2;
            } else if (r == 4){
                translatesY[n][i][j] = l/2;
            } else {
                translatesY[n][i][j] = 0;
            }

            let v = int(abs(random((i))));
            if (v > 3.5){
                visibility[n][i][j] = 0;
            } else {
                visibility[n][i][j] = 1;
            }
        }
    }

    grids[n].addRotations(rotations[n]);
    grids[n].addScales(scales[n]);
    //grids[n].addTranslateX(translatesX[n]);
    //grids[n].addTranslateY(translatesY[n]);
    grids[n].addVisibility(visibility[n]);
}

}