// utility functions: return nbPoint following a specific function

/* 
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
*/

//** Custom Boundaries Helpers **//
function combineBoundaries(x,y, boundaryFunction1, boundaryFunction2){
  
}

/**
 * Function to use for creating custom circular boundary
 * @param {any} x
 * @param {any} y
 * @param {any} posX
 * @param {any} posY
 * @param {any} r
 * @param {any} outsideBoundary=true
 * @returns {any}
 */
function boundaryCircle(x, y, posX, posY, r, outsideBoundary = true){
  let d = dist(posX, posY, x, y);
  let state = 0;

  if (d < r){
    // inside
    state = -1.;
  } else if (d > r){
    // outside
    state  = 1.;
  } else if (d == r){
    // on boundary
    state = 0;
  }

  // if the boundary is reversed
  if (!outsideBoundary){
    return -state;
  } else {
    return state;
  }
}


/**
 * Function to use to create custom rectangular boundary. Adapted from Inigo Quilez.
 * @param {any} x
 * @param {any} y
 * @param {any} posX
 * @param {any} posY
 * @param {any} rX
 * @param {any} ry
 * @param {any} outsideBoundary=true
 * @returns {any}
 */
function boundaryRectangle(x,y, posX, posY, rX, rY, outsideBoundary = true){
  let dx = abs(-x-posX) - rX;
  let dy = abs(y-posY) - rY;
  let d = sqrt((max(dx, 0))^2 + max(dy, 0)^2) + min(max(dx,dy),0);
  let state;
  
  if (d < 0){
    // inside
    state = -1;
  } else if (d > 0) {
    // outside
    state =  1;
  } else if (d == 0) {
    // on boundary
    state = 0;
  }

  // if the boundary is reversed
  if (!outsideBoundary){
    return -state;
  } else {
    return state;
  }  
}

//** Cutting Tool **//
function vBitWidth(depth, angle){
  return 2*tan(angle*(PI/180)/2)*depth;
}

function vBitDepth(width, angle){
  return width/(2*tan(angle*(PI/180)/2));
}

//** Path Transformation **//
function rotatePath(paths, angle, x = 0, y = 0){
    let rotatedPaths = [];
    //console.log(paths.length);

    for (let i = 0; i < paths.length; i++){
      rotatedPaths[i] = [];
      //console.log(paths[i].length);

      for (let j = 0; j < paths[i].length; j++){
        let x0 = paths[i][j].x;
        let y0 = paths[i][j].y;
        let z0 = paths[i][j].z;
        // rotation matrix operation around (0,0)
        let xf = x0*cos(angle) - y0*sin(angle);
        let yf = x0*sin(angle) + y0*cos(angle);
        
        rotatedPaths[i][j] = new createVector(xf, yf, z0);
      }
    }
    
    return rotatedPaths;
  }
  
  function reflectPath(paths,angle){
    let reflectedPaths = [];
    for (let i = 0; i < paths.length; i++){
      reflectedPaths[i] = [];
      
      for (let j = 0; j < paths[i].length; j++){
        let x0 = paths[i][j].x;
        let y0 = paths[i][j].y;
        let z0 = paths[i][j].z;
        // rotation matrix operation around (0,0)
        let xf = x0*cos(2*angle) + y0*sin(2*angle);
        let yf = x0*sin(2*angle) - y0*cos(2*angle);
        
        reflectedPaths[i][j] = new createVector(xf, yf, z0);
      }
    }
    
    return reflectedPaths;
  }
  
  function scalePath(paths,scale){
    let scaledPaths = [];
    
    for (let i = 0; i < paths.length; i++){
      scaledPaths[i] = [];
      for (let j = 0; j < paths[i].length; j++){
        let x0 = paths[i][j].x;
        let y0 = paths[i][j].y;
        let z0 = paths[i][j].z;
        // rotation matrix operation around (0,0)
        let xf = scale*x0;
        let yf = scale*y0;
        
        scaledPaths[i][j] = new createVector(xf, yf, z0);
      }
    }
    
    return scaledPaths;
  }

  function scaleZPath(paths,scaleZ){
    let scaledZPaths = [];
    
    for (let i = 0; i < paths.length; i++){
      scaledZPaths[i] = [];
      for (let j = 0; j < paths[i].length; j++){
        let x0 = paths[i][j].x;
        let y0 = paths[i][j].y;
        let z0 = paths[i][j].z;
        // scale matrix operation around (0,0)
        let zf = scaleZ*z0;
        
        scaledZPaths[i][j] = new createVector(x0, y0, zf);
      }
    }
    
    return scaledZPaths;
  }