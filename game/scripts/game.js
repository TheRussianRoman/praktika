//loading cvs
const cvs = document.getElementById("canvas")
const ctx = cvs.getContext('2d');

//creating images
var bg = new Image();
var battleRoom = new Image();
var monster = new Image();
var roomMonster = new Image();
var knight = new Image();

//loading images
monster.src = "img/monster.png";
roomMonster.src = "img/roomMonster.png";
knight.src = "img/knight.png";
battleRoom.src = "img/battleRoom.png"
bg.src = "img/bg2.png"; 


//canvas code
function drawDefaultRoom(){
    clearCvs();
    ctx.drawImage(bg,0,0);
    ctx.drawImage(knight,(cvs.clientWidth-knight.width)/2, (cvs.clientHeight-knight.height)/2);
}

function drawBattleRoom(roomID){
    clearCvs();
    ctx.drawImage(battleRoom, 0, 0)
    if (roomObjects[roomID].objectID == "monster")
     ctx.drawImage(roomMonster, (cvs.clientWidth-roomMonster.width)/2, (cvs.clientHeight-roomMonster.height)/2+50)
}

function clearCvs () {
    ctx.clearRect(0,0,cvs.width,cvs.height);
}

//autoexec
bg.onload = drawDefaultRoom;

//JS CODE
//default JS settings
let heroPower = 25;
let roomObjects = new Array;
let inBattle = false;
let doorCoords = new Array;

doorCoords.push({
    xStart: 450,
    yStart: 30,
    xEnd: 560,
    yEnd: 52
})
doorCoords.push({
    xStart: 450,
    yStart: 0,
    xEnd: 0,
    yEnd: 0
})
doorCoords.push({
    xStart: 450,
    yStart: 0,
    xEnd: 0,
    yEnd: 0
})
doorCoords.push({
    xStart: 450,
    yStart: 0,
    xEnd: 0,
    yEnd: 0
})
doorCoords.push({
    xStart: 450,
    yStart: 0,
    xEnd: 0,
    yEnd: 0
})
doorCoords.push({
    xStart: 450,
    yStart: 0,
    xEnd: 0,
    yEnd: 0
})
doorCoords.push({
    xStart: 450,
    yStart: 0,
    xEnd: 0,
    yEnd: 0
})
doorCoords.push({
    xStart: 450,
    yStart: 0,
    xEnd: 0,
    yEnd: 0
})
doorCoords.push({
    xStart: 450,
    yStart: 0,
    xEnd: 0,
    yEnd: 0
})
doorCoords.push({
    xStart: 450,
    yStart: 0,
    xEnd: 0,
    yEnd: 0
})


//generating rooms
function generateRooms(){
    for (let i = 0; i < 10; i++){
        let whatToSpawn = Math.floor(Math.random()*100)%2
        if (whatToSpawn == 0) {
            roomObjects.push(spawnRock(i));
            console.log("Spawned " + roomObjects[i].objectID + " " + roomObjects[i].power + " in room number " + i)
        }
        if (whatToSpawn == 1) {
            roomObjects.push(spawnMonster(i));
            console.log("Spawned " +roomObjects[i].objectID + " " + roomObjects[i].power + " in room number " + i)
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

function doorClick(e){
    for (let i = 0; i<10; i++){
        if (
            (e.pageX >= doorCoords[i].xStart) &&
            (e.pageY >= doorCoords[i].yStart) &&
            (e.pageX <= doorCoords[i].xEnd) &&
            (e.pageY <= doorCoords[i].yEnd)
        ) return {
            isDoor: true,
            doorID: i
        };
        // else return {
        //     isDoor: false
        // }
    }

}

function handleClick(e){
    if (!inBattle) {
        if(doorClick(e) !== undefined){
            if (doorClick(e).isDoor == true){
                drawBattleRoom(doorClick(e).doorID)
            }
            // console.log(doorClick(e))
        }
    }
}

//autoexec
generateRooms();
document.addEventListener("click", (e) => {
    handleClick(e);
})

function sleep(ms){
    let start = Date.now();
    while(Date.now() < start + ms) ;
}
