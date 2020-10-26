"use strict";

function Array_union(file_name)
{
    const fs = require("fs");
    const readString = fs.readFileSync(file_name, "utf8");
    console.log(readString);
}

Array_union("mini-task.txt");