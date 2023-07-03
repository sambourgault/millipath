class Line {
    constructor(id, x1, y1, x2, y2) {
      this.id = id;
      this.x1 = x1;
      this.x2 = x2;
      this.y1 = y1;
      this.y2 = y2;
      this.l = dist(x1/w,y1/h,x2/w,y2/h);
      this.angle = atan((y2-y1)/(x2-x1));
      this.offsetX = 0;
      this.offsetY = 0;
      this.statusPressed = false;
      this.index = 0;
      this.changed = false;
    }
  
    display(x, y) {
      this.offsetX = x;
      this.offsetY = y;
      if (this.statusPressed) {
        stroke(0);
        strokeWeight(3);
      } else {
        stroke(220);
        strokeWeight(1);
      }
      line(x + this.x1, y + this.y1, x + this.x2, y + this.y2);
    }
  
    mousePressed(paths,offsetX, offsetY) {
      if (
        dist(
          mouseX - offsetX,
          mouseY - offsetY,
          this.offsetX + (this.x2 + this.x1) / 2,
          this.offsetY + (this.y2 + this.y1) / 2
        ) < 5
      ) {
        this.statusPressed = !this.statusPressed;
        this.changed = true;

        if (!this.statusPressed) {
          let ytemp = this.y1;
          this.y1 = this.y2;
          this.y2 = ytemp;
          this.l = dist(this.x1/w,this.y1/h,this.x2/w,this.y2/h);
          this.angle = atan((this.y2-this.y1)/(this.x2-this.x1));
          
          paths.delete(this.id);
        } else {
          paths.set(this.id, this);
        }

        /*console.log(this.x1);
       
        console.log(this.y1);
        console.log(this.x2);
        console.log(this.y2);
        console.log(this.angle);*/
        
      } else {
        this.changed = false;
      }
    }
  }
  