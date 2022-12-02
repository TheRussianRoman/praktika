const cvs = document.getElementById("canvas")
const ctx = cvs.getContext('2d');

var bg = new Image();
var monster = new Image();
var knight = new Image();

//loading images
monster.src = "img/monster.png";
knight.src = "img/knight.png";
bg.src = "img/bg2.png"; 


function draw(){
    ctx.drawImage(bg,0,0);
    ctx.drawImage(monster,(cvs.clientWidth-monster.width)/2, (cvs.clientHeight-monster.height)/2)
    ctx.drawImage(knight,(cvs.clientWidth-knight.width)/2+100, (cvs.clientHeight-knight.height)/2);
}

bg.onload = draw;