class GCodeGen {
  constructor(fileName) {
    let self = this;
    this.paths = [];
    this.path = [];
    this.path[0] = new createVector(0, 0, safeHeight);
    this.paths.push(this.path);
    this.typePaths = [];
    this.typePaths.push("J");
    this.writer = createWriter(fileName + ".sbp");

    this.writer.write("SA \n");
    this.writer.write("CN, 90 \n");
    this.writer.write("IF %(25)=0 THEN GOTO UNIT_ERROR\n");
    this.writer.write("&PWSafeZ = " + sZIn.value() + "\n"); //mm
    this.writer.write("&PWMaterial = " + mtIn.value() + "\n"); //mm
    this.writer.write("C9\n");
    this.writer.write("TR," + sSIn.value() +"\n");
    this.writer.write("C6\nPAUSE 2\n");
    this.writer.write("MS," + mSIn.value() +"," + pRIn.value() + "\n");

    /*this.safeZ = createInput();
    this.safeZ.position(0,height - 80);*/

    this.button = createButton("save file");
    this.button.position(20, height - 50);
    this.button.style("font-family", "Poppins");

    this.simSlider =  createSlider(0.,1000.,0);
    this.simSlider.addClass("sliders");
    this.simSlider.position(width/2 - 75, height - 100);
    this.simSlider.style('width', '150px');
    this.simSlider.style('background-color', '#7C7C7C');

    this.playButton = createButton("play");
    this.playButton.position(width/2-85, height - 50);
    this.playButton.style("font-family", "Poppins");
    this.playButton.style("width", "75px");

    this.pauseButton = createButton("pause");
    this.pauseButton.position(width/2+10, height - 50);
    this.pauseButton.style("font-family", "Poppins");
    this.pauseButton.style("width", "75px");

    this.tool = new Tool();
    this.play = false;
    this.playTime = 0;
    this.indexJPlay = 0;
    this.indexPlay = 0;
    this.linkState = false;
    this.movement;
    this.mvtScale = 0.2;

    this.generateGCode = function () {
      
      // HOME
      // link move in Z to go up
      self.writer.write("JZ," + self.paths[0][0].z + "\n");
      // link move to 0,0 in XY
      self.writer.write("J2,"+ self.paths[0][0].x +","+ self.paths[0][0].y +"\n");
      // add all next link and feed move based on typePaths[j]

      for (let j = 0; j < self.paths.length; j++){
        for (let i = 0; i < self.paths[j].length; i++) {
          if (j == 0 && i ==0){
            // skip first point of paths[0];
          }
          else{
            self.writer.write(self.typePaths[j]+"3,"+
            self.paths[j][i].x +
            ", " +
            self.paths[j][i].y +
            ", " +
            self.paths[j][i].z +
            "\n"
            );
          }
        }
      }

      // REHOME
      // link move in Z to go up
      //self.writer.write("JZ," + safeHeight + "\n");
      // link move to 0,0 in XY
      //self.writer.write("J2, 0, 0\n");

      self.writer.close();
    };
    this.button.mousePressed(this.generateGCode);

    this.beginSimulation = function(){
      self.play = true;
      self.playTime = millis();
    }
    this.playButton.mousePressed(this.beginSimulation);

    this.pauseSimulation = function(){
      self.play = false;
    }
    this.pauseButton.mousePressed(this.pauseSimulation);
  }
  
