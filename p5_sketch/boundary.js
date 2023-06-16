class Boundary{
    constructor(x, y){
        this.sizeX = 300;
        this.sizeY = 400;
        this.x = x ;
        this.y = y ;
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1;
        this.path = [];
        this.label= createDiv("boundaries");
        this.label.style('font-size', '14px');
        this.label.style('font-family', 'Poppins');
        this.label.position(width - this.sizeX-20, height- this.sizeY - 40);
    
        this.path = [];
        this.makeBoundary();   
    }

    makeBoundary(){
        //this.point(0,0);
        this.polygon(100*this.scale, 4);
        //this.hypertrochoid(100*this.scale,20*this.scale,40*this.scale,100, 10);
        //this.hypotrochoid(100*this.scale,20*this.scale,60*this.scale,21, 360/20);
    }

    setOffset(x, y){
        this.offsetX = -x;
        this.offsetY = -y;
    }

    displayStatic(){
        //frame
        //console.log("yooo")
        push();
        fill(255, 100);
        //fill(255,0,0);
        translate(this.offsetX, this.offsetY);
        rotateZ(-PI);
        rect(-this.sizeX-20,0,this.sizeX,this.sizeY);
        //trasnlate(this.)
        //push();
        //rotateZ(PI);
        //translate(this.sizeX/2+grid1.realSizeX/2+20-grid1.x, this.y-this.sizeY/2-grid1.realSizeY/2-grid1.y, 50);//this.sizeY);
        //grid1.display();
        //pop();
        // display boundary
        
        stroke(255,0,0);
        strokeWeight(2);
        push();
        translate(-this.sizeX/2-20, this.sizeY/2, 20);
        //translate(-20,0, 20);
        this.displayPath();
        pop();

        pop();
        noFill();
        noStroke();
      }

      display(){
        let previous = new createVector(0,0);
        let x,y,z;
        stroke(0,0,255);
        strokeWeight(2);
        
        for (let i = 0; i < this.path.length; i++){
    
            x = this.path[i].x;
            y = this.path[i].y;
            z = this.path[i].z;
      
           if (i != 0){
            push();
            translate(this.x, this.y, 0);
            line(previous.x, previous.y,previous.z,x,y,z);
            pop();
           }

            previous.x = x;
            previous.y = y;
            previous.z = z;
      }
    }

      displayPath(){
        let previous = new createVector(0,0);
        let x,y,z;
        stroke(0,0,255);
        for (let i = 0; i < this.path.length; i++){
    
          //x = this.translateX(this.path[i].x);
          //y = this.translateY(this.path[i].y);
          x = this.path[i].x;
          y = this.path[i].y;
          z = this.path[i].z;
    
         if (i != 0){
          line(previous.x, previous.y,previous.z,x,y,z);
         }
    
         if (this.path.length == 1){
          push();
          translate(x,y,z);
          sphere(2);
          pop();
         }
    
          previous.x = x;
          previous.y = y;
          previous.z = z;
        }
      }

      polygon(r, nbSides){
        let t,x,y,z;
        for (let i = 0; i < nbSides; i++){
          t = 360/nbSides*i*PI/180+PI/4;
          x = r*cos(t);
          y = r*sin(t);
          z = 0;
          this.path[i] = new createVector(x,y,z);
        }
        // to close the polygon
        this.path[nbSides] = this.path[0];
      }

      translateX(x){
        return x - this.x - this.sizeX ;
      }
    
      translateY(y){
        return -y - this.y + this.sizeY ;
      }
}