var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');
var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');
function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas2.width = img.width;
            canvas.height = img.height;
            canvas2.height = img.height;
            ctx.drawImage(img,0,0);
            ctx2.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);   
}
function getPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}


function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

canvas.addEventListener("mousemove",function(e){
	 var pos = getPosition(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var context = this.getContext('2d');
	
	x = x * this.width / this.clientWidth
	y = y * this.height / this.clientHeight;
    var coord = "x=" + x + ", y=" + y;
    var pixelData = context.getImageData(x, y, 1,1).data;
    var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
	
	var tempRgb = "r="+ pixelData[0] + "g=" + pixelData[1]+ "b=" + pixelData[2];
	var hsv = rgbToHsv(pixelData[0], pixelData[1], pixelData[2]);
	var strHsv = "       " + " h = "+ hsv[0] + " s = "+hsv[1] + " v = " +hsv[2];
	var newRgb = hsvToRgb(hsv[0], hsv[1], hsv[2]);
		var strRGB = "       " + " r = "+ newRgb[0] + " g = "+newRgb[1] + " b = " +newRgb[2];

    // Draw the color and coordinates.
    document.getElementById("color-status").innerHTML = coord + tempRgb + strHsv+ strRGB;
    document.getElementById("color").style.backgroundColor = hex;
},false);

function doHSV(){
	var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
// invert colors
for (var i=0;i<imgData.data.length;i+=4)
  {
  var hsv = rgbToHsv(imgData.data[i],imgData.data[i+1],imgData.data[i+2]);
	  var rgbFromhsl =hsvToRgb(hsv[0], hsv[1], hsv[2]);
	  imgData.data[i]=rgbFromhsl[0];
	  imgData.data[i+1]=rgbFromhsl[1];
	  imgData.data[i+2]=rgbFromhsl[2];
  }
	console.log(imgData.data[imgData.data.length-4])
	console.log(imgData.data[imgData.data.length-3])
	console.log(imgData.data[imgData.data.length-2])
	console.log(rgbFromhsl[0])
	console.log(rgbFromhsl[1])
	console.log(rgbFromhsl[2])
	console.log(hsv[0])
	console.log(hsv[1])
	console.log(hsv[2])
ctx.putImageData(imgData,0,0);
}

function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; 
  } else {
    switch (max) {
      case r: h = 60*((g - b) / d + (g < b ? 6 : 0)%6); break;
      case g: h = 60*((b - r) / d + 2); break;
      case b: h = 60*((r - g) / d + 4); break;
    }
  if (h<0) h +=360;
  }

  return [ h, s, v ];
}

function hsvToRgb(h, s, v) {
	  var r, g, b;
  var c = v*s;
  var x = c*(1-Math.abs((h/60)%2 - 1));
  var m = v - c;
var temp = Math.trunc(h/60);
  switch (temp) {
    case 0: r = c, g = x, b = 0; break;
    case 1: r = x, g = c, b = 0; break;
    case 2: r = 0, g = c, b = x; break;
    case 3: r = 0, g = x, b = c; break;
    case 4: r = x, g = 0, b = c; break;
    case 5: r = c, g = 0, b = x; break;
  }

  return [ (r+m) * 255, (g +m)* 255, (b+m) * 255 ];
}



