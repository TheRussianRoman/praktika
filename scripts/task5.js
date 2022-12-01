// Найти все совершенные числа в диапазоне [1,10000]. Совершенным
// числом называется число равное сумме его делителей.

function findPerfectNumbers(){
    let arrayOfPerfects = new Array;
    for (let i = 0; i <= 10000; i++){    
        let arrayOfDels = findNumDels(i);
        let sumOfDels = findDelSum(arrayOfDels);
        if (sumOfDels == i) arrayOfPerfects.push(i);
    }
    console.log("Совершенные числа в пределах 10.000: " + arrayOfPerfects)
}

function findNumDels(i){
    let arrayOfDels = new Array();
    for (let tryDel = 0; tryDel < i; tryDel++){
        if ((i % tryDel) == 0) arrayOfDels.push(tryDel);
    }
    return arrayOfDels;
}

function findDelSum(array) {
    let sum = 0;
    for (let i = 0; i <array.length; i++){
        sum += array[i];
    }
    return sum;
}