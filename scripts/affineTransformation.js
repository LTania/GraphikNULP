
function findDots() {

    var xA = Number(document.getElementById('xA').value), 
        yA = Number(document.getElementById('yA').value);
    var xC = Number(document.getElementById('xC').value),
        yC = Number(document.getElementById('yC').value);

    var deltaX = xC - xA;
    var deltaY = yC - yA;

    var xO = (xC+xA)/2;
    var yO = (yC+yA)/2;

    var xB = xO - deltaY/2;
    var yB = yO + deltaX/2;

    var xD = xO + deltaY/2;
    var yD = yO - deltaX/2;

    console.log(xB, yB, xD, yD);
}

(function () {
    let canvas, ctx;
  
    // draws a grid
    function createGrid () {
      // draw a line every *step* pixels
      const step = 30;
  
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
      ctx.lineWidth = 0.2;
  
      // draw vertical from X to Height
      for (let x = 0; x < width; x += step) {
        // draw vertical line
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
  
        // draw text
        ctx.fillText(x + startX, x, 10);
      }
  
      // draw horizontal from Y to Width
      for (let y = 0; y < height; y += step) {
        // draw horizontal line
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
  
        // draw text
        ctx.fillText(height - y + startY, 0, y);
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
  
    document.addEventListener('DOMContentLoaded', init);
  })()