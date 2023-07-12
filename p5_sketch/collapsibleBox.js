class CollapsibleBox{
    constructor(x, y, h, text){
        let self = this;
        this.x = x;
        this.y = y;
        this.h = h;
        this.collapsedH = '24px';
        this.box = createDiv();
        this.box.style("height", this.h);
        this.box.style("box-shadow","inset 0px 0px 0px 2px #000");
        //this.box.class("ui-widget-content");
        //this.box.id("draggable");
        this.h2 = createElement('h3', text).parent(this.box);
        this.h2.style("margin-top", "0px");
        this.h2.style('font-size', '14px');
        this.movingBox = false;

        /*this.h2.mousePressed(_=>{
            self.movingBox = true;
        });

        this.h2.mouseMoved(_ => {
            if (self.movingBox){
                console.log("gelsdg");
                self.box.position(mouseX-self.h2.x, mouseY-self.h2.y);
            }
        });

        this.box.mouseReleased(_ => {
            console.log("yoo");
            self.movingBox = false;
            
        });*/
        //this.box.child(this.h2);
        //console.log(this.bo);
        
        this.collapseButton = createButton("-").parent(this.box);
        this.collapseButton.style("height", "2em");
        this.collapseButton.style("width", "2em");
        this.collapseButton.style("text-align", "center");
        this.open = open;
        this.collapse = function(){
            for (let i = 2; i < self.box.elt.childNodes.length; i++){
                self.box.elt.childNodes[i].hidden = !self.box.elt.childNodes[i].hidden;
            }
            if (self.box.elt.childNodes[2].hidden){
                self.box.style('height', self.collapsedH);
                //self.collapseButton.style('background-color', 'red');
                self.collapseButton.html("+");
                self.box.style('z-index','0');
            } else {
                self.box.style('height', self.h);
                //self.collapseButton.style('background-color', 'green');
                self.collapseButton.html("-");
                self.box.style('z-index','10');
            }
            
        }
        
        this.collapseButton.mousePressed(this.collapse);
        
        this.setup();
        //this.box.style("height", "1em");

    }

    setup(){
        this.box.position(this.x, this.y);
        this.box.style('font-size', '14px');
        this.box.style('font-family', 'Poppins');
        this.box.style('background-color', 'white');
        this.box.style('width', '190px');
        this.box.style('height', this.h);
        this.h2.position(10, 0);
        this.collapseButton.position(190-24,0);
        this.collapseButton.style('font-size', '12px');
        this.collapseButton.style('font-family', 'Poppins');      
        this.collapseButton.style("background-color", "white");
        this.collapseButton.style("border-radius", "0px");
        this.collapseButton.style("border-width", "2px");
    }


}