"use strict";


function Array_union(file_name, flag)
{
    const fs = require("fs");
    const readString = fs.readFileSync(file_name, "utf8");
    let twostrings = readString.split("\r\n");
    let firstArr = twostrings[0].split(",");
    let secondArr = twostrings[1].split(",");
    let result = firstArr.concat(secondArr);
    if (flag){
        result.sort(function(a,b){
            return (a - b);
        })
    }
    else{
        result.sort(function(a,b){
            return (b - a);
        });
    }
    
    fs.writeFileSync("result.txt", result);
    console.log(result);
}

Array_union("min-task.txt", 0);