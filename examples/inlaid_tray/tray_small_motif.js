let x = 0;
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
let sizeX = 450-2*sizeOffset;
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

            let v = int(abs(random((i-grids[n].column/2))));
            if (v > 5){
                visibility[n][i][j] = 0;
            } else {
                visibility[n][i][j] = 1;
            }
        }
    }

    grids[n].addRotations(rotations[n]);
    //grids[n].addScales(scales[n]);
    //grids[n].addRandomX(translatesX[n]);
    //grids[n].addRandomX(translatesY[n]);
    grids[n].addVisibility(visibility[n]);
}
