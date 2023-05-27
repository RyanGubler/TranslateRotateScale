
MySample.main = (function(graphics) {
    'use strict';
    let previousTime = performance.now();

    let primitive = {
        verts: [
            {x:200, y:200},
            {x:300, y:200},
            {x:300, y:300},
            {x:200, y:300}
        ],
        center: {x: 250, y: 250}
    };
    let bezierCurve = [
        [100, 100],
        [150, 125],
        [200, 75],
        [250, 100]
    ];
    let cardinalCurve = [
        [200, 300],
        [150, 125],
        [200, 75],
        [250, 100],
        [10]
    ];
    
    // graphics.translateCurve('Bezier', bezierCurve, {x:20, y:20});
    // graphics.translateCurve('Cardinal', cardinalCurve, {x:50, y:50});
    graphics.scaleCurve('Bezier', bezierCurve, .5);
    graphics.scalePrimitive(primitive, 2);

    // graphics.rotatePrimitive(primitive, .5)
    // graphics.translatePrimitive(primitive, [50, 50])
    // graphics.rotateCurve('Bezier', [[100,100], [150, 125], [200, 75],[250, 100]], .5);
    // graphics.scaleCurve('Bezier', curve,  2);

    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------

    function update(elapsedTime) {
        
    }

    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------




    function render() {
        graphics.clear();
        graphics.drawPrimitive(primitive, true, 'pink');
        graphics.drawCurve(graphics.Curve.Bezier, bezierCurve, 100, false, true, true, 'pink');
        // graphics.drawCurve(graphics.Curve.Cardinal, cardinalCurve, 100, false, true, true, 'yellow'); 
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
