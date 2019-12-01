
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