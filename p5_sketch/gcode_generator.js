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
    this.button.position(0, height - 50);
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
    this.indexPlay = 0;

    this.generateGCode = function () {
      
      // link move in Z to go up
      self.writer.write("JZ, 100\n");
      // link move to 0,0 in XY
      self.writer.write("J2, 0, 0\n");
      // link move above first point of path
      self.writer.write(
        "J3," +
          self.path[0].x +
          ", " +
          self.path[0].y +
          ", " +
          self.path[0].z +
          "\n"
      );
      // feed move through the path
      for (let i = 0; i < self.path.length; i++) {
        self.writer.write(
          "M3, " +
            self.path[i].x +
            ", " +
            self.path[i].y +
            ", " +
            self.path[i].z +
            "\n"
        );
      }
      // link move in Z to go up
      self.writer.write("JZ, 20\n");
      // link move to 0,0 in XY
      self.writer.write("J2, 0, 0\n");

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
  
  updatePath(path){
    //add first path point to jog path
    this.paths[0].push(new createVector(path[0].x, path[0].y, safeHeight));
    
    // reset second move path
    this.paths[1] = [];
    this.typePaths[1] = "M";
    for (let i = 0; i < path.length; i++) {
      this.path.push(path[i]);
    }
    //console.log
    /*this.path = path;
    print(this.path[10]);
    print(path[10]);*/
    //console.log(path);
  }

  display(){
    if (this.play){
      //console.log("yoo");
      if (millis() - this.playTime > 100){
        this.indexPlay+=1;
        this.playTime = millis();
      }
      if (this.indexPlay > this.path.length-1) {
        this.indexPlay = 0;
      }
    } else {
      //console.log("hello?")
      this.indexPlay = int(this.simSlider.value()/1000*(this.path.length-1));
    }
    //console.log(this.indexPlay);
    this.tool.display(this.path[this.indexPlay]);


  }
}
