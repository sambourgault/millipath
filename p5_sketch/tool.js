class Tool{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.diameter = 0.25 * 25.4; //in * mm/in
        this.height = 75;
    }

    display(point){
        push();
        fill(100);
        rotateX(PI/2);
        translate(0,this.height/2,0);

        let scaleZ = 1.;
        if (point.z < 0.) scaleZ = 30;
        translate(point.x, scaleZ*point.z, -point.y);
       
        cylinder(tsIn.value()*25.4, this.height);
        pop();
    }

}