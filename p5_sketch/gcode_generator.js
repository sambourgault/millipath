class GCodeGen {
  constructor(fileName) {
    let self = this;
    this.path = [];
    this.path[0] = new createVector(20, 20, 0);
    this.writer = createWriter(fileName + ".sbp");

    this.writer.write("SA \n");
    this.writer.write("CN, 90 \n");
    this.writer.write("IF %(25)=0 THEN GOTO UNIT_ERROR\n");
    this.writer.write("&PWSafeZ = 10\n"); //mm
    this.writer.write("&PWMaterial = 20\n"); //mm
    this.writer.write("C9\n");
    this.writer.write("TR, 18000\n");
    this.writer.write("C6\nPAUSE 2\n");
    this.writer.write("MS, 16, 5\n");

    /*this.safeZ = createInput();
    this.safeZ.position(0,height - 80);*/

    this.button = createButton("save file");
    this.button.position(0, height - 50);
    this.button.style("font-family", "Poppins");

    this.generateGCode = function () {
      
      // link move in Z to go up
      self.writer.write("JZ, 20\n");
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
  }
  
  updatePath(path){
    this.path = [];
    for (let i = 0; i < path.length; i++) {
      this.path.push(path[i]);
    }
    //console.log
    /*this.path = path;
    print(this.path[10]);
    print(path[10]);*/
    console.log(path);
  }
}
