// 

//decorative sides
{
    let offsetX = 0;
    let offsetY = 0;
    let materialSize = 19.3;
	let pieceSizeX = 457.2;
	let pieceSizeY = 457.2;
    let sizeX = pieceSizeX+toolSizeMm;
    let sizeY = pieceSizeY+toolSizeMm;
    let posX = sizeX/2 + offsetX;
    let posY = sizeY/2 + offsetY;


    let excludeJointBoundary = function(x,y){
        let sizeJointX = 2*materialSize + toolSizeMm;
        let sizeJointY = materialSize - toolSizeMm ;
        let posXJoint = posX;
        let posYJoint = posY + sizeY/2 - sizeJointX/2;
        let spacingX = (pieceSizeX - 12*materialSize)/9

        let state = -1;
        for (let i = 0; i < 10; i++){
            /*if (boundaryRectangle(x,y,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*(materialSize+spacingX), posYJoint,sizeJointY/2+materialSize/2,sizeJointX/2,false) == 1){
                state = 1;
                break;
            }  */  
            let outSideJointState = boundaryRectangle(x,y,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*(materialSize+spacingX), posYJoint,sizeJointY/2+materialSize/2,sizeJointX/2,false);
            let insidePieceState = boundaryRectangle(x,y,posX,posY,sizeX/2,sizeY/2);
            if (outSideJointState == 1 || insidePieceState == 1){
                state = 1;
                break;
            }    
        }

        return state;
      }

      boundaries[0] = new Boundary("CUSTOM",0,0,0,0, excludeJointBoundary);
      boundaries[1] = new Boundary("CUSTOM",0,0,0,0, excludeJointBoundary);

      let sizeJointX = 2*materialSize + toolSizeMm;
        let sizeJointY = materialSize - toolSizeMm ;
        let posXJoint = posX;
        let posYJoint = posY + sizeY/2 - sizeJointX/2;
        let spacingX = (pieceSizeX - 12*materialSize)/9
      for (let i = 0; i < 10; i++){
        boundaries[i+2] = new Boundary("RECTANGLE",offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*(materialSize+spacingX), posYJoint,sizeJointY/2+materialSize/2,sizeJointX/2);
      }
      //
    


    // stool side
    mvts[0] = new Movement(0,0,1);
    mvts[0].makeArcPath(0.1, 360, 5, 0);
    boundaries[12] = new Boundary("RECTANGLE",posX,posY,sizeX/2,sizeY/2);
    
    /*let gridSizeX = pieceSizeX/10;
    let gridSizeY = pieceSizeY/10;*/
    let gridSizeX = 10;
    let gridSizeY =10;
    grids[0] = new Grid(0,offsetX+toolSizeMm/2,offsetY+toolSizeMm/2,"RANDOM",gridSizeX,gridSizeY,pieceSizeX+gridSizeX,pieceSizeY+gridSizeY,0.5);
    // add random scaling Z 
    scalesZ = [];
    for (let i = 0; i < grids[0].row; i ++){
        scalesZ[i] = [];
        for (let j = 0; j < grids[0].column; j++){
                scalesZ[i][j] = random(0.3,0.5);
        }
    }
    grids[0].addScalesZ(scalesZ);

    // bigger dots
    mvts[1] = new Movement(0,0, 5);
    mvts[1].makeArcPath(0.1,360,5,0);

    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    gridSizeX = 18; // first one is 15...
    gridSizeY = 60;
    grids[1] = new Grid(1,offsetX+toolSizeMm/2,offsetY+sizeJointX/2,"RANDOM",gridSizeX,gridSizeY,pieceSizeX+gridSizeX,pieceSizeY+gridSizeY,0.5);

    // add random scaling Z 
    scalesZ = [];
    for (let i = 0; i < grids[1].row; i ++){
        scalesZ[i] = [];
        for (let j = 0; j < grids[1].column; j++){
                scalesZ[i][j] = random(1.5,2);
        }
    }
    grids[1].addScalesZ(scalesZ);

}

