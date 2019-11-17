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
    // Draw the color and coordinates.
    document.getElementById("color-status").innerHTML = coord + tempRgb;
    document.getElementById("color").style.backgroundColor = hex;
},false);

function doHSL(){
	var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
// invert colors
for (var i=0;i<imgData.data.length;i+=4)
  {
  var hsl = rgbToHsl(imgData.data[i],imgData.data[i+1],imgData.data[i+2]);
	  var rgbFromhsl =hslToRgb(hsl[0], hsl[1], hsl[2]);
	  imgData.data[i]=rgbFromhsl[0];
	  imgData.data[i+1]=rgbFromhsl[1];
	  imgData.data[i+2]=rgbFromhsl[2];
  }
ctx.putImageData(imgData,0,0);
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}



