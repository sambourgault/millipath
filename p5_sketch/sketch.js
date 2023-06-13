// a shader variable
let theShader;
let shaderTexture;
let grid1;

let theta = 0;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;
let sizeX = 500;
let sizeY = sizeX;

let graph;
let directions;
let readOnce = false;

let rotationSlider;
let rotDiv;

let mvt;
let code;
let codeGenButton;
let safeHeight = 50 //mm
let materialThickness = 50.8; //mm = 2 inches
let spindleSpeed = 18000; // rpm
let moveSpeed = 16; // mm/s
let plungeRate = 5; //mm/s
let matDepthCut = 0.1; // mm
let infoBox;
let sZIn, mtIn, sSIn, mSIn, pRIn, mdcIn;


function preload() {
  // load the shader
  theShader = loadShader("basic.vert", "basic.frag");
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  console.log(windowWidth);
  console.log(width);

  directions = new Directions();
  //camera(-width / 2, -600, 800, -width / 2, 0, 300, 0, 0, -1);
  //ortho(0, width / 2, height / 2, -height / 2, 0, 500);
  
  //translate(-width/2,0,0);
  // ortho([left], [right], [bottom], [top], [near], [far])
  ortho(-width, 0, -height, 0, -width, width);
  

  // initialize the createGraphics layers
  shaderTexture = createGraphics(width, width, WEBGL);

  // turn off the createGraphics layers stroke
  shaderTexture.noStroke();
  //grid1 = new Grid(-width / 2 + 175, width / 2 - 200, shaderTexture);
  grid1 = new Grid(0, 0, shaderTexture);

  /*rotationSlider = createSlider(0, 1000, 0);
  rotationSlider.position(width - 200, 30);
  rotationSlider.addClass("sliders");
  rotationSlider.style("width", "150px");
  rotationSlider.style("background-color", "#7C7C7C");
  rotationSlider.input(rotateWorld);
  rotDiv = createDiv('rotation X');
  rotDiv.style('font-size', '16px');
  rotDiv.style('font-family', 'Poppins');
  rotDiv.position(width - 200, 0);*/
  infoBox = new CollapsibleBox(10,400, '300px', "machine specs");
  setupInputs();
  
  mvt = new Movement(0, 0);
  mvt.setOffset(width/2+sizeX/2,-height/2-sizeY/2);
  code = new GCodeGen("test1");
  
}

function draw() {
  //rotateZ(PI);
  //push();
  //translate(width/2, height/2,0);
  //rotateX(PI);
  rotateZ(PI);
  //print(mouseX/200)
  translate(width/2+sizeX/2,-height/2-sizeY/2,0);
  
  //console.log()
  //translate(-width/2, height/2,0);
  //pop();
  //translate(0,0,1000);
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
  //rotateZ()
  translate(0,sizeY/2,0);
  rotateX(-theta);
  translate(0,-sizeY/2,0);
  //rotateY(theta * mouseX * 0.0001);
  //theta += 0.5;
  //rectMode(CENTER);
  translate(-sizeX, 0, 0);
  rect(0, 0, sizeX, sizeY);
  pop();

  if (!readOnce) {
    readOnce = true;
    grid1.addTexture(shaderTexture);
  }
  push();
  /*translate(-width/2, -height/2, 0);
  rotateZ(PI);
  translate(width/2, height/2, 0);*/
  //rotateZ(PI);

  translate(0,sizeY/2,0);
  rotateX(-theta);
  translate(0,-sizeY/2,0);

  grid1.display(shaderTexture);
  directions.display();
  code.display();
  pop();
  
  push();
  //rotateX(PI/2);
  mvt.display();
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
  theta = map((mouseX / width), 0, 1, 0, PI/2);
}

function rotateWorld(){
      //document.querySelector("#div4").innerHTML ="spacing X: " + int(self.spacingX);
  push();
  translate(0,width/2,0);
  theta = map((this.value() / 1000), 0, 1, 0, PI/2);
  pop();
}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
}

function setupInputs(){
  let offY = 40;
  let offX = 10;
  pRIn, mdcIn
  labelSZ= createDiv("safe Z height (mm)").parent(infoBox.box);
  labelSZ.position(offX,1*offY);
  labelSZ.style('width', '170px');
  sZIn = createInput(str(safeHeight)).parent(infoBox.box);
  sZIn.position(offX, 1.5*offY);
 

  labelMT= createDiv("material thickness (mm)").parent(infoBox.box);
  labelMT.position(offX,2*offY);
  labelMT.style('width', '170px');
  mtIn = createInput(str(materialThickness)).parent(infoBox.box);
  mtIn.position(offX, 2.5*offY);

  labelSS= createDiv("spindle speed (rpm)").parent(infoBox.box);
  labelSS.position(offX,3*offY);
  labelSS.style('width', '170px');
  sSIn = createInput(str(spindleSpeed)).parent(infoBox.box);
  sSIn.position(offX, 3.5*offY);

  labelMS= createDiv("move speed (mm/s)").parent(infoBox.box);
  labelMS.position(offX,4*offY);
  labelMS.style('width', '170px');
  mSIn = createInput(str(moveSpeed)).parent(infoBox.box);
  mSIn.position(offX, 4.5*offY);

  labelPR= createDiv("plunge rate (mm/s)").parent(infoBox.box);
  labelPR.position(offX,5*offY);
  labelPR.style('width', '170px');
  pRIn = createInput(str(plungeRate)).parent(infoBox.box);
  pRIn.position(offX, 5.5*offY);

  labelMDC= createDiv("max depth cut (mm)").parent(infoBox.box);
  labelMDC.position(10,6*offY);
  labelMDC.style('width', '170px');
  mdcIn = createInput(str(matDepthCut)).parent(infoBox.box);
  mdcIn.position(offX, 6.5*offY);


}
