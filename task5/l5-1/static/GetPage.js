"use strict";

window.onload = function() {
    const emailField = document.getElementById("email-field");
    const getPersonBtn = document.getElementById("get-btn-id");
    const label = document.getElementById("result-label");

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
    getPersonBtn.onclick = function() {
        const email = emailField.value;
        const url = `/get/person?email=${email}`;

        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            label.innerHTML = `Ответ: ${result}`;
        });
    };
};