document.addEventListener('DOMContentLoaded', init);
var startX = -100;
var startY = -100;
var grade = 20;

function createGrid() {
	// draw a line every *step* pixels
	const step = 80;
	// our end points
	const width = canvas.width;
	const height = canvas.height;
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
		ctx.fillText((x + startX) / 20, x, 10);
	}
	// draw horizontal from Y to Width
	for (let y = 0; y < height; y += step) {
		// draw horizontal line
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(width, y);
		ctx.stroke();
		// draw text
		ctx.fillText((height - y + startY) / 20, 0, y);
	}
	// restore the styles from before this function was called
	ctx.restore();
}

function init() {
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
	var xO = (xC + xA) / 2;
	var yO = (yC + yA) / 2;
	xB = xO - deltaY / 2;
	yB = yO + deltaX / 2;
	xD = xO + deltaY / 2;
	yD = yO - deltaX / 2;
}

function drowSquare() {
	findDots();
	startX = -100;
	startY = -100;
	if (xA === xC && yA === yC) {
		alert("Діагональ не може бути точкою. Введіть інші координати!");
	}
	canvas = document.getElementById('canvas-affin');
	ctx = canvas.getContext('2d');
	var minX = Math.min(xA, xB, xC, xD);
	if(minX < -3){
		startX = -100 + Math.round(minX) * grade;
	}

	var minY = Math.min(yA, yB, yC, yD);
	if(minY < -3){
		startY = -100 + Math.round(minY) * grade;
	}

	var maxX = Math.max(xA, xB, xC, xD);
	if(maxX > 23){
		startX = -100 + (Math.round(maxX) - 23) * grade;
	}

	var maxY = Math.max(yA, yB, yC, yD);
	if(maxX > 23){
		startY = -100 + (Math.round(maxY) - 23) * grade;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	init();
	ctx.moveTo(startX * (-1) + xA * 20, 600 + startY - 20 * yA);
	ctx.lineTo(startX * (-1) + xB * 20, 600 + startY - 20 * yB);
	ctx.moveTo(startX * (-1) + xB * 20, 600 + startY - 20 * yB);
	ctx.lineTo(startX * (-1) + xC * 20, 600 + startY - 20 * yC);
	ctx.moveTo(startX * (-1) + xC * 20, 600 + startY - 20 * yC);
	ctx.lineTo(startX * (-1) + xD * 20, 600 + startY - 20 * yD);
	ctx.moveTo(startX * (-1) + xD * 20, 600 + startY - 20 * yD);
	ctx.lineTo(startX * (-1) + xA * 20, 600 + startY - 20 * yA);
	ctx.stroke();
}

function translationMatrix(m, n) {
	return [
  [1, 0, m]
  , [0, 1, n]
  , [0, 0, 1]
];
}

function dilationMatrix(a, d) {
	return [
  [a, 0, 0]
  , [0, d, 0]
  , [0, 0, 1]
];
}

function rotationMatrix(fi) {
	return [
  [Math.cos(fi), Math.sin(fi), 0]
  , [(-1) * Math.sin(fi), Math.cos(fi), 0]
  , [0, 0, 1]
];
}

function multiplyMatrices(m1, m2) {
	var result = Array(m1.length);
	result[0] = m2[0][0] * m1[0] + m2[0][1] * m1[1] + m2[0][2] * m1[2];
	result[1] = m2[1][0] * m1[0] + m2[1][1] * m1[1] + m2[1][2] * m1[2];
	result[2] = m2[2][0] * m1[0] + m2[2][1] * m1[1] + m2[2][2] * m1[2];
	return result;
}

function drowSquareFromDots(a, b, c, d) {
	canvas = document.getElementById('canvas-affin');
	ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var minX = Math.min(a[0], b[0], c[0], d[0]);
	if(minX < -3){
		startX = -100 + Math.round(minX) * grade;
	}

	var minY = Math.min(a[1], b[1], c[1], d[1]);
	if(minY < -3){
		startY = -100 + Math.round(minY) * grade;
	}

	var maxX = Math.max(a[0], b[0], c[0], d[0]);
	if(maxX > 23){
		startX = -100 + (Math.round(maxX) - 24) * grade;
	}

	var maxY = Math.max(a[1], b[1], c[1], d[1]);
	if(maxY > 23){
		startY = -100 + (Math.round(maxY) - 24) * grade;
	}

	console.log("x", a[0], b[0], c[0], d[0]);
	console.log("y", a[1], b[1], c[1], d[1]);
	console.log(maxX-23, maxY-23);
	console.log(startX, startY);
	createGrid();
	ctx.beginPath();
	init();
	ctx.moveTo(startX * (-1) + a[0] * 20, 600 + startY - 20 * a[1]);
	ctx.lineTo(startX * (-1) + b[0] * 20, 600 + startY - 20 * b[1]);
	ctx.moveTo(startX * (-1) + b[0] * 20, 600 + startY - 20 * b[1]);
	ctx.lineTo(startX * (-1) + c[0] * 20, 600 + startY - 20 * c[1]);
	ctx.moveTo(startX * (-1) + c[0] * 20, 600 + startY - 20 * c[1]);
	ctx.lineTo(startX * (-1) + d[0] * 20, 600 + startY - 20 * d[1]);
	ctx.moveTo(startX * (-1) + d[0] * 20, 600 + startY - 20 * d[1]);
	ctx.lineTo(startX * (-1) + a[0] * 20, 600 + startY - 20 * a[1]);
	ctx.stroke();
}

var translationM, dilationM, rotationM;

function mashtab(dotes){
	var dotes2 = new Array(4);
		for (var i = 0; i < 4; i++) dotes2[i] = multiplyMatrices(dotes[i], dilationM);
	return dotes2;
}

function zsuv(dotes){
	var dotes2 = new Array(4);
		for (var i = 0; i < 4; i++) dotes2[i] = multiplyMatrices(dotes[i], translationM);
	return dotes2;
}

function povorot(dotes){
	var dotes2 = new Array(4);
		for (var i = 0; i < 4; i++) dotes2[i] = multiplyMatrices(dotes[i], rotationM);
	return dotes2;
}

function doAfiinnePeretvorenia() {
	var fi = Number(document.getElementById('FI').value);
	var m = Number(document.getElementById('zsuvX').value);
	var n = Number(document.getElementById('zsuvY').value);
	var a = Number(document.getElementById('mashtabX').value);
	var d = Number(document.getElementById('mashtabY').value);
	translationM = translationMatrix(m, n);
	dilationM = dilationMatrix(a, d);
	rotationM = rotationMatrix(fi);

	var dotes = [[xA, yA, 1], [xB, yB, 1], [xC, yC, 1], [xD, yD, 1]];
	var e = document.getElementById("combination");
	var valComb = e.value;
	if (valComb == 1) {
		var dotes2 = mashtab(dotes);
		var dotes3 = povorot(dotes2);
		drowSquareFromDots(dotes3[0], dotes3[1], dotes3[2], dotes3[3]);
	}
	
	else if (valComb == 2){
		var dotes2 = mashtab(dotes);
		var dotes3 = zsuv(dotes2);
		drowSquareFromDots(dotes3[0], dotes3[1], dotes3[2], dotes3[3]);
	}
	
	else if (valComb == 3){
		var dotes2 = zsuv(dotes);
		var dotes3 = mashtab(dotes2);
		drowSquareFromDots(dotes3[0], dotes3[1], dotes3[2], dotes3[3]);
	}
	
	else if (valComb == 4){
		var dotes2 = zsuv(dotes);
		var dotes3 = povorot(dotes2);
		drowSquareFromDots(dotes3[0], dotes3[1], dotes3[2], dotes3[3]);
	}
	
	else if (valComb == 5){
		var dotes2 = povorot(dotes);
		var dotes3 = zsuv(dotes2);
		drowSquareFromDots(dotes3[0], dotes3[1], dotes3[2], dotes3[3]);
	}
	
	else if (valComb == 6){
		var dotes2 = povorot(dotes);
		var dotes3 = mashtab(dotes2);
		drowSquareFromDots(dotes3[0], dotes3[1], dotes3[2], dotes3[3]);
	}
	else if (valComb == 7){
		var dotes2 = povorot(dotes);
		var dotes3 = zsuv(dotes2);
		var dotes4 = mashtab(dotes3);
		drowSquareFromDots(dotes4[0], dotes4[1], dotes4[2], dotes4[3]);
	}
	
	else if (valComb == 8){
		var dotes2 = povorot(dotes);
		var dotes3 = mashtab(dotes2);
		var dotes4 = zsuv(dotes3);
		drowSquareFromDots(dotes4[0], dotes4[1], dotes4[2], dotes4[3]);
	}
	else if (valComb == 9){
		var dotes2 = mashtab(dotes);
		var dotes3 = povorot(dotes2);
		var dotes4 = zsuv(dotes3);
		drowSquareFromDots(dotes4[0], dotes4[1], dotes4[2], dotes4[3]);
	}
	else if (valComb == 10){
		var dotes2 = mashtab(dotes);
		var dotes3 = zsuv(dotes2);
		var dotes4 = povorot(dotes3);
		drowSquareFromDots(dotes4[0], dotes4[1], dotes4[2], dotes4[3]);
	}
	else if (valComb == 11){
		var dotes2 = zsuv(dotes);
		var dotes3 = mashtab(dotes2);
		var dotes4 = povorot(dotes3);
		drowSquareFromDots(dotes4[0], dotes4[1], dotes4[2], dotes4[3]);
	}
	else if (valComb == 12){
		var dotes2 = zsuv(dotes);
		var dotes3 = povorot(dotes2);
		var dotes4 = mashtab(dotes3);
		drowSquareFromDots(dotes4[0], dotes4[1], dotes4[2], dotes4[3]);
	}
}