class CollapsibleBox{
    constructor(x, y, h, text){
        this.x = x;
        this.y = y;
        this.h = h;
        this.box = createDiv();
        this.h2 = createElement('h3', text).parent(this.box);
        
        this.setup();
    }

    setup(){
        this.box.position(this.x, this.y);
        this.box.style('font-size', '14px');
        this.box.style('font-family', 'Poppins');
        this.box.style('background-color', 'white');
        this.box.style('width', '190px');
        this.box.style('height', this.h);
        this.h2.position(10, 0);
    }
}