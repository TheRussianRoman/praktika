const cvs = document.getElementById("canvas")
const ctx = cvs.getContext('2d');

var bg = new Image();

bg.src = "img/bg.png"; 

function draw(){
    ctx.drawImage(bg,0,0);
}

bg.onload = draw;