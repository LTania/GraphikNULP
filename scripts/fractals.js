function fractal(){
    var xmin = -1.9, ymin = -1.5, scale = 200;
        var x, y;
        var canvas = document.getElementById('myCanvas');
        canvas.addEventListener("mousedown", zoom, false);
        var context = canvas.getContext('2d');
        mandel();
        function zoom(event) {
            var newScale = document.getElementById("scale").value;
            var bodyRect = document.body.getBoundingClientRect(),
            elemRect = canvas.getBoundingClientRect(),
            offset   = elemRect.top - bodyRect.top;
            xmin += event.pageX/scale - 400/newScale/scale;
            ymin += (event.pageY - offset)/scale - 400/newScale/scale;
            scale*= newScale;
            mandel();
        }

        // function checkIfBelongsToMandelbrotSet(x, y) {
        //     var realComponentOfResult = x;
        //     var imaginaryComponentOfResult = y;
        //     var maxIterations = 100;
        //     for (var i = 0; i < maxIterations; i++) {
        //         var tempRealComponent = realComponentOfResult * realComponentOfResult
        //             - imaginaryComponentOfResult * imaginaryComponentOfResult
        //             + x;
        //         var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
        //             + y;
        //         realComponentOfResult = tempRealComponent;
        //         imaginaryComponentOfResult = tempImaginaryComponent;

        //         // Return a number as a percentage
        //         if (Math.abs(realComponentOfResult + imaginaryComponentOfResult) > 16)
        //             return (i / maxIterations * 100);
        //     }
        //     return 0;   // Return zero if in set        
        // }
        function checkIfBelongsToMandelbrotSet(x, y){
            var realComponentOfResult = x;
            var imaginaryComponentOfResult = y;
            var zx;
            var maxIterations = 150;
            for (var i = 0; i < maxIterations; i++) {
                var tempRealComponent = realComponentOfResult * realComponentOfResult
                    - imaginaryComponentOfResult * imaginaryComponentOfResult;
                var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult;
                realComponentOfResult = tempRealComponent + 0.285;
                imaginaryComponentOfResult = tempImaginaryComponent + 0.01;


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

function getSliderInfo(){
    var sliderValue = document.getElementById("scale").value;
    document.getElementById("sliderValue").innerHTML = sliderValue;
};

