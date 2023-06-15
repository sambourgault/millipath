class UI{
  constructor(grid){
    let self = this;
    this.grid = grid;
    console.log(this.grid);
    this.box =  new CollapsibleBox(10,10, '450px', "grid specs");
    this.sliders = [];
    this.labels = ["x: " + 0, "y: "+ 0,"size X: " + width/2, "size Y: "+width/2, "spacing X: 25", "spacing Y: 25", "amp: 0", "freq: 0", "dist: 50"];
    this.defaultValues = [0, 0, 400, 400, 500, 500, 0, 0, 250];
    this.divs = [];
     this.x = 0;
     this.y = 0;
     this.offY = 40;
     this.linkState = true;
     this.linkButton = createButton("linked").parent(this.box.box) ;
    
    for (let i = 0; i < 9; i++){
      this.sliders[i] = createSlider(0.,1000.,this.defaultValues[i]).parent(this.box.box);
      this.sliders[i].id("slider"+i);
      this.sliders[i].addClass("sliders");
      this.sliders[i].position(this.x+10, this.y+i*40+30+this.offY);
      this.sliders[i].style('width', '150px');
      this.sliders[i].style('background-color', '#7C7C7C');
      this.divs[i] = createDiv(this.labels[i]).parent(this.box.box);
      this.divs[i].id("div"+i);
      this.divs[i].style('font-size', '14px');
      this.divs[i].style('font-family', 'Poppins');
      this.divs[i].position(this.x+15, this.y+i*40+this.offY);
    }

    this.linkButton.position(this.x+15, this.y+this.defaultValues.length*40+10+this.offY);
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
      console.log(grid1);
      self.grid.updateGrid(grid.row,grid.column);
    }
    this.linkButton.mousePressed(this.changeLinkState);
    this.linkButton.style('font-size', '14px');
    this.linkButton.style('font-family', 'Poppins');
  } 
}

