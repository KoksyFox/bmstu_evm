"use strict";

const express = require("express");
const cookieSession = require("cookie-session");


const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

let storage = []

function getUserInfo(login) {
    for (let user of storage) {
        if (user.login === login)
            return user
    }

    return null;
}

app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/register", function(request, response) {
    const login = request.query.login;
    const password = request.query.password;
    const hobby = request.query.hobby;
    const age = request.query.age;

    if(!login) return response.end("Login not set");
    if(!password) return response.end("Password not set");
    if(!hobby) return response.end("Hobby not set");
    if(!age) return response.end("Age not set");

    request.session.login = login;
    request.session.password = password;

    storage.push(
        {
            login: login,
            password: password,
            hobby: hobby,
            age: age
        }
    )

    response.end("Set cookie ok");
});

app.get("/api/login", function(request, response) {
    const login = request.query.login;
    const password = request.query.password;

    if(!login) return response.end("Login not set");
    if(!password) return response.end("Password not set");

    if (request.session.login !== login && request.session.password !== password) {
        const user = getUserInfo(login)

        if (user === null)
            return response.end("User not exists")

        if (user.password !== password)
            return response.end("Wrong login or password")

        request.session.login = login
        request.session.password = password
    }

    response.end("Login ok");
});

app.get("/api/get/info", function(request, response) {
    if(!request.session.login) return response.end("Not exists");
    if(!request.session.password) return response.end("Not exists");

    const login = request.session.login;
    const password = request.session.password;
    let hobby;
    let age;


    let len = storage.length;
    for (let i = 0; i < len; i++){
        if ((storage[i].login == login) && (storage[i].password == password))
        {
            hobby = storage[i].hobby;
            age = storage[i].age;
            console.log(hobby, age)
        }
    }

    response.end(JSON.stringify({
        login,
        password,
        hobby,
        age
    }));
});

app.get("/api/delete", function(request, response) {
    request.session = null;
    response.end("Delete cookie ok");
});

// http://localhost:5000/api/register?login=One&password=123&hobby=draw&age=21
// http://localhost:5000/api/login?login=One&password=123
// http://localhost:5000/api/get/info
// http://localhost:5000/api/delete