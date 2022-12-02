//loading cvs
const cvs = document.getElementById("canvas")
const ctx = cvs.getContext('2d');

//creating images
var bg = new Image();
var battleRoom = new Image();
var monster = new Image();
var knight = new Image();

//loading images
monster.src = "img/monster.png";
knight.src = "img/knight.png";
battleRoom.src = "img/battleRoom.png"
bg.src = "img/bg2.png"; 


//canvas code
function drawDefaultImage(){
    ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.drawImage(bg,0,0);
    ctx.drawImage(knight,(cvs.clientWidth-knight.width)/2, (cvs.clientHeight-knight.height)/2);
}

function drawBattleRoom(){
    ctx
}

//autoexec
bg.onload = drawDefaultImage;

//JS CODE
//default JS settings
let heroPower = 25;
let roomObjects = new Array;

//generating rooms
function generateRooms(){
    for (let i = 0; i < 10; i++){
        let whatToSpawn = Math.floor(Math.random()*100)%2
        if (whatToSpawn == 0) {
            roomObjects.push(spawnRock(i));
            console.log(roomObjects[i].objectID + " " + roomObjects[i].power + " in room number " + i)
        }
        if (whatToSpawn == 1) {
            roomObjects.push(spawnMonster(i));
            console.log(roomObjects[i].objectID + " " + roomObjects[i].power + " in room number " + i)
        }
    }
}

function spawnMonster(){
    let monsterPower = Math.floor(Math.random()*10+1)
    let monster = {
        objectID: "monster",
        power: monsterPower
    }
    return monster;
}

function spawnRock(){
    let rockPower = Math.floor(Math.random()*10+1)
    let monster = {
        objectID: "rock",
        power: rockPower
    }
    return monster;
}

function onDocumentClick(){

}

//autoexec
generateRooms();
document.addEventListener("click", onDocumentClick)

function sleep(ms){
    let start = Date.now();
    while(Date.now() < start + ms) ;
}