  updatePath(grid, mvt, linkState){
    this.movement = mvt;
    this.linkState = linkState;
    //add first path point to jog path
    this.paths = [];
    this.typePaths = [];
    this.typePaths.push("J");
    this.paths[0] = [];
    this.paths[0][0] = new createVector(0,0,safeHeight);
    //this.paths[0][1] = new createVector(grid[0].x+this.mvtScale*mvt.path[0].x, grid[0].y+this.mvtScale*mvt.path[0].y, safeHeight);
    //this.paths[0][1] = new createVector(grid[0].x, grid[0].y, safeHeight);
    //console.log(this.paths[0][1]);
    
    if (this.linkState == true){
      // reset second move path
      this.paths[1] = [];
      this.typePaths[1] = "M";
      //add first plunge to second move path
      this.paths[1].push(this.paths[0][1]);
      // add grid points
      for (let i = 0; i < grid.length; i++) {
        this.paths[1].push(grid[i]);
      }
      // add retract at the end
      let last =  grid[grid.length - 1];
      this.paths[1].push(new createVector(last.x, last.y, safeHeight));
    } else {
      for (let i = 1; i < grid.length+1 ; i++){
        // add jog move from previous position to over current point
        this.paths[2*i - 1] = [];
        this.typePaths[2*i - 1] = "J";
        //let previousPathPoint = this.paths[2*i-2][this.paths[2*i-2].length-1];
        //this.paths[2*i-1].push(previousPathPoint);
        this.paths[2*i-1].push(new createVector(grid[i-1].x+this.mvtScale*mvt.path[0].x, grid[i-1].y+this.mvtScale*mvt.path[0].y, safeHeight));
        
        //add feed move
        this.paths[2*i] = [];
        this.typePaths[2*i] = "M";
        for (let k = 0; k < mvt.path.length; k++){
          this.paths[2*i].push(new createVector(grid[i-1].x+this.mvtScale*mvt.path[k].x, grid[i-1].y+this.mvtScale*mvt.path[k].y, grid[i-1].z+this.mvtScale*mvt.path[k].z));
        }
        // add retract to safe Z height
        let lastPoint = this.paths[2*i][this.paths[2*i].length-1];
        this.paths[2*i].push(new createVector(lastPoint.x, lastPoint.y, safeHeight));
      }
      // REHOME
      this.typePaths.push("J");
      let lastJog = [];
      //let temp = this.paths[2*grid.length][this.paths[2*grid.length].length-1];
      //lastJog.push(temp);
      lastJog.push(this.paths[0][0]);
      this.paths.push(lastJog);
    }

  }

  display(){
    if (this.play){
      if (millis() - this.playTime > 100){
        this.indexPlay+=1;
        this.playTime = millis();
      }
      if (this.indexPlay > this.paths[this.indexJPlay].length-1) {
        this.indexPlay = 0;
        this.indexJPlay += 1;
        if (this.indexJPlay > this.paths.length-1){
          this.indexJPlay = 0;
        }
      }
    } else {
      this.indexPlay = int(this.simSlider.value()/1000*(this.paths[this.indexJPlay].length-1));
    }

    this.tool.display(this.paths[this.indexJPlay][this.indexPlay]);

    this.displayPath();

  }

  displayPath() {
    
    fill(255, 0);
    strokeWeight(2);

    // draw each path
    for (let j = 0; j < this.paths.length; j++){
      if (this.typePaths[j] == "J"){
        stroke(0, 255, 0);
      } else if (this.typePaths[j] == "M"){
        stroke(255, 0, 0);
      }

      //console.log(j +":" +this.paths[j]);
      for (let i = 0; i < this.paths[j].length; i++){
        // if (i == 1){
        //   push();
        //   translate(this.paths[j][i-1]);
        //   sphere(5);
        //   pop();
        // }
        //stroke(255, 0, 0);
        let previous;
        if (i == 0 && j != 0){
          previous = this.paths[j-1][this.paths[j-1].length - 1];
          //console.log(previous);
        } else if (i == 0 && j == 0){
          previous = new createVector(0,0,safeHeight);
         // console.log(previous);
        } else {
          previous = this.paths[j][i-1];
          //console.log(previous);
        }
        let current = this.paths[j][i];
        push();
        translate(0,0,70);
        line(previous.x, previous.y, previous.z, current.x, current.y, current.z);
        pop();
      }
    }
    //console.log("yoo")
  

    /*let previousPoint = new createVector();
    //beginShape();
    for (let i = 0; i < this.row; i++) {
      //console.log("i:" + i);
      for (let j = 0; j < this.column; j++) {
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = this.column - 1 - j;
        }

        if (this.depthMatrix[i][j2] > 0.01) {
          if (this.firstPoint) {
            previousPoint.x = this.gridMatrix[i][j2].x;
            previousPoint.y = this.gridMatrix[i][j2].y;
            previousPoint.z = 100 - this.maxDepth * this.gridMatrix[i][j2].z;
            this.firstPoint = false;
          } else {
            line(
              previousPoint.x,
              previousPoint.y,
              previousPoint.z,
              this.gridMatrix[i][j2].x,
              this.gridMatrix[i][j2].y,
              100 - this.maxDepth * this.gridMatrix[i][j2].z
            );
            previousPoint.x = this.gridMatrix[i][j2].x;
            previousPoint.y = this.gridMatrix[i][j2].y;
            previousPoint.z = 100 - this.maxDepth * this.gridMatrix[i][j2].z;
          }
        }
      }
      //console.log(this.path);
    }*/
    
      //this.firstPoint = true;
    
    //endShape();
    noStroke();
  }
}
