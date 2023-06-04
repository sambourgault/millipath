// a shader variable
let theShader;
let shaderTexture;
let grid1;

let theta = 0;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;

let graph;
let directions;
let readOnce = false;

let rotationSlider;
let rotDiv;

let mvt;
let code;
let codeGenButton;

function preload() {
  // load the shader
  theShader = loadShader("basic.vert", "basic.frag");
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  directions = new Directions();
  camera(-width / 2, -600, 800, -width / 2, 0, 300, 0, 0, -1);
  //ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);

  // initialize the createGraphics layers
  shaderTexture = createGraphics(width, height, WEBGL);

  // turn off the createGraphics layers stroke
  shaderTexture.noStroke();
  grid1 = new Grid(-width / 2 + 175, width / 2 - 200, shaderTexture);

  rotationSlider = createSlider(0, 1000, 500);
  rotationSlider.position(width - 200, 30);
  rotationSlider.addClass("sliders");
  rotationSlider.style("width", "150px");
  rotationSlider.style("background-color", "#7C7C7C");
  rotationSlider.input(rotateWorld);
  rotDiv = createDiv('rotation X');
  rotDiv.style('font-size', '16px');
  rotDiv.style('font-family', 'Poppins');
  rotDiv.position(width - 200, 0);
  
  mvt = new Movement(0, width/2);
  code = new GCodeGen("test1");
  
}

function draw() {
  //orbitControl();
  // instead of just setting the active shader we are passing it to the createGraphics layer
  shaderTexture.shader(theShader);

  // send resolution of sketch into shader
  theShader.setUniform("u_resolution", [width, windowHeight]);
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]); // we flip Y so it's oriented properly in our shader
  theShader.setUniform("u_time", millis() / 1000.0); // we divide millis by 1000 to convert it to seconds

  // shader() sets the active shader with our shader
  //shader(theShader);

  // rect gives us some geometry on the screen
  //rect(0,0,width,height);

  // passing the shaderTexture layer geometry to render on
  shaderTexture.rect(0, 0, 1, 1);

  background(240);

  // pass the shader as a texture
  // anything drawn after this will have this texture.
  texture(shaderTexture);

  push();
  //rotateZ(theta * mouseX * 0.0001);
  
  translate(0,width/2,0);
  rotateX(theta);
  translate(0,-width/2,0);
  //rotateY(theta * mouseX * 0.0001);
  //theta += 0.5;
  //rectMode(CENTER);
  translate(-width, 0, 0);
  rect(0, 0, width, height);
  pop();

  if (!readOnce) {
    readOnce = true;
    grid1.addTexture(shaderTexture);
  }
  push();
  translate(0,width/2,0);
  rotateX(theta);
  translate(0,-width/2,0);
  grid1.display(shaderTexture);
  directions.display();
  pop();
  
  push();
  rotateX(PI/2);
  //mvt.display();
  pop();
  
  //print(grid1.changedGrid);
   if (grid1.changedGrid){
  //   console.log("yoooo");
  //   console.log(grid1.path.length);
     //console.log(grid1.path);
     code.updatePath(grid1.path);
     grid1.changedGrid = false;
   }
}

function mouseDragged() {
  //theta = map(mouseX / width, 0, 1, -1, 1);
}

function rotateWorld(){
      //document.querySelector("#div4").innerHTML ="spacing X: " + int(self.spacingX);
  push();
  translate(0,width/2,0);
  theta = map((this.value() / 1000), 0, 1, -1, 1);
  pop();
}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
}
