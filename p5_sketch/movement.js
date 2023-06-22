class Movement{
  constructor(mode,x, y, scale = 1.){
    this.mode = mode;
    this.sizeX = 300;
    this.sizeY = 200;
    this.x = x ;
    this.y = y ;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotOffset = 0;
    this.scale = scale;
    this.path = [];
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

  makePath(rotationOffset = 0, spacingX = 1, spacingY = 1){
    // maybe clear path
    this.path = [];

    switch(this.mode) {
      case 0:
        // one point 
        this.point(0,0);
        break;
      case 1:
        // line
        this.line(0,0,25*this.scale, rotationOffset, 5);
        break;
      case 2:
        // polygon
        this.polygon(50*this.scale, 3, rotationOffset);
        break;
      case 3:
        this.hypertrochoid(50*this.scale,10*this.scale,20*this.scale,100, 10);
        break;
      case 4:
        // 21
        this.hypotrochoid(10*this.scale,2*this.scale,6*this.scale,21, 360/20);
        break;
      case 5:
        this.chevron(0,0,25*this.scale, rotationOffset, 5);
        break;
      case 6:
        this.polygon(60/cos(PI/4), 4, rotationOffset);
        break;
      case 7:
        //this.cross(0,0,25*this.scale, rotationOffset, 5);
        //console.log("rot:"+rotationOffset);
        this.chevron(0,0,25*this.scale, rotationOffset, 5);
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
    let maxX = l*cos(rotateOffset+this.rotOffset);
    let deltaX = l*cos(rotateOffset+this.rotOffset)/nbPoint;
    let deltaY = l*sin(rotateOffset+this.rotOffset)/nbPoint;
    for (let i = 0; i < nbPoint+1; i++){
      // linear descending in X
      //z = -i*deltaX/maxX;
      // positive parabola with min in the middle of the line
      z = this.parabola(i*deltaX,0,maxX);
      //console.log(z);
      this.path[i] = new createVector(x-i*deltaX,y+i*deltaY, z);
    }
  }

  chevron(x,y,l,rotateOffset, nbPoint){
    let z = 0;
    let maxX = l*cos(rotateOffset+this.rotOffset);
    let maxY = l*sin(rotateOffset+this.rotOffset);
    let deltaX = l*cos(rotateOffset+this.rotOffset)/nbPoint;
    let deltaY = l*sin(rotateOffset+this.rotOffset)/nbPoint;
    for (let i = 0; i < nbPoint+1; i++){
      // linear descending in X
      //z = -i*deltaX/maxX;
      // positive parabola with min in the middle of the line
      z = this.parabola(i*deltaX,0,maxX);
      this.path.push(new createVector(x-i*deltaX+maxX,y+i*deltaY, z));
      if (i == 0){
        console.log(this.path[0]);
      }
      //console.log(this.path[this.path.length-1]);
    }

    deltaY = -deltaY;
    for (let i = 1; i < nbPoint+1; i++){
      // linear descending in X
      //z = -i*deltaX/maxX;
      // positive parabola with min in the middle of the line
      z = this.parabola(i*deltaX,0,maxX);
      this.path.push(new createVector(x-i*deltaX,y+i*deltaY+maxY, z));
    }
    
  }
  
  cross(x,y,l,rotateOffset, nbPoint){
    this.chevron(x,y,l,rotateOffset, nbPoint);
    console.log(this.path);
    //this.chevron(x,y,l,rotateOffset+PI, nbPoint)
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
    for (let i = 0; i < nbSides; i++){
      t = 360/nbSides*i*PI/180 + PI/nbSides + rotationOffset + this.rotOffset;
      x = r*cos(t);
      y = r*sin(t);
      z = 0;
      this.path[i] = new createVector(x,y,z);
    }
    // to close the polygon
    this.path[nbSides] = this.path[0];
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