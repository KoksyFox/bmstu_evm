"use strict";

const fs = require("fs");

const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

app.get("/me/page", function(request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const string = fs.readFileSync(nameString, "utf8");
        response.end(string);
    } else {
        const string = fs.readFileSync("bad.html", "utf8");
        response.end(string);
    }
});

app.get("/data/get_el", function(request, response) {
    const el_index = request.query.el_index;
    const index = parseInt(el_index);

    if (fs.existsSync('data.json')) {
        const data = fs.readFileSync('data.json', "utf-8");
        const dataJSON = JSON.parse(data);
        const result = JSON.stringify({result: dataJSON['data'][index]});
        response.end(result);
    } else {
        const string = fs.readFileSync("bad.html", "utf8");
        response.end(string);
    }
});

// http://localhost:5015/me/page?p=a.html