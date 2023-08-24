// ADD ROTATIONS && SCALING && MVT VISIBILITY
mvts[0] = new Movement(0,0, 4);
mvts[0].makeGuiPath(2,0, "FLAT");
boundaries[0] = new Boundary("NONE",0,0,250,130);
//constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
grids[0] = new Grid(0,10,10,"LINEAR",20,20,250,130);

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