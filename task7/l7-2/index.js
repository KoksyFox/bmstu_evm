"use strict";

const num = "" + process.argv[2];

const execSync = require('child_process').execSync;

function useCmd(s) {
    const options = {encoding: 'utf8'};
    const cmd = s.toString();
    const answer = execSync(cmd, options);
    return answer.toString();
}


const factorialCommand = `node factorial.js ${num}`;
let factorial = useCmd(factorialCommand);
console.log(factorial);


let arr = JSON.parse(process.argv[3]);
console.log(arr)

for (let i = 0; i < arr.length; i++)
    console.log(parseInt(useCmd(`node factorial.js ${arr[i]}`)));