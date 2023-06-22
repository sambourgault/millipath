class CollapsibleBox{
    constructor(x, y, h, text){
        let self = this;
        this.x = x;
        this.y = y;
        this.h = h;
        this.collapsedH = '50px';
        this.box = createDiv();
        this.h2 = createElement('h3', text).parent(this.box);
        //this.box.child(this.h2);
        //console.log(this.bo);
        
        this.collapseButton = createButton("/").parent(this.box);
        this.open = true;
        this.collapse = function(){
            for (let i = 3; i < self.box.elt.childNodes.length; i++){
                self.box.elt.childNodes[i].hidden = !self.box.elt.childNodes[i].hidden;
            }
            if (self.box.elt.childNodes[3].hidden){
                self.box.style('height', self.collapsedH);
                self.collapseButton.style('background-color', 'red');
                self.box.style('z-index','0');
            } else {
                self.box.style('height', self.h);
                self.collapseButton.style('background-color', 'green');
                self.box.style('z-index','10');
            }
            
        }
        this.collapseButton.mousePressed(this.collapse);
        
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
        this.collapseButton.position(150,10);
        this.collapseButton.style('font-size', '14px');
        this.collapseButton.style('font-family', 'Poppins');        
    }


}