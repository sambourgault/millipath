// CREATING A CUSTOM BOUNDARY FOR A JOINT
let sizeX = 100;
let sizeY = 100;
let sideOffset = 20;
boundaries[0] = new Boundary("RECTANGLE", sizeX/2+sideOffset, sizeY/2+sideOffset, sizeX/2, sizeY/2);
let sizeOpeningX = 30;
let sizeOpeningY = sizeY/2;
boundaries[1] = new Boundary("RECTANGLE", sizeX/2+sideOffset, sizeY/2+sideOffset+sizeY/4, sizeOpeningX/2, sizeOpeningY/2);
boundaries[1].reverseBoundary(true);
let radiusSlot1 = 5;
boundaries[2] = new Boundary("CIRCLE", sizeX/2+sideOffset-sizeOpeningX/2+radiusSlot1, sizeY/2+sideOffset+sizeY/4-sizeOpeningY/2, radiusSlot1);
boundaries[3] = new Boundary("CIRCLE", sizeX/2+sideOffset+sizeOpeningX/2-radiusSlot1, sizeY/2+sideOffset+sizeY/4-sizeOpeningY/2, radiusSlot1);
boundaries[2].reverseBoundary(true);
boundaries[3].reverseBoundary(true);