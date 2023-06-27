class Line {
    constructor(x1, y1, x2, y2) {
      this.x1 = x1;
      this.x2 = x2;
      this.y1 = y1;
      this.y2 = y2;
      this.offsetX = 0;
      this.offsetY = 0;
      this.statusPressed = false;
      this.index = 0;
    }
  
    display(x, y) {
      this.offsetX = x;
      this.offsetY = y;
      if (this.statusPressed) {
        stroke(0);
        strokeWeight(3);
      } else {
        stroke(240);
        strokeWeight(1);
      }
      line(x + this.x1, y + this.y1, x + this.x2, y + this.y2);
    }
  
    mousePressed() {
        console.log([mouseX, mouseY]);
        console.log(this.offsetX + (this.x2 + this.x1) / 2);
        console.log(this.offsetY + (this.y2 + this.y1) / 2);
      if (
        dist(
          mouseX,
          mouseY,
          this.offsetX + (this.x2 + this.x1) / 2,
          this.offsetY + (this.y2 + this.y1) / 2
        ) < 5
      ) {
        this.statusPressed = !this.statusPressed;
  
        if (!this.statusPressed) {
          let xtemp = this.x1;
          this.x1 = this.x2;
          this.x2 = xtemp;
        }
      }
    }
  }
  