// sides cut x 2
{
    let offsetX = 0;
    let offsetY = 0;
    let materialSize = 19.3;
	let pieceSizeX = 457.2;
	let pieceSizeY = 457.2;
    let sizeX = pieceSizeX+toolSizeMm;
    let sizeY = pieceSizeY+toolSizeMm;
    let posX = sizeX/2 + offsetX;
    let posY = sizeY/2 + offsetY;
    

    // joints
    let sizeJointX = materialSize ;
    let sizeJointY = materialSize - toolSizeMm ;
    let posXJoint = posX;
    let posYJoint = posY + sizeY/2 - sizeJointX/2;
    let spacingX = (pieceSizeX - 12*materialSize)/9

    let rotations = [];
    let rotations2 = [];
    for (let i = 0; i < 1; i++){
        rotations[i] = [];
        rotations2[i] = [];
        for (let j = 0; j < 1; j++){
            rotations[i][j] = PI/2;
            rotations2[i][j] = -PI/2;
        }
    }
    
    /*mvts[1] = new Movement(0,0,1);
    mvts[1].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return 0}, true);
    boundaries[1] = new Boundary("NONE",0,0,250,130);
    grids[1] = new Grid(1,posXJoint,posYJoint,"LINEAR",1,1,1,1);
    grids[1].addRotations(rotations);*/

    
    for (let i = 0; i < 10; i++){
        mvts[i] = new Movement(0,0,1);
        mvts[i].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return 0}, true);
        boundaries[i] = new Boundary("NONE",0,0,250,130);
        grids[i] = new Grid(i,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*(materialSize+spacingX), posYJoint, "LINEAR",1,1,1,1);
        grids[i].addRotations(rotations);
    }

    let posYJoint2 = posY - sizeY/2 + sizeJointX/2;

    // joints for legs
    mvts[10] = new Movement(0,0,1);
    mvts[10].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return 0}, true);
    boundaries[10] = new Boundary("NONE",0,0,250,130);
    grids[10] = new Grid(10,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+2*(materialSize+spacingX), posYJoint2, "LINEAR",1,1,1,1);
    grids[10].addRotations(rotations2);

    mvts[11] = new Movement(0,0,1);
    mvts[11].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return 0}, true);
    boundaries[11] = new Boundary("NONE",0,0,250,130);
    grids[11] = new Grid(11,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+7*(materialSize+spacingX), posYJoint2, "LINEAR",1,1,1,1);
    grids[11].addRotations(rotations2);
    
    // stool side
    mvts[12] = new Movement(0,0,1);
    mvts[12].makeRectanglePath(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return 0;}, true);
    boundaries[12] = new Boundary("NONE",0,0,250,130);
    grids[12] = new Grid(12,posX,posY,"LINEAR",1,1,1,1);
    
    
}

// slats decoration
{
    let offsetX = 0;
    let offsetY = 0;
    let materialSize = 19.3;
	let pieceSizeX = 457.2;
	let pieceSizeY = 2*materialSize;
    let sizeX = pieceSizeX+toolSizeMm;
    let sizeY = pieceSizeY+toolSizeMm;
    let posX = sizeX/2 + offsetX;
    let posY = sizeY/2 + offsetY;


    let excludeJointBoundary = function(x,y){
        let sizeJointX = 2*materialSize + toolSizeMm ;
        let sizeJointY = materialSize - toolSizeMm ;
        let spacingX = (pieceSizeX - 12*materialSize)/9
        let posYJoint2 = posY - sizeY/2 + sizeJointX/2;

        let state = -1;
        for (let i = 0; i < 2; i++){
            let outSideJointState = boundaryRectangle(x,y,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*9*(materialSize+spacingX), posYJoint2,sizeJointY/2+toolSizeMm/2,sizeJointX/2,false);
            let insidePieceState = boundaryRectangle(x,y,posX,posY,sizeX/2,sizeY/2);
            if (outSideJointState == 1 || insidePieceState == 1){
                state = 1;
                break;
            }    
        }
        return state;
      }

      boundaries[0] = new Boundary("CUSTOM",0,0,0,0, excludeJointBoundary);
      boundaries[1] = new Boundary("CUSTOM",0,0,0,0, excludeJointBoundary);

      // show boundaries
        let sizeJointX = 2*materialSize +toolSizeMm;
        let sizeJointY = materialSize - toolSizeMm ;
        let spacingX = (pieceSizeX - 12*materialSize)/9
        let posYJoint2 = posY - sizeY/2 + sizeJointX/2;
      for (let i = 0; i < 2; i++){
        boundaries[i+2] = new Boundary("RECTANGLE",offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*9*(materialSize+spacingX), posYJoint2,sizeJointY/2+toolSizeMm/2,sizeJointX/2);
      }


    // slats side
    mvts[0] = new Movement(0,0,1);
    mvts[0].makeArcPath(0.1, 360, 5, 0);
    boundaries[4] = new Boundary("RECTANGLE",posX,posY,sizeX/2,sizeY/2);
    
    // 12 for small & 40 for big
    let gridSizeX = 10;
    let gridSizeY = 10;
    grids[0] = new Grid(0,offsetX+toolSizeMm/2,offsetY+toolSizeMm/2+5,"RANDOM",gridSizeX,gridSizeY,pieceSizeX+gridSizeX,pieceSizeY+gridSizeY, 0.5);
    
    // add random scaling Z 
    scalesZ = [];
    for (let i = 0; i < grids[0].row; i ++){
        scalesZ[i] = [];
        for (let j = 0; j < grids[0].column; j++){
                scalesZ[i][j] = random(0.3,0.5);
        }
    }
    grids[0].addScalesZ(scalesZ);

    // bigger dots
    mvts[1] = new Movement(0,0, 5);
    mvts[1].makeArcPath(0.1,360,5,0);

    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    gridSizeX = 18; // first one is 15...
    gridSizeY = 60;
    grids[1] = new Grid(1,offsetX+toolSizeMm/2,offsetY+sizeJointX/2,"RANDOM",gridSizeX,gridSizeY,pieceSizeX+gridSizeX,pieceSizeY+gridSizeY,0.5);

    // add random scaling Z 
    scalesZ = [];
    for (let i = 0; i < grids[1].row; i ++){
        scalesZ[i] = [];
        for (let j = 0; j < grids[1].column; j++){
                scalesZ[i][j] = random(1.5,2);
        }
    }
    grids[1].addScalesZ(scalesZ);


}

