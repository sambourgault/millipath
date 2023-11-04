class Movement{
  constructor(x, y, scale = 1.){
    this.mode = "FLAT";
    this.visible = true;
    this.staticColor = [random(255), random(255), random(255)];
    this.sizeX = 300;
    this.sizeY = 200;
    this.x = x ;
    this.y = y ;
    this.offsetX = 0;
    this.offsetY = 0;
    this.globalRotOffset = 0;
    this.reflectX = 1;
    this.reflectY = 1;
    this.globalRefX = 1.;
    this.globalRefY = 1.;
    this.scale = scale;
    
    this.paths = [];
    this.linePaths = [];
  
    //this.customZmode = customZmode;
    
    // by default the movement path is a point at z = -1 (max depth);
    //this.makePointPath(0,0);
  }
  
  // Create your custon linePaths composition and add it to the movement
  makePath(linePaths){
    this.paths = [];
    
    for (let i = 0; i < linePaths.length; i++){
      this.paths.push(linePaths[i].path);
    }
  }
  
  /*makePath1(spacingX = 1, spacingY = 1, pointIndex = 0){
    // maybe clear path
    //this.path = [];
    this.paths = [];
    //this.globalRotOffset = globalRotOffset;
    
    switch(this.mode) {
      case 0:
      // one point 
      this.point(0,0);
      break;
      case 1:
      // line
      this.line(0,0,25*this.scale, 0, 5);
      break;
      case 2:
      // polygon
      this.polygon(50*this.scale, 3, 0);
      break;
      case 3:
      this.hypertrochoid(50*this.scale,10*this.scale,20*this.scale,100, 10);
      break;
      case 4:
      this.hypotrochoid(10*this.scale,2*this.scale,6*this.scale,21, 360/20);
      break;
      case 5:
      this.chevron(0,0,25*this.scale, 0, 5);
      break;
      case 6:
      //this.polygon(60/cos(PI/4), 4, 0);
      this.cross(0,0,7*this.scale, 0, 5, 4);
      break;
      
      case 7:
      this.diamond(0,0,10*this.scale, 0, 5);
      //this.cross(0,0,25*this.scale, 0, 5, 4);
      break;
      case 8:
      //this.diamond(0,0,25*this.scale, 0, 5);
      //this.line(0,0,spacingX, 0, 5);
      
      let p = this.polygon(15/cos(PI/4), 3, 0);
      this.paths = [];
      this.concentricShape(p, 5, 3, 0);
      //this.polygon(15/cos(PI/4), 3, 0);
      break;
      case 9:
      let pp = this.polygon(15/cos(PI/4), 3, 0);
      this.paths = [];
      this.concentricShape(pp, -5, 3, 0);
      break;
      
      case 10:
      this.line(0,0,spacingY, PI/2, 5, 1);
      break;
      
      case 11:
      //this.line(0,0,spacingY, PI/2, 30, 0,5,8*PI);
      this.line(0,0,spacingY, PI/2, 5, 2);
      break;
      
      case 12:
      this.line(0,0,spacingY, PI/2, 5, 0);
      //this.line(0,0,spacingY, PI/2, 30, 0,5,6*PI);
      break;
      
      case 13:
      this.line(0,0,spacingY, PI/2, 10, 3);
      //this.line(0,0,spacingY, PI/2, 30, 0,5,6*PI);
      break;
      
      case 14:
      //console.log(spacingY);
      this.sinus(0,0,spacingY, -PI/2, 10);
      //this.line(0,0,spacingY, PI/2, 30, 0,5,6*PI);
      break;
      case 15:
      this.sinus(0,0,spacingY, -PI/2, 15, 0.5*spacingY);
      break;
      
      case 16:
      this.perlin(0,0,spacingY, -PI/2, 20, pointIndex, 30, 20, 10);
      break;
      
      case 17:
      this.perlin(0,0,spacingY, -PI/2, 20, pointIndex, 10, 70, 1);
      break;
      
      case 18:
      this.perlin(0,0,spacingY, -PI/2, 20, pointIndex, 2*pointIndex, 5, 5);
      break;
      
      case 19:
      this.point(0,0,1 );
      break;
      
      case 20:
      this.line(0+spacingX/2*random(-1,1),0+spacingY/2*random(-1,1),spacingY*2, PI/2+random(-1,1)*PI/8, 4, 4);      
      break;
      
      case 21:
      this.line(0+spacingX/2*random(-1,1),0+spacingY/2*random(-1,1),spacingY/2, PI/2+random(-1,1)*PI/8, 4, 4);      
      break;
      
      case 22:
      this.diamond(0,0,20*this.scale, 0, 5, 2);
      break;
      case 23:
      this.diamond(0,0,10*this.scale, 0, 5, 2);
      break;
      case 24:
      this.line(0,0,spacingY, int(random(0,8))*PI/4, 4, 0);      
      break;
      case 25:
      this.chevron2(0,0,15*this.scale, 0, 5);
      break;
      case 26:
      this.arrow(0,0,20*this.scale, 0, 5);
      break;
      case 27:
      this.diamondV(0,0,15*this.scale, 0, 5);
      break;
      case 28:
      this.guiShape(0,0,15*this.scale, 0, 5);
      break;
      default:
      this.point(0,0);
    }
    
    //console.log(this.paths);
    return this.paths;
  }*/
  
  
  
  //** Predefined Movement Functions **//
  // Default Movement is a PointPath
  makePointPath(x, y, zMode = "FLAT", customZMode = null){
    /*let tempPath = [];

    tempPath.push(new createVector(x,y,z));
    this.paths.push(tempPath);*/
    this.linePaths.push(new LinePath(x,y,0,1, 0, 0, zMode, customZMode));
    //console.log(this.linePaths[this.linePaths.length-1].path);
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
  }
  
  makeLinePath(x, y, l, nbPoints, theta, phi = theta, zMode = "FLAT", customZMode = null){
    this.linePaths.push(new LinePath(x,y,l,nbPoints, theta, phi, zMode, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
  }
  
  /*
  sinus(x, y, l, rotateOffset, nbPoint, period = l){
    let tempPath = [];
    //this.globalRotOffset = PI/2
    let dx = l/nbPoint;
    let lastY = 0;
    let nextY, angle, d;
    let x0,y0,xf,yf;
    for (let i = 0; i < nbPoint+1; i++){
      nextY = 5*sin((i+1)*dx*2*PI/period);
      angle = atan((nextY-lastY)/dx);
      d = sqrt(pow(dx,2) + pow((nextY-lastY),2));
      x0 = x-i*dx;
      y0 = y+lastY;
      xf = x0*cos(rotateOffset) - y0*sin(rotateOffset);
      yf = x0*sin(rotateOffset) + y0*cos(rotateOffset);
      tempPath.push(new createVector(xf,yf,-1));
      lastY = nextY;
    }
    
    this.paths.push(tempPath);
  }
  
  perlin(x, y, l, rotateOffset, nbPoint, pointIndex, amp, fx, fy){
    let tempPath = [];
    //this.globalRotOffset = PI/2
    let dx = l/nbPoint;
    let lastY = amp*noise(0, pointIndex/fy);
    let nextY, angle, d;
    let x0,y0,xf,yf;
    for (let i = 0; i < nbPoint+1; i++){
      //noiseSeed(random(10));
      nextY = amp*noise((i+1)*dx/fx, pointIndex/fy);
      //console.log(pointIndex);
      angle = atan((nextY-lastY)/dx);
      d = sqrt(pow(dx,2) + pow((nextY-lastY),2));
      x0 = x-i*dx;
      y0 = y+lastY;
      xf = x0*cos(rotateOffset) - y0*sin(rotateOffset);
      yf = x0*sin(rotateOffset) + y0*cos(rotateOffset);
      tempPath.push(new createVector(xf,yf,-1));
      lastY = nextY;
    }
    
    this.paths.push(tempPath);
  }
  */
 
  
  makeChevronPath(x,y,l,nbPoints, theta, zMode, customZMode = null){
    this.paths = [];
    this.linePaths = [];
    // first branch
    this.linePaths.push(new LinePath(x,y,l,nbPoints, theta, theta, zMode, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
    // second branch
    this.linePaths.push(new LinePath(x,y,l,nbPoints, theta, PI/2, zMode, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
  }
  
  /* chevron2(x,y,l,rotateOffset, nbPoint){
    let rTool = maxDepthCut*tan(30*PI/180);
    let angle = atan(rTool/(l/2));
    let lMove = (l/2)/cos(angle);
    this.line(x+l/2,y+rTool,lMove,-angle, nbPoint,2);
    this.line(x,y-0*rTool,lMove,angle, nbPoint,5);
  }
    
  arrow(x,y,l,rotateOffset, nbPoint){
    let rTool = maxDepthCut*tan(30*PI/180);
    let angle = atan(rTool/(l/2));
    let lMove = (l/2)/cos(angle);
    this.line(x,y,lMove,0, nbPoint,2);
    this.line(x-lMove,y,lMove,2*angle, nbPoint,5);
    this.line(x-lMove,y,lMove,-2*angle, nbPoint,5);
    //this.chevron2(x,y,l,rotateOffset, nbPoint);
    //this.chevron2(x,y,l,rotateOffset-angle, nbPoint);
  } 

  
  }*/
  
  
  /**
  * Make a diamond with a V-shaped bit by going down and up in z
  * @param {float} x
  * @param {float} y
  * @param {float} l
  * @param {int} nbPoints
  * @param {float} theta
  */
  makeDiamondForVBit(x,y,l,nbPoints, theta, customZMode = null){
    this.paths = [];
    this.linePaths = [];
    this.linePaths.push(new LinePath(x+l/2,y,l/2, nbPoints, theta, theta, 1, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
    this.linePaths.push(new LinePath(x,y,l/2, nbPoints, theta, theta, 2, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
  }
  
  
  /**
  * Make a cross path as the movement.
  * @param {float} x
  * @param {float} y
  * @param {float} l
  * @param {int} nbPoints
  * @param {float} theta
  * @param {int} zMode
  * @param {int} nbApex
  */
  makeCrossPath(x,y,l,nbPoints,theta,zMode, nbApex, customZMode = null){
    this.paths = [];
    this.linePaths = [];
    
    for (let i = 0; i < nbApex; i++){
      let angle = i*2*PI/nbApex + theta;
      this.linePaths.push(new LinePath(x,y,l,nbPoints, angle, angle, zMode, customZMode));
      this.paths.push(this.linePaths[this.linePaths.length-1].path);
    }
  }

  /**
   * Make a rectangle path as the movement.
   * @param {any} rx
   * @param {any} ry
   * @param {any} nbPoints
   * @param {any} theta
   * @param {any} zMode
   * @param {any} customZMode=null
   * @returns {any}
   */
  makeRectanglePath(sx,sy,nbPoints,theta,zMode,customZMode = null){
    this.paths = [];
    this.linePaths = [];
    
    this.linePaths.push(new LinePath(-sx/2,-sy/2,sx,nbPoints, theta, theta, zMode, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
    this.linePaths.push(new LinePath(sx/2,-sy/2,sy,nbPoints, PI/2+theta, PI/2+theta, zMode, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
    this.linePaths.push(new LinePath(sx/2,sy/2,sx,nbPoints, -PI+theta, -PI+theta, zMode, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
    this.linePaths.push(new LinePath(-sx/2,sy/2,sy,nbPoints, -PI/2+theta, -PI/2+theta, zMode, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
  }

  /**
   * Make dogbone openings for joinery
   * @param {any} rx
   * @param {any} ry
   * @param {any} nbPoints
   * @param {any} theta
   * @param {any} boneMode
   * @param {any} zMode
   * @param {any} customZMode=null
   * @returns {any}
   */
  makeDogBonePath(sx,sy,nbPoints,theta,boneMode,zMode,customZMode = null){
    this.paths = [];
    this.linePaths = [];  
    if (boneMode == "ONE_SIDE"){
      this.linePaths.push(new LinePath(-sx/2,-sy/2,sx+toolSizeMm/2,nbPoints, theta, theta, zMode, customZMode));
      this.paths.push(this.linePaths[this.linePaths.length-1].path);
    } else if (boneMode == "TWO_SIDE") {
      this.linePaths.push(new LinePath(-sx/2-toolSizeMm/2,-sy/2,sx+2*toolSizeMm/2,nbPoints, theta, theta, zMode, customZMode));
      this.paths.push(this.linePaths[this.linePaths.length-1].path);
    }

    this.linePaths.push(new LinePath(sx/2,-sy/2,sy,nbPoints, PI/2+theta, PI/2+theta, zMode, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);

    if (boneMode == "ONE_SIDE"){
      this.linePaths.push(new LinePath(sx/2+toolSizeMm/2,sy/2,sx+toolSizeMm/2,nbPoints, -PI+theta, -PI+theta, zMode, customZMode));
      this.paths.push(this.linePaths[this.linePaths.length-1].path);
    } else if (boneMode == "TWO_SIDE") {
      this.linePaths.push(new LinePath(sx/2+toolSizeMm/2,sy/2,sx+2*toolSizeMm/2,nbPoints, -PI+theta, -PI+theta, zMode, customZMode));
      this.paths.push(this.linePaths[this.linePaths.length-1].path);
    }

    this.linePaths.push(new LinePath(-sx/2,sy/2,sy,nbPoints, -PI/2+theta, -PI/2+theta, zMode, customZMode));
    this.paths.push(this.linePaths[this.linePaths.length-1].path);
  }
  
  /**
  * Make a polygon path as the movement.
  * @param {float} r - The radius of the polygon.
  * @param {float} nbSides - The number of sides of the polygon.
  * @param {int} nbPoints - The number of point in each line composing each side of the polygon.
  * @param {float} theta - The angle of the polygon with respect with the positive x-axis.
  * @param {int} zMode - depth mode of linePaths composing the polygon. 
  */
  makePolygonPath(r, nbSides, nbPoints, theta, zMode = "FLAT", customZMode = null){
    let t1,t2,x1,x2,y1,y2,l,angle;
    this.paths = [];
    this.linePaths = [];
    
    for (let i = 0; i < nbSides; i++){
      t1 = 360/nbSides*i*PI/180  + theta + this.globalRotOffset;
      t2 = 360/nbSides*(i+1)*PI/180  + theta + this.globalRotOffset;
      x1 = r*cos(t1);
      y1 = r*sin(t1);
      x2 = r*cos(t2);
      y2 = r*sin(t2);
      angle =  atan((y2-y1)/(x2-x1));
      if (x2 < x1){
        angle += PI;
      }
      l = sqrt(pow(x2-x1,2) + pow(y2-y1,2));
      this.linePaths.push(new LinePath(x1,y1,l,nbPoints, angle, angle, zMode, customZMode));
      this.paths.push(this.linePaths[this.linePaths.length-1].path);
    }
    return this.paths;
  }

  /**
  * Make a arc path as the movement.
  * @param {float} r - The radius of the arc.
  * @param {float} arcAngle - The angle of the arc.
  * @param {float} nbSides - The number of sides of the polygon.
  * @param {int} nbPoints - The number of point in each line composing each side of the arc.
  * @param {float} theta - The angular position of the arc with respect with the positive x-axis.
  * @param {int} zMode - depth mode of linePaths composing the arc. 
  */
  makeArcPath(r, arcAngle, nbSides, theta, zMode = "FLAT", customZMode = null){
    let t1,t2,x1,x2,y1,y2,l,angle;
    this.paths = [];
    this.linePaths = [];
    
    for (let i = 0; i < nbSides; i++){
      t1 = arcAngle/nbSides*i*PI/180  + theta + this.globalRotOffset;
      t2 = arcAngle/nbSides*(i+1)*PI/180  + theta + this.globalRotOffset;
      x1 = r*cos(t1);
      y1 = r*sin(t1);
      x2 = r*cos(t2);
      y2 = r*sin(t2);
      angle = atan((y2-y1)/(x2-x1));
      if (x2 < x1){
        angle += PI;
      }
      l = sqrt(pow(x2-x1,2) + pow(y2-y1,2));
      this.linePaths.push(new LinePath(x1,y1,l,1, angle, angle, zMode, customZMode));
      if (this.paths.length == 0){
        this.paths.push(this.linePaths[this.linePaths.length-1].path);
      } else {
        // remove the first point in array since its duplicata of last entry
        this.linePaths[this.linePaths.length-1].path.shift();
        this.paths[0] = this.paths[0].concat(this.linePaths[this.linePaths.length-1].path);
      }
    }
    //console.log(this.paths);
    return this.paths;
  }
  
  /**
  * Make a polygon-shaped concentric paths as the movement.
  * @param {float} r
  * @param {int} nbSides
  * @param {int} nbPaths
  * @param {float} offsetWidth
  * @param {int} nbPoints
  * @param {float} theta
  * @param {int} zMode=0
  */
  makeConcentricPolygonPath(r, nbSides, nbPaths, offsetWidth, nbPoints, theta, zMode = "FLAT", customZMode = null){
    let t1,t2,x1,x2,y1,y2,l,r2,angle;
    this.paths = [];
    this.linePaths = [];
    
    for (let j = 0; j < nbPaths; j++){
      r2 = r - j*offsetWidth;
      for (let i = 0; i < nbSides; i++){
        t1 = 360/nbSides*i*PI/180  + theta + this.globalRotOffset;
        t2 = 360/nbSides*(i+1)*PI/180  + theta + this.globalRotOffset;
        x1 = r2*cos(t1);
        y1 = r2*sin(t1);
        x2 = r2*cos(t2);
        y2 = r2*sin(t2);
        angle =  atan((y2-y1)/(x2-x1));
        if (x2 < x1){
          angle += PI;
        }
        l = sqrt(pow(x2-x1,2) + pow(y2-y1,2));
        this.linePaths.push(new LinePath(x1,y1,l,nbPoints, angle, angle, zMode, customZMode));
        this.paths.push(this.linePaths[this.linePaths.length-1].path);
        
      }
    }
  }
  
  
  /**
  * Make an hypertorchoid shape as movement.
  * @param {float} R
  * @param {float} r
  * @param {float} d
  * @param {int} limit
  * @param {float} resolution
  * @param {int} nbPoints
  * @param {float} theta
  * @param {int} zMode=0
  */
  makeHypertrochoidPath(R, r, d, limit, resolution, nbPoints, theta, zMode = "FLAT", customZMode = null){
    let t1,t2,x1,x2,y1,y2,l,angle;
    this.paths = [];
    this.linePaths = [];
    
    for (let i = 0; i < limit; i++){      
      t1 = resolution*i*PI/180  + theta + this.globalRotOffset;
      t2 = resolution*(i+1)*PI/180  + theta + this.globalRotOffset;
      
      x1 = ((R-r)*cos(t1) + d*cos((R-r)/r * t1));
      y1 = ((R-r)*sin(t1) + d*sin((R-r)/r * t1));
      x2 = ((R-r)*cos(t2) + d*cos((R-r)/r * t2));
      y2 = ((R-r)*sin(t2) + d*sin((R-r)/r * t2));
      angle =  atan((y2-y1)/(x2-x1));
      if (x2 < x1){
        angle += PI;
      }
      l = sqrt(pow(x2-x1,2) + pow(y2-y1,2));
      this.linePaths.push(new LinePath(x1,y1,l,nbPoints, angle, angle, zMode, customZMode));
      this.paths.push(this.linePaths[this.linePaths.length-1].path);
    }
  }
  
  /**
  * Make an hypotrochoid shape as movement.
  * @param {float} R
  * @param {float} r
  * @param {float} d
  * @param {int} limit
  * @param {float} resolution
  * @param {int} nbPoints
  * @param {float} theta
  * @param {int} zMode=0
  */
  makeHypotrochoidPath(R, r, d, limit, resolution, nbPoints, theta, zMode =  "FLAT", customZMode = null){
    let t1,t2,x1,x2,y1,y2,l,angle;
    this.paths = [];
    this.linePaths = [];
    
    for (let i = 0; i < limit; i++){      
      t1 = resolution*i*PI/180  + theta + this.globalRotOffset;
      t2 = resolution*(i+1)*PI/180  + theta + this.globalRotOffset;
      
      x1 = ((R-r)*cos(t1) + d*cos((R-r)/r * t1));
      y1 = ((R-r)*sin(t1) - d*sin((R-r)/r * t1));
      x2 = ((R-r)*cos(t2) + d*cos((R-r)/r * t2));
      y2 = ((R-r)*sin(t2) - d*sin((R-r)/r * t2));
      angle =  atan((y2-y1)/(x2-x1));
      if (x2 < x1){
        angle += PI;
      }
      l = sqrt(pow(x2-x1,2) + pow(y2-y1,2));
      this.linePaths.push(new LinePath(x1,y1,l,nbPoints, angle, angle, zMode, customZMode));
      this.paths.push(this.linePaths[this.linePaths.length-1].path);
    }
  }
  
  /**
  * Make movement path from GUI movement template. 
  * @param {int} nbPoints
  * @param {float} theta
  * @param {int} zMode=0
  */
  makeGuiPath(nbPoints, theta, zMode = "FLAT", customZMode = null){
    // initialize paths
    this.paths = [];
    this.linePaths = [];
    // take the map data 
    let mapT = mvtTemplate.paths;
    //let scale = w/sx;
    let scale = this.scale;
    
    for (const value of mapT.values()) {
      //console.log(value);
      this.linePaths.push(new LinePath(scale*value.x1/w,scale*value.y1/h,scale*value.l, nbPoints, theta+value.angle, theta+value.angle, zMode, customZMode));
      this.paths.push(this.linePaths[this.linePaths.length-1].path);
    }
    
  }
  
  
  /*diamond(x,y,l,rotateOffset, nbPoint, zmode = 0){
    let angle = 60*PI/180;
    let angle2 = angle + rotateOffset ; //rad
    this.line(x+l*cos(angle2),y,l,rotateOffset+angle, nbPoint, zmode);
    this.reflectY = -1;
    this.line(x+l*cos(angle2),y,l,rotateOffset+angle, nbPoint, zmode);
    this.reflectX = -1;
    this.line(x-l*cos(angle2),y,l,rotateOffset+angle, nbPoint, zmode);
    this.reflectY = 1;
    this.line(x-l*cos(angle2),y,l,rotateOffset+angle, nbPoint, zmode);
    this.reflectX = 1;
    
  }
  
  
  concentricShape(path, offsetWidth, nbPaths, rotationOffset){
    // remove closing point
    if (dist(path[0].x, path[0].y, path[0].z, path[path.length-1].x, path[path.length-1].y, path[path.length-1].z) < 0.01){
      path.pop();
    }
    
    // compute concentric paths
    let x,y,z;
    let firstPoint;
    let tempPath = [];
    for (let j = 0; j < nbPaths; j++){
      tempPath = [];
      for (let i = 0; i < path.length; i++){
        // first vector
        let previousPathIndex;
        if (i == 0){
          previousPathIndex = path.length-1;
        } else {
          previousPathIndex = i - 1;
        }
        let v1 = p5.Vector.sub(path[previousPathIndex], path[i]);
        
        //second vector
        let nextPathIndex;
        if (i == path.length-1){
          nextPathIndex = 0;
        } else {
          nextPathIndex = i+1;
        }
        let v2 = p5.Vector.sub(path[nextPathIndex], path[i]);
        
        // offset direction
        let dirVector = p5.Vector.add(v1,v2).normalize();
        let angle = PI-2*abs(v1.angleBetween(v2)/2);
        
        // cosinus law
        let c = sqrt(2)*j*offsetWidth*sqrt(1-cos(angle));
        x = path[i].x + c*dirVector.x;
        y = path[i].y + c*dirVector.y;
        z = -1;
        //this.path.push(new createVector(x, y, z));
        tempPath.push(new createVector(x, y, z));
        if (i == 0){
          //firstPoint = this.path[this.path.length-1];
          firstPoint = tempPath[tempPath.length-1];
        }
      }
      
      // to close the polygon
      tempPath.push(firstPoint);
      this.paths.push(tempPath);
    }
  }*/
  
  // Display Static Mvt
  displayStatic(){
    this.xyMovement();
    this.xzMovement();
    this.yzMovement();
  }
  
  setOffset(x, y){
    this.offsetX -= x;
    this.offsetY -= y;
  }
  
  xyMovement(){ 
    stroke(this.staticColor[0],this.staticColor[1],this.staticColor[2]);
    strokeWeight(2);
    push();
    //scale(2);
    translate(this.sizeX/2, -this.sizeY/2, 20);
    this.displayPath(2.);
    pop();
  }
  
  xzMovement(){
    push();
    translate(this.sizeX/2+20,-this.sizeY/2-20,0);
    rotateX(PI/2);
    translate(-this.sizeX/2-20,0,-4*this.sizeY/2-80);
    this.xyMovement();
    pop();
  }
  
  yzMovement(){
    push();
    translate(this.sizeX/2-20,-this.sizeY/2-20,0);
    rotateX(PI/2);
    rotateZ(PI/2);
    translate(200,this.sizeX/2+20,-6*this.sizeY/2-100);
    this.xyMovement();
    pop();
  }
  
  
  translateX(x){
    return -x - this.x - this.sizeX - 20;
  }
  
  translateY(y){
    return -y - this.y + this.sizeY + 20;
  }
  
  // Display Mvt on Grid
  displayPath(scale = 1.){
    // check if gui has changed
    if (this.mode == 28 && mvtTemplate.changed){
      this.makePath();
      mvtTemplate.changed = false;
    }
    
    let previous = new createVector(0,0);
    let x,y,z;
    //let scale = 10.;
    //let scale = 10.;
    let scaleZ = 5.
    for (let i = 0; i < this.paths.length; i++){
      
      for (let j = 0; j < this.paths[i].length; j++){
        
        x = this.translateX(scale*this.paths[i][j].x);
        y = this.translateY(scale*this.paths[i][j].y);
        z = scaleZ*this.paths[i][j].z;
        
        if (j != 0){
          line(previous.x, previous.y,previous.z,x,y,z);
        }
        
        if (this.paths[i].length == 1){
          push();
          translate(x,y,z);
          sphere(2);
          pop();
        }
        
        previous.x = x;
        previous.y = y;
        previous.z = z;
      }
    }
  }
}