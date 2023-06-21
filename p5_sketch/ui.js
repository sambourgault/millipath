class UI{
  constructor( grid, x, y, gridX, gridY, spx, spy, sx, sy){
    let self = this;
    this.x = x;
    this.y = y;
    this.grid = grid;
    this.visible = false;
    //console.log(this.grid);
    this.box =  new CollapsibleBox(this.x, this.y, '450px', "grid specs");
    this.sliders = [];
    //this.labels = ["x: " + 0, "y: "+ 0,"size X: " + 200, "size Y: "+200, "spacing X: 25", "spacing Y: 25", "amp: 0", "period: 2", "dist: 50"];
    this.labels = ["x" , "y","size X" , "size Y", "spacing X", "spacing Y", "amp", "period", "dist"];    
    //this.defaultValues = [0, 0, 500, 500, 800, 800, 0, 0, 250];
    this.defaultValues = [gridX,gridY,sx,sy,spx,spy,0,2,50];
    this.divs = [];
   
     this.offY = 40;
     this.linkState = true;
     this.linkButton = createButton("linked").parent(this.box.box) ;
    
    for (let i = 0; i < 9; i++){
      this.sliders[i] = createInput((this.defaultValues[i])).parent(this.box.box);
      this.sliders[i].id("slider"+i);
      //this.sliders[i].addClass("sliders");
      this.sliders[i].position(10, i*40+20+this.offY);
      this.sliders[i].style('width', '150px');
      //this.sliders[i].style('background-color', '#7C7C7C');
      this.divs[i] = createDiv(this.labels[i]).parent(this.box.box);
      this.divs[i].id("div"+i);
      this.divs[i].style('font-size', '14px');
      this.divs[i].style('font-family', 'Poppins');
      this.divs[i].position(10, i*40+this.offY);
    }

    this.linkButton.position(10, this.defaultValues.length*40+10+this.offY);
    this.changeLinkState = function(){
      if (self.linkState == true){
        self.linkState = false;
        self.linkButton.html("unlinked");
        self.linkButton.style("background", "green");
      } else {
        self.linkState = true;
        self.linkButton.html("linked");
        self.linkButton.style("background", "red");
      }
      self.grid.updateGrid(grid.row,grid.column);
    }
    this.linkButton.mousePressed(this.changeLinkState);
    this.linkButton.style('font-size', '14px');
    this.linkButton.style('font-family', 'Poppins');

    this.visible = createCheckbox('visible', grid.visible).parent(this.box.box);
    this.changeVisibility = function(){
      self.grid.visible = this.checked();
    }
    this.visible.changed(this.changeVisibility);
    this.visible.position(0,0);
    this.visible.style('font-size', '14px');
    this.visible.style('font-family', 'Poppins');
  } 
}

