let grids = [];
let mvts = [];
let boundaries = [];
let mvtTemplate;
let w = 20;
let h = 20;
let sx = 4;
let sy = 4;

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

let boundary;
let code;
let codeGenButton;
let safeHeight = 6 //mm
let materialThickness = 50.8; //mm = 2 inches
let spindleSpeed = 18000; // rpm
let moveSpeed = 16; // mm/s
let plungeRate = 16; //mm/s
let maxDepthCut = 5; // mm
let toolSize = 0.25; // in
let toolSizeMm = toolSize * 25.4; //mm
let infoBox;
let matBox;
let sZIn, sSIn, mSIn, pRIn, mdcIn, tsIn;
let stockSizeXIn, stockSizeYIn, mtIn;
let title = "milli---path";

let textArea;
let myCodeMirror;
let consoleCodeMirror;
let codeDiv, codeDivHeader, codeButton, h2;
let codeDiv2, codeDivHeader2, codeButton2, h2_2;



function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  directions = new Directions();
  //camera(-width / 2, -600, 800, -width / 2, 0, 300, 0, 0, -1);
  //ortho(0, width / 2, height / 2, -height / 2, 0, 500);
  
  // ortho([left], [right], [bottom], [top], [near], [far])
  ortho(-width, 0, -height, 0, -width, width);
  
  // MATERIAL info boxes
  infoBox = new CollapsibleBox(210,200, '300px', "machine specs");
  matBox = new CollapsibleBox(210, 10, '180px', 'material specs');
  setupInputs();
  mvtTemplate = new MvtTemplate(sx,sy);
  
  //*** GRIDS ***//
  //constructor(x, y, xb, yb, gridmode=0, boundMode=0, spx = 50, spy = 50, sx = 150, sy = 150) 
  let pb = 60;
  // line 10mm apart
  grids[0] = new Grid(15, 15, 10, 10, 0, 3, 30, 30, 120, 120);
  // lines 50mm apart
  /*grids[1] = new Grid(15+1*120, 15, 10, 10+1*pb, 1, 3, 20, 20, 150, 150, 0.25);
  // lines with linear depth
  //grids[2] = new Grid(15+2*120+toolSizeMm/2, 15+toolSizeMm/2, 10, 10+2*pb, 0, 3, (100 - toolSizeMm)/4, (100 - toolSizeMm)/4, 120, 120, .25);
  // lines with linear depth offset
  grids[3] = new Grid(15+3*120+30/4, 15, 10, 10+3*pb, 1, 3, 33, 33, 133, 133, .25);  
  // lines with parabolic depth
  grids[4] = new Grid(15+4*120+20/4, 15, 10, 10+4*pb, 1, 3, 20, 20, 120, 120, .25);
  
  // sinus lines with constant depth 
  /*grids[5] = new Grid(15+toolSizeMm/2, 15+1*120, 10, 10+5*pb, 3, (100 - toolSizeMm)/9, 50, 110, 100);
  // sinus lines with constant depth 
  grids[6] = new Grid(15+1*120+toolSizeMm/2, 15+1*120, 10, 10+6*pb, 3, (100 - toolSizeMm)/9, 50, 110, 100);
  // perlin noise med
  grids[7] = new Grid(15+2*120+toolSizeMm/2, 15+1*120, 10, 10+7*pb, 3, (100 - toolSizeMm)/9, 100, 130, 100);
  // perlin noise low
  grids[8] = new Grid(15+3*120+toolSizeMm/2, 15+1*120, 10, 10+8*pb, 3, (100 - toolSizeMm)/9, 100, 130, 100);
  // perlin noise with amp gradation over x
  grids[9] = new Grid(15+4*120+toolSizeMm/2, 15+1*120, 10, 10+9*pb, 3, (100 - toolSizeMm)/9, 100, 120, 100);*/
  
  
  /*grids[1] = new Grid(250, 50, 10, 10+1*pb, 0, 50, 50, 200, 150);
  grids[2] = new Grid(50, 200, 10, 10+2*pb, 0, 25, 25, 140, 140);
  grids[3] = new Grid(50+25/2, 200+25/2, 10, 10+3*pb, 0, 25, 25, 140, 140);
  grids[4] = new Grid(25, 350, 10, 10+4*pb,1, 10,25, 150,175);
  grids[5] = new Grid(225, 350, 10, 10+5*pb,0, 10,150, 150,150);
  grids[6] = new Grid(425, 350, 10, 10+6*pb,0, 10,25, 100,100);*/
  
  /*grids[4] = new Grid(50 + 59,50 + 59, 10, 250,0, 140,140,141,141);
  grids[5] = new Grid(50, 200, 10, 310,0, 50, 50, 200, 150);*/
  
  for (let i = 0; i < grids.length; i++){
    grids[i].ui.box.collapse();
  }
  
  //*** MOVEMENTS ***//
  mvts[0] = new Movement(28, 0, 0);
  /*mvts[1] = new Movement(26, 0, 0);
  mvts[2] = new Movement(27, 0, 0);
  
  /*mvts[3] = new Movement(22, 0, 0);
  mvts[4] = new Movement(23, 0, 0);
  
  /*mvts[5] = new Movement(14, 0, 0);
  mvts[6] = new Movement(15, 0, 0);
  mvts[7] = new Movement(16, 0, 0);
  mvts[8] = new Movement(17, 0, 0);
  mvts[9] = new Movement(18, 0, 0);*/
  /*mvts[1] = new Movement(9, 0, 0);
  mvts[2] = new Movement(7,0,0);
  mvts[3] = new Movement(6,0,0);
  mvts[4] = new Movement(10,0,0);
  mvts[5] = new Movement(11,0,0);
  mvts[6] = new Movement(12,0,0);*/
  
  //*** BOUNDARIES ***/
  boundaries[0] = new Boundary(-64,65);
  boundaries[1] = new Boundary(-65-1*120,65);
  boundaries[2] = new Boundary(-65-2*120,65);
  boundaries[3] = new Boundary(-65-3*120,65);
  boundaries[4] = new Boundary(-65-4*120,65);
  
  /*boundaries[5] = new Boundary(-65,65+1*120);
  boundaries[6] = new Boundary(-65-1*120,65+1*120);
  boundaries[7] = new Boundary(-65-2*120,65+1*120);
  boundaries[8] = new Boundary(-65-3*120,65+1*120);
  boundaries[9] = new Boundary(-65-4*120,65+1*120);*/
  /*boundaries[1] = new Boundary(0,0);
  boundaries[2] = new Boundary(0,0);
  boundaries[3] = new Boundary(0,0);
  boundaries[4] = new Boundary(-100,425);
  boundaries[5] = new Boundary(0,0);
  boundaries[6] = new Boundary(0,0);*/
  
  // code gen
  code = new GCodeGen("test2");
  
  // code editor
  codeDiv = createDiv();
  codeDiv.position(10, height);
  codeDiv.style('width', (width/2-20)+'px');
  codeDivHeader = createDiv().parent(codeDiv);
  h2 = createElement('h3', 'code editor').parent(codeDivHeader);
  h2.style('font-family', 'Poppins');
  h2.style('margin-bottom', '0');
  codeButton = createButton('run').parent(codeDivHeader);
  codeButton.style('font-family', 'Poppins');
  codeButton.style('margin-bottom', '10px');

  
  textArea = createElement("TEXTAREA").parent(codeDiv);
  textArea.class('codemirror_textarea');
  textArea.position(0, height);
  // configs
  myCodeMirror = CodeMirror.fromTextArea(textArea.elt, {
    lineNumbers: true,
    mode: 'javascript',
  });
  
  // code editor console
  codeDiv2 = createDiv();
  codeDiv2.position(width/2, height);
  codeDiv2.style('width', (width/2-10)+'px');
  codeDivHeader2 = createDiv().parent(codeDiv2);
  h2_2 = createElement('h3', 'console').parent(codeDivHeader2);
  h2_2.style('font-family', 'Poppins');
  h2_2.style('margin-bottom', '0');
  codeButton2 = createButton('clear').parent(codeDivHeader2);
  codeButton2.style('font-family', 'Poppins');
  codeButton2.style('margin-bottom', '10px');

  textArea2 = createElement("TEXTAREA").parent(codeDiv2);
  textArea2.class('codemirror_textarea');
  textArea2.position(0, height);
  // configs
  consoleCodeMirror = CodeMirror.fromTextArea(textArea2.elt, {
    lineNumbers: false,
    mode: 'javascript',
  });
  
  myCodeMirror.on("inputRead",function(cm,obj){
    //alert("Content Changed");
    //console.log(cm.getValue("\n"));
    if (true){
      //console.log(cm.lastLine());
      //console.log(cm.getLine(cm.lastLine()));
      let com = cm.getLine(cm.lastLine());
      try {
        let cons = new Function(com);
        cons();
      }
      catch(err){
        //console.log("erro");
      }
    }
  });
  
  /*console.log(textArea.elt.parentNode);
  
  myCodeMirror =  CodeMirror(function(elt) {
    textArea.elt.parentNode.replaceChild(elt, textArea.elt);
  }, {value: textArea.value});*/
  
}

function printTest(){
  console.log("helloo");
}

function draw() {
  //console.log(textArea.parentNode);
  background(240);
  
  if (!readOnce) {
    readOnce = true;
    for (let i = 0; i < grids.length; i++){
      grids[i].updateGrid(grids[i].row,grids[i].column);
    }
  }
  
  // movement the world for viewport
  push();
  rotateZ(PI);
  translate(width/2+sizeX/2,-height/2-sizeY/2,0);
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
  
  // display the grids
  for (let i = 0; i < grids.length; i++){
    grids[i].display();
  }
  directions.display();
  for (let i = 0; i < boundaries.length; i++){
    if (boundaries[i].x != 0 || boundaries[i].y !=0){
      boundaries[i].display();
    }
  }
  code.display();
  pop();
  
  // display 
  for (let i = 0; i < boundaries.length; i++){
    push();
    boundaries[i].displayStatic();
    pop();
  }
  
  // display movement
  push();
  //mvt2.displayStatic();
  mvts[mvts.length-1].displayStatic();
  //mvts[3].displayStatic();
  pop();
  
  
  for (let i = 0; i < grids.length; i++){
    if (grids[i].changedGrid){
      code.updatePath(i, grids[i].path, mvts[i], grids[i].ui.linkState);
      
      /*console.log("helloo")
      if (i == 3){
        code.updatePath(i, grids[i].path, mvt2, grids[i].ui.linkState);
      } else if (i == 4){
        code.updatePath(i, grids[i].path, mvt3, grids[i].ui.linkState);
      } else if (i == 5) {
        code.updatePath(i, grids[i].path, mvt7, grids[i].ui.linkState);
      } else {
        code.updatePath(i, grids[i].path, mvt7, grids[i].ui.linkState);
      } */
      
      grids[i].changedGrid = false;
    }
  }
  
  push();
  //translate(-width/2-sizeX/2,height/2+sizeY/2,0);
  translate(-width+20,height-200);
  mvtTemplate.display(0,0, color(255,0,0));
  pop();
}

function mousePressed(){
  mvtTemplate.mousePressed(20, height-200);
  
}

function mouseDragged() {
  //theta = map(mouseX / width, 0, 1, -1, 1);
  thetaX = map((mouseX / width), 0, 1, 0, PI/2);
  thetaY = map((mouseY / height), 0, 1, 0, PI/2);
}

function rotateWorld(){
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
  labelSZ = createDiv("safe Z height (mm)").parent(infoBox.box);
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
  tsIn = createInput(str(toolSize)).parent(infoBox.box);
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

function ParseFloat(nb,val, test = false) {
  str = nb.toString();
  
  if (str.indexOf(".") < 0 || str.slice(str.indexOf("."), str.length-1).length <= val){
    return nb;
  } else {
    str = str.slice(0, (str.indexOf(".")) + val + 1);
    return Number(str);  
  }
}
