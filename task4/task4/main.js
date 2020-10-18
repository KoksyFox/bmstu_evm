"use strict";

const fs = require("fs");

const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

app.get("/calc/arr", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const aInt = parseFloat(a);
    const bInt = parseFloat(b);
    const cInt = parseFloat(c);

    let arr = [];
    for (let num = aInt; num <= bInt; num += 1){
        if (!(num % cInt))
            arr.push(num);
    }
    const answerJSON = JSON.stringify({result: arr});
    response.end(answerJSON);
});