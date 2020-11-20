"use strict";

const express = require("express");
const request = require("request");

const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


function sendPost(url, body, callback) {
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

function sendGet(url, body, callback) {
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";

    request.get({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.post("/insert/car", function(request, response) {
    loadBody(request, function(body) {
        const jsonObj = JSON.parse(body);

        const name = jsonObj["name"];
        const price = jsonObj["price"];

        sendPost("http://localhost:5002/insert/record", JSON.stringify({
            name: name,
            price: price
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const result = answerObject.result;

            response.end(JSON.stringify({
                result: result
            }));
        });
    });
});

app.get("/select/car", function(request, response) {
    const name = request.query.name;
    const url = `http://localhost:5002/select/record?name=${name}`;
    sendGet(url, JSON.stringify({

    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        response.end(JSON.stringify({
            result: result
        }));
    });
});

app.post("/insert/storage", function(request, response) {
    loadBody(request, function(body) {
        const jsonObj = JSON.parse(body);

        const name = jsonObj["name"];
        const cars = jsonObj["cars"];

        sendPost("http://localhost:5001/insert/record", JSON.stringify({
            name: name,
            cars: cars
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const result = answerObject.result;
            response.end(JSON.stringify({
                result: result
            }));
        });
    });
});

app.get("/select/storage", function(request, response) {
    const name = request.query.name;
    const url = `http://localhost:5001/select/record?name=${name}`;

    sendGet(url, JSON.stringify({
        name: name
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        response.end(JSON.stringify({
            result: result
        }));
    });
});


// http://localhost:5000/addCar.html
// http://localhost:5000/addStorage.html
// http://localhost:5000/getCarInfo.html
// http://localhost:5000/getStorageInfo.html