"use strict";

const express = require("express");
const fs = require("fs");

const app = express();
const port = 5002;
app.listen(port);
console.log(`Server on port ${port}`);

const fileName = "C:/repositories/bmstu_evm/task7/l7-1/cars/cars.json"

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const jsonObj = JSON.parse(body);

        const name = jsonObj["name"];
        const price = jsonObj["price"];

        console.log(name)
        console.log(price)

        const dataString = fs.readFileSync(fileName, "utf8");
        let dataJson = JSON.parse(dataString)

        if (dataJson[name] !== undefined) {
            response.end(JSON.stringify({
                result: "Такая машина уже существует!"
            }));
        } else {
            dataJson[name] = price
            const contentString = JSON.stringify(dataJson, null, 4)

            fs.writeFileSync(fileName, contentString);
            response.end(JSON.stringify({
                result: "Машина добавлена"
            }));
        }
    });
});

app.get("/select/record", function(request, response) {
    const name = request.query.name;
    const dataStr = fs.readFileSync(fileName, "utf8")
    const dataJson = JSON.parse(dataStr)

    if (dataJson[name] === undefined)
        response.end(JSON.stringify({
            result: "Такой машины не существует!"
        }));
    else
        response.end(JSON.stringify({
            result: name + " " + dataJson[name]
        }));
});