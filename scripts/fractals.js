function fractal() {

    class Fractal {
        constructor(xmin, ymin, scale, isJulia) {
            this.xmin = xmin;
            this.ymin = ymin;
            this.scale = scale;
            this.isJulia = isJulia;
        }
    }
    
    var history = [];

    var canvas = document.getElementById('fractalCanvas');
    canvas.addEventListener('mousedown', zoom, false);
    var context = canvas.getContext('2d');
    var fract;
    var xmin, ymin, scale = 200;
    var x, y;

    var isJulia;
    var constForJuliaX = document.getElementById('constForJuliaX').value;
    var constForJuliaY = document.getElementById('constForJuliaY').value;
    console.log(constForJuliaX, constForJuliaY);

    var fractalRadioButt = document.getElementsByName('fractalChoose');
    var fractalChoose;
    for (var i = 0; i < fractalRadioButt.length; i++) {
        if (fractalRadioButt[i].checked)
            fractalChoose = fractalRadioButt[i].value;
    }

    if (fractalChoose == 'mandelbrotSet') {
        xmin = -1.9, ymin = -1.5;
        isJulia = false;
        fract = new Fractal(-1.9, -1.5, 200, false);

    } else {
        xmin = -1.4, ymin = -1.5;
        isJulia = true;
        fract = new Fractal(-1.4, -1.5, 200, true);
    }

    history.push(fract);

    buildFractal();

    document.getElementById('stepBack').addEventListener("click", function () {
        history.pop();
        buildFractal();
    });


    function zoom(event) {
        var newScale = document.getElementById('scale').value;
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = canvas.getBoundingClientRect(),
            offsetTop = elemRect.top - bodyRect.top,
            offsetLeft = elemRect.left - bodyRect.left;
        if (!history[history.length-1].isJulia) {
            xmin += (event.pageX - offsetLeft) / scale - 400 / newScale / scale;
            ymin += (event.pageY - offsetTop) / scale - 400 / newScale / scale;
        } else {
            xmin += (event.pageX - offsetLeft) / scale - 400 / newScale / scale;
            ymin += (event.pageY - offsetTop) / scale - 800 / newScale / scale;
        }
        scale *= newScale;
        history.push(new Fractal(xmin, ymin, scale, history[history.length-1].isJulia));
        buildFractal();
    }

    function checkIfBelongsToMandelbrotSet(x, y) {
        var realComponentOfResult = x;
        var imaginaryComponentOfResult = y;
        var maxIterations;
        if(scale < 1000){
            maxIterations = 100;
        } else if(scale<10000){
            maxIterations = 300;
        } else {
            maxIterations = 1000;
        }
        for (var i = 0; i < maxIterations; i++) {
            var tempRealComponent = realComponentOfResult * realComponentOfResult
                - imaginaryComponentOfResult * imaginaryComponentOfResult;
            var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult;
            if (history[history.length-1].isJulia) {
                realComponentOfResult = tempRealComponent + new Number(constForJuliaX);
                imaginaryComponentOfResult = tempImaginaryComponent + new Number(constForJuliaY);
            } else {
                realComponentOfResult = tempRealComponent + x;
                imaginaryComponentOfResult = tempImaginaryComponent + y;
            }

            // Return a number as a percentage
            if (Math.abs(realComponentOfResult + imaginaryComponentOfResult) > 16)
                return (i / maxIterations * 100);
        }
        return 0;   // Return zero if in set 
    }


    function buildFractal() {
        for (x = 0; x < canvas.width; x++) {
            for (y = 0; y < canvas.height; y++) {
                var belongsToSet =
                    checkIfBelongsToMandelbrotSet(x / history[history.length-1].scale + history[history.length-1].xmin,
                        y / history[history.length-1].scale + history[history.length-1].ymin);

                if (belongsToSet == 0) {
                    context.fillStyle = '#000';
                    context.fillRect(x, y, 1, 1); // Draw a black pixel
                } else {
                    context.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
                    context.fillRect(x, y, 1, 1); // Draw a colorful pixel
                }
            }
        }
    }
}

function getSliderInfo() {
    var sliderValue = document.getElementById("scale").value;
    document.getElementById("sliderValue").innerHTML = sliderValue;
};

document.addEventListener("DOMContentLoaded", fractal);
document.addEventListener("DOMContentLoaded", addRadioButtonCheckEvent);
document.addEventListener("DOMContentLoaded", checkRadioButton);

function addRadioButtonCheckEvent() {
    var fractalRadioButt = document.getElementsByName('fractalChoose');
    for (var i = 0; i < fractalRadioButt.length; i++) {
        fractalChoose = fractalRadioButt[i].addEventListener('change', checkRadioButton);
    }
}

function checkRadioButton() {
    var fractalRadioButt = document.getElementsByName('fractalChoose');
    for (var i = 0; i < fractalRadioButt.length; i++) {
        if (fractalRadioButt[i].checked) {
            if (fractalRadioButt[i].value == 'mandelbrotSet') {
                document.getElementById('constForJuliaX').hidden = true;
                document.getElementById('constForJuliaY').hidden = true;
                document.getElementById('label-juliaX').hidden = true;
                document.getElementById('label-juliaY').hidden = true;
            } else if (fractalRadioButt[i].value == 'juliaSet') {
                document.getElementById('constForJuliaX').hidden = false;
                document.getElementById('constForJuliaY').hidden = false;
				document.getElementById('label-juliaX').hidden = false;
                document.getElementById('label-juliaY').hidden = false;
            }
        }
    }
}

function saveImage() {
					var canvas = document.getElementById("fractalCanvas");
					var link = document.createElement('a');
    				link.download = "test.png";
    				link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
    				link.click();
}
