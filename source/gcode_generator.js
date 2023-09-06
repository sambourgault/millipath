class GCodeGen {
  constructor(fileName) {
    let self = this;
    this.allPaths = [];
    this.paths = [];
    this.path = [];
    this.path[0] = new createVector(0, 0, safeHeight);
    this.paths.push(this.path);
    this.allPaths.push(this.paths);
    this.allTypePaths = [];
    this.typePaths = [];
    this.typePaths.push("J");
    this.allTypePaths.push(this.typePaths);
    this.writer = createWriter(fileName + ".sbp");
    
    this.writer.write("' "+fileName+"\n");
    // set to absolute distance
    this.writer.write("SA \n");
    // 0 for inch, 1 for metric
    this.writer.write("IF %(25)=0 THEN GOTO UNIT_ERROR\n");
    // CN, 90 calls up the My_Variables file to set user variables from a predefined list.
    //this.writer.write("CN, 90 \n");
    this.writer.write("&Tool = 1\n"); // seems to require this line
    this.writer.write("&PWSafeZ = " + sZIn.value() + "\n"); //mm
    this.writer.write("&PWZorigin = Material Surface\n");
    this.writer.write("&PWMaterial = " + mtIn.value() + "\n"); //mm
    this.writer.write("C9\n");
    // set spindle speed
    this.writer.write("TR," + sSIn.value() +"\n");
    // spindle on
    this.writer.write("C6\nPAUSE 2\n");
    // set move speed
    this.writer.write("MS," + mSIn.value() +"," + pRIn.value() + "\n'\n");
    
    /*this.safeZ = createInput();
    this.safeZ.position(0,height - 80);*/
    
    this.button = createButton("save file");
    this.button.position(width/2-35, height - 80);
    this.button.style("font-family", "Poppins");
    this.button.style("background-color", "white");
    this.button.style("border-radius", "0px");
    this.button.style("border-width", "2px");
    
    this.simSlider =  createSlider(0.,1000.,0);
    this.simSlider.addClass("sliders");
    this.simSlider.position(width/2 - 75, height - 150);
    this.simSlider.style('width', '150px');
    this.simSlider.style('background-color', '#7C7C7C');
    
    this.playButton = createButton("play");
    this.playButton.position(width/2-85, height - 120);
    this.playButton.style("font-family", "Poppins");
    this.playButton.style("width", "75px");
    this.playButton.style("background-color", "white");
    this.playButton.style("border-radius", "0px");
    this.playButton.style("border-width", "2px");
    
    
    this.pauseButton = createButton("pause");
    this.pauseButton.position(width/2+10, height - 120);
    this.pauseButton.style("font-family", "Poppins");
    this.pauseButton.style("width", "75px");
    this.pauseButton.style("background-color", "white");
    this.pauseButton.style("border-radius", "0px");
    this.pauseButton.style("border-width", "2px");

    this.hideJog = false;
    this.hideJogButton = createButton("hide jog");
    this.hideJogButton.position(width/2+105, height - 120);
    this.hideJogButton.style("font-family", "Poppins");
    this.hideJogButton.style("width", "75px");
    this.hideJogButton.style("background-color", "white");
    this.hideJogButton.style("border-radius", "0px");
    this.hideJogButton.style("border-width", "2px");
    
    this.tool = new Tool();
    this.play = false;
    this.playTime = 0;
    this.indexKPlay = 0;
    this.indexJPlay = 0;
    this.indexPlay = 0;
    this.linkState = true;
    this.movement;
    this.mvtScale = 0.4;
    this.gridP0;
    
    
    this.generateGCode = function () {  
      // HOME
      // link move in Z to go up
      self.writer.write("JZ," + self.allPaths[0][0][0].z + "\n");
      // link move to 0,0 in XY
      self.writer.write("J2,"+ -self.allPaths[0][0][0].x +","+ self.allPaths[0][0][0].y +"\n");
      // add all next link and feed move based on typePaths[j]
      
      // all grids
      for (let k = 0; k < self.allPaths.length; k++){
        // one grid k
        for (let j = 0; j < self.allPaths[k].length; j++){
          // one path in grid k
          for (let i = 0; i < self.allPaths[k][j].length; i++) {
            if (j == 0 && i ==0){
              // skip first point of paths[0];
            }
            else{
              self.writer.write(self.allTypePaths[k][j]+"3,"+
              ParseFloat(-self.allPaths[k][j][i].x,3) +
              ", " +
              ParseFloat(self.allPaths[k][j][i].y,3) +
              ", " +
              ParseFloat(self.allPaths[k][j][i].z,3) +
              "\n"
              );
            }
          }
        }
      }
      
      // REHOME
      // link move in Z to go up
      //self.writer.write("JZ," + safeHeight + "\n");
      // link move to 0,0 in XY
      //self.writer.write("J2, 0, 0\n");
      self.writer.write("'\n'Turning router OFF\n");
      // spindle off
      self.writer.write("C7\n");
      self.writer.write("END\n'\n'\n");
      self.writer.write("UNIT_ERROR:\n");
      //CN, 91 is a check for possibly running a metric file when the software/controller is in inch mode.
      self.writer.write("CN, 91\n");
      self.writer.write("END");
      self.writer.close();
    };
    
    this.button.mousePressed(this.generateGCode);
    
    this.beginSimulation = function(){
      self.play = true;
      self.playTime = millis();
    }
    this.playButton.mousePressed(this.beginSimulation);
    
    this.pauseSimulation = function(){
      self.play = false;
    }
    this.pauseButton.mousePressed(this.pauseSimulation);

    this.hideJogMove = function(){
      self.hideJog = !self.hideJog;
    }
    this.hideJogButton.mousePressed(this.hideJogMove);
  }
  
  updatePath(index, grid, mvt, linkState){
    this.movement = mvt;
    // clear the index associated to that grid in allPaths
    this.allPaths[index] = [];
    this.allTypePaths[index] = [];
    
    //HOME: add first path point as jog path
    let tempPaths = [];
    let tempTypePaths = [];
    tempTypePaths.push("J");
    tempPaths.push([]);
    tempPaths[0].push(new createVector(0,0,safeHeight));
    this.gridP0 = grid[0];
    
    // if linked state on 
    if (linkState == true){
      
      // add the first jog move from previous position to over current point
      tempPaths.push([]);
      tempTypePaths.push("J");
      
      //this.rotateMvt(mvt,index,grid[0], 0);
      //tempPaths[1].push(new createVector(grid[0].x+this.scaleMvt(grid[0], index)*mvt.path[0].x, grid[0].y+this.scaleMvt(grid[0], index)*mvt.path[0].y, safeHeight));
      //-->tempPaths[tempPaths.length-1].push(new createVector(grid[0].x+this.scaleMvt(grid[0], index)*mvt.paths[0][0].x, grid[0].y+this.scaleMvt(grid[0], index)*mvt.paths[0][0].y, safeHeight));
      tempPaths[tempPaths.length-1].push(new createVector(grid[0].x+mvt.paths[0][0].x, grid[0].y+mvt.paths[0][0].y, safeHeight));

      //go over each grid point
      for (let i = 2; i < grid.length+2 ; i++){
        
        // go over each path in movement
        for (let l = 0; l < mvt.paths.length; l++){
          // go over each point in path
          tempPaths.push([]);
          //console.log("new path:" + tempPaths.length);
          tempTypePaths.push("M");
          //this.rotateMvt(mvt,index,grid[i-2], i-2);      
          
          let kIn = [];
          for (let k = 0; k < mvt.paths[l].length; k++){
            let x = grid[i-2].x+mvt.paths[l][k].x;
            let y = grid[i-2].y+mvt.paths[l][k].y;
            let z = maxDepthCut*(grid[i-2].z+mvt.paths[l][k].z);
            //tempPaths[tempPaths.length-1].push(new createVector(x, y, z));
            
            if (boundaries[index].checkBoundary(x,y) <= 0){
              // point is inside the boundary
              if (tempPaths.length == 3 && tempPaths[tempPaths.length-1].length == 0){
                // modify the first plunge position
                tempPaths[tempPaths.length-2][0].x = x;
                tempPaths[tempPaths.length-2][0].y = y;
              }
              
              tempPaths[tempPaths.length-1].push(new createVector(x, y,z));            
              kIn.push(k);
            } else {
              // outside the boundary
            }
          }
          
          let lastPath = tempPaths[tempPaths.length-1];
          
          //if its not a 1-point path, remove unconnected points
          if (mvt.paths[l].length != 1){
          for (let m = 0; m < lastPath.length; m++){
            let connected = false;
            if (m == 0){
              if (kIn[m+1] == kIn[m]+1){
                connected = true;
              }
            } else if (m == lastPath.length-1){
              if (kIn[m-1] == kIn[m]-1){
                connected = true;
              }
            } else {
              if (kIn[m+1] == kIn[m]+1 || kIn[m-1] == kIn[m]-1){
                connected = true;
              }
            }
            
            if (!connected){
              tempPaths[tempPaths.length-1].splice(m,1);
            }
          }
        
          
          // if after adding the mvt the path if empty bc none of the mvt is within the boundary or points connected to one another, remove path
          if (lastPath.length <= 1){
            tempPaths.pop();
            tempTypePaths.pop();
          }
        }
        }
      }
      
      // add retract to safe Z height to the last point
      let nbPaths = tempPaths.length;
      let nbPointsInLast = tempPaths[nbPaths-1].length;
      let lastPoint = tempPaths[nbPaths-1][nbPointsInLast-1];
      //tempTypePaths.push("M");
      tempPaths[tempPaths.length-1].push(new createVector(lastPoint.x, lastPoint.y, safeHeight));
      
      // REHOME at the end
      tempTypePaths.push("J");
      let lastJog = [];
      lastJog.push(tempPaths[0][0]);
      tempPaths.push(lastJog);
      
      // add to main paths collection
      this.allPaths[index] = tempPaths;
      this.allTypePaths[index] = tempTypePaths;
      
    } else {
      // if unlinked state on. go through each point of the grid
      //console.log(grids[index].rotations);
      for (let i = 1; i < grid.length+1 ; i++){
        //this.rotateMvt(mvt,index,grid[i-1], i-1);
        //console.log(index);
        
        //check if you should recompute z  

        let rotatedMvtPaths
        let reflectedPaths;
        let scaledZPaths;
        if (grids[index].reflections.length != 0){
          //scaledZPaths = this.scaleZMvt(mvt.paths, grids[index].reflections[i-1]);
          reflectedPaths = this.reflectMvt(mvt.paths, grids[index].reflections[i-1]);
          rotatedMvtPaths = this.rotateMvt(reflectedPaths, grids[index].rotations[i-1]);
        } else {
          //scaledZPaths = this.scaleZMvt(mvt.paths, grids[index].reflections[i-1]);
          rotatedMvtPaths = this.rotateMvt(mvt.paths, grids[index].rotations[i-1]);
        }
        
        // go through each path of mvt
        for (let l = 0; l < rotatedMvtPaths.length; l++){
          // add jog move from previous position to over current point
          tempPaths.push([]);
          tempTypePaths.push("J"); 
          
          //let x = grid[i-1].x+this.scaleMvt(grid[i-1], index)*rotatedMvtPaths[l][0].x;
          //let y = grid[i-1].y+this.scaleMvt(grid[i-1], index)*rotatedMvtPaths[l][0].y;
          let x = grid[i-1].x+grids[index].scales[i-1]*rotatedMvtPaths[l][0].x;
          let y = grid[i-1].y+grids[index].scales[i-1]*rotatedMvtPaths[l][0].y;

          let z = safeHeight;
          tempPaths[tempPaths.length-1].push(new createVector(x, y, safeHeight));
          
          //add feed move
          tempPaths.push([]);
          tempTypePaths.push("M");
          
          let kIn = [];
          for (let k = 0; k < mvt.paths[l].length; k++){
            //x = grid[i-1].x+this.scaleMvt(grid[i-1],index)*rotatedMvtPaths[l][k].x;
            //y = grid[i-1].y+this.scaleMvt(grid[i-1],index)*rotatedMvtPaths[l][k].y;
            x = grid[i-1].x+grids[index].scales[i-1]*rotatedMvtPaths[l][k].x;
            y = grid[i-1].y+grids[index].scales[i-1]*rotatedMvtPaths[l][k].y;
            z = maxDepthCut*(grid[i-1].z+grids[index].scalesZ[i-1]*rotatedMvtPaths[l][k].z);
            
            let boundaryValue = boundaries[index].checkBoundary(x,y);
            //console.log(boundaryValue);
            
            if (boundaryValue <= 0 && grids[index].visibleMvts[i-1] == 1){
              // point is inside the boundary
              if (tempPaths[tempPaths.length-1].length == 0){
                // modify the plunge position
                tempPaths[tempPaths.length-2][0].x = x;
                tempPaths[tempPaths.length-2][0].y = y;
              }
              tempPaths[tempPaths.length-1].push(new createVector(x,y,abs(boundaryValue)*z));   
              kIn.push(k);     
            } else {
              // outside the boundary
            }
          }
          
          // lastpath will be empty if the whole mvt is outside boundary
          let lastPath = tempPaths[tempPaths.length-1];
          //remove unconnected point
          if (rotatedMvtPaths.length == 1 && rotatedMvtPaths[0].length == 1 && lastPath.length != 0){
            // don't remove point movement
          }else {
             //if its not a 1-point path, remove unconnected points
          if (mvt.paths[l].length != 1){
            for (let m = 0; m < lastPath.length; m++){
              let connected = false;
              if (m == 0){
                if (kIn[m+1] == kIn[m]+1){
                  connected = true;
                }
              } else if (m == lastPath.length-1){
                if (kIn[m-1] == kIn[m]-1){
                  connected = true;
                }
              } else {
                if (kIn[m+1] == kIn[m]+1 || kIn[m-1] == kIn[m]-1){
                  connected = true;
                }
              }
              
              if (!connected){
                tempPaths[tempPaths.length-1].splice(m,1);
              }
            }
          }
          }
          
          // add retract to safe Z height
          if (lastPath.length > 1 || (rotatedMvtPaths.length == 1 && rotatedMvtPaths[0].length == 1 && lastPath.length != 0)){     
            let lastPoint = lastPath[lastPath.length-1];
            tempPaths[tempPaths.length-1].push(new createVector(lastPoint.x, lastPoint.y, safeHeight));
          } else {
            // if the mvt points were found all outside the boundary, remove the last two tempPaths.
            tempPaths.pop();
            tempPaths.pop();
            tempTypePaths.pop();
            tempTypePaths.pop();
          }
        }
      }
      
      // REHOME at the end
      tempTypePaths.push("J");
      let lastJog = [];
      lastJog.push(tempPaths[0][0]);
      tempPaths.push(lastJog);
      
      // add to main paths collection
      this.allPaths[index] = tempPaths;
      this.allTypePaths[index] = tempTypePaths;
    }
  }
  
  //** TRANSFORMS on mvt paths **//

  rotateMvt(paths, angle){
    let rotatedPaths = rotatePath(paths, angle);
    return rotatedPaths;
  }

  reflectMvt(paths, angle){
    let rotatedPaths = reflectPath(paths, angle);
    return rotatedPaths;
  }

  scaleMvt(mvt,scale){
    let scaledPaths = scalePath(mvt.paths, scale);
    return scaledPaths;
  }

  scaleZMvt(mvt,scaleZ){
    let scaledZPaths = scalePath(mvt.paths, scaleZ);
    return scaledZPaths;
  }



  
  display(){
    if (this.play){
      if (millis() - this.playTime > 100){
        this.indexPlay+=1;
        this.playTime = millis();
      }
      if (this.indexPlay > this.allPaths[this.indexKPlay][this.indexJPlay].length-1) {
        this.indexPlay = 0;
        this.indexJPlay += 1;
        if (this.indexJPlay > this.allPaths[this.indexKPlay].length-1){
          this.indexJPlay = 0;
          this.indexKPlay += 1;
          if (this.indexKPlay > this.allPaths.length-1){
            this.indexKPlay = 0;
          }
        }
      }
    } else {
      this.indexPlay = int(this.simSlider.value()/1000*(this.allPaths[this.indexKPlay][this.indexJPlay].length-1));
    }
    
    this.tool.display(this.allPaths[this.indexKPlay][this.indexJPlay][this.indexPlay]);
    
    if (grids.length>0){
      this.displayPath();
    }
  }
  
  displayPath() {
    
    fill(255, 0);
    strokeWeight(2);
    
    // draw each path
    //console.log(this.allPaths.length);
    for (let k = 0; k < this.allPaths.length; k++){
      if (grids[k].visible){
        //console.log(grids[k].visible);
        for (let j = 0; j < this.allPaths[k].length; j++){
          if (this.allTypePaths[k][j] == "J"){
            stroke(0, 255, 0);
          } else if (this.allTypePaths[k][j] == "M"){
            stroke(255, 0, 0);
          }
          
          //console.log("hidejob: " + this.hideJog + ", type: " + this.allTypePaths[k][j]);
          if (this.hideJog == true && this.allTypePaths[k][j] == "J"){
          } else {
            for (let i = 0; i < this.allPaths[k][j].length; i++){
              let previous;
              if (i == 0 && j != 0){
                previous = this.allPaths[k][j-1][this.allPaths[k][j-1].length - 1];
              } else if (i == 0 && j == 0){
                previous = new createVector(0,0,safeHeight);
              } else {
                previous = this.allPaths[k][j][i-1];
              }

              let current = this.allPaths[k][j][i];
              push();
              //translate(0,0,70);
              let scalePZ = 1.;
              let scaleCZ = 1.;
              //if (previous.z < 0.) scalePZ = 30;
              //if (current.z < 0.) scaleCZ = 30;
              
              line(previous.x, previous.y, scalePZ*previous.z, current.x, current.y, scaleCZ*current.z);
              
              pop();
          }
        }
      }
      }
    }
    noStroke();
  }
}
