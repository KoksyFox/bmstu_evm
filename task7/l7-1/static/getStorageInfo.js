"use strict";

window.onload = function() {
    const nameField = document.getElementById("storage-name-field");
    const getStorageBtn = document.getElementById("get-storage-btn-id");

    const label = document.getElementById("get-storage-result-label");

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
    getStorageBtn.onclick = function() {
        const name = nameField.value;
        const url = `/select/storage?name=${name}`;

        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            label.innerHTML = `Ответ: ${result}`;
        });
    };
};