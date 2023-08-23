class Directions{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
  
  display(){
    push();
    translate(-50,0,0);
    fill(255,0,0);
    box(100,5,5);
    //sphere(30);
    pop();
    
    
    
    push();
    translate(0,50,0);
    fill(0,255,0);
    box(5,100,5);
    //sphere(10);
    pop();
    
    push();
    translate(0,0,50);
    fill(0,0,255);
    box(5,5,100);
    pop();
    
 
  }
  
}