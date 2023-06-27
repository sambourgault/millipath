class MvtTemplate {
    constructor(sizex, sizey) {
      this.x = 0;
      this.y = 0;
      this.w = 20;
      this.h = 20;
      this.sizeX = sizex;
      this.sizeY = sizey;
      this.lines = [];
      for (let i = 0; i < this.sizeX; i++) {
        for (let j = 0; j < this.sizeY; j++) {
          this.lines.push(
            new Line(i * this.w, j * this.h, i * this.w, (j + 1) * this.h)
          );
          this.lines.push(
            new Line(i * this.w, j * this.h, (i + 1) * this.w, j * this.h)
          );
  
          this.lines.push(
            new Line(i * this.w, j * this.h, (i + 1) * this.w, (j+1) * this.h)
          );
        }
      }
    }
  
    display(x, y, col) {
      //fill(255);
      strokeWeight(2);
      stroke(col);
      rect(x + this.x, y + this.y, this.w * this.sizeX, this.h * this.sizeY);
      for (let i = 0; i < this.lines.length; i++) {
        this.lines[i].display(x, y);
      }
    }
  
    mousePressed() {
      for (let i = 0; i < this.lines.length; i++) {
        this.lines[i].mousePressed();
      }
    }
  }
  