
"use strict";

window.onload = function() {
    const nameField = document.getElementById("storage-name-field");
    const carsField = document.getElementById("cars-field");
    const addStorageBtn = document.getElementById("add-storage-btn-id");

    function ajaxPost(urlString, bodyString, callback) {
        let r = new XMLHttpRequest();
        r.open("POST", urlString, true);
        r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        r.send(bodyString);
        r.onload = function() {
            callback(r.response);
        }
    }

    addStorageBtn.onclick = function () {
        const name = nameField.value;
        const cars = carsField.value;

        ajaxPost("/insert/storage", JSON.stringify({
            name: name,
            cars: cars
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const result = answerObject.result;
            alert(result);
        });
    }
};