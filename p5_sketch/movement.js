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
    //this.makePath(this.mode);
    this.makePath();
  }
  
  makePath(spacingX = 1, spacingY = 1){
    // maybe clear path
    this.path = [];
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
      // 21
      this.hypotrochoid(10*this.scale,2*this.scale,6*this.scale,21, 360/20);
      break;
      case 5:
      this.chevron(0,0,25*this.scale, 0, 5);
      break;
      case 6:
      this.polygon(60/cos(PI/4), 4, 0);
      break;
      case 7:
      this.cross(0,0,25*this.scale, 0, 5, 4);
      break;
      case 8:
      //this.diamond(0,0,25*this.scale, 0, 5);
      //this.line(0,0,spacingX, 0, 5);
      
      let p = this.polygon(15/cos(PI/4), 3, 0);
      this.path = [];
      this.concentricShape(p, 5, 3, 0);
      //this.polygon(15/cos(PI/4), 3, 0);
      break;
      default:
      this.point(0,0);
    }
    return this.path;
  }
  
  display(){
    push();
    fill(255, 100);
    translate(this.offsetX, this.offsetY);
    rotateZ(-PI);
    rect(this.x-this.sizeX-20,this.y+20,this.sizeX,this.sizeY);
    rect(this.x-this.sizeX-20,this.y+40+this.sizeY,this.sizeX,this.sizeY);
    this.xyMovement();
    this.xzMovement();
    pop();
  }
  
  displayStatic(){
    push();
    fill(255, 100);
    //translate(this.offsetX, this.offsetY);
    //rotateZ(-PI);
    rect(this.x-this.sizeX-20,this.y+20,this.sizeX,this.sizeY);
    rect(this.x-this.sizeX-20,this.y+40+this.sizeY,this.sizeX,this.sizeY);
    pop();
    
    this.xyMovement();
    this.xzMovement();
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
  
  translateX(x){
    return -x - this.x - this.sizeX - 20;
  }
  
  translateY(y){
    return -y - this.y + this.sizeY + 20;
  }
  
  point(x, y){
    let z = 0;
    this.path[0] = new createVector(x,y,z);
  }
  
  line(x,y,l,rotateOffset, nbPoint){
    let z = 0;
    let maxX = l*cos(rotateOffset);
    
    let deltaX = (this.reflectX*this.globalRefX)*l*cos(rotateOffset)/nbPoint;
    let deltaY = (this.reflectY*this.globalRefY)*l*sin(rotateOffset)/nbPoint;
    for (let i = 0; i < nbPoint+1; i++){
      // linear descending in X
      //z = -i*deltaX/maxX;
      // positive parabola with min in the middle of the line
      z = this.parabola(i*abs(deltaX),0,maxX);
      
      // global rotation around (0,0);
      let x0 = (x-i*deltaX);
      let y0 = (y+i*deltaY);
      let xf = x0*cos(this.globalRotOffset) - y0*sin(this.globalRotOffset);
      let yf = x0*sin(this.globalRotOffset) + y0*cos(this.globalRotOffset);
      this.path.push(new createVector(xf,yf, z));
    }
  }
  
  chevron(x,y,l,rotateOffset, nbPoint){
    this.line(x,y,l,rotateOffset+PI/4, nbPoint);
    this.line(x,y,l,rotateOffset-PI/4, nbPoint);
  }
  
  cross(x,y,l,rotateOffset, nbPoint, nbApex){
    for (let i = 0; i < nbApex; i++){
      this.line(x,y,l,rotateOffset+i*2*PI/nbApex, nbPoint);
    }
  }
  
  diamond(x,y,l,rotateOffset, nbPoint){
    let angle = 60*PI/180;
    let angle2 = angle + rotateOffset ; //rad
    //console.log(+this.globalRotOffset);
    this.line(x+l*cos(angle2),y,l,rotateOffset+angle, nbPoint);
    this.reflectY = -1;
    this.line(x+l*cos(angle2),y,l,rotateOffset+angle, nbPoint);
    this.reflectX = -1;
    this.line(x-l*cos(angle2),y,l,rotateOffset+angle, nbPoint);
    this.reflectY = 1;
    this.line(x-l*cos(angle2),y,l,rotateOffset+angle, nbPoint);
    this.reflectX = 1;
    
  }
  
  paarabola(a,x,h,k){
    let y = a*pow((x-h),2) + k;
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
    fill(255, 0);
    for (let i = 0; i < limit; i++){
      t = res*i*PI/180;
      x = ((R-r)*cos(t) + d*cos((R-r)/r * t));
      y = ((R-r)*sin(t) + d*sin((R-r)/r * t));
      z = -map(sqrt(pow(x,2)+pow(y,2)), -R-d, R+d, 0.,1.);
      this.path[i] = new createVector(x,y,z);
    }
  }
  
  hypotrochoid(R, r, d, limit, res){
    let t,x,y,z;
    for (let i = 0; i < limit; i++){
      t = res*i*PI/180;
      x = ((R-r)*cos(t) + d*cos((R-r)/r * t));
      y = ((R-r)*sin(t) - d*sin((R-r)/r * t));
      z = -0.5;//-map(abs(sqrt(pow(x,2)+pow(y,2))), R-r-d, R+r+d, 0.,1.);
      //console.log(z);
      this.path[i] = new createVector(x,y,z);
    }
  }
  
  polygon(r, nbSides, rotationOffset){
    let t,x,y,z;
    let path = [];
    for (let i = 0; i < nbSides; i++){
      t = 360/nbSides*i*PI/180 + PI/nbSides + rotationOffset + this.globalRotOffset;
      x = r*cos(t);
      y = r*sin(t);
      z = 0;
      this.path[i] = new createVector(x,y,z);
      path.push(this.path[this.path.length-1]);
    }
    // to close the polygon
    this.path[nbSides] = this.path[0];
    path.push(this.path[this.path.length-1]);
    return path;
  }
  
  concentricPolygon(r, nbSides, offsetWidth, nbPaths, rotationOffset){
    let t,x,y,z;
    let firstPoint;
    for (let j = 0; j < nbPaths; j++){
      let r2 = r - j*offsetWidth;
      for (let i = 0; i < nbSides; i++){
        t = 360/nbSides*i*PI/180 + PI/nbSides + rotationOffset + this.globalRotOffset;
        x = r2*cos(t);
        y = r2*sin(t);
        z = 0;
        this.path.push(new createVector(x,y,z));
        if (i == 0){
          firstPoint = this.path[this.path.length-1];
        }
      }
      // to close the polygon
      this.path.push(firstPoint);
    }
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
        //let dirAngle = abs(atan(dirVector.y/dirVector.x));
        let angle = PI-2*abs(v1.angleBetween(v2)/2);

        // cosinus law
        let c = sqrt(2)*j*offsetWidth*sqrt(1-cos(angle));
        x = path[i].x + c*dirVector.x;
        y = path[i].y + c*dirVector.y;
        z = 0;
        this.path.push(new createVector(x, y, z));
        tempPath.push(new createVector(x, y, z));
        if (i == 0){
          //firstPoint = this.path[this.path.length-1];
          firstPoint = tempPath[tempPath.length-1];
        }
      }

      // to close the polygon
      this.path.push(firstPoint);
      tempPath.push(firstPoint);
      this.paths.push(tempPath);
    }
    //console.log(this.paths);
  }
  
  
  displayPath(){
    let previous = new createVector(0,0);
    let x,y,z;
    //let scale = 10.;
    let scale = 3.;
    for (let i = 0; i < this.path.length; i++){
      
      
      x = this.translateX(scale*this.path[i].x);
      y = this.translateY(scale*this.path[i].y);
      //x = this.path[i].x;
      //y = this.path[i].y;
      z = scale*this.path[i].z;
      
      if (i != 0){
        line(previous.x, previous.y,previous.z,x,y,z);
      }
      
      if (this.path.length == 1){
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