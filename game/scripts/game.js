//loading cvs
const cvs = document.getElementById("canvas")
const ctx = cvs.getContext('2d');

//creating images
var bg = new Image();
var battleRoom = new Image();
var monster = new Image();
var roomMonster = new Image();
var knight = new Image();
var rock = new Image();
var textBg = new Image();
var goBackButton = new Image();
var restartButton = new Image();
var fullBlackBg = new Image();

//loading images
monster.src = "img/monster.png";
roomMonster.src = "img/roomMonster.png";
knight.src = "img/knight.png";
battleRoom.src = "img/battleRoom.png";
rock.src = "img/roomRock.png";
textBg.src = "img/textBg.png";
goBackButton.src = "img/goBackButton.png";
restartButton.src = "img/restartButton.png";
fullBlackBg.src = "img/fullBlackBg.png";
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
    ctx.drawImage(textBg, 0, 650)
    if (roomObjects[roomID].objectID == "monster"){
        ctx.drawImage(roomMonster, (cvs.clientWidth-roomMonster.width)/2, (cvs.clientHeight-roomMonster.height)/2+50)
        drawGoBackButton();
    }
    else if (roomObjects[roomID].objectID == "rock"){
        ctx.drawImage(rock, (cvs.clientWidth-rock.width)/2, (cvs.clientHeight-rock.height)/2+50)
        drawGoBackButton();
    }
    
}

function showGameOverScreen(){
    ctx.drawImage(fullBlackBg, 0, 0)
    ctx.drawImage(restartButton, (cvs.clientWidth-restartButton.width)/2, (cvs.clientHeight-restartButton.height)/2)
}

function drawGoBackButton(){
    console.log("drawingButton")
    ctx.drawImage(goBackButton, cvs.clientWidth-goBackButton.width,  cvs.clientHeight-goBackButton.height)
}

function printText(line1, line2, line3){
    ctx.font = '20px "Comic Sans MS", "Comic Sans", cursive';
    ctx.fillStyle = "white"

    ctx.fillText(line1, 50, 680)
    ctx.fillText(line2, 50, 710)
    ctx.fillText(line3, 50, 740)
}

// function testFunction(){
    
//     ctx.fillText(`Это монстр!`, 10, 50)
// }

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
let gameOver = false;

//Сейчас кнопка двери не совпадает с размерами самой двери.
//Можно сделать более точную кнопку.
//Но это дольше
//position of doors
let doorCoords = new Array;
doorCoords.push({
    xStart: 450,
    yStart: 30,
    xEnd: 560,
    yEnd: 50
})

doorCoords.push({
    xStart: 690,
    yStart: 85,
    xEnd: 795,
    yEnd: 170
})

doorCoords.push({
    xStart: 826,
    yStart: 230,
    xEnd: 880,
    yEnd: 340
})

doorCoords.push({
    xStart: 830,
    yStart: 465,
    xEnd: 883,
    yEnd: 574
})

doorCoords.push({
    xStart: 694,
    yStart: 649,
    xEnd: 792,
    yEnd: 728
})

doorCoords.push({
    xStart: 453,
    yStart: 763,
    xEnd: 560,
    yEnd: 783
})

doorCoords.push({
    xStart: 223,
    yStart: 648,
    xEnd: 321,
    yEnd: 728
})

doorCoords.push({
    xStart: 134,
    yStart: 467,
    xEnd: 188,
    yEnd: 575
})

doorCoords.push({
    xStart: 138,
    yStart: 229,
    xEnd: 189,
    yEnd: 338
})

doorCoords.push({
    xStart: 224,
    yStart: 86,
    xEnd: 323,
    yEnd: 165
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
            console.log("Spawned " + roomObjects[i].objectID + " " + roomObjects[i].power + " in room number " + i)
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


function clickedDoorID(e){
    for (let i = 0; i<10; i++){
        if (
            (e.pageX >= doorCoords[i].xStart) &&
            (e.pageY >= doorCoords[i].yStart) &&
            (e.pageX <= doorCoords[i].xEnd) &&
            (e.pageY <= doorCoords[i].yEnd)
        ) return i
    }
}

function clickedOnGoBackButton(e) {
    if (
        (e.pageX >= cvs.width-goBackButton.width) &&
        (e.pageX <= cvs.width) &&
        (e.pageY >= cvs.height-goBackButton.height) &&
        (e.pageY <= cvs.height)
        ) return true;
}

function onGoBackButtonClick() {
    clearCvs();
    drawDefaultRoom();
    inBattle = false;
}

function battle(doorID){
    if (roomObjects[doorID].objectID == "rock") {
        heroPower += roomObjects[doorID].power
        let line1 = `*За дверью оказался артефакт.`
        let line2 = `*Вы подобрали артефакт.`
        let line3 = `*Ваша сила увеличена на ` + roomObjects[doorID].power+"."
        printText(line1, line2, line3);
    }
    else if (roomObjects[doorID].objectID == "monster") {
        if (roomObjects[doorID].power > heroPower){
            let line1 = `*За дверью оказался монстр.`
            let line2 = `*Монстр выглядит сильнее вас.`
            let line3 = `*Вы не смогли одолеть монстра. Игра окончена.`
            printText(line1, line2, line3);
            gameOver = true;
            //Добавь проверку конца игры
        }
        else if (roomObjects[doorID].power <= heroPower){
        // heroPower += roomObjects[doorID].power
            let line1 =  `*За дверью оказался монстр.`
            let line2 = `*К счастью, вы сильнее, чем он.`
            let line3 = `*Вы одолели монстра. Ваша сила увеличена на ` + roomObjects[doorID].power+"."
            printText(line1, line2, line3);
        }
    }

    
}



function handleClick(e){
    if (gameOver){
        showGameOverScreen()
    } else if (!inBattle) {
        if(clickedDoorID(e) !== undefined){
                drawBattleRoom(clickedDoorID(e))
                inBattle = true;
                battle(clickedDoorID(e))
        }
    } else if (inBattle) {
        if  (clickedOnGoBackButton(e)) {
            onGoBackButtonClick()
        }
    }
}

//autoexec
generateRooms();
document.addEventListener("click", (e) => handleClick(e))

function sleep(ms){
    let start = Date.now();
    while(Date.now() < start + ms) ;
}
