class Boundary{
  constructor(x, y){
    this.sizeX = 300;
    this.sizeY = 300;
    this.x = x ;
    this.y = y ;
    //this.x = -this.sizeX/3;
    //this.y = this.sizeY/4;
    this.offsetX = 0;
    this.offsetY = 0;
    this.scale = 1;
    this.path = [];
    this.label= createDiv("boundaries");
    this.label.style('font-size', '14px');
    this.label.style('font-family', 'Poppins');
    this.label.position(width - this.sizeX-20, height- this.sizeY - 40);
    this.shaderProgram;
    this.path = [];

    this.vertSrc = this.makeVertexShader();
    this.fragSrc = this.makeFragCircle();
    this.shaderProgram = createShader(this.vertSrc, this.fragSrc);
    this.makeBoundary();   
  }
  
  checkBoundary(mode, x, y){
    let status = -1.;
    switch(mode){
      case 0:
        status = this.checkNoBoundary();
        break;
      case 1:
        status = this.checkInCircle(x,y, 90);
      break;
      case 2:
        status = this.checkInSmoothCircle(x,y,60);
      break;
      default:
      status = this.checkInCircle(x,y, 100);
    }
    //console.log(status);
    return status;
  }
  
  makeBoundary(){
    //this.point(0,0);
    //this.polygon(100*this.scale, 10);
    this.circle(0,0,100*this.scale);
    //this.hypertrochoid(100*this.scale,20*this.scale,40*this.scale,100, 10);
    //this.hypotrochoid(100*this.scale,20*this.scale,60*this.scale,21, 360/20);
  }

  checkNoBoundary(){
    console.log();
    return -1.;
  }
  
  checkInCircle(x, y, r){
    let d = dist(this.x, this.y, x, y);
    if (d < r){
      return -1.;
    } else if (d > r){
      return 1.;
    } else if (d == r){
      return 0;
    }
  }

  checkInSmoothCircle(x, y, r){
    let f = this.smoothstep(r, r+40, dist(this.x, this.y, x, y));
    if (f < 1.){
      return -(1.-f);
    } else if (f == 1.){
      return 1.;
    }
  }

  smoothstep(edge0, edge1, x) {
    // Scale, bias and saturate x to 0..1 range
    x = this.clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    // Evaluate polynomial
    return x * x * (3. - 2. * x);
  }
  
  clamp(x, lowerlimit, upperlimit) {
    if (x < lowerlimit)
      x = lowerlimit;
    if (x > upperlimit)
      x = upperlimit;
    return x;
  }
  
  setOffset(x, y){
    this.offsetX = -x;
    this.offsetY = -y;
  }
  
  displayStatic(){
    //frame
    push();
    fill(255, 100);
    //fill(255,0,0);
    //translate(this.offsetX, this.offsetY);
    //rotateZ(-PI);
    shader(this.shaderProgram);
    rect(-this.sizeX-20,height- this.sizeY-20,this.sizeX,this.sizeY);
    resetShader();
    //trasnlate(this.)
    //push();
    //rotateZ(PI);
    //translate(this.sizeX/2+grid1.realSizeX/2+20-grid1.x, this.y-this.sizeY/2-grid1.realSizeY/2-grid1.y, 50);//this.sizeY);
    //grid1.display();
    //pop();

    // display boundary
    stroke(255,0,0);
    strokeWeight(2);


    push();
    translate(-this.sizeX/2-20, height- this.sizeY-20+this.sizeY/2, 20);
    //translate(-20,0, 20);
    this.displayPath();
    pop();
    
    pop();
    noFill();
    noStroke();
   
  }
  
  display(){
    let previous = new createVector(0,0);
    let x,y,z;
    stroke(0,0,255);
    strokeWeight(2);
    
    for (let i = 0; i < this.path.length; i++){
      
      x = this.path[i].x;
      y = this.path[i].y;
      z = this.path[i].z;
      
      if (i != 0){
        push();
        translate(this.x, this.y, 0);
        line(previous.x, previous.y,previous.z,x,y,z);
        pop();
      }
      
      previous.x = x;
      previous.y = y;
      previous.z = z;
    }
  }
  
  
  
  displayPath(){
    let previous = new createVector(0,0);
    let x,y,z;
    stroke(0,0,255);
    for (let i = 0; i < this.path.length; i++){
      
      //x = this.translateX(this.path[i].x);
      //y = this.translateY(this.path[i].y);
      x = this.path[i].x;
      y = this.path[i].y;
      z = this.path[i].z;
      
      if (i != 0){
        line(previous.x, previous.y,previous.z,x,y,z);
      }
      
      if (this.path.length == 1){
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
  
  polygon(r, nbSides){
    let t,x,y,z;
    for (let i = 0; i < nbSides; i++){
      t = 360/nbSides*i*PI/180+PI/nbSides;
      x = r*cos(t);
      y = r*sin(t);
      z = 0;
      this.path[i] = new createVector(x,y,z);
    }
    // to close the polygon
    this.path[nbSides] = this.path[0];
  }
  
  circle(x, y, r){
    /*let d = dist(x,y,this.x-this.sizeX/2, this.y+this.sizeY/2);
    if (d > r){
      return 0.;
    }
    return 1.;*/
    let nbSides = 20;
    for (let i = 0; i < nbSides; i++){
      let angle = i*360/nbSides;
      this.path.push(new createVector(x+r*cos(angle*PI/180), y+r*sin(angle*PI/180)));
    }
    this.path.push(this.path[0]);
  }
  
  circle2(cx,cy,r,res){
    let angle = 360/res;
    let r1 = 10;
    let p1 = new createVector(10,0);
    let r2 = 15;
    let p2 = new createVector(-5,0);
    for (let i = 0; i < res; i++){
      this.path[i] = new createVector(20,0);
    }
  }

  makeVertexShader(){
    let vert = `
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uModelViewMatrix;
    varying vec2 vTexCoord;
 
    void main() {
      vTexCoord = aTexCoord;
      vec4 position = vec4(aPosition, 1.0);
      gl_Position = uProjectionMatrix * uModelViewMatrix * position;
    }
 `;

    return vert;
  }
  
  makeFragCircle(){
    let frag = `
   precision mediump float;

   varying vec2 vTexCoord;

   float circle( vec2 st, vec2 pos, float r){
    return step(r, distance(st, pos));
  }

  float smoothCircle( vec2 st, vec2 pos, float r, float offset){
    return smoothstep(r, r+offset, distance(st, pos));
  }

   void main() {
     vec2 uv = vTexCoord;
     float f1 = smoothCircle(uv, vec2(.5,.5), .1, 0.2);
    //float f1 = circle(uv, vec2(.5), .25);
     vec3 color = vec3(f1);
     gl_FragColor = vec4(color, 1.0);
   }`;

    return frag;
  }
  
  inBound(x, y){
    
  }
  
  translateX(x){
    return x - this.x - this.sizeX ;
  }
  
  translateY(y){
    return -y - this.y + this.sizeY ;
  }
}