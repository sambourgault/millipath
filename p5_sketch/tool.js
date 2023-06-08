class Tool{
    constructor(){
        this.x = 0;
        this.y = 0;
    }

    display(){
        push();
        fill(100);
        cylinder(20, 50);
        pop();
    }

}