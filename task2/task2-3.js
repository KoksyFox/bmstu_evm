"use strict";

let number = 0;
let count = 0;
function firstInterval(){

    let firstInterval = setInterval(() => {
        number++;
        console.log(number);

        if (number == 10) {
            clearInterval(firstInterval);
            secondInterval();
        }
    }, 2000);
}

function secondInterval(){
    let secInterval = setInterval(() => {
        number++;
        console.log(number);

        if (number == 20) {
            count++;
            if (count == 2)
            {
                clearInterval(secInterval);
            }
            else {
                number = 0;
                clearInterval(secInterval);
                firstInterval();
            }
        }

    }, 1000);
}

firstInterval();