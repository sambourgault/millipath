// cartesian grid
class Grid {
  constructor(x, y, textu) {
    const self = this;
    this.textu = textu;
    this.ui = new UI();
    this.x = (-this.ui.sliders[0].value() / 1000) * width;
    this.y = (this.ui.sliders[1].value() / 1000) * width;
    this.sizeX = int((this.ui.sliders[2].value() / 1000) * width);
    this.UGX = false;
    this.sizeY = int((this.ui.sliders[3].value() / 1000) * width);
    this.spacingX = (this.ui.sliders[4].value() / 1000) * 50;
    this.spacingY = (this.ui.sliders[5].value() / 1000) * 50;
    this.row = int(this.sizeX / this.spacingX);
    this.column = int(this.sizeY / this.spacingY);
    this.depthMatrix = [];
    this.initialGridMatrix = [];
    this.gridMatrix = [];
    this.maxDepth = 30;
    this.sinAmp = 0;
    this.sinFreq = 0;
    this.bindUI(self);
    this.firstPoint = true;
    this.changedGrid = false;
    this.path = [];

    for (let i = 0; i < this.row; i++) {
      this.gridMatrix[i] = [];
      this.initialGridMatrix[i] = [];

      for (let j = 0; j < this.column; j++) {
        this.gridMatrix[i][j] = createVector(
          -i * this.spacingX + this.x,
          j * this.spacingY + this.y,
          10
        );

        this.initialGridMatrix[i][j] = createVector(
          -i * this.spacingX + this.x,
          j * this.spacingY,
          10
        );
      }
    }
    
    //console.log("at creation: " + this.gridMatrix[0][0]);
    this.sinGrid(this.sinAmp, this.sinFreq);

  }

  display() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        push();
        fill(200);
        //console.log(this.x);
        /*translate(this.x-this.sizeX/2,-this.y+this.sizeY/2,0);
        rotateZ(0.1*millis()/1000);
        translate(-this.x+this.sizeX/2,this.y-this.sizeY/2,0);*/

        translate(
          this.gridMatrix[i][j].x,
          this.gridMatrix[i][j].y,
          100 - this.maxDepth * this.gridMatrix[i][j].z
        );
        if (this.depthMatrix[i][j] > 0.01) {
          let ratio = this.depthMatrix[i][j];
          fill(
            255 * ratio + (1 - ratio) * 200,
            (1 - ratio) * 200,
            (1 - ratio) * 200
          );
        }

        /*if (i == 0 && j == 0){
          sphere(10);
        }*/

