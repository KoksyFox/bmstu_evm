"use strict";

window.onload = function() {
    const nameField = document.getElementById("car-name-field");
    const getCarBtn = document.getElementById("get-car-btn-id");

    const label = document.getElementById("get-car-result-label");

    function ajaxGet(urlString, callback) {
        let r = new XMLHttpRequest();
        r.open("GET", urlString, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);
        r.onload = function() {
            callback(r.response);
        };
    };

    // click event
    getCarBtn.onclick = function() {
        const name = nameField.value;
        const url = `/select/car?name=${name}`;

        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            label.innerHTML = `Ответ: ${result}`;
        });
    };
};