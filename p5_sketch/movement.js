class Movement{
  constructor(x, y){
    this.sizeX = 300;
    this.sizeY = 200;
    this.x = x ;
    this.y = y ;
    this.offsetX = 0;
    this.offsetY = 0;
    this.scale = 0.5;
    this.path = [];
    this.label= createDiv("movement xy plane");
    this.label.style('font-size', '14px');
    this.label.style('font-family', 'Poppins');
    this.label.position(width - this.sizeX-20, 0);

    this.label2= createDiv("movement xz plane");
    this.label2.style('font-size', '14px');
    this.label2.style('font-family', 'Poppins');
    this.label2.position(width - this.sizeX-20, 20+this.sizeY);
    this.makePath();
    
  }

  makePath(){
    this.polygon(100*this.scale, 3);
    //this.hypertrochoid(100*this.scale,20*this.scale,40*this.scale,100, 10);
    //this.hypotrochoid(100*this.scale,20*this.scale,60*this.scale,21, 360/20);
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
    return x - this.x - this.sizeX - 20;
  }

  translateY(y){
    return -y - this.y + this.sizeY + 20;
  }

  hypertrochoid(R, r, d, limit, res){
    let t,x,y,z;
    fill(255, 0);
    for (let i = 0; i < limit; i++){
       t = res*i*PI/180;
       x = ((R-r)*cos(t) + d*cos((R-r)/r * t));
       y = ((R-r)*sin(t) + d*sin((R-r)/r * t));
       z = map(sqrt(pow(x,2)+pow(y,2)), R-d, R+d, 0.,20.);
       this.path[i] = new createVector(x,y,z);
    }
  }

  hypotrochoid(R, r, d, limit, res){
    let t,x,y,z;
    for (let i = 0; i < limit; i++){
      t = res*i*PI/180;
      x = ((R-r)*cos(t) + d*cos((R-r)/r * t));
      y = ((R-r)*sin(t) - d*sin((R-r)/r * t));
      z = map(sqrt(pow(x,2)+pow(y,2)), R-d, R+d, 0.,20.);
      this.path[i] = new createVector(x,y,z);
    }
  }

  polygon(r, nbSides){
    let t,x,y,z;
    for (let i = 0; i < nbSides; i++){
      t = 360/nbSides*i*PI/180;
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
    for (let i = 0; i < this.path.length; i++){

      x = this.translateX(this.path[i].x);
      y = this.translateY(this.path[i].y);
      z = this.path[i].z;

     if (i != 0){
      line(previous.x, previous.y,previous.z,x,y,z);
     }
      

      previous.x = x;
      previous.y = y;
      previous.z = z;
    }
  }


  
}