document.addEventListener('DOMContentLoaded', init);

  function createGrid () {
    // draw a line every *step* pixels
    const step = 80;

    // our end points
    console.log(canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;

    const startX = -100;

    const startY = -100;

    // set our styles
    ctx.save();
    ctx.strokeStyle = 'gray'; // line colors
    ctx.fillStyle = 'black'; // text color
    ctx.font = '8px Monospace';
    ctx.lineWidth = 0.4;

    // draw vertical from X to Height
    for (let x = 0; x < width; x += step) {
      // draw vertical line
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      // draw text
      ctx.fillText((x + startX)/20, x, 10);
    }

    // draw horizontal from Y to Width
    for (let y = 0; y < height; y += step) {
      // draw horizontal line
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      // draw text
      ctx.fillText((height - y + startY)/20, 0, y);
    }

    // restore the styles from before this function was called
    ctx.restore();
  }

  function init () {
    // set our config variables
    canvas = document.getElementById('canvas-affin');
    ctx = canvas.getContext('2d');

    createGrid();
  }

  var xA, yA, xB, yB, xC, yC, xD, yD;

function findDots() {

    xA = Number(document.getElementById('xA').value);
    yA = Number(document.getElementById('yA').value);
    xC = Number(document.getElementById('xC').value);
    yC = Number(document.getElementById('yC').value);

    var deltaX = xC - xA;
    var deltaY = yC - yA;

    var xO = (xC+xA)/2;
    var yO = (yC+yA)/2;

    xB = xO - deltaY/2;
    yB = yO + deltaX/2;

    xD = xO + deltaY/2;
    yD = yO - deltaX/2;

    console.log(xB, yB, xD, yD);
}

function drowSquare(){
    findDots();
    canvas = document.getElementById('canvas-affin');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    init();
    ctx.moveTo(100 + xA*20, 500 - 20*yA);
    ctx.lineTo(100 + xB*20, 500 - 20*yB);
    ctx.moveTo(100 + xB*20, 500 - 20*yB);
    ctx.lineTo(100 + xC*20, 500 - 20*yC);
    ctx.moveTo(100 + xC*20, 500 - 20*yC);
    ctx.lineTo(100 + xD*20, 500 - 20*yD);
    ctx.moveTo(100 + xD*20, 500 - 20*yD);
    ctx.lineTo(100 + xA*20, 500 - 20*yA);
    ctx.stroke();

}
