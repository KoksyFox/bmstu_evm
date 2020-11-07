"use strict";

window.onload = function() {
    const emailField = document.getElementById("add-email-field");
    const surnameField = document.getElementById("add-surname-field");
    const phoneField = document.getElementById("add-phone-field");

    const addPersonBtn = document.getElementById("add-btn-id");

    function ajaxPost(urlString, bodyString, callback) {
        let r = new XMLHttpRequest();
        r.open("POST", urlString, true);
        r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        r.send(bodyString);
        r.onload = function() {
            callback(r.response);
        }
    }

    addPersonBtn.onclick = function () {
        const email = emailField.value
        const surname = surnameField.value
        const phone_number = phoneField.value

        ajaxPost("/add/person", JSON.stringify({
            email, surname, phone_number
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const result = answerObject.result;
            alert(result);
        });
    }
};