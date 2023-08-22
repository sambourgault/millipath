let boundary = function(x,y,cX,cY,rX,rY){
    let dx = abs(-x + cX) - rX;
    let dy = abs(y - cY) - rY;
    
    let d = sqrt((max(dx, 0))^2 + max(dy, 0)^2) + min(max(dx,dy),0);
    
    if (d <= 0){
      return -1.
    } else {
      return 1.
    }
};

let quadTree = new QuadTree(boundary);

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point){
        return (point.x >=  this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h);
    }

    differentSignCorners(){

    }
}

class QuadTree{
    constructor(boundary, n){
      this.boundaryFunction = boundary;  
      this.capacity = n;
      this.points = [];
      this.divided = false;
    }

    subdivide(){
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;
        let ne = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        this.southwest = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        this.southwest = new QuadTree(sw, this.capacity);
        
        this.subdivide = true;
    }

    insert(point){
        if (!this.boundary.contains(point)){
            return;
        }

        if (this.points.length < this.capacity){
            this.points.push(point);
        } else {
            if (!this.subdivide){
                this.subdivide();
            }

            if (this.northeast.insert(point)){
                return true;
            } else if (this.northwest.insert(point)){
                return true;
            } else if (this.southwest.insert(point)){
                return true;
            } else if (this.southeast.insert(point)){
                return true;
            } 
        }
    }

    show(){
        stroke(255);
        rectMode(CENTER);
        noFill();
        rect(this.boundary.x, this.boundary.y, this.boundary.w/2, this.boundary.h/2);
        if(this.divided){
            this.northeast.show();
            this.northwest.show();
            this.southwest.show();
            this.southeast.show();
        }
    }
}
