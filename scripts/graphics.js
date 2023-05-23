// ------------------------------------------------------------------
// 
// This is the graphics object.  It provides a pseudo pixel rendering
// space for use in demonstrating some basic rendering techniques.
//
// ------------------------------------------------------------------
MySample.graphics = (function(pixelsX, pixelsY, showPixels) {
    'use strict';

    let canvas = document.getElementById('canvas-main');
    let context = canvas.getContext('2d', { alpha: false });

    let deltaX = canvas.width / pixelsX;
    let deltaY = canvas.height / pixelsY;

    //------------------------------------------------------------------
    //
    // Public function that allows the client code to clear the canvas.
    //
    //------------------------------------------------------------------
    function clear() {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();

        //
        // Draw a very light background to show the "pixels" for the framebuffer.
        if (showPixels) {
            context.save();
            context.lineWidth = .1;
            context.strokeStyle = 'rgb(150, 150, 150)';
            context.beginPath();
            for (let y = 0; y <= pixelsY; y++) {
                context.moveTo(1, y * deltaY);
                context.lineTo(canvas.width, y * deltaY);
            }
            for (let x = 0; x <= pixelsX; x++) {
                context.moveTo(x * deltaX, 1);
                context.lineTo(x * deltaX, canvas.width);
            }
            context.stroke();
            context.restore();
        }
    }

    //------------------------------------------------------------------
    //
    // Public function that renders a "pixel" on the framebuffer.
    //
    //------------------------------------------------------------------
    function drawPixel(x, y, color) {
        x = Math.trunc(x);
        y = Math.trunc(y);

        context.fillStyle = color;
        context.fillRect(x * deltaX, y * deltaY, deltaX, deltaY);
    }

    //------------------------------------------------------------------
    //
    // Helper function used to draw an X centered at a point.
    //
    //------------------------------------------------------------------

    function drawPoint(x, y, ptColor) {
        drawPixel(x - 1, y - 1, ptColor);
        drawPixel(x + 1, y - 1, ptColor);
        drawPixel(x, y, ptColor);
        drawPixel(x + 1, y + 1, ptColor);
        drawPixel(x - 1, y + 1, ptColor);
    }
    function drawLine(x1, y1, x2, y2, color) {
        let distanceX = Math.abs(x2-x1);
        let distanceY = Math.abs(y2-y1);
        let slope = distanceY/distanceX;
        let b = y1 - slope * x1;
        let x_k = x1;
        let y_k = y1;
        let c = 2 * distanceY + distanceX * (2*b - 1);
        let p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
        
        if(x1 <= x2 && y2 <= y1 && distanceX < distanceY){ //if x and y are in octant 0
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k >= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k--;
            }
        }
        else if(x1 <= x2 && y2 >= y1 && distanceX < distanceY){ //if x and y are in octant 3
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k <= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k++;
            }
        }
        else if(x1 >= x2 && y2 >= y1 && distanceX < distanceY){ //if x and y are in octant 4
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k <= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k++;
            }
        }
        else if(x1 >= x2 && y2 <= y1 && distanceX < distanceY){ //if x and y are in octant 7
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k >= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k--;
            }
        }
        else if(x1 <= x2 && y1 >= y2){ //if x and y are in octant 1
            while(x_k < x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k++;
            }
        }
        else if(x1 <= x2 && y1 <= y2  ){ //if x and y are in octant 2
            while(x_k < x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k++;
            }
        }
        else if(x1 >= x2 && y1 <= y2){ //if x and y are in octant 5
            while(x_k > x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k--;
            }
        }
        else if(x1 >= x2 && y1 >= y2){ //if x and y are in octant 6
            while(x_k > x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k--;
            }
        }
    }

    //------------------------------------------------------------------
    //
    // Renders an Hermite curve based on the input parameters.
    //
    //------------------------------------------------------------------
    
    function drawCurveHermite(controls, segments, showPoints, showLine, showControl, lineColor) {
        let p0_x = controls[0][0];
        let p1_x = controls[1][0];
        let p0_y = controls[0][1];
        let p1_y = controls[1][1];
        let prime0_x = controls[2][0];
        let prime1_x = controls[3][0];
        let prime0_y = controls[2][1];
        let prime1_y = controls[3][1];
        let tempX = p0_x;
        let tempY = p0_y;
        let xu = 0;
        let yu = 0;
        if(showControl){
            drawLine(p0_x, p0_y, p0_x + prime0_x, prime0_y, 'cyan');
            drawLine(p1_x, p1_y, p1_x + prime1_x, p1_y + prime1_y, 'cyan')
        }
        let compute = function(){
            let memo = [];
            return function inner(u){
                if(memo === undefined){
                    memo = [];
                    memo[u] = [(2 * u**3 - 3 * u ** 2 + 1), (-2 * u**3 + 3 * u**2),  (u**3 - 2 * u**2 + u), (u**3 - u**2)];
                }else if(memo[u] === undefined){
                    memo[u] = [(2 * u**3 - 3 * u ** 2 + 1), (-2 * u**3 + 3 * u**2),  (u**3 - 2 * u**2 + u), (u**3 - u**2)];
                }
                return memo[u];
            }
        }();
        let u = 0;
        while(u <= 1){
            let result = compute(u);
            xu = p0_x * result[0] + p1_x * result[1] + prime0_x * result[2] + prime1_x * result[3];
            yu = p0_y * result[0] + p1_y * result[1] + prime0_y * result[2] + prime1_y * result[3];
            if(showPoints){
                drawPoint(xu, yu, "orange")
            }
            if(showLine && u > 0){
                drawLine(tempX, tempY, xu, yu, lineColor);
            }
            tempX = xu;
            tempY = yu;
            u += 1 / segments;
        }
    }
    //------------------------------------------------------------------
    //
    // Renders a Cardinal curve based on the input parameters.
    //
    //------------------------------------------------------------------
    
    function drawCurveCardinal(controls, segments, showPoints, showLine, showControl, lineColor) {
        let pkMinus1X = controls[0][0];
        let pkX = controls[1][0];
        let pkPlus1X = controls[2][0];
        let pkPlus2X = controls[3][0];
        let pkMinus1Y = controls[0][1];
        let pkY = controls[1][1];
        let pkPlus1Y = controls[2][1];
        let pkPlus2Y = controls[3][1];
        let tempX = pkX;
        let tempY = pkY;
        let xu = 0;
        let yu = 0;
        if (showControl) {
            drawPoint(pkMinus1X, pkMinus1Y, 'cyan');
            drawPoint(pkPlus2X, pkPlus2Y, 'cyan');
        }
        let compute = function() {
            let memo = [];
            return function inner(u, t){
                let s = (1 - t) / 2;
                if (memo[u] === undefined) {
                    memo[u] = [];
                    memo[u][t] = [-s * (u**3) + 2 * (s * (u**2)) - (s * u), (2 - s) * (u**3) + (s - 3) * (u**2) + 1, (s - 2) * (u**3) + (3 - 2 * s) * (u**2) + s * u, s * (u**3) - s * (u**2)];
                }else if(memo[u][t] === undefined){
                    memo[u][t] = [-s * (u**3) + 2 * (s * (u**2)) - (s * u), (2 - s) * (u**3) + (s - 3) * (u**2) + 1, (s - 2) * (u**3) + (3 - 2 * s) * (u**2) + s * u, s * (u**3) - s * (u**2)];
                }
                return memo[u][t];
            }
        }();
        let u = 0;
        let t = controls[4][0];
        while (u <= 1) {
            let result = compute(u, t);
            xu = pkMinus1X * result[0] + pkX * result[1] + pkPlus1X * result[2] + pkPlus2X * result[3];
            yu = pkMinus1Y * result[0] + pkY * result[1] + pkPlus1Y * result[2] + pkPlus2Y * result[3];
            if (showPoints) {
                drawPoint(xu, yu, 'yellow');
            }
            if (showLine && u > 0) {
                drawLine(tempX, tempY, xu, yu, lineColor);
            }
            tempX = xu;
            tempY = yu;
            u += 1 / segments;
        }
    }

    //------------------------------------------------------------------
    //
    // Renders a Bezier curve based on the input parameters.
    //
    //------------------------------------------------------------------
    function drawCurveBezier(controls, segments, showPoints, showLine, showControl, lineColor) {
        let p1x = controls[1][0];
        let p2x = controls[2][0];
        let p1y = controls[1][1];
        let p2y = controls[2][1];
        let tempX = 0;
        let tempY = 0;
        if(showControl){
            drawPoint(p1x, p1y, 'cyan');
            drawPoint(p2x, p2y, 'cyan');
        }
        let n = 3;
        let u = 0;
        let BlendC = function() {
            let memo = [];
            return function inner(n, k) {
                if (n > memo.length - 1) {
                    memo[n] = [];
                }
                if (memo[n][k] === undefined) {
                    memo[n][k] = computeC(n, k);
                }
                return memo[n][k];
            }
        }();
        let BlendBEZ = function() {
            let memo = [];
            return function inner(n, k, u) {
                if (memo[n] === undefined) {
                    memo[n] = [];
                }
                if(memo[n][k] === undefined){
                    memo[n][k] = [];
                }
                if (memo[n][k][u] === undefined) {
                    memo[n][k][u] = computeBEZ(n, k, u);
                }
                return memo[n][k][u];
            }
        }();
        let factorial = function() {
            let f = [1, 1];
            return function inner(n) {
                if (n > f.length - 1) {
                    f[n] = inner(n - 1) * n
                }
                return f[n];
            }
        }();
        function computeC(n, k) {
            return factorial(n) / (factorial(k) * factorial(n - k));
        }
        function computeBEZ(n, k, u) {
            let c = BlendC(n, k);
            return c * (u ** k) * ((1 - u) ** (n - k));
        }
        while(u <= 1){
            let xu = 0;
            let yu = 0;
            for(let k = 0; k <= n; k++){
                let BEZ = BlendBEZ(n, k, u);
                xu += controls[k][0] * BEZ; 
                yu += controls[k][1] * BEZ; 
            }
            if(showLine && u !== 0){
                drawLine(tempX, tempY, xu, yu, lineColor);
            }
            if(showPoints){
                drawPoint(xu, yu, 'yellow');
            }
            u += 1 / segments;
            tempX = xu;
            tempY = yu;
        }
    }

    //------------------------------------------------------------------
    //
    // Renders a Bezier curve based on the input parameters; using the matrix form.
    // This follows the Mathematics for Game Programmers form.
    //
    //------------------------------------------------------------------

    function drawCurveBezierMatrix(controls, segments, showPoints, showLine, showControl, lineColor) {
        let p0x = controls[0][0];
        let p1x = controls[1][0];
        let p2x = controls[2][0];
        let p3x = controls[3][0];
        let p0y = controls[0][1];
        let p1y = controls[1][1];
        let p2y = controls[2][1];
        let p3y = controls[3][1];
        let tempX = p0x;
        let tempY = p0y;
        let xu = 0;
        let yu = 0;
        if(showControl){
            drawPoint(p1x, p1y, 'cyan');
            drawPoint(p2x, p2y, 'cyan');
        }
        let compute = function(){
            let memo = [];
            return function inner(u){
                if(memo === undefined){
                    memo = [];
                    memo[u] = [(u**3), (-3 * (u**3) + 3 * (u**2)), (3 * (u**3) - 6 * (u**2) + 3 * u), (-1 * (u**3) + 3 * (u**2) - (3 * u) + 1)];
                }else if(memo[u] === undefined){
                    memo[u] = [(u**3), (-3 * (u**3) + 3 * (u**2)), (3 * (u**3) - 6 * (u**2) + 3 * u), (-1 * (u**3) + 3 * (u**2) - (3 * u) + 1)];
                }
                return memo[u];
            }
        }();
        let u = 0;
        while(u <= 1){
            let result = compute(u);
            xu = p0x * result[0] + p1x * result[1] + p2x * result[2] + p3x * result[3];
            yu = p0y * result[0] + p1y * result[1] + p2y * result[2] + p3y * result[3];
            if(showPoints){
                drawPoint(xu, yu, 'yellow');
            }
            if(showLine && u > 0){
                drawLine(tempX, tempY, xu, yu, lineColor);
            }
            tempX = xu;
            tempY = yu;
            u += 1 / segments
        }
    }

    //------------------------------------------------------------------
    //
    // Entry point for rendering the different types of curves.
    // I know a different (functional) JavaScript pattern could be used
    // here.  My goal was to keep it looking C++'ish to keep it familiar
    // to those not expert in JavaScript.
    //
    //------------------------------------------------------------------

    function drawCurve(type, controls, segments, showPoints, showLine, showControl, lineColor) {
        switch (type) {
            case api.Curve.Hermite:
                drawCurveHermite(controls, segments, showPoints, showLine, showControl, lineColor);
                break;
            case api.Curve.Cardinal:
                drawCurveCardinal(controls, segments, showPoints, showLine, showControl, lineColor);
                break;
            case api.Curve.Bezier:
                drawCurveBezier(controls, segments, showPoints, showLine, showControl, lineColor);
                break;
            case api.Curve.BezierMatrix:
                drawCurveBezierMatrix(controls, segments, showPoints, showLine, showControl, lineColor);
                break;
        }
    }

    //
    // This is what we'll export as the rendering API
    const api = {
        clear: clear,
        drawPixel: drawPixel,
        drawLine: drawLine,
        drawCurve: drawCurve
    };

    Object.defineProperty(api, 'sizeX', {
        value: pixelsX,
        writable: false
    });
    Object.defineProperty(api, 'sizeY', {
        value: pixelsY,
        writable: false
    });
    Object.defineProperty(api, 'Curve', {
        value: Object.freeze({
            Hermite: 0,
            Cardinal: 1,
            Bezier: 2,
            BezierMatrix: 3
        }),
        writable: false
    });

    return api;
}(1000, 1000, false));
