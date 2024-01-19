class Boundary{
  constructor(mode, x, y, rX, rY = rX, checkCustomBoundary = null){
    this.mode = mode;
    this.x = -x; // center
    this.y = y; //center
    this.rX = rX;
    this.rY = rY;
    this.frameSizeX = 300;
    this.frameSizeY = 300;
    this.scale = 1.;
    this.path = [];
    this.reverse = false;
    this.reverseMultiplier = 1;
    
    //shader program
    this.shaderProgram;    
    this.vertSrc = this.makeVertexShader();
    this.fragSrc = this.makeFragCircle();
    this.shaderProgram = createShader(this.vertSrc, this.fragSrc);
    
    if (checkCustomBoundary != null){
      this.checkCustomBoundary = checkCustomBoundary;
    } else {
      this.checkCustomBoundary = null;
    }

    this.makeBoundary();   
    
  }
  
  /**
   * Inverse the boundary effect
   * @param {boolean} reverseState
   */
  reverseBoundary(reverseState){
    this.reverse = reverseState;
    if (this.reverse){
      this.reverseMultiplier = -1;
    } else {
      this.reverseMultiplier = 1;
    }
  }

  /**
  * Check if point is within boundary
  * @param {float} x - Coordinate x of checked point
  * @param {float} y - Coordinate y of checked point 
  * @returns {float} status - return <0. if within, 0. if at and >0. if outside boundary
  */
  checkBoundary(x, y){
    let status = -1.;
    switch(this.mode){
      case "CUSTOM":
      // if mode == -1, use custom boundary function
      status = this.checkCustomBoundary(x,y);
      //console.log(status);
      break;
      case "NONE":
      status = this.checkNoBoundary();
      break;
      case "CIRCLE":
      status = this.checkInCircle(x,y);
      break;
      case "SMOOTH_CIRCLE":
      status = this.checkInSmoothCircle(x,y);
      break;
      case "RECTANGLE":
      status = this.checkInRectangle(x,y);
      break;
      case "SMOOTH_RECTANGLE":
      if (this.checkInRectangle(x,y)<0){
        status = this.checkInSmoothCircle(x,y);
      } else {
        status = 1.;
      }
      break;
      
      default:
      status = this.checkNoBoundary();
    }
    return status*this.reverseMultiplier;
  }
  
  makeBoundary(customBoundary = null){
    switch(this.mode){
      case "CUSTOM":
      //customBoundary(this.x, this.y, this.rX, this.rY);
      //this.circle();
      break;

      case "NONE":
      break;

      case "CIRCLE":
      this.circle();
      break;
      case "SMOOTH_CIRCLE":
      this.smoothCircle();
      break;
      case "RECTANGLE":
      this.rectangle();
      break;

      case "SMOOTH_RECTANGLE":
      break; 

      //this.hypertrochoid(100*this.scale,20*this.scale,40*this.scale,100, 10);
      //this.hypotrochoid(100*this.scale,20*this.scale,60*this.scale,21, 360/20);
    }
  }
  
  checkNoBoundary(){
    // no boundary so point always within
    return -1.;
  }
  
  checkInCircle(x, y){
    let d = dist(this.x, this.y, x, y);
    if (d < this.rX){
      return -1.;
    } else if (d > this.rX){
      return 1.;
    } else if (d == this.rX){
      return 0;
    }
  }
  
  checkInSmoothCircle(x, y, offset = 4){
    let f = this.smoothstep(this.rX, this.rX+offset, dist(this.x, this.y, x, y));
    if (f < 1.){
      return -(1.-f);
    } else if (f == 1.){
      return 1.;
    }
  }
  
  
  
  // adapted from inigo quilez
  checkInRectangle(x,y){
    let dx = abs(-x+this.x) - this.rX;
    //console.log(-x);
    let dy = abs(y-this.y) - this.rY;
    
    let d = sqrt((max(dx, 0))^2 + max(dy, 0)^2) + min(max(dx,dy),0);
    
    if (d <= 0){
      return -1.
    } else {
      return 1.
    }
  }

  checkInTriangle(x,y){
    //function sdfTriangle(p, p0, p1, p2) {
      // adapted from inigo quilez
      let p = [x,y];
      let p0 = [0,0];
      let p1 = [this.rX, 0];
      let p2 = [0, this.rY];
    
      let e0 = math.subtract(p1, p0);
      let e1 = math.subtract(p2, p1);
      let e2 = math.subtract(p0, p2);
    
      let v0 = math.subtract(p, p0);
      let v1 = math.subtract(p, p1);
      let v2 = math.subtract(p, p2);
      
      let d0 = constrain(math.dot(v0, e0)/math.dot(e0,e0),0.0,1.0);
      let pq0 = math.subtract(v0, math.multiply(e0,d0));
      let d1 = constrain(math.dot(v1, e1)/math.dot(e1,e1),0.0,1.0);
      let pq1 = math.subtract(v1, math.multiply(e1,d1));
      let d2 = constrain(math.dot(v2, e2)/math.dot(e2,e2),0.0,1.0);
      let pq2 = math.subtract(v2, math.multiply(e2,d2));
      let s;
      
      if(e0[0]*e2[1]-e0[1]*e2[0]>=0){
        s = 1;
      } else {
        s = -1;
      }
    
      let pp0 = [math.dot(pq0,pq0), s*(v0[0]*e0[1]-v0[1]*e0[0])];
      let pp1 = [math.dot(pq1,pq1), s*(v1[0]*e1[1]-v1[1]*e1[0])];
      let pp2 = [math.dot(pq2,pq2), s*(v2[0]*e2[1]-v2[1]*e2[0])];
      
      //console.log(min(pp0, pp1));
      let d_0 = min(pp0[0], pp1[0]);
      let d_1 = min(pp0[1], pp1[1]);
      let pp_0 = [d_0, d_1];
      let d_2 = min(pp_0[0], pp2[0]);
      let d_3 = min(pp_0[1], pp2[1]);
      let d = [d_2, d_3];
      
      return -sqrt(d[0])*(d[1]>=0 ? 1:-1);

  }

  checkInPolygon(x,y){

  }

  checkInRoundedRectangle(x,y){

  }

  checkInRoundedPolygon(x,y){

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

  
  displayStatic(){
    //depth map
    push();
    fill(255, 100);
    //shader(this.shaderProgram);
    strokeWeight(2);
    stroke(0);
    rect(-this.frameSizeX-20,height- this.frameSizeY+30,this.frameSizeX,this.frameSizeY);
    resetShader();
    
    // display boundary
    stroke(255,0,0);
    strokeWeight(2);
    
    push();
    translate(-this.frameSizeX/2-20, height-this.frameSizeY+20+this.frameSizeY/2, 20);
    this.displayPath();
    pop();
    
    pop();
    noFill();
    noStroke();
    
  }
  
  display(){
    let previous = new createVector(0,0);
    let x,y,z;
    if (!this.reverse){
      stroke(0,0,255);
    }  else {
      stroke(255,0,0);
    }
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
    if (!this.reverse){
      stroke(0,0,255);
    }  else {
      stroke(255,0,0);
    }    
    
    for (let i = 0; i < this.path.length; i++){
      
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
  
  //** Boundary Visualizers **//
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
  
  rectangle(){
    let refx = 1.;
    let refy = 1.;
    for (let i = 0; i < 4; i++){
      if (i == 1){
        refx = -1;
      } else if (i == 2){
        refy = -1;
      }
      else if (i == 3){
        refx = 1.;
      }
      //this.path.push(new createVector(this.x-refx*this.rX, this.y + refy*this.rY));
      this.path.push(new createVector(-refx*this.rX, refy*this.rY));

    }
    // close the path
    this.path.push(this.path[0]);
  }
  
  circle(){
    let nbSides = 30;
    for (let i = 0; i < nbSides; i++){
      let angle = i*360/nbSides;
      this.path.push(new createVector(this.rX*cos(angle*PI/180), this.rY*sin(angle*PI/180)));
    }
    this.path.push(this.path[0]);
  }

  smoothCircle(){
    let nbSides = 30;
    for (let i = 0; i < nbSides; i++){
      let angle = i*360/nbSides;
      this.path.push(new createVector(this.rX*cos(angle*PI/180),this.rY*sin(angle*PI/180)));
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
      float f1 = smoothCircle(uv, vec2(.5,.5), .0, 0.2);
      //float f1 = circle(uv, vec2(.5), .25);
      vec3 color = vec3(f1);
      gl_FragColor = vec4(color, 1.0);
    }`;
    
    return frag;
  }
  
  translateX(x){
    return x - this.x - this.sizeX ;
  }
  
  translateY(y){
    return -y - this.y + this.sizeY ;
  }
}