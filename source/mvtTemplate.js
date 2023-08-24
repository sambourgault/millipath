class MvtTemplate {
    constructor(sizex, sizey) {
      this.x = 0;
      this.y = 0;
      this.w = 20;
      this.h = 20;
      this.sizeX = sizex;
      this.sizeY = sizey;
      this.lines = [];
      this.paths = new Map();
      this.changed = false;
     
     
      let index = 0;

      for (let i = 0; i < this.sizeX; i++) {
        for (let j = 0; j < this.sizeY; j++) {
          this.lines.push(
            new Line(index, i * this.w, j * this.h, i * this.w, (j + 1) * this.h)
          );
          index++;

          this.lines.push(
            new Line(index,i * this.w, j * this.h, (i + 1) * this.w, j * this.h)
          );
          index++;
  
          this.lines.push(
            new Line(index, i * this.w, j * this.h, (i + 1) * this.w, (j+1) * this.h)
          );
          index++;
        }
      }
    }
  
    display(x, y, col) {
      for (let i = 0; i < this.lines.length; i++) {
        this.lines[i].display(x, y);
      }

      strokeWeight(2);
      stroke(col);
      rect(x + this.x, y + this.y, this.w * this.sizeX, this.h * this.sizeY);
    }
  
    mousePressed(offsetX, offetY) {
      this.changed = false;
      for (let i = 0; i < this.lines.length; i++) {
        this.lines[i].mousePressed(this.paths, offsetX, offetY);
        if (this.lines[i].changed == true && this.changed == false){
          this.changed = true;
          this.lines[i].changed == false;
        }
      }
    }
  }
  