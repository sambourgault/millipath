// textured stool, low version

//decorative sides
{
    let offsetX = 0;
    let offsetY = 0;
    let materialSize = 18.5;
	let pieceSizeX = 457.2;
	let pieceSizeY = 304.8;
    let sizeX = pieceSizeX+toolSizeMm;
    let sizeY = pieceSizeY+toolSizeMm;
    let posX = sizeX/2 + offsetX;
    let posY = sizeY/2 + offsetY;
    let nbSlats = 8;

    let excludeJointBoundary1 = function(x,y){
        let sizeJointX = 2*materialSize + toolSizeMm;
        let sizeJointY = materialSize - toolSizeMm ;
        let posXJoint = posX;
        let posYJoint = posY + sizeY/2 - sizeJointX/2;
        //let spacingX = (pieceSizeX - 12*materialSize)/9
        let spacingX = (pieceSizeX - (nbSlats+2)*materialSize)/(nbSlats-1)


        let state = -1;
        for (let i = 0; i < nbSlats; i++){
            /*if (boundaryRectangle(x,y,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*(materialSize+spacingX), posYJoint,sizeJointY/2+materialSize/2,sizeJointX/2,false) == 1){
                state = 1;
                break;
            }  */  
            let outSideJointState = boundaryRectangle(x,y,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*(materialSize+spacingX), posYJoint,sizeJointY/2+materialSize/2,sizeJointX/2,false);
            let insidePieceState = boundaryRectangle(x,y,posX,posY,sizeX/2,sizeY/2);
            if (outSideJointState == 1 || insidePieceState == 1){
                state = 1;
                return state;
            }    
        }

        let outsideFeetJointState1 = boundaryRectangle(x,y,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+1*(materialSize+spacingX), sizeJointX/2,sizeJointY/2+materialSize/2,sizeJointX/2,false);
        let outsideFeetJointState2 = boundaryRectangle(x,y,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+(nbSlats-2)*(materialSize+spacingX), sizeJointX/2,sizeJointY/2+materialSize/2,sizeJointX/2,false);
        if (outsideFeetJointState1 == 1 || outsideFeetJointState2 == 1){
            state = 1;
            return state;
        }  

        return state;
      }

    boundaries[0] = new Boundary("CUSTOM",0,0,0,0, excludeJointBoundary1);

    let sizeJointX = 2*materialSize + toolSizeMm;
    let sizeJointY = materialSize - toolSizeMm ;

    boundaries[1] = new Boundary("RECTANGLE",sizeX/2,sizeY/2,sizeX/2,sizeY/2-sizeJointX);

    let posXJoint = posX;
    let posYJoint = posY + sizeY/2 - sizeJointX/2;
    let spacingX = (pieceSizeX - (nbSlats+2)*materialSize)/(nbSlats-1);
    for (let i = 0; i < nbSlats; i++){
        boundaries[i+2] = new Boundary("RECTANGLE",offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*(materialSize+spacingX), posYJoint,sizeJointY/2+materialSize/2,sizeJointX/2);
    }
    boundaries[nbSlats+2] = new Boundary("RECTANGLE",offsetX+(materialSize+toolSizeMm/2)+materialSize/2+1*(materialSize+spacingX), sizeJointX/2,sizeJointY/2+materialSize/2,sizeJointX/2);
    boundaries[nbSlats+3] = new Boundary("RECTANGLE",offsetX+(materialSize+toolSizeMm/2)+materialSize/2+(nbSlats-2)*(materialSize+spacingX), sizeJointX/2,sizeJointY/2+materialSize/2,sizeJointX/2);

    // stool side
    mvts[0] = new Movement(0,0,1);
    //mvts[0].makeArcPath(0.1, 360, 5, 0);
    mvts[0].makeLinePath(-0.75, 0, 1.5, 3, 0);

    boundaries[12] = new Boundary("RECTANGLE",posX,posY,sizeX/2,sizeY/2);
    
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
    gridSizeX = 30; // first one is 15...
    gridSizeY = 60;
    grids[1] = new Grid(1,offsetX+toolSizeMm/2,offsetY+sizeJointX/2,"RANDOM",gridSizeX,gridSizeY,pieceSizeX+gridSizeX,pieceSizeY+gridSizeY,0.5);

    // add random scaling Z 
    scalesZ = [];
    for (let i = 0; i < grids[1].row; i ++){
        scalesZ[i] = [];
        for (let j = 0; j < grids[1].column; j++){
                scalesZ[i][j] = random(1.1,1.6); //before 1.5 to 2
        }
    }
    grids[1].addScalesZ(scalesZ);
}

