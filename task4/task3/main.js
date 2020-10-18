"use strict";

const fs = require("fs");
const readlineSync = require('readline-sync')


const fields = readlineSync.question('Input array of fields: ').split(',');
const url = readlineSync.question('Input url: ');

if (fs.existsSync('template_form.html')) {
    let html = fs.readFileSync('template_form.html', "utf-8").split('\n');
    let fields_str_index = html.indexOf('    INPUT_FORM');
    let url_index = fields_str_index - 1;

    html[fields_str_index] = '';
    fields.forEach(function (field){
        html[fields_str_index] +=
            "    <p>" + field + "</p>\n" +
            "    <input name=\"" + field + "\" spellcheck=\"false\" autocomplete=\"off\">\n"
    })

    html[url_index] = html[url_index].replace('INPUT_URL', url);
    fs.writeFileSync('form.html', html.join('\n'));
}
