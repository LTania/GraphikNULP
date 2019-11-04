document.addEventListener("DOMContentLoaded", fractal);
document.addEventListener("DOMContentLoaded", addRadioButtonCheckEvent);
document.addEventListener("DOMContentLoaded", checkRadioButton);

class Fractal {
    constructor(xmin, ymin, scale, isJulia, constForJuliaX, constForJuliaY) {
        this.xmin = xmin;
        this.ymin = ymin;
        this.scale = scale;
        this.isJulia = isJulia;
        this.constForJuliaX = constForJuliaX;
        this.constForJuliaY = constForJuliaY;
    }
}

var allHistory = [];

var c = 0;

function fractal() {

    var canvas = document.getElementById('fractalCanvas');
    if (c == 0) {
        canvas.addEventListener('mousedown', zoom, false);
        c++;
    }
    var context = canvas.getContext('2d');
    var fract;
    var x, y;
    var constForJuliaX = document.getElementById('constForJuliaX').value;
    var constForJuliaY = document.getElementById('constForJuliaY').value;

    var fractalRadioButt = document.getElementsByName('fractalChoose');
    var fractalChoose;
    for (var i = 0; i < fractalRadioButt.length; i++) {
        if (fractalRadioButt[i].checked)
            fractalChoose = fractalRadioButt[i].value;
    }

    if (fractalChoose == 'mandelbrotSet') {
        fract = new Fractal(-1.9, -1.5, 200, false);

    } else {
        fract = new Fractal(-1.4, -1.5, 200, true, Number(constForJuliaX), Number(constForJuliaY));
    }

    allHistory.push(fract);

    buildFractal();

    if (c == 0) {
        document.getElementById('stepBack').addEventListener("click", function () {
            allHistory.pop();
            buildFractal();
        });
    }


    function zoom(event) {
        console.log('I`m here');
        var newScale = document.getElementById('scale').value;
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = canvas.getBoundingClientRect(),
            offsetTop = elemRect.top - bodyRect.top,
            offsetLeft = elemRect.left - bodyRect.left;
        var scale = allHistory[allHistory.length - 1].scale;
        var xmin = allHistory[allHistory.length - 1].xmin;
        var ymin = allHistory[allHistory.length - 1].ymin;
        if (!allHistory[allHistory.length - 1].isJulia) {
            xmin += (event.pageX - offsetLeft) / scale - 400 / newScale / scale;
            ymin += (event.pageY - offsetTop) / scale - 400 / newScale / scale;
        } else {
            xmin += (event.pageX - offsetLeft) / scale - 400 / newScale / scale;
            ymin += (event.pageY - offsetTop) / scale - 400 / newScale * (1 + newScale*0.1) / scale;
        }

        scale *= newScale;
        allHistory.push(new Fractal(xmin, ymin,
             scale, allHistory[allHistory.length - 1].isJulia, allHistory[allHistory.length - 1].constForJuliaX
             , allHistory[allHistory.length - 1].constForJuliaY));
        buildFractal();
    }

    function checkIfBelongsToMandelbrotSet(x, y) {
        var realComponentOfResult = x;
        var imaginaryComponentOfResult = y;
        var maxIterations;
        var scale = allHistory[allHistory.length - 1].scale;
        if (scale < 100000) {
            maxIterations = 15 * Math.log2(scale);
        }
        else {
            maxIterations = 50 * Math.log2(scale);
        }
        for (var i = 0; i < maxIterations; i++) {
            var tempRealComponent = realComponentOfResult * realComponentOfResult
                - imaginaryComponentOfResult * imaginaryComponentOfResult;
            var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult;
            if (allHistory[allHistory.length - 1].isJulia) {
                realComponentOfResult = tempRealComponent + allHistory[allHistory.length - 1].constForJuliaX;
                imaginaryComponentOfResult = tempImaginaryComponent + allHistory[allHistory.length - 1].constForJuliaY;
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
                    checkIfBelongsToMandelbrotSet(x / allHistory[allHistory.length - 1].scale + allHistory[allHistory.length - 1].xmin,
                        y / allHistory[allHistory.length - 1].scale + allHistory[allHistory.length - 1].ymin);

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
