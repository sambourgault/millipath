// initial kumiko-style design
let linePaths = [];
let x = 0;
let y = 0;
let l = 5;
let theta = 0;
let nbPoints = 5;
for (let i = 0; i < 3; i++){
theta = i*PI/3;
linePaths.push(new LinePath(x,y,l/2, nbPoints, theta, theta, "PARABOLA"));
linePaths.push(new LinePath(x+l/2*cos(theta),y+l/2*sin(theta),l/2, nbPoints, theta, theta, "PARABOLA"));

}
mvts[0] = new Movement(0,0,0);
mvts[0].makePath(linePaths);

let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;
boundaries[0] = new Boundary("RECTANGLE",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2,sizeY/2);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
gridSizeX = sizeX/10;
gridSizeY = sizeY/10;
grids[0] = new Grid(0,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,sizeX+gridSizeX,sizeY+gridSizeY);