        sphere(2);
        pop();
      }
    }
    //console.log("at display: " + this.gridMatrix[0][0]);
    //this.displayPath();
  }

  depth(col) {
    return (red(col) + green(col) + blue(col)) / 3;
  }

  /*displayPath() {
    fill(255, 0);
    strokeWeight(2);
    stroke(255, 0, 0);
  

    let previousPoint = new createVector();
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
    }
    
      this.firstPoint = true;
    
    //endShape();
    noStroke();
  }*/


  addTexture(textu) {
    let c;
    for (let i = 0; i < int(this.row); i++) {
      this.depthMatrix[i] = [];

      for (let j = 0; j < int(this.column); j++) {
        /*c = textu.get(
          textu.width - i * this.spacingX + this.x,
          j * this.spacingY + this.y
        );*/
        c = textu.get(
          textu.width - (i * this.spacingX - this.x)*textu.width/sizeX,
          (j * this.spacingY + this.y)*textu.height/sizeY
        );
        this.depthMatrix[i][j] = this.depth(c) / 255.0;
        //print("i:"+ i+" j:"+j);
        //print(this.gridMatrix[i][j]);
        this.gridMatrix[i][j].z = this.depth(c) / 255.0;
      }
    }
  }

  updateGrid(textu, row, column) {
    //console.log("yoo");
    let c;
    let tempDepthMatrix = [];
    let tempGridMatrix = [];
    this.firstPoint = true;
    this.path = [];
    //console.log(textu.width);
    for (let i = 0; i < int(row); i++) {
      tempDepthMatrix[i] = [];
      tempGridMatrix[i] = [];
      for (let j = 0; j < int(column); j++) {
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = int(column) - 1 - j;
        }
        //console.log(j2);
        
        c = textu.get(
          textu.width - (i * this.spacingX - this.x)*textu.width/sizeX,
          (j2 * this.spacingY + this.y)*textu.height/sizeY
        );

        /*c = textu.get(
          sizeX - i * this.spacingX + this.x,
          j2 * this.spacingY + this.y
        );*/

        tempDepthMatrix[i][j2] = this.depth(c) / 255.0;
        tempGridMatrix[i][j2] = createVector(
          -i * this.spacingX + this.x,
          j2 * this.spacingY + this.y,
          this.depth(c) / 255.0
        );
        if ( tempGridMatrix[i][j2].z > 0.01){
          this.path.push(tempGridMatrix[i][j2]);
        }
      }
    }

    this.depthMatrix = tempDepthMatrix;
    this.gridMatrix = tempGridMatrix;
    //console.log("self after:"+this.depthMatrix.length);
    this.row = row;
    this.column = column;
    this.sinGrid(this.sinAmp, this.sinFreq);
    this.changedGrid = true;
  }

  //1D pattern
  sinGrid(a, b) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        this.gridMatrix[i][j].x =
          (a * sin(b * this.gridMatrix[i][j].y) - i) * this.spacingX + this.x;
      }
    }
  }

  //2D pattern

  bindUI(self) {
    this.updateX = function () {
      //console.log(self.changedGrid);
      self.x = Number((-this.value() / 1000) * width);
      document.querySelector("#div0").innerHTML = "x: " + int(-self.x);
      self.updateGrid(self.textu, self.row, self.column);
      //self.changedGrid = true;
    };
    this.ui.sliders[0].changed(this.updateX);

    this.updateY = function () {
      //console.log(this.value());
      self.y = Number((this.value() / 1000) * width);
      document.querySelector("#div1").innerHTML = "y: " + int(self.y);
      self.updateGrid(self.textu, self.row, self.column);
      //self.changedGrid = true;
    };
    this.ui.sliders[1].changed(this.updateY);

    this.updateSizeX = function () {
      //self.changedGrid = true;
      //console.log(self);
      self.sizeX = Number((this.value() / 1000) * width);
      //self.row = int(self.sizeX);//int(self.sizeX / self.spacingX);
      self.updateGrid(self.textu, int(self.sizeX / self.spacingX), self.column);
      document.querySelector("#div2").innerHTML = "size X: " + int(self.sizeX);
      //self.UGX = true;
    };
    this.ui.sliders[2].changed(this.updateSizeX);

    this.updateSizeY = function () {
      //self.changedGrid = true;
      //console.log(this.value());
      self.sizeY = Number((this.value() / 1000) * width);
      //self.column = int(self.sizeY); //int(self.sizeY / self.spacingY);
      self.updateGrid(self.textu, self.row, int(self.sizeY / self.spacingY));
      document.querySelector("#div3").innerHTML = "size Y: " + int(self.sizeY);
    };
    this.ui.sliders[3].changed(this.updateSizeY);

    this.updateDensX = function () {
      //self.changedGrid = true;
      //console.log(this.value());
      self.spacingX = Number((this.value() / 1000) * 50);
      //self.row = int(self.sizeX / self.spacingX);
      self.updateGrid(self.textu, int(self.sizeX / self.spacingX), self.column);
      document.querySelector("#div4").innerHTML =
        "spacing X: " + int(self.spacingX);
    };
    this.ui.sliders[4].changed(this.updateDensX);

    this.updateDensY = function () {
      //self.changedGrid = true;
      //console.log(this.value());
      self.spacingY = Number((this.value() / 1000) * 50);
      //self.column = int(self.sizeY / self.spacingY);
      self.updateGrid(self.textu, self.row, int(self.sizeY / self.spacingY));
      document.querySelector("#div5").innerHTML =
        "spacing Y: " + int(self.spacingY);
    };
    this.ui.sliders[5].changed(this.updateDensY);

    this.updateSinAmp = function () {
      //self.changedGrid = true;
      self.sinAmp = Number((this.value() / 1000) * 2);
      self.sinGrid(self.sinAmp, self.sinFreq);
    };
    this.ui.sliders[6].changed(this.updateSinAmp);

    this.updateSinFreq = function () {
      //self.changedGrid = true;
      self.sinFreq = Number((this.value() / 1000) * 2);
      self.sinGrid(self.sinAmp, self.sinFreq);
    };
    this.ui.sliders[7].changed(this.updateSinFreq);
  }
}
