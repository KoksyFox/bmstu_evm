
"use strict";

window.onload = function() {
    const nameField = document.getElementById("car-name-field");
    const priceField = document.getElementById("price-field");
    const addCarBtn = document.getElementById("add-car-btn-id");

    function ajaxPost(urlString, bodyString, callback) {
        let r = new XMLHttpRequest();
        r.open("POST", urlString, true);
        r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        r.send(bodyString);
        r.onload = function() {
            callback(r.response);
        }
    }

    addCarBtn.onclick = function () {
        const name = nameField.value;
        const price = priceField.value;

        ajaxPost("/insert/car", JSON.stringify({
            name: name,
            price: price
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const result = answerObject.result;
            console.log(result)
            alert(result);
        });
    }
};