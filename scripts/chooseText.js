document.addEventListener('DOMContentLoaded', chooseTextFract);

function chooseTextFract(){
    var elem = document.getElementById("infoTextFractals");
    var elem1 = document.getElementById("infoTextColour");
    var elem2 = document.getElementById("infoTextAffine");
    elem.style.display = 'inline';
    elem1.style.display = 'none';
    elem2.style.display = 'none';

}

function chooseTextColor(){
    var elem = document.getElementById("infoTextFractals");
    var elem1 = document.getElementById("infoTextColour");
    var elem2 = document.getElementById("infoTextAffine");
    elem.style.display = 'none';
    elem1.style.display = 'flex';
    elem2.style.display = 'none';
}

function chooseTextAffine(){
    var elem = document.getElementById("infoTextFractals");
    var elem1 = document.getElementById("infoTextColour");
    var elem2 = document.getElementById("infoTextAffine");
    elem.style.display = 'none';
    elem1.style.display = 'none';
    elem2.style.display = 'inline';
}