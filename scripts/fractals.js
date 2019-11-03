function fractal() {
    var canvas = document.getElementById('fractalCanvas');
    canvas.addEventListener('mousedown', zoom, false);
    var context = canvas.getContext('2d');
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

    } else {
        xmin = -1.4, ymin = -1.5;
        isJulia = true;
    }

    buildFractal();




    function zoom(event) {
        var newScale = document.getElementById('scale').value;
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = canvas.getBoundingClientRect(),
            offset = elemRect.top - bodyRect.top;
        if (!isJulia) {
            xmin += event.pageX / scale - 400 / newScale / scale;
            ymin += (event.pageY - offset) / scale - 400 / newScale / scale;
        } else {
            xmin += event.pageX / scale - 400 / newScale / scale;
            ymin += (event.pageY - offset) / scale - 800 / newScale / scale;
        }
        scale *= newScale;
        buildFractal();
    }

    function checkIfBelongsToMandelbrotSet(x, y) {
        var realComponentOfResult = x;
        var imaginaryComponentOfResult = y;
        var maxIterations = 100;
        for (var i = 0; i < maxIterations; i++) {
            var tempRealComponent = realComponentOfResult * realComponentOfResult
                - imaginaryComponentOfResult * imaginaryComponentOfResult;
            var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult;
            if (isJulia) {
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
                i = 0;
                cx = xmin + x / scale;
                cy = ymin + y / scale;
                var belongsToSet =
                    checkIfBelongsToMandelbrotSet(x / scale + xmin,
                        y / scale + ymin);

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
    var fractalChoose;
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
            } else if (fractalRadioButt[i].value == 'juliaSet') {
                document.getElementById('constForJuliaX').hidden = false;
                document.getElementById('constForJuliaY').hidden = false;
            }
        }
    }
}
