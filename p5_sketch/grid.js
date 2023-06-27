// cartesian grid
class Grid {
  constructor(x, y, xb, yb, boundMode=0, spx = 50, spy = 50, sx = 150, sy = 150) {
    this.visible = false;
    this.openBox = false;
    this.boundaryMode = boundMode;
    //constructor(x, y, textu) {
    const self = this;
    //this.textu = textu;
    this.ui = new UI(this, this.openBox, xb, yb, x, y, spx, spy, sx, sy);
    //this.x = (-this.ui.sliders[0].value() / 1000) * width;
    this.x = -Number(this.ui.sliders[0].value());
    //this.y = (this.ui.sliders[1].value() / 1000) * width;
    this.y = Number(this.ui.sliders[1].value());
    //this.sizeX = int((this.ui.sliders[2].value() / 1000) * 400);
    this.sizeX = Number(this.ui.sliders[2].value());
    this.realSizeX = this.sizeX;
    this.UGX = false;
    //this.sizeY = int((this.ui.sliders[3].value() / 1000) * 400);
    this.sizeY = Number(this.ui.sliders[3].value());
    this.realSizeY = this.sizeY;
    //this.spacingX = (this.ui.sliders[4].value() / 1000) * 50;
    this.spacingX = Number(this.ui.sliders[4].value());
    //this.spacingY = (this.ui.sliders[5].value() / 1000) * 50;
    this.spacingY = Number(this.ui.sliders[5].value());

    //this.boundaryDist = (this.ui.sliders[8].value() / 1000) * 200;
    this.boundaryDist = Number(this.ui.sliders[8].value());
    //console.log("sizex: "+this.sizeX);
    this.row = int(this.sizeX / this.spacingX);
    //console.log(this.row);
    this.column = int(this.sizeY / this.spacingY);
    this.depthMatrix = [];
    this.initialGridMatrix = [];
    this.gridMatrix = [];
    this.maxDepth = 30;
    //this.sinAmp = (this.ui.sliders[6].value() / 1000) * 2;
    this.sinAmp = Number(this.ui.sliders[6].value());
    //this.sinPeriod = (this.ui.sliders[7].value() / 1000) * 30 + 2;
    this.sinPeriod = Number(this.ui.sliders[7].value());
    this.bindUI(self);
    this.firstPoint = true;
    this.changedGrid = false;
    this.path = [];
    this.paths = [];

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

        this.depthMatrix[i][j] = -0.1;
      }
    }
    //this.ui.box.collapse();
    //console.log("at creation: " + this.gridMatrix[0][0]);
    //this.sinGrid(this.sinAmp, this.sinPeriod);
  }

  display() {
    //console.log(this.row);
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
    //console.log(this.spacingY);

    for (let i = 0; i < int(row); i++) {
      tempDepthMatrix[i] = [];
      tempGridMatrix[i] = [];
      for (let j = 0; j < int(column); j++) {
        let j2 = j;
        if ((i + 1) % 2 == 0) {
          j2 = int(column) - 1 - j;
        }
        //console.log(j2);
        
       /* c = textu.get(
          textu.width - (i * this.spacingX - this.x)*textu.width/sizeX,
          (j2 * this.spacingY + this.y)*textu.height/sizeY
        );*/
        
        //c = this.boundaryFunction(-i * this.spacingX + this.x, j2 * this.spacingY + this.y);
        let x = -i * this.spacingX + this.x;
        let y = j2 * this.spacingY + this.y;
        c = 0.;
        //c = this.boundaryFunction2(-x,y,50,50,200);
        /*c = textu.get(
          sizeX - i * this.spacingX + this.x,
          j2 * this.spacingY + this.y
        );*/

        tempDepthMatrix[i][j2] = c; //this.depth(c) / 255.0;
        tempGridMatrix[i][j2] = createVector(
          -i * this.spacingX + this.x,
          j2 * this.spacingY + this.y,
          c //this.depth(c) / 255.0
        );

        // now all points are in. movement defines Z.  
        //if ( tempGridMatrix[i][j2].z > 0.01){
          this.path.push(tempGridMatrix[i][j2]);
       // }
      }
    }

    this.depthMatrix = tempDepthMatrix;
    this.gridMatrix = tempGridMatrix;
    //console.log("self after:"+this.depthMatrix.length);
    this.row = row;
    this.column = column;
    this.sinGrid(this.sinAmp, this.sinPeriod);
    this.changedGrid = true;
    this.realSizeX = (this.row-1)*this.spacingX;
    this.realSizeY = (this.column-1)*this.spacingY;
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

  bindUI(self) {
    this.updateX = function () {
      //console.log(self.changedGrid);
      //self.x = Number((-this.value() / 1000) * width);
      self.x = Number(-this.value());
      //document.querySelector("#div0").innerHTML = "x: " + int(-self.x);
      self.updateGrid(self.row, self.column);
      //self.changedGrid = true;
    };
    this.ui.sliders[0].changed(this.updateX);

    this.updateY = function () {
      //console.log(this.value());
      //self.y = Number((this.value() / 1000) * width);
      self.y = Number(this.value());
      //document.querySelector("#div1").innerHTML = "y: " + int(self.y);
      self.updateGrid(self.row, self.column);
      //self.changedGrid = true;
    };
    this.ui.sliders[1].changed(this.updateY);

    this.updateSizeX = function () {
      //self.changedGrid = true;
      //console.log(self);
      //self.sizeX = Number((this.value() / 1000) * 400);
      self.sizeX = Number(this.value());
      //self.row = int(self.sizeX);//int(self.sizeX / self.spacingX);
      self.updateGrid(int(self.sizeX / self.spacingX), self.column);
      //document.querySelector("#div2").innerHTML = "size X: " + int(self.sizeX);
      //self.UGX = true;
    };
    this.ui.sliders[2].changed(this.updateSizeX);

    this.updateSizeY = function () {
      //self.changedGrid = true;
      //console.log(this.value());
      //self.sizeY = Number((this.value() / 1000) * 400);
      self.sizeY = Number(this.value());
      //self.column = int(self.sizeY); //int(self.sizeY / self.spacingY);
      self.updateGrid(self.row, int(self.sizeY / self.spacingY));
      //document.querySelector("#div3").innerHTML = "size Y: " + int(self.sizeY);
    };
    this.ui.sliders[3].changed(this.updateSizeY);

    this.updateDensX = function () {
      //self.changedGrid = true;
      //console.log(this.value());
      //self.spacingX = Number((this.value() / 1000) * 50);
      self.spacingX = Number(this.value());
      //self.row = int(self.sizeX / self.spacingX);
      self.updateGrid(int(self.sizeX / self.spacingX), self.column);
      //document.querySelector("#div4").innerHTML = "spacing X: " + int(self.spacingX);
    };
    this.ui.sliders[4].changed(this.updateDensX);

    this.updateDensY = function () {
      //self.changedGrid = true;
      //console.log(this.value());
      //self.spacingY = Number((this.value() / 1000) * 50);
      self.spacingY = Number(this.value());
      //self.column = int(self.sizeY / self.spacingY);
      self.updateGrid( self.row, int(self.sizeY / self.spacingY));
      //document.querySelector("#div5").innerHTML ="spacing Y: " + int(self.spacingY);
    };
    this.ui.sliders[5].changed(this.updateDensY);

    this.updateBoundaryDist = function(){
      //self.boundaryDist = Number(this.value()/1000 * 200);
      self.boundaryDist = Number(this.value());
      self.updateGrid( self.row, self.column);
      //document.querySelector("#div8").innerHTML = "dist: " + int(self.boundaryDist);
    }
    this.ui.sliders[8].changed(this.updateBoundaryDist);

    this.updateSinAmp = function () {
      //self.changedGrid = true;
      //self.sinAmp = Number((this.value() / 1000) * 2.);
      self.sinAmp = Number(this.value());
      //self.sinGrid(self.sinAmp, self.sinPeriod);
      self.updateGrid( self.row, self.column);
      //document.querySelector("#div6").innerHTML ="amp: " + float(self.sinAmp);
    };
    this.ui.sliders[6].changed(this.updateSinAmp);

    this.updateSinPeriod = function () {
      //self.changedGrid = true;
      //self.sinPeriod = int(Number((this.value() / 1000) * 50))+2;
      self.sinPeriod = Number(this.value());
      //self.sinGrid(self.sinAmp, self.sinPeriod);
      self.updateGrid( self.row, self.column);
      //document.querySelector("#div7").innerHTML = "period: " + int(self.sinPeriod);
    };
    this.ui.sliders[7].changed(this.updateSinPeriod);


  }
}
