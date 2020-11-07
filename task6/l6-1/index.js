"use strict";


const express = require("express");

const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

app.set("view engine", "hbs");

let storage = [
    {
        name: "Call of Duty",
        description: "shooter",
        ageLimit: 18
    },
    {
        name: "Doom Eternal",
        description: "platform",
        ageLimit: 12
    },
    {
        name: "TES V: Skyrim",
        description: "RPG",
        ageLimit: 16
    },
    {
        name: "Tetris",
        description: "puzzles",
        ageLimit: 10
    },
    {
        name: "Taken",
        description: "fighting",
        ageLimit: 18
    },
    {
        name: "Spyro",
        description: "platform",
        ageLimit: 6
    },
    ]

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


app.get("/page/games", function(request, response) {
    const age = request.query.age
    let arr = []

    for (let game of storage){
        if (game.ageLimit < age)
            arr.push(game)}

    
    const infoObject = {
        descriptionValue: "Список игр",
        gamesArray: arr
    };
    response.render("pageGames.hbs", infoObject);
});

// localhost:5000/page/games?age=13