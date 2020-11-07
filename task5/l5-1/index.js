"use strict";

// импортируем библиотеку
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

const file = "C:/repositories/bmstu_evm/task5/l5-1/data.json";

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/get/person", function(request, response) {
    const email = request.query.email
    const data = fs.readFileSync(file, "utf8")
    const jsonObj = JSON.parse(data)

    if (jsonObj[email] === undefined)
        response.end(JSON.stringify({
            result: "Человек c такой почтой не существует"
        }));
    else
        response.end(JSON.stringify({
            result: email + " " + jsonObj[email]
        }));
});

// body
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// it is post
app.post("/add/person", function(request, response) {
    loadBody(request, function(body) {
        const jsonObj = JSON.parse(body);

        const email = jsonObj["email"];
        const surname = jsonObj["surname"];
        const phone_number = jsonObj["phone_number"];

        const data = fs.readFileSync(file, "utf8")
        let dataObj = JSON.parse(data)

        if (dataObj[email] !== undefined) {
            response.end(JSON.stringify({
                result: "Человек c такой почтой уже существует, человек не добавлен в файл"
            }));
        } else {
            dataObj[email] = surname + " " + phone_number
            const contentString = JSON.stringify(dataObj, null, 4)

            fs.writeFileSync(file, contentString);
            response.end(JSON.stringify({
                result: "Человек добавлен в файл"
            }));
        }
    });
});