// slats cut x 12
{
    let offsetX = 0;
    let offsetY = 0;
    let materialSize = 19.3;
	let pieceSizeX = 457.2;
	let pieceSizeY = 2*materialSize;
    let sizeX = pieceSizeX+toolSizeMm;
    let sizeY = pieceSizeY+toolSizeMm;
    let posX = sizeX/2 + offsetX;
    let posY = sizeY/2 + offsetY;
    let sizeJointX = materialSize ;
    let sizeJointY = materialSize - toolSizeMm ;
    let spacingX = (pieceSizeX - 12*materialSize)/9
    let posYJoint2 = posY - sizeY/2 + sizeJointX/2;

    let rotations2 = [];
    for (let i = 0; i < 1; i++){
        rotations2[i] = [];
        for (let j = 0; j < 1; j++){
            rotations2[i][j] = -PI/2;
        }
    }

    // joints for legs
    mvts[0] = new Movement(0,0,1);
    mvts[0].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return 0}, true);
    boundaries[0] = new Boundary("NONE",0,0,250,130);
    grids[0] = new Grid(0,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+9*(materialSize+spacingX), posYJoint2, "LINEAR",1,1,1,1);
    grids[0].addRotations(rotations2);

    mvts[1] = new Movement(0,0,1);
    mvts[1].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return 0}, true);
    boundaries[1] = new Boundary("NONE",0,0,250,130);
    grids[1] = new Grid(1,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+0*(materialSize+spacingX), posYJoint2, "LINEAR",1,1,1,1);
    grids[1].addRotations(rotations2);

    
    // stool side
    mvts[2] = new Movement(0,0,1);
    mvts[2].makeRectanglePath(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return 0;}, true);
    boundaries[2] = new Boundary("NONE",0,0,250,130);
    grids[2] = new Grid(2,posX,posY,"LINEAR",1,1,1,1);
    
    
}

{
    let offsetX = 0;
let offsetY = 0;
let materialSize = 18.15;
let sizeX = 457.2+toolSizeMm;
let sizeY = 457.2+toolSizeMm;
let posX = sizeX/2 + offsetX;
let posY = sizeY/2 + offsetY;

// stool side
for (let i = 0; i < 4; i++){
    mvts[i] = new Movement(0,0,1);
    //makeRectanglePath(sx,sy,nbPoints,theta,zMode,customZMode = null){
    mvts[i].makeRectanglePath(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return -(i+1);});

    boundaries[i] = new Boundary("NONE",0,0,250,130);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    grids[i] = new Grid(i,posX,posY,"LINEAR",1,1,1,1);
}

// tab level
mvts[4] = new Movement(0,0,1);
mvts[4].makeRectanglePathWithTab(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return -(4+1);})
boundaries[4] = new Boundary("NONE",0,0,250,130);
grids[4] = new Grid(4,posX,posY,"LINEAR",1,1,1,1);

// joints
for (let i = 0; i < 4; i++){
    mvts[i] = new Movement(0,0,1);
    //makeDogBonePath(rx,ry,nbPoints,theta,boneMode,zMode,customZMode = null){
    mvts[i].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return -(i+1);});

    boundaries[i] = new Boundary("NONE",0,0,250,130);
    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    grids[i] = new Grid(i,posXJoint,posYJoint,"LINEAR",1,1,1,1);
    grids[i].addRotations(rotations);
}
}