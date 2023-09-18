// utility functions: return nbPoint following a specific function


function rotatePath(paths, angle, x = 0, y = 0){
    let rotatedPaths = [];
    console.log(paths.length);

    for (let i = 0; i < paths.length; i++){
      rotatedPaths[i] = [];
      console.log(paths[i].length);

      for (let j = 0; j < paths[i].length; j++){
        let x0 = paths[i][j].x;
        let y0 = paths[i][j].y;
        let z0 = paths[i][j].z;
        // rotation matrix operation around (0,0)
        let xf = x0*cos(angle) - y0*sin(angle);
        let yf = x0*sin(angle) + y0*cos(angle);
        
        rotatedPaths[i][j] = new createVector(xf, yf, z0);
      }
    }
    
    return rotatedPaths;
  }
  
  function reflectPath(paths,angle){
    let reflectedPaths = [];
    for (let i = 0; i < paths.length; i++){
      reflectedPaths[i] = [];
      
      for (let j = 0; j < paths[i].length; j++){
        let x0 = paths[i][j].x;
        let y0 = paths[i][j].y;
        let z0 = paths[i][j].z;
        // rotation matrix operation around (0,0)
        let xf = x0*cos(2*angle) + y0*sin(2*angle);
        let yf = x0*sin(2*angle) - y0*cos(2*angle);
        
        reflectedPaths[i][j] = new createVector(xf, yf, z0);
      }
    }
    
    return reflectedPaths;
  }
  
  function scalePath(paths,scale){
    let scaledPaths = [];
    
    for (let i = 0; i < paths.length; i++){
      scaledPaths[i] = [];
      for (let j = 0; j < paths[i].length; j++){
        let x0 = paths[i][j].x;
        let y0 = paths[i][j].y;
        let z0 = paths[i][j].z;
        // rotation matrix operation around (0,0)
        let xf = scale*x0;
        let yf = scale*y0;
        
        scaledPaths[i][j] = new createVector(xf, yf, z0);
      }
    }
    
    return scaledPaths;
  }

  function scaleZPath(paths,scaleZ){
    let scaledZPaths = [];
    
    for (let i = 0; i < paths.length; i++){
      scaledZPaths[i] = [];
      for (let j = 0; j < paths[i].length; j++){
        let x0 = paths[i][j].x;
        let y0 = paths[i][j].y;
        let z0 = paths[i][j].z;
        // scale matrix operation around (0,0)
        let zf = scaleZ*z0;
        
        scaledZPaths[i][j] = new createVector(x0, y0, zf);
      }
    }
    
    return scaledZPaths;
  }