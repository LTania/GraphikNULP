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
