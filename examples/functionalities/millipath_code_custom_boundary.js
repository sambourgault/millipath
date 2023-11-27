/// custom boundaries
{
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
}

{
  //  1. circle in circle
let sizeX = 120;
let sizeY = 120;
let offsetX = 20;
let offsetY = 20;

let diamondWidth = vBitWidth(5,90);

// outside border
mvts[0] = new Movement(0,0);
mvts[0].makeLinePath(0,0,sizeY,10,0);

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

boundaries[0] = new Boundary("CUSTOM",sizeX/2+offsetX,sizeY/2+offsetY,sizeX/2, sizeY/2,bb);

gridSizeX = sizeX/7;
gridSizeY = diamondWidth;
grids[0] = new Grid(0,offsetX,offsetY,"LINEAR",gridSizeX,gridSizeY,gridSizeX,sizeY+gridSizeY);

}