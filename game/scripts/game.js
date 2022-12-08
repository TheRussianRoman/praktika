//globals
var knightPos = {};
let knightMoveAnimStopped = 0;
let mouseClickAllowed = true;
//default JS settings
let heroPower = 25;
let roomObjects = new Array;
let inBattle = false;
let gameOver = 0;
let playerScore = 0; //счётчик прошедших комнат, если 10 - победа.


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
var winnerScreen = new Image();

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
winnerScreen.src = "img/winnerScreen.png";
bg.src = "img/bg2.png"; 



//canvas code
function autoexec(){
    knightPos.X = (cvs.clientWidth-knight.width)/2
    knightPos.Y = (cvs.clientHeight-knight.height)/2
    drawDefaultRoom();
    drawHeroPower(heroPower);
}

function resetKnightPosition(){
    knightPos.X = (cvs.clientWidth-knight.width)/2
    knightPos.Y = (cvs.clientHeight-knight.height)/2
}

function drawDefaultRoom(){
    clearCvs();
    ctx.drawImage(bg,0,0);
    ctx.drawImage(knight, knightPos.X, knightPos.Y);
}

function drawHeroPowerInRoom(){
    drawHeroPower(heroPower);
}

function drawBattleRoom(roomID){
    ctx.drawImage(battleRoom, 0, 0)
    ctx.drawImage(textBg, 0, 650)
    if (roomObjects[roomID].objectID == "monster"){
        ctx.drawImage(roomMonster, (cvs.clientWidth-roomMonster.width)/2, (cvs.clientHeight-roomMonster.height)/2+50);
        drawEnemyPower(roomObjects[roomID].power, "red")
    }
    else if (roomObjects[roomID].objectID == "rock"){
        ctx.drawImage(rock, (cvs.clientWidth-rock.width)/2, (cvs.clientHeight-rock.height)/2+50);
        drawEnemyPower(roomObjects[roomID].power, "blue")
    }
    drawGoBackButton();
}

function showGameOverScreen(){
    ctx.drawImage(fullBlackBg, 0, 0)
    ctx.drawImage(restartButton, (cvs.clientWidth-restartButton.width)/2, (cvs.clientHeight-restartButton.height)/2)
}

function showWinnerScreen(){
    ctx.drawImage(winnerScreen, 0, 0);
}

function drawGoBackButton(){
    ctx.drawImage(goBackButton, cvs.clientWidth-goBackButton.width,  cvs.clientHeight-goBackButton.height)
}

function drawEnemyPower(power, color){
    ctx.font = '30px "Comic Sans MS", "Comic Sans", cursive';
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText("Сила: " + power, cvs.width/2, cvs.height/2-100);
}

function drawHeroPower(power){
    ctx.font = '30px "Comic Sans MS", "Comic Sans", cursive';
    ctx.fillStyle = "lightgreen";
    ctx.textAlign = "center";
    ctx.fillText("Сила: " + power, knightPos.X+85, knightPos.Y-20);
}

function printRockText(line1, line2, line3){
    ctx.font = '20px "Comic Sans MS", "Comic Sans", cursive';
    ctx.textAlign = "left";
    ctx.fillStyle = "white"

    ctx.fillText(line1, 50, 680)
    ctx.fillText(line2, 50, 710)
    ctx.fillStyle = "lightgreen";
    ctx.fillText(line3, 50, 740)
}

function printWinText(line1, line2, line3, line4){
    ctx.font = '20px "Comic Sans MS", "Comic Sans", cursive';
    ctx.textAlign = "left";
    ctx.fillStyle = "white"

    ctx.fillText(line1, 50, 680)
    ctx.fillText(line2, 50, 710)
    ctx.fillText(line3, 50, 740)
    ctx.fillStyle = "lightgreen";
    ctx.fillText(line4, 50, 770)
}

function printText(line1, line2, line3, line4, color){
    ctx.fillStyle = "white"
    ctx.font = '20px "Comic Sans MS", "Comic Sans", cursive';
    ctx.textAlign = "left";
    ctx.fillText(line1, 50, 680)
    ctx.fillText(line2, 50, 710)
    ctx.fillStyle = color
    ctx.fillText(line3, 50, 740)
    ctx.fillStyle = "white"
    ctx.fillText(line4, 50, 770)
}

function moveKnight(targetPos){
    knightMoveAnimStopped = 0;
    let totalSteps = 100;
    let delta = {
        X: Math.abs((knightPos.X + knight.width/2) - targetPos.pageX),
        Y: Math.abs((knightPos.Y + knight.height/2) - targetPos.pageY)
    }

    let stepLength = {
        X: (delta.X/totalSteps),
        Y: (delta.Y/totalSteps)
    }

    let stepCounter = 0;
    let animationMoveKnight = setInterval(() => { 
        if ((knightPos.X + knight.width/2) <= targetPos.pageX) {
            knightPos.X += stepLength.X;
        }
        if ((knightPos.X + knight.width/2) > targetPos.pageX){
            knightPos.X -= stepLength.X;
        }

        if ((knightPos.Y + knight.height/2) <= targetPos.pageY){
            knightPos.Y += stepLength.Y;
        }
        if ((knightPos.Y + knight.height/2) > targetPos.pageY){
            knightPos.Y -= stepLength.Y;
        }
        // debugger
        drawDefaultRoom();
        console.log("moving knight")
        ctx.drawImage(knight, knightPos.X, knightPos.Y);
        drawHeroPower(heroPower)
        stepCounter++;
        if (stepCounter == totalSteps) {
            clearInterval(animationMoveKnight);
            knightMoveAnimStopped = 1;
        }
    }, 5)
}

function clearCvs () {
    ctx.clearRect(0,0,cvs.width,cvs.height);
}

//autoexec
bg.onload = autoexec;


//JS CODE
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

function restart(){
    heroPower = 25;
    roomObjects = new Array;
    inBattle = false;
    gameOver = 0;
    userScore = 0;
    resetKnightPosition();
    clearCvs();
    drawDefaultRoom();
    drawHeroPower(heroPower);
    generateRooms();
}

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
    let monsterPower = Math.floor(Math.random()*65+1)+35
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
        ) {
            return i
        }
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

function clickedOnRestartButton(e){
    if (
        (e.pageX >= (cvs.width-restartButton.width)/2) &&
        (e.pageX <= (cvs.width+restartButton.width)/2) &&
        (e.pageY >= (cvs.height-restartButton.height)/2) &&
        (e.pageY <= (cvs.height+restartButton.height)/2)
        ) return true;
}

function onGoBackButtonClick() {
    clearCvs();
    resetKnightPosition()
    drawDefaultRoom();
    drawHeroPower(heroPower);
    inBattle = false;
}

function battle(doorID){
    if (roomObjects[doorID].objectID == "rock") {
        heroPower += roomObjects[doorID].power
        let line1 = `*За дверью оказался древний артефакт.`
        let line2 = `*Вы подобрали артефакт.`
        let line3 = `*Ваша сила увеличена на ` + roomObjects[doorID].power+"."
        let line4 = ""
        printRockText(line1, line2, line3);
        playerScore+=1;
    }
    else if (roomObjects[doorID].objectID == "monster") {
        if (roomObjects[doorID].power > heroPower){
            let line1 = `*За дверью притаился монстр.`
            let line2 = `*Монстр кажется сильнее вас.`
            let line3 = `*Сила героя равна ` + heroPower +`, но этого было недостаточно`
            let line4 = `*Вы не смогли одолеть монстра. Игра окончена.`
            printText(line1, line2, line3, line4, "red");
            gameOver = 1;
        }
        else if (roomObjects[doorID].power <= heroPower){
            heroPower += 10
            let line1 =  `*За дверью оказался монстр.`
            let line2 = `*К счастью, вы сильнее, чем он.`
            let line3 = `*Вы одолели монстра. Ваша сила увеличена на 10.`
            let line4 = `Теперь сила героя равна ` + heroPower
            printWinText(line1, line2, line3, line4);
            playerScore+=1;
        }
    } else {
        let line1 = `*Лишь одинокая лампа стоит в углу.`
        let line2 = `*Вы припоминаете, что уже были здесь.`
        let line3 = `*...`
        let line4 = ""
        printText(line1, line2, line3, line4);
    }
    roomObjects[doorID] = 0
}



function handleClick(e){
    if (gameOver == 1) {    
        showGameOverScreen();
        gameOver = 2;
    } else if (gameOver == 2) { 
        if (clickedOnRestartButton(e)){
        console.log("restarting...")
            restart();
        }
    } else if (playerScore == 10) {
        console.log("playerWon")
        showWinnerScreen();
    } else if (!inBattle) {
        if(clickedDoorID(e) !== undefined){
            if(mouseClickAllowed){
                mouseClickAllowed = false;
                setTimeout(() => mouseClickAllowed = true, 1500)
                moveKnight(e);
                let checkIfKnightStopped = setInterval(() => {
                    if (knightMoveAnimStopped == 1){
                        drawBattleRoom(clickedDoorID(e))
                        inBattle = true;
                        battle(clickedDoorID(e));
                        clearInterval(checkIfKnightStopped)
                    }
                }, 10)
            }
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
