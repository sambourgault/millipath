class Movement{
  constructor(mode,x, y, scale = 1.){
    this.mode = mode;
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
    this.path = [];
    this.paths = [];
    this.label= createDiv("movement xy plane");
    this.label.style('font-size', '14px');
    this.label.style('font-family', 'Poppins');
    this.label.position(width - this.sizeX-20, 0);
    
    this.label2= createDiv("movement xz plane");
    this.label2.style('font-size', '14px');
    this.label2.style('font-family', 'Poppins');
    this.label2.position(width - this.sizeX-20, 20+this.sizeY);

    this.label3= createDiv("movement yz plane");
    this.label3.style('font-size', '14px');
    this.label3.style('font-family', 'Poppins');
    this.label3.position(width - this.sizeX-20, 40+2*this.sizeY);

    //this.makePath(this.mode);
    this.makePath();
  }
  
  makePath(spacingX = 1, spacingY = 1, pointIndex = 0){
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
        this.chevron(0,0,25*this.scale, 0, 5);
        break;
      default:
      this.point(0,0);
    }
    
    //console.log(this.paths);
    return this.paths;
  }
  

  
  displayStatic(){
    push();
    fill(255, 100);
    //translate(this.offsetX, this.offsetY);
    //rotateZ(-PI);
    rect(this.x-this.sizeX-20,this.y+20,this.sizeX,this.sizeY);
    rect(this.x-this.sizeX-20,this.y+40+this.sizeY,this.sizeX,this.sizeY);
    rect(this.x-this.sizeX-20,this.y+60+2*this.sizeY,this.sizeX,this.sizeY);
    pop();
    
    this.xyMovement();
    this.xzMovement();
    this.yzMovement();
    //pop();
  }
  
  setOffset(x, y){
    this.offsetX -= x;
    this.offsetY -= y;
  }
  
  xyMovement(){ 
    stroke(255,0,0);
    strokeWeight(2);
    push();
    translate(this.sizeX/2, -this.sizeY/2, 20);
    this.displayPath();
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

  //** Movement functions **//
  point(x, y, mode = 0){
    let z;
    if (mode == 0){
      z = -1;
    } else if(mode == 1){
      z = random(-1, 0.5);
    }
    let tempPath = [];
    tempPath.push(new createVector(x,y,z));
    this.paths.push(tempPath);
  }
  
  line(x,y,l,rotateOffset, nbPoints, mode = 0, amp = 0, f = 0){
    let z = 0;
    let maxX = abs(l*cos(rotateOffset));
    let tempPath = [];
    
    let deltaX = (this.reflectX*this.globalRefX)*l*cos(rotateOffset)/nbPoints;
    let deltaY = (this.reflectY*this.globalRefY)*l*sin(rotateOffset)/nbPoints;
    
    let rd = random(0.5,1);
    for (let i = 0; i < nbPoints+1; i++){
      if (mode == 0){
        // positive parabola with min in the middle of the line
        z = this.parabola(i*abs(deltaX),0,maxX);
      } else if (mode == 1){
        // constant mac depth
        z = -1;
      } else if (mode == 2){
        // linear descending
        z = -i*abs(deltaX/maxX);
      } else if (mode == 3){
        // cosinus
        z = this.cosinus(i*abs(deltaX), 0, maxX);
      }
      else if (mode == 4){
        // cosinus
        z = rd*this.parabola(i*abs(deltaX),0,maxX);
      }
      
      // global rotation around (0,0);

      let x0;
      if (deltaY != 0){
        x0 = (x-i*deltaX+amp*cos(f*i*deltaY/(deltaY*nbPoints)));
      } else {
        x0 = (x-i*deltaX);
      }
      let y0 = (y+i*deltaY);

      // global rotation operation
      let xf = x0*cos(this.globalRotOffset) - y0*sin(this.globalRotOffset);
      let yf = x0*sin(this.globalRotOffset) + y0*cos(this.globalRotOffset);
      tempPath.push(new createVector(xf,yf, z));
    }
    this.paths.push(tempPath);
  }

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
  
  chevron(x,y,l,rotateOffset, nbPoint){
    this.line(x,y,l,rotateOffset+PI/4, nbPoint);
    this.line(x,y,l,rotateOffset-PI/4, nbPoint);
  }
  
  cross(x,y,l,rotateOffset, nbPoint, nbApex){
    for (let i = 0; i < nbApex; i++){
      let angle = i*2*PI/nbApex;
      this.line(x,y,l,rotateOffset+angle, nbPoint);
    }
  }
  
  diamond(x,y,l,rotateOffset, nbPoint, zmode = 0){
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
  
  // Z function
  cosinus(x, x0, maxX){
    let period = maxX;
    let y = (cos((x-x0)*2*PI/maxX) - 1.)/2.;
    return y;
  }
  
  parabola(x,zero0,zero1){
    // find a for the deepest y == -1
    let a = 4/pow(zero1-zero0, 2);
    let y = a*(x - zero0)*(x - zero1);
    return y;
  }
  
  
  hypertrochoid(R, r, d, limit, res){
    let t,x,y,z;
    let tempPath = [];
    fill(255, 0);
    for (let i = 0; i < limit; i++){
      t = res*i*PI/180;
      x = ((R-r)*cos(t) + d*cos((R-r)/r * t));
      y = ((R-r)*sin(t) + d*sin((R-r)/r * t));
      z = -map(sqrt(pow(x,2)+pow(y,2)), -R-d, R+d, 0.,1.);
      tempPath.push(new createVector(x,y,z));
    }
    
    this.paths.push(tempPath);
  }
  
  hypotrochoid(R, r, d, limit, res){
    let t,x,y,z;
    let tempPath = [];
    
    for (let i = 0; i < limit; i++){
      t = res*i*PI/180;
      x = ((R-r)*cos(t) + d*cos((R-r)/r * t));
      y = ((R-r)*sin(t) - d*sin((R-r)/r * t));
      z = -0.5;//-map(abs(sqrt(pow(x,2)+pow(y,2))), R-r-d, R+r+d, 0.,1.);
      //console.log(z);
      tempPath.push(new createVector(x,y,z));
    }
    
    this.paths.push(tempPath);
  }
  
  polygon(r, nbSides, rotationOffset){
    let t,x,y,z;
    let tempPath = [];
    for (let i = 0; i < nbSides; i++){
      t = 360/nbSides*i*PI/180 + PI/nbSides + rotationOffset + this.globalRotOffset;
      x = r*cos(t);
      y = r*sin(t);
      z = 0;
      tempPath.push(new createVector(x,y,z));
    }
    //close the polygon
    tempPath.push(tempPath[0]);
    this.paths.push(tempPath);
    return tempPath;
  }
  
  concentricPolygon(r, nbSides, offsetWidth, nbPaths, rotationOffset){
    let t,x,y,z;
    let firstPoint;
    let tempPath = [];
    for (let j = 0; j < nbPaths; j++){
      let r2 = r - j*offsetWidth;
      for (let i = 0; i < nbSides; i++){
        t = 360/nbSides*i*PI/180 + PI/nbSides + rotationOffset + this.globalRotOffset;
        x = r2*cos(t);
        y = r2*sin(t);
        z = 0;
        tempPath.push(new createVector(x,y,z));
        if (i == 0){
          firstPoint = tempPath[tempPath.length-1];
        }
      }
      // to close the polygon
      tempPath.push(firstPoint);
    }
    
    this.paths.push(tempPath);
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
  }
  
  
  displayPath(){
    let previous = new createVector(0,0);
    let x,y,z;
    //let scale = 10.;
    let scale = 1.;
    let scaleZ = 10.
    for (let i = 0; i < this.paths.length; i++){
      
      for (let j = 0; j < this.paths[i].length; j++){
        
        x = this.translateX(scale*this.paths[i][j].x);
        y = this.translateY(scale*this.paths[i][j].y);
        //x = this.path[i].x;
        //y = this.path[i].y;
        z = scaleZ*this.paths[i][j].z;
        
        if (j != 0){
          line(previous.x, previous.y,previous.z,x,y,z);
        }
        
        if (this.paths[i].length == 1){
          push();
          translate(x,y,z);
          sphere(4);
          pop();
        }
        
        previous.x = x;
        previous.y = y;
        previous.z = z;
      }
    }
  }
  
  
  
}