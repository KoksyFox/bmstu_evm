"use strict";

function factorial(num) {
    let res = 1;
    for (let i = 2; i <= num; i++) {
        res *= i;
    }
    return res;
}

const num = parseInt(process.argv[2]);
console.log(factorial(num));
