// a shader variable
//--let theShader;
//--let shaderTexture;
//let grid1;
//let grid2;
let grids = [];

let thetaX = 0;
let thetaY = 0;

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

let mvt, mvt2, mvt3, mvt5, mvt7;
let boundary;
let code;
let codeGenButton;
let safeHeight = 20 //mm
let materialThickness = 50.8; //mm = 2 inches
let spindleSpeed = 18000; // rpm
let moveSpeed = 16; // mm/s
let plungeRate = 5; //mm/s
let maxDepthCut = 5; // mm
let infoBox;
let matBox;
let sZIn, sSIn, mSIn, pRIn, mdcIn, tsIn;
let stockSizeXIn, stockSizeYIn, mtIn;
let title = "milli---path";


function preload() {
  // load the shader
  //--theShader = loadShader("basic.vert", "basic.frag");
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  //console.log(windowWidth);
  //console.log(width);

  directions = new Directions();
  //camera(-width / 2, -600, 800, -width / 2, 0, 300, 0, 0, -1);
  //ortho(0, width / 2, height / 2, -height / 2, 0, 500);
  
  //translate(-width/2,0,0);
  // ortho([left], [right], [bottom], [top], [near], [far])
  ortho(-width, 0, -height, 0, -width, width);
  

  // initialize the createGraphics layers
  //--shaderTexture = createGraphics(width, width, WEBGL);

  // turn off the createGraphics layers stroke
  //--shaderTexture.noStroke();
  //grid1 = new Grid(-width / 2 + 175, width / 2 - 200, shaderTexture);
  //--grid1 = new Grid(0, 0, shaderTexture);
  grids[0] = new Grid(0, 0, 10, 10, 0, 50, 50, 250, 250);
  /*grids[1] = new Grid(200, 50, 10, 70, 0, 25, 25, 140, 140);
  grids[2] = new Grid(350, 50, 10, 130, 0, 25, 25, 140, 140);
  grids[3] = new Grid(350, 200, 10, 190, 0, 25, 25, 175, 140);
  grids[4] = new Grid(50 + 59,50 + 59, 10, 250,0, 140,140,141,141);
  grids[5] = new Grid(50, 200, 10, 310,0, 50, 50, 200, 150);*/

  for (let i = 0; i < grids.length; i++){
    grids[i].ui.box.collapse();
  }

  infoBox = new CollapsibleBox(210,200, '300px', "machine specs");
  matBox = new CollapsibleBox(210, 10, '180px', 'material specs');
  setupInputs();
  
  mvt = new Movement(1, 0, 0);
  mvt2 = new Movement(5, 0, 0);
  mvt3 = new Movement(6, 0, 0);
  mvt5 = new Movement(4, 0, 0, 1.5);
  mvt7 = new Movement(8, 0, 0);
  //mvt.setOffset(width/2+sizeX/2,-height/2-sizeY/2);
  boundary = new Boundary(-100,100);
  //boundary.setOffset(width/2+sizeX/2,height/2 - boundary.sizeY - 270);
  code = new GCodeGen("test1");
}

function draw() {
  //rotateZ(PI);
  //push();
  //translate(width/2, height/2,0);
  //rotateX(PI);
  //rotateZ(PI);
  //print(mouseX/200)
  //translate(width/2+sizeX/2,-height/2-sizeY/2,0);
  
  //console.log()
  //translate(-width/2, height/2,0);
  //pop();
  //translate(0,0,1000);
  //orbitControl();
  // instead of just setting the active shader we are passing it to the createGraphics layer
 
 //---- shaderTexture.shader(theShader);

  // send resolution of sketch into shader
 // ---- theShader.setUniform("u_resolution", [width, windowHeight]);
 // ---- theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]); // we flip Y so it's oriented properly in our shader
 // ---- theShader.setUniform("u_time", millis() / 1000.0); // we divide millis by 1000 to convert it to seconds

  // shader() sets the active shader with our shader
  //shader(theShader);

  // rect gives us some geometry on the screen
  //rect(0,0,width,height);

  // passing the shaderTexture layer geometry to render on
  //---- shaderTexture.rect(0, 0, 1, 1);

  background(240);

  // pass the shader as a texture
  // anything drawn after this will have this texture.
  // ---- texture(shaderTexture);

  /*push();
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
  pop();*/

 if (!readOnce) {
    readOnce = true;
    //grid1.addTexture(shaderTexture);
    for (let i = 0; i < grids.length; i++){
      grids[i].updateGrid(grids[i].row,grids[i].column);
    }
  }

  // display grid 1
  push();
  rotateZ(PI);
  //print(mouseX/200)
  translate(width/2+sizeX/2,-height/2-sizeY/2,0);
  
  /*translate(-width/2, -height/2, 0);
  rotateZ(PI);
  translate(width/2, height/2, 0);*/
  //rotateZ(PI);
  translate(0,sizeY/2,0);
  rotateX(-thetaX);
  //rotateY(thetaY);
  translate(0,-sizeY/2,0);
  noFill();
  stroke(0);
  push();
  translate(-stockSizeXIn.value()/2, stockSizeYIn.value()/2, -materialThickness/2);
  box(stockSizeXIn.value(), stockSizeYIn.value(), materialThickness);
  pop();
  noStroke();
  
  //grid1.display();
  //grid2.display();
  for (let i = 0; i < grids.length; i++){
    grids[i].display();
  }
  directions.display();
  boundary.display();
  code.display();
  pop();
  
  // display boundary
  push();
  boundary.displayStatic();
  pop();

  // display movement
  push();
  //mvt2.displayStatic();
  mvt7.displayStatic();
  pop();

  
  for (let i = 0; i < grids.length; i++){
   if (grids[i].changedGrid){
    //console.log("helloo")
    if (i == 3){
      code.updatePath(i, grids[i].path, mvt2, grids[i].ui.linkState);
    } else if (i == 4){
      code.updatePath(i, grids[i].path, mvt3, grids[i].ui.linkState);
    } else if (i == 5) {
      code.updatePath(i, grids[i].path, mvt7, grids[i].ui.linkState);
    } else {
     code.updatePath(i, grids[i].path, mvt7, grids[i].ui.linkState);
    } 
     grids[i].changedGrid = false;
   }
  }

   
}

function mouseDragged() {
  //theta = map(mouseX / width, 0, 1, -1, 1);
  thetaX = map((mouseX / width), 0, 1, 0, PI/2);
  thetaY = map((mouseY / height), 0, 1, 0, PI/2);
}

function rotateWorld(){
      //document.querySelector("#div4").innerHTML ="spacing X: " + int(self.spacingX);
  push();
  translate(0,width/2,0);
  thetaX = map((this.value() / 1000), 0, 1, 0, PI/2);
  pop();
}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
}

function setupInputs(){
  let offY = 40;
  let offX = 10;

  // machine
  labelSZ= createDiv("safe Z height (mm)").parent(infoBox.box);
  labelSZ.position(offX,1*offY);
  labelSZ.style('width', '170px');
  sZIn = createInput(str(safeHeight)).parent(infoBox.box);
  sZIn.position(offX, 1.5*offY);

  labelSS= createDiv("spindle speed (rpm)").parent(infoBox.box);
  labelSS.position(offX,2*offY);
  labelSS.style('width', '170px');
  sSIn = createInput(str(spindleSpeed)).parent(infoBox.box);
  sSIn.position(offX, 2.5*offY);

  labelMS= createDiv("move speed (mm/s)").parent(infoBox.box);
  labelMS.position(offX,3*offY);
  labelMS.style('width', '170px');
  mSIn = createInput(str(moveSpeed)).parent(infoBox.box);
  mSIn.position(offX, 3.5*offY);

  labelPR= createDiv("plunge rate (mm/s)").parent(infoBox.box);
  labelPR.position(offX,4*offY);
  labelPR.style('width', '170px');
  pRIn = createInput(str(plungeRate)).parent(infoBox.box);
  pRIn.position(offX, 4.5*offY);

  labelMDC= createDiv("max depth cut (mm)").parent(infoBox.box);
  labelMDC.position(10,5*offY);
  labelMDC.style('width', '170px');
  mdcIn = createInput(str(maxDepthCut)).parent(infoBox.box);
  mdcIn.position(offX, 5.5*offY);

  labelTS = createDiv("tool size (in)").parent(infoBox.box);
  labelTS.position(10,6*offY);
  labelTS.style('width', '170px');
  tsIn = createInput("0.25").parent(infoBox.box);
  tsIn.position(offX, 6.5*offY);

  // material
  labelMT= createDiv("thickness (mm)").parent(matBox.box);
  labelMT.position(offX,1*offY);
  labelMT.style('width', '170px');
  mtIn = createInput(str(materialThickness)).parent(matBox.box);
  mtIn.position(offX, 1.5*offY);

  labelSX= createDiv("stock size X (mm)").parent(matBox.box);
  labelSX.position(offX,2*offY);
  labelSX.style('width', '170px');
  stockSizeXIn = createInput("610").parent(matBox.box);
  stockSizeXIn.position(offX, 2.5*offY);

  labelSY= createDiv("stock size Y (mm)").parent(matBox.box);
  labelSY.position(offX,3*offY);
  labelSY.style('width', '170px');
  stockSizeYIn = createInput("610").parent(matBox.box);
  stockSizeYIn.position(offX, 3.5*offY);

}

ParseFloat(10.13, 2, true);
function ParseFloat(nb,val, test = false) {
  str = nb.toString();

  if (str.indexOf(".") < 0 || str.slice(str.indexOf("."), str.length-1).length <= val){
    return nb;
  } else {
    str = str.slice(0, (str.indexOf(".")) + val + 1);
    return Number(str);  
  }
}
