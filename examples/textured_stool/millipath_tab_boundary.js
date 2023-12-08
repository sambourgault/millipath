
let offsetX = 10;
let offsetY = 10;
let materialSize = 14.75;
let sizeX = 100+toolSizeMm;
let sizeY = 100+toolSizeMm;
let posX = sizeX/2 + offsetX;
let posY = sizeY/2 + offsetY;
let sizeJointX = sizeX/2 - toolSizeMm;
let sizeJointY = materialSize - toolSizeMm;
let posXJoint = posX;
let posYJoint = posY + sizeJointX/2 + toolSizeMm/2;

/*let dx = abs(-x+this.x) - this.rX;
    //console.log(-x);
    let dy = abs(y-this.y) - this.rY;
    
    let d = sqrt((max(dx, 0))^2 + max(dy, 0)^2) + min(max(dx,dy),0);
    
    if (d <= 0){
      return -1.
    } else {
      return 1.
    }*/

let tab = function tabBoundary(x,y){
    // outter square
    let cx = sizeX/2+offsetX;
    let cy = sizeY/2+offsetY;
    let rX = sizeX;
    let rY = sizeY;
      let state1 = 0;
      let dOutX = abs(-x+cx) - rX;
      let dOutY = abs(y-cy) - rY;
      let dOut = sqrt((max(dOutX, 0))^2 + max(dOutY, 0)^2) + min(max(dOutX,dOutY),0);
      
      if (dOut <= 0){
        // if movement inside rectangle, set to 1
          state1 = 1.
      } else {
          state1 =  -1.
      }

      let tabStates = [0,0,0];
      let tabPositions = [[offsetX, offsetY+sizeY/2], [offsetX+sizeX/2, offsetY], [offsetX+sizeX/2, offsetY+sizeY/2]];
      let dTabOutXTemp = 0;
      let dTabOutYTemp = 0;
      let dTabOutTemp = 0;
      

      for (let i = 0; i < tabPositions.length; i++){
        dTabOutXTemp = abs(-x+tabPositions[i][0]) - 2*toolSizeMm;
        dTabOutYTemp = abs(y-tabPositions[i][1]) - 2*toolSizeMm;
        dTabOutTemp = sqrt((max(dTabOutXTemp, 0))^2 + max(dTabOutYTemp, 0)^2) + min(max(dTabOutXTemp,dTabOutYTemp),0);

        if (dTabOutTemp <= 0){
            // if movement inside rectangle, set to -1 to create the tab
              tabStates[i] = -1;
          } else {
                tabStates[i] = 1;
          }
      }

      let tabState;
      if (tabStates[0] || tabStates[1] || tabStates[2] == -1){
        tabState = -1;
      } else {
        tabState = 1;
      }
     
      if (state1 + tabState < 0){
          // inside the region
          return -1;
      } else {
          // outside the region
          return 1;
      }
  }
  
  // Main Part
  for (let i = 0; i < 5; i++){
      mvts[i] = new Movement(0,0,1);
      //makeRectanglePath(sx,sy,nbPoints,theta,zMode,customZMode = null){
      mvts[i].makeRectanglePath(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return -(i-4);});
      
      boundaries[i] = new Boundary("RECTANGLE",0,0,250,130);
      //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
      grids[i] = new Grid(i,posX,posY,"LINEAR",1,1,1,1);
  }