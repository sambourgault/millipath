// cartesian grid
class Grid {
  constructor(id, x, y, mode = "LINEAR", spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0, perlinSize =[1,1]) {
    
    this.visible = false;
    this.openBox = false;
    this.id = id;
    this.new = true;
    //this.boundaryMode = boundMode;
    this.mode = mode;
    //constructor(x, y, textu) {
    const self = this;
  

    // grid layer component
    this.layerNameDiv = createDiv("grid"+this.id).parent(gridLayersBox.box);
    this.layerNameDiv.style('font-size', '14px');
    this.layerNameDiv.style('font-family', 'Poppins');
    this.layerNameDiv.position(10, 24+24*this.id);
    this.visibleBox = createCheckbox('', this.visible).parent(gridLayersBox.box);
    this.changeVisibility = function(){
      self.visible = this.checked();
    }
    this.visibleBox.changed(this.changeVisibility);
    //gridLayersBox.box.style("height", gridLayersBox.h+40*this.id+"px" );
    this.visibleBox.position(50,24+24*this.id);
    this.visibleBox.style('font-size', '14px');
    this.visibleBox.style('font-family', 'Poppins');

    //this.textu = textu;
    //this.ui = new UI(this, this.openBox, xb, yb, x, y, spx, spy, sx, sy);
    //this.x = (-this.ui.sliders[0].value() / 1000) * width;
    this.x = -x;//-Number(this.ui.sliders[0].value());
    //this.y = (this.ui.sliders[1].value() / 1000) * width;
    this.y = y; // Number(this.ui.sliders[1].value());
    //this.sizeX = int((this.ui.sliders[2].value() / 1000) * 400);
    this.sizeX = sx; //Number(this.ui.sliders[2].value());
    this.realSizeX = this.sizeX;
    this.UGX = false;
    this.sizeY = sy; //Number(this.ui.sliders[3].value());
    this.realSizeY = this.sizeY;
    this.spacingX = spx; //Number(this.ui.sliders[4].value());
    this.spacingY = spy; //Number(this.ui.sliders[5].value());
    //this.boundaryDist = Number(this.ui.sliders[8].value());
    this.row = int(this.sizeX / this.spacingX);
    this.column = int(this.sizeY / this.spacingY);
    this.depthMatrix = [];
    this.initialGridMatrix = [];
    this.gridMatrix = [];
    this.maxDepth = 0;
    this.sinAmp = sinAmp;//Number(this.ui.sliders[6].value());
    this.sinPeriod = 2;//Number(this.ui.sliders[7].value());
    this.perlinSize = perlinSize;
    //this.bindUI(self);
    this.firstPoint = true;
    this.changedGrid = false;
    this.path = [];
    this.rotations = [];
    this.reflections = [];
    this.scales = [];
    this.scalesZ = [];
    this.visibleMvts = [];
    this.translateMvtX = [];
    this.translateMvtY = [];
    this.randomizeMvtX = [];
    this.randomizeMvtY = [];
    this.randomizeMvtZ = [];

    for (let i = 0; i < this.row; i++) {
      this.gridMatrix[i] = [];
      this.initialGridMatrix[i] = [];
      this.depthMatrix[i] = [];
      //console.log("sY:"+this.spacingY);
      for (let j = 0; j < this.column; j++) {
        this.gridMatrix[i][j] = createVector(-i * this.spacingX +this.x, j * this.spacingY +this.y,10);

        this.initialGridMatrix[i][j] = createVector(
          -i * this.spacingX + this.x,
          j * this.spacingY+this.y,
          1
        );

        this.depthMatrix[i][j] = 0;
        this.rotations.push(0);
        this.scales.push(1.);
        this.scalesZ.push(1.);
        this.visibleMvts.push(1.);
        this.translateMvtX.push(0.);
        this.translateMvtY.push(0.);
        this.randomizeMvtX.push(0.);
        this.randomizeMvtY.push(0.);
        this.randomizeMvtZ.push(0.);
        
      }
    }

  }

  display() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        push();
        fill(200);

        translate(
          this.gridMatrix[i][j].x,
          this.gridMatrix[i][j].y,
          - this.maxDepth * this.gridMatrix[i][j].z
        );
        
        if (this.depthMatrix[i][j] > 0.01) {
          let ratio = this.depthMatrix[i][j];
          fill(
            255 * ratio + (1 - ratio) * 200,
            (1 - ratio) * 200,
            (1 - ratio) * 200
          );
        }

        sphere(2);
        pop();
      }
    }
  }

  depth(col) {
    return (red(col) + green(col) + blue(col)) / 3;
  }

  
 /* addTexture(textu) {
    let c;
    for (let i = 0; i < int(this.row); i++) {
      this.depthMatrix[i] = [];

      for (let j = 0; j < int(this.column); j++) {
        c = textu.get(
          textu.width - (i * this.spacingX - this.x)*textu.width/sizeX,
          (j * this.spacingY + this.y)*textu.height/sizeY
        );
        this.depthMatrix[i][j] = this.depth(c) / 255.0;
        this.gridMatrix[i][j].z = this.depth(c) / 255.0;
      }
    }
  }*/

  updateGrid(row, column) {
    //console.log("yoo");
    let c;
    let tempDepthMatrix = [];
    let tempGridMatrix = [];
    this.firstPoint = true;
    this.path = [];
    //this.rotations = [];
    //this.reflections = [];
    //this.scales = [];
    //console.log(this.spacingY);

    for (let i = 0; i < int(row); i++) {
      tempDepthMatrix[i] = [];
      tempGridMatrix[i] = [];
      for (let j = 0; j < int(column); j++) {
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = int(column) - 1 - j;
        }
        
        let x;
        let y = j2 * this.spacingY + this.y;
        if (this.mode == "LINEAR"){
          x = -i * this.spacingX + this.x;
        } else if (this.mode == "SIN"){
          //sinusoidal mode
          //x = (this.sinAmp * cos(2*PI/this.sinPeriod * j2) - i) * this.spacingX + this.x;
          x = -i * this.spacingX + this.x;
          y = (this.sinAmp * cos(2*PI/this.sinPeriod * -i) + j2) * this.spacingY + this.y;
        } else if (this.mode == "PERLIN"){
          //perlin mode
          x = (this.sinAmp * map(noise(i/this.perlinSize[0], j2/this.perlinSize[1]),0,1,-1,1) - i) * this.spacingX + this.x;
          //console.log(noise(i/50, j2/70));
        } else if (this.mode == "RANDOM"){
          //random mode
          x = (this.sinAmp * random(-1,1) - i) * this.spacingX + this.x;
          y = (this.sinAmp * random(-1,1) + j2) * this.spacingY + this.y
        }

        //let y = j2 * this.spacingY + this.y;
        c = 0.;
        //c = this.boundaryFunction2(-x,y,50,50,200);
        /*c = textu.get(
          sizeX - i * this.spacingX + this.x,
          j2 * this.spacingY + this.y
        );*/

        tempDepthMatrix[i][j2] = c; 
        tempGridMatrix[i][j2] = createVector(x,y,c);

        // now all points are in. movement defines Z.  
        //if ( tempGridMatrix[i][j2].z > 0.01){
        this.path.push(tempGridMatrix[i][j2]);
        // no rotations
       // if (this.rotations.length == 0){
         // this.rotations.push(0);
        //}
       // }
      }
    }

    this.depthMatrix = tempDepthMatrix;
    this.gridMatrix = tempGridMatrix;
    //console.log("self after:"+this.depthMatrix.length);
    this.row = row;
    this.column = column;
    //this.sinGrid(this.sinAmp, this.sinPeriod);
    this.changedGrid = true;
    this.realSizeX = (this.row-1)*this.spacingX;
    this.realSizeY = (this.column-1)*this.spacingY;
  }

  addRotations(rotationMatrix){
    this.rotations = [];
    //check if dimensions works
    if (rotationMatrix.length != this.row){
      console.log("This rotation matrix doesn't have the same number of rows as the grid.");
      return;
    }

    if (rotationMatrix[0].length != this.column){
      console.log("This rotation matrix doesn't have the same number of columns as the grid.");
      return;
    }

    for (let i = 0; i < rotationMatrix.length; i++){
      for (let j = 0; j < rotationMatrix[i].length; j++){
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }
        this.rotations.push(rotationMatrix[i][j2]);
      }
    }
    this.changedGrid = true;
  }

  addReflections(reflectionMatrix){
    this.reflections = [];
    //check if dimensions works
    if (reflectionMatrix.length != this.row){
      console.log("This rotation matrix doesn't have the same amount of rows as the grid.");
      return;
    }

    if (reflectionMatrix[0].length != this.column){
      console.log("This rotation matrix doesn't have the same amount of columns as the grid.");
      return;
    }

    for (let i = 0; i < reflectionMatrix.length; i++){
      for (let j = 0; j < reflectionMatrix[i].length; j++){
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }
        this.reflections.push(reflectionMatrix[i][j2]);
      }
    }
    this.changedGrid = true;
  }

  addScales(scaleMatrix){
    this.scales = [];
    //check if dimensions works
    if (scaleMatrix.length != this.row){
      console.log("This rotation matrix doesn't have the same amount of rows as the grid.");
      return;
    }

    if (scaleMatrix[0].length != this.column){
      console.log("This rotation matrix doesn't have the same amount of columns as the grid.");
      return;
    }

    for (let i = 0; i < scaleMatrix.length; i++){
      for (let j = 0; j < scaleMatrix[i].length; j++){
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }
        this.scales.push(scaleMatrix[i][j2]);
      }
    }
    this.changedGrid = true;
  }

  addScalesZ(scaleZMatrix){
    this.scalesZ = [];
    //check if dimensions works
    if (scaleZMatrix.length != this.row){
      console.log("This rotation matrix doesn't have the same amount of rows as the grid.");
      return;
    }

    if (scaleZMatrix[0].length != this.column){
      console.log("This rotation matrix doesn't have the same amount of columns as the grid.");
      return;
    }

    for (let i = 0; i < scaleZMatrix.length; i++){
      for (let j = 0; j < scaleZMatrix[i].length; j++){
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }
        this.scalesZ.push(scaleZMatrix[i][j2]);
      }
    }
    this.changedGrid = true;
  }

  addVisibility(visMatrix){
    this.visibleMvts = [];
    //check if dimensions works
    if (visMatrix.length != this.row){
      console.log("This rotation matrix doesn't have the same amount of rows as the grid.");
      return;
    }

    if (visMatrix[0].length != this.column){
      console.log("This rotation matrix doesn't have the same amount of columns as the grid.");
      return;
    }

    for (let i = 0; i < visMatrix.length; i++){
      for (let j = 0; j < visMatrix[i].length; j++){
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }
        this.visibleMvts.push(visMatrix[i][j2]);
      }
    }
    this.changedGrid = true;
  }

  addTranslateX(translateXMatrix){
    this.translateMvtX = [];
    //check if dimensions works
    if (translateXMatrix.length != this.row){
      console.log("This rotation matrix doesn't have the same amount of rows as the grid.");
      return;
    }

    if (translateXMatrix[0].length != this.column){
      console.log("This rotation matrix doesn't have the same amount of columns as the grid.");
      return;
    }

    //console.log("row: "+this.row+" column:" + this.column);

    for (let i = 0; i < translateXMatrix.length; i++){
      for (let j = 0; j < translateXMatrix[i].length; j++){
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }
        this.translateMvtX.push(translateXMatrix[i][j2]);
      }
    }
    this.changedGrid = true;
  }

  addTranslateY(translateYMatrix){
    this.translateMvtY = [];
    //check if dimensions works
    if (translateYMatrix.length != this.row){
      console.log("This rotation matrix doesn't have the same amount of rows as the grid.");
      return;
    }

    if (translateYMatrix[0].length != this.column){
      console.log("This rotation matrix doesn't have the same amount of columns as the grid.");
      return;
    }

    for (let i = 0; i < translateYMatrix.length; i++){
      for (let j = 0; j < translateYMatrix[i].length; j++){
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }
        this.translateMvtY.push(translateYMatrix[i][j2]);
      }
    }
    this.changedGrid = true;
  }

  addRandomX(randomXMatrix){
    this.randomizeMvtX = [];
    //check if dimensions works
    if (randomXMatrix.length != this.row){
      console.log("This rotation matrix doesn't have the same amount of rows as the grid.");
      return;
    }

    if (randomXMatrix[0].length != this.column){
      console.log("This rotation matrix doesn't have the same amount of columns as the grid.");
      return;
    }

    for (let i = 0; i < randomXMatrix.length; i++){
      for (let j = 0; j < randomXMatrix[i].length; j++){
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }
        this.randomizeMvtX.push(randomXMatrix[i][j2]);
      }
    }
    this.changedGrid = true;
  }

  addRandomY(randomYMatrix){
    this.randomizeMvtY = [];
    //check if dimensions works
    if (randomYMatrix.length != this.row){
      console.log("This rotation matrix doesn't have the same amount of rows as the grid.");
      return;
    }

    if (randomYMatrix[0].length != this.column){
      console.log("This rotation matrix doesn't have the same amount of columns as the grid.");
      return;
    }

    for (let i = 0; i < randomYMatrix.length; i++){
      for (let j = 0; j < randomYMatrix[i].length; j++){
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }
        this.randomizeMvtY.push(randomYMatrix[i][j2]);
      }
    }
    this.changedGrid = true;
  }

  addRandomZ(randomZMatrix){
    this.randomizeMvtZ = [];
    //check if dimensions works
    if (randomZMatrix.length != this.row){
      console.log("This rotation matrix doesn't have the same amount of rows as the grid.");
      return;
    }

    if (randomZMatrix[0].length != this.column){
      console.log("This rotation matrix doesn't have the same amount of columns as the grid.");
      return;
    }

    for (let i = 0; i < randomZMatrix.length; i++){
      for (let j = 0; j < randomZMatrix[i].length; j++){
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }
        this.randomizeMvtZ.push(randomZMatrix[i][j2]);
      }
    }
    this.changedGrid = true;
  }

  boundaryFunction(x, y){
    let d = this.circle(x, y, this.boundaryDist);
    return d;
  }

  boundaryFunction2(x, y, bx, by, size){
    let d = 0;
    if (x > bx && x < bx+size && y > by && y < by +size) d = 1.;
    return d;
  }

  circle(x, y, r){
    let d = dist(x,y,this.x-this.sizeX/2, this.y+this.sizeY/2);
    if (d > r){
      return 0.;
    }
    return 1.;
  }

  //1D pattern
  sinGrid(a, b) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        this.gridMatrix[i][j].x =
          (a * cos(2*PI/b * j) - i) * this.spacingX + this.x;
          //console.log(this.gridMatrix[i][j].y);
          //console.log(sin(2*PI/b * j));
      }
    }
  }

  //2D pattern
}