// sides cut x 2
{
    let offsetX = 0;
    let offsetY = 0;
    let materialSize = 18.5;
	let pieceSizeX = 457.2;
	let pieceSizeY = 304.8;
    let sizeX = pieceSizeX+toolSizeMm;
    let sizeY = pieceSizeY+toolSizeMm;
    let posX = sizeX/2 + offsetX;
    let posY = sizeY/2 + offsetY;
    

    // joints
    let sizeJointX = materialSize ;
    let sizeJointY = materialSize - toolSizeMm ;
    let posXJoint = posX;
    let posYJoint = posY + sizeY/2 - sizeJointX/2;
    let nbSlats = 8;
    let spacingX = (pieceSizeX - (nbSlats+2)*materialSize)/(nbSlats-1)

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

    
    for (let i = 0; i < nbSlats; i++){
        mvts[i] = new Movement(0,0,1);
        mvts[i].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return 0}, true);
        boundaries[i] = new Boundary("NONE",0,0,250,130);
        grids[i] = new Grid(i,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*(materialSize+spacingX), posYJoint, "LINEAR",1,1,1,1);
        grids[i].addRotations(rotations);
    }

    let posYJoint2 = posY - sizeY/2 + sizeJointX/2;

    // joints for legs
    mvts[nbSlats] = new Movement(0,0,1);
    mvts[nbSlats].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return 0}, true);
    boundaries[nbSlats] = new Boundary("NONE",0,0,250,130);
    grids[nbSlats] = new Grid(nbSlats,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+1*(materialSize+spacingX), posYJoint2, "LINEAR",1,1,1,1);
    grids[nbSlats].addRotations(rotations2);

    mvts[nbSlats+1] = new Movement(0,0,1);
    mvts[nbSlats+1].makeDogBonePath(sizeJointX,sizeJointY,1,0,"ONE_SIDE", "CUSTOM", function (j){return 0}, true);
    boundaries[nbSlats+1] = new Boundary("NONE",0,0,250,130);
    grids[nbSlats+1] = new Grid(nbSlats+1,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+(nbSlats-2)*(materialSize+spacingX), posYJoint2, "LINEAR",1,1,1,1);
    grids[nbSlats+1].addRotations(rotations2);
    
    // stool side
    mvts[nbSlats+2] = new Movement(0,0,1);
    mvts[nbSlats+2].makeRectanglePath(sizeX, sizeY, 1, 0, "CUSTOM", function (j){return 0;}, true);
    boundaries[nbSlats+2] = new Boundary("NONE",0,0,250,130);
    grids[nbSlats+2] = new Grid(nbSlats+2,posX,posY,"LINEAR",1,1,1,1);
    
    
}

// slats decoration
{
    let offsetX = 0;
    let offsetY = 0;
    let materialSize = 18.5;
	let pieceSizeX = 457.2;
	let pieceSizeY = 2*materialSize;
    let sizeX = pieceSizeX+toolSizeMm;
    let sizeY = pieceSizeY+toolSizeMm;
    let posX = sizeX/2 + offsetX;
    let posY = sizeY/2 + offsetY;
    let nbSlats = 8;


    let excludeJointBoundary = function(x,y){
        let sizeJointX = 2*materialSize + toolSizeMm ;
        let sizeJointY = materialSize - toolSizeMm ;

    
        //let spacingX = (pieceSizeX - 12*materialSize)/9
        let posYJoint2 = posY - sizeY/2 + sizeJointX/2;
        let spacingX = (pieceSizeX - (nbSlats+2)*materialSize)/(nbSlats-1)

        let state = -1;
        for (let i = 0; i < 2; i++){
            let outSideJointState = boundaryRectangle(x,y,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*(nbSlats-1)*(materialSize+spacingX), posYJoint2,sizeJointY/2+materialSize/2,sizeJointX/2,false);
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
        //let spacingX = (pieceSizeX - 12*materialSize)/9
        let spacingX = (pieceSizeX - (nbSlats+2)*materialSize)/(nbSlats-1)

        let posYJoint2 = posY - sizeY/2 + sizeJointX/2;
      for (let i = 0; i < 2; i++){
        boundaries[i+2] = new Boundary("RECTANGLE",offsetX+(materialSize+toolSizeMm/2)+materialSize/2+i*(nbSlats-1)*(materialSize+spacingX), posYJoint2,sizeJointY/2+materialSize/2,sizeJointX/2);
      }


    // slats side
    mvts[0] = new Movement(0,0,1);
    //mvts[0].makeArcPath(0.1, 360, 5, 0);
    mvts[0].makeLinePath(-0.75, 0, 1.5, 3, 0);
    //mvts[0].makeLineAndBackPath(-0.25, 0, 0.5, 3, 0);

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
    //mvts[1].makeLinePath(-0.75, 0, 1.5, 3, 0);


    //constructor(id, x, y, mode = 0, spx = 50, spy = 50, sx = 150, sy = 150, sinAmp = 0)
    gridSizeX = 25; // first one is 15...then 18
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
    let materialSize = 18.5;
	let pieceSizeX = 457.2;
	let pieceSizeY = 2*materialSize;
    let sizeX = pieceSizeX+toolSizeMm;
    let sizeY = pieceSizeY+toolSizeMm;
    let posX = sizeX/2 + offsetX;
    let posY = sizeY/2 + offsetY;
    let sizeJointX = materialSize ;
    let sizeJointY = materialSize - toolSizeMm ;
    //let spacingX = (pieceSizeX - 12*materialSize)/9
    let nbSlats = 8;
    let spacingX = (pieceSizeX - (nbSlats+2)*materialSize)/(nbSlats-1)

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
    grids[0] = new Grid(0,offsetX+(materialSize+toolSizeMm/2)+materialSize/2+(nbSlats-1)*(materialSize+spacingX), posYJoint2, "LINEAR",1,1,1,1);
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