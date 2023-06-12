class Movement{
  constructor(x, y){
    this.sizeX = 300;
    this.sizeY = 200;
    this.x = x ;
    this.y = y ;
    this.offsetX = 0;
    this.offsetY = 0;
    this.scale = 0.5;
    this.label= createDiv("movement xy plane");
    this.label.style('font-size', '14px');
    this.label.style('font-family', 'Poppins');
    this.label.position(width - this.sizeX-20, 0);

    this.label2= createDiv("movement xz plane");
    this.label2.style('font-size', '14px');
    this.label2.style('font-family', 'Poppins');
    this.label2.position(width - this.sizeX-20, 20+this.sizeY);
    
  }
  
  display(){
    push();
    fill(255, 100);
    //stroke(100);
    translate(this.offsetX, this.offsetY);
    rotateZ(-PI);
    rect(this.x-this.sizeX-20,this.y+20,this.sizeX,this.sizeY);
    rect(this.x-this.sizeX-20,this.y+40+this.sizeY,this.sizeX,this.sizeY);
    //ellipse(this.x-this.sizeX,this.y,10,10);
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
    //noFill();
    push();
    translate(this.sizeX/2, -this.sizeY/2, 20);
    //this.hypertrochoid(100*this.scale,20*this.scale,40*this.scale,100, 10);
    this.hypotrochoid(100*this.scale,20*this.scale,60*this.scale,100, 360/20);
    pop();
    //circle(this.translateX(0+this.sizeX/2), this.translateY(0+this.sizeY/2), 100);
    //line(this.translateX(0), this.translateY(0), this.translateX(200), this.translateY(200));
  }

  xzMovement(){
    push();
    translate(this.sizeX/2+20,-this.sizeY/2-20,0);
    rotateX(PI/2);
    //circle(0,0,200);
    translate(-this.sizeX/2-20,0,-4*this.sizeY/2-60);
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
    let previous = new createVector(0,0); 
    let t, x,y,z;
    fill(255, 0);
    for (let i = 0; i < limit; i++){
       t = res*i*PI/180;
       x = ((R-r)*cos(t) + d*cos((R-r)/r * t));
       y = ((R-r)*sin(t) + d*sin((R-r)/r * t));
       z = map(sqrt(pow(x,2)+pow(y,2)), R-d, R+d, 0.,20.);
       x = this.translateX(x);
       y = this.translateY(y);
      
       if (i != 0) {
        line(previous.x, previous.y,previous.z,x,y,z);
      }

      previous.x = x;
      previous.y = y;
      previous.z = z;
    }
  }

  hypotrochoid(R, r, d, limit, res){
    let previous = new createVector(0,0); 
    let t,x,y,z;
    for (let i = 0; i < limit; i++){
      t = res*i*PI/180;
      x = ((R-r)*cos(t) + d*cos((R-r)/r * t));
      y = ((R-r)*sin(t) - d*sin((R-r)/r * t));
      z = map(sqrt(pow(x,2)+pow(y,2)), R-d, R+d, 0.,20.);
      x = this.translateX(x);
      y = this.translateY(y);
      //console.log(sqrt(x^2+y^2));
  
      if (i != 0) {
        line(previous.x, previous.y,previous.z,x,y,z);
      }

      previous.x = x;
      previous.y = y;
      previous.z = z;
    }
  }
  
}