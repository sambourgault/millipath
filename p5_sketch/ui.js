class UI{
  constructor(){
     this.sliders = [];
      this.labels = ["x: " + 0, "y: "+ 0,"size X: " + width/2, "size Y: "+width/2, "spacing X: 25", "spacing Y: 25", "amp: 0", "freq: 0"];
    this.defaultValues = [0, 0, 500, 500, 500, 500, 0, 0];
    this.divs = [];
     this.x = 0;
     this.y = 0;
    
    for (let i = 0; i < 8; i++){
      this.sliders[i] = createSlider(0.,1000.,this.defaultValues[i]);
      this.sliders[i].id("slider"+i);
      this.sliders[i].addClass("sliders");
      this.sliders[i].position(this.x, this.y+i*50+25);
      this.sliders[i].style('width', '150px');
      this.sliders[i].style('background-color', '#7C7C7C');
      this.divs[i] = createDiv(this.labels[i]);
      this.divs[i].id("div"+i);
      this.divs[i].style('font-size', '16px');
      this.divs[i].style('font-family', 'Poppins');
      this.divs[i].position(this.x+5, this.y+i*50);
    }
  } 
}

