/// custom boundaries
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