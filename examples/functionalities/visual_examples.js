
mvts[0] = new Movement(0,0);
mvts[0].makeLinePath(0, 0, 20, 5, 0, 0, "PARABOLA");

boundaries[0] = new Boundary("CIRCLE", 500/2, 400/2, 100);

let gridSize = 20;
grids[0] = new Grid(0, 0 ,0, "SIN", gridSize, gridSize, 500+gridSize, 400+gridSize, 0.25);

//rotations = 
