function fractal(){
    var xmin = -1.9, ymin = -1.5, scale = 200;
        var x, y, i, xt;
        var color;
        var canvas = document.getElementById('myCanvas');
        canvas.addEventListener("mousedown", zoom, false);
        var context = canvas.getContext('2d');
        mandel();
        function zoom(event) {
            xmin += event.pageX/scale - 200/scale;
            ymin += (event.pageY - 930)/scale - 200/scale;
            console.log(event.pageX);
            console.log(event.pageY - 930);
            console.log(xmin);
            console.log(ymin);
            scale*=2;
            mandel();
        }

        function checkIfBelongsToMandelbrotSet(x, y) {
            var realComponentOfResult = x;
            var imaginaryComponentOfResult = y;
            var maxIterations = 100;
            for (var i = 0; i < maxIterations; i++) {
                var tempRealComponent = realComponentOfResult * realComponentOfResult
                    - imaginaryComponentOfResult * imaginaryComponentOfResult
                    + x;
                var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                    + y;
                realComponentOfResult = tempRealComponent;
                imaginaryComponentOfResult = tempImaginaryComponent;

                // Return a number as a percentage
                if (Math.abs(realComponentOfResult + imaginaryComponentOfResult) > 16)
                    return (i / maxIterations * 100);
            }
            return 0;   // Return zero if in set        
        }

        function mandel() {
            for (x = 0; x < canvas.width; x++) {
                for (y = 0; y < canvas.height; y++) {
                    i = 0;
                    cx = xmin + x / scale;
                    cy = ymin + y / scale;
                    var belongsToSet =
							checkIfBelongsToMandelbrotSet(x / scale + xmin,
								y / scale + ymin);
                    // zx = 0;
                    // zy = 0;

                    // do {
                    //     xt = zx * zy;
                    //     zx = zx * zx - zy * zy + cx;
                    //     zy = 2 * xt + cy;
                    //     i++;
                    // }
                    // while (i < 255 && (zx * zx + zy * zy) < 16);

                    if (belongsToSet == 0) {
                        context .fillStyle = '#000';
							context .fillRect(x, y, 1, 1); // Draw a black pixel
						} else {
							context .fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
							context .fillRect(x, y, 1, 1); // Draw a colorful pixel
						}
                }
            }
        }
}

