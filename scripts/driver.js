
MySample.main = (function(graphics) {
    'use strict';
    let previousTime = performance.now();
    let firstStart = {x: graphics.sizeX / 2, y: graphics.sizeY / 8};
    let firstEnd = {x: 3 * graphics.sizeX / 4, y: graphics.sizeY / 8};
    let firstTanStart = {x: graphics.sizeX / 8, y: -graphics.sizeY / 4};
    let firstTanEnd = {x: graphics.sizeX / 16, y: graphics.sizeY / 8};
    let start = {x:graphics.sizeX / 8, y: graphics.sizeY / 5};
    let end = {x: graphics.sizeX / 4, y: graphics.sizeY / 3};
    let startTan = {x: graphics.sizeX / 4, y: graphics.sizeY / 3};
    let endTan = {x: graphics.sizeX / 2, y: graphics.sizeY / 4};
    let endEnd = {x: graphics.sizeX / 4, y:  graphics.sizeY / 2};
    let hermiteTanStart = {x: 0, y:  graphics.sizeY / 5};
    let hermiteTanEnd = {x: 0, y:   graphics.sizeY / 5};
    let bp0 = {x: 100, y: 100};
    let bp3 = {x: 400, y: 100};
    let bp1 = {x: 200, y: 50};
    let bp2 = {x: 300, y: 150};
    let bmp0 = {x: 100, y: 125};
    let bmp3 = {x: 400, y: 125};
    let bmp1 = {x: 200, y: 75};
    let bmp2 = {x: 300, y: 175};
    let cp0 = {x: 500, y: 500};
    let cp1 = {x: 600, y: 450};
    let cp2 = {x: 700, y: 450};
    let cp3 = {x: 800, y: 500};
    let startTanCoord = {x: 1, y: 400};
    let endTanCoord = {x: 150, y: 450};
    let startCoord = {x: 90, y: 425};
    let endCoord = {x: 110, y: 400};
    let tension = 1;
	let increment = 4;
	let increasing = true;
    let isDoing = true;
    let isAlsoDoing = true;
    let bpBool = true;
    let bmpBool = true;
    let cpBool = true;
    let wiggle = true;
    let spin = true;



    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------

    function update(elapsedTime) {
        let bp1Change = 50 * elapsedTime / 1000;
        const bp1maxY = 150;
        const bp1minY = 10;
        if (bpBool) {
            if (bp1.y <= bp1maxY) {
                bp1.y += bp1Change;
            } else {
                bpBool = false;
            }
        } else {
            if (bp1.y >= bp1minY) {
                bp1Change = -50 * elapsedTime / 1000;
                bp1.y += bp1Change;
            } else {
                bpBool = true;
            }
        }

        let bmp1Change = 50 * elapsedTime / 1000;
        const bmp1maxY = 175;
        const bmp1minY = 35;
        if (bmpBool) {
            if (bmp1.y <= bmp1maxY) {
                bmp1.y += bmp1Change;
            } else {
                bmpBool = false;
            }
        } else {
            if (bmp1.y >= bmp1minY) {
                bmp1Change = -50 * elapsedTime / 1000;
                bmp1.y += bmp1Change;
            } else {
                bmpBool = true;
            }
        }

        let bp2Change = -50 * elapsedTime / 1000;
        const bp2maxY = 50;
        const bp2minY = 190;
        if (bpBool) {
            if (bp2.y >= bp2maxY) {
                bp2.y += bp2Change;
            } else {
                bpBool = false;
            }
        } else {
            if (bp2.y <= bp2minY) {
                bp2Change = 50 * elapsedTime / 1000;
                bp2.y += bp2Change;
            } else {
                bpBool = true;
            }
        }

        let bmp2Change = -50 * elapsedTime / 1000;
        const bmp2maxY = 75; 
        const bmp2minY = 215; 
        if (bmpBool) {
            if (bmp2.y >= bmp2maxY) { 
                bmp2.y += bmp2Change;
            } else {
                bmpBool = false;
            }
        } else {
            if (bmp2.y <= bmp2minY) {
                bmp2Change = 50 * elapsedTime / 1000; 
                bmp2.y += bmp2Change;
            } else {
                bmpBool = true;
            }
        }
        let deltaT = elapsedTime / 1000;
        let xChange = -250 * deltaT;
        let yChange = 500 * deltaT;
        if (isDoing) {
            if (firstTanStart.x > -250) {
                firstTanStart.x += xChange;
            } else {
                isDoing = false;
            }
        } else {
            if (firstTanStart.x <= graphics.sizeX / 8) {
                xChange = 250 * deltaT;
                firstTanStart.x += xChange;
                
            }else{
                isDoing = true;
            }
        }
        if (isAlsoDoing) {
            if (firstTanStart.y < 500) {
                firstTanStart.y += yChange;
            } else {
                isAlsoDoing = false;
            }
        } else {
            if (firstTanStart.y >= -graphics.sizeY / 4) { 
                yChange = -500 * deltaT
                firstTanStart.y += yChange;
            }else{
                isAlsoDoing = true;
            }
        }
        
    
        tension += (increasing ? increment : -increment) * deltaT;
        if (increasing && tension >= 10) {
            tension = 10;
            increasing = false;
        } else if (!increasing && tension <= 1) {
            tension = 1;
            increasing = true;
        }
        let cp0Change = 75 * elapsedTime / 1000;
        let cp3Change = 75 * elapsedTime / 1000;
        const cp0Initial = { x: 500, y: 500 };
        const cp3Initial = { x: 800, y: 500 };

        if (cpBool) {
            if (cp0.x >= 400) {
              cp0.x -= cp0Change;
            }
            if (cp3.x <= 900) {
              cp3.x += cp3Change;
            }
            if (cp0.y >= 300) {
                cp0Change = 150 * elapsedTime / 1000;
              cp0.y -= cp0Change;
            }
            if (cp3.y >= 300) {
                cp3Change = 150 * elapsedTime / 1000;
              cp3.y -= cp3Change;
            }
            else {
              cpBool = false;
            }
          } else {
            if (cp0.x <= cp0Initial.x) {
              cp0.x += cp0Change;
            }
            if (cp3.x > cp3Initial.x) {
              cp3.x -= cp3Change;
            }
            if (cp0.y <= cp0Initial.y) {
                cp0Change = 150 * elapsedTime / 1000;
              cp0.y += cp0Change;
            }
            if (cp3.y <= cp3Initial.y) {
                cp3Change = 150 * elapsedTime / 1000;
              cp3.y += cp3Change;
            }
            else {
              cpBool = true;
            }
        }
        let wiggleRight = 50 * elapsedTime / 1000;
        let wiggleLeft = -50 * elapsedTime / 1000;
        if(wiggle){
            if(hermiteTanStart.x <= 50){
                hermiteTanStart.x += wiggleRight;
                hermiteTanEnd.x += wiggleLeft;
            }
            else{
                wiggle = false;
            }
        }else{
            if(hermiteTanStart.x >= -50){
                hermiteTanStart.x += wiggleLeft;
                hermiteTanEnd.x += wiggleRight;
            }
            else{
                wiggle = true;
            }
        }

        let spinOneWay = -100 * elapsedTime / 1000;
        let spinAnotherWay = 100 * elapsedTime / 1000;
        let lift = -50 * elapsedTime / 1000;
        let drop = 50 * elapsedTime / 1000;
        if(spin){
            if(endTanCoord.x >= 1 && startTanCoord.x <= 150){
                endTanCoord.x += spinOneWay;
                startTanCoord.x += spinAnotherWay;
            }
            else if(endTanCoord.x <= 1 && endTanCoord.y >= 350 && startTanCoord.x >= 150 && startTanCoord.y <= 500){
                startTanCoord.y += drop;
                endTanCoord.y += lift;
            }else{
                spin = false;
            }
        }else{
            if(endTanCoord.x <= 150 && startTanCoord.x >= 1){
                endTanCoord.x += spinAnotherWay;
                startTanCoord.x += spinOneWay;
            }
            else if(endTanCoord.x >= 150 && endTanCoord.y <= 500 && startTanCoord.x <= 1 && startTanCoord.y >= 350){
                startTanCoord.y += lift;
                endTanCoord.y += drop;
            }else{
                spin = true;
            }
        }
    }

    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------
    function render() {
        graphics.clear();
        graphics.drawCurve(graphics.Curve.Hermite, [[firstStart.x, firstStart.y], [firstEnd.x, firstEnd.y], [firstTanStart.x, firstTanStart.y], [firstTanEnd.x, firstTanEnd.y]], 50, false,true,false, "rgb(0, 255, 0)");
        graphics.drawCurve(graphics.Curve.Bezier, [[bp0.x,bp0.y],[bp1.x,bp1.y],[bp2.x, bp2.y],[bp3.x, bp3.y]], 50, false,true,false, "rgb(120, 200, 50)");
        graphics.drawCurve(graphics.Curve.BezierMatrix, [[bmp0.x, bmp0.y], [bmp1.x, bmp1.y], [bmp2.x, bmp2.y], [bmp3.x, bmp3.y]], 50, false,true,false, "rgb(0, 0, 255)");
        graphics.drawCurve(graphics.Curve.Cardinal, [[cp0.x, cp0.y], [cp1.x, cp1.y], [cp2.x, cp2.y], [cp3.x, cp3.y], [10]], 50, false, true, false, 'pink');
        graphics.drawCurve(graphics.Curve.Cardinal, [[start.x - 50,start.y],[end.x,end.y],[startTan.x,startTan.y],[endTan.x- 50, endTan.y - 50], [tension]], 50, false,true,false, "rgb(255, 0, 0)");
        graphics.drawCurve(graphics.Curve.Hermite, [[end.x, end.y],[endEnd.x, endEnd.y],[hermiteTanStart.x, hermiteTanStart.y], [hermiteTanEnd.x, hermiteTanEnd.y]], 50, false, true, false, 'white');
        graphics.drawCurve(graphics.Curve.Cardinal, [[startTanCoord.x, startTanCoord.y],[startCoord.x, startCoord.y],[endCoord.x, endCoord.y],[endTanCoord.x, endTanCoord.y],[15]], 50, false, true, false, 'white');

    }

    //------------------------------------------------------------------
    //
    // This is the animation loop.
    //
    //------------------------------------------------------------------
    function animationLoop(time) {

        let elapsedTime = time - previousTime;
        previousTime = time;
        update(elapsedTime);
        render();

        requestAnimationFrame(animationLoop);
    }

    console.log('initializing...');
    requestAnimationFrame(animationLoop);

}(MySample.graphics));
