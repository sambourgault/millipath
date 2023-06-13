class Tool{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.diameter = 5;
        this.height = 75;
    }

    display(point){
        push();
        fill(100);
        rotateX(PI/2);
        translate(0,100+this.height/2,0);
        //console.log(point)
        if (point){
            translate(point.x, -30+point.z,-point.y);
        }
        cylinder(this.diameter, this.height);
        pop();
    }

}