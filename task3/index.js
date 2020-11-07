"use strict";

const readlineSync = require("readline-sync");
const fs = require("fs");

// Полученые строки сделать json строкой и поместить в файл
function task_1(file_name) {
    const N = readlineSync.question("N = ");
    let string;
    const arr = [];
    
    for (let i = 0; i < parseInt(N); i++) {
        string = readlineSync.question("Input " + (i + 1) + " string: ");
        if (!(string.length % 2))
            arr.push(string);
    }
    const jsonString = JSON.stringify(arr, null, 4);
    fs.writeFileSync(file_name, jsonString);
}

// вывести строки только с гласными буквами
function task_2(file_name) {
    if (fs.existsSync(file_name)) {
        const contentString = fs.readFileSync(file_name, "utf8");
        const arr = JSON.parse(contentString);

        console.log("Strings:");

        let flag;
        for (let i = 0; i < arr.length; i++) {
            flag = true;
            for (let j = 0; j < arr[i].length; j++) {
                if (['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u',
                    'А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я',
                    'а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'].indexOf(arr[i].charAt(j)) === -1)
                    flag = false;
            }
            if (flag)
                console.log(arr[i]);
        }
    } else
        console.log("File was not found");

}

// вывести содержимое файлов, у которых расширение совпадает с введенным расширением
function task_3(extension, folder_address) {
    const arr = fs.readdirSync(folder_address);

    console.log("Files:");

    for (let i = 0; i < arr.length; i++) {
        const parse_arr = arr[i].split(".");
        if (parse_arr.pop() === extension)
            console.log(arr[i]);
    }
}

function is_txt_file(file_name) {
    return (file_name.split(".").pop() === "txt");
}

// перебрать вложенную структуру и вывести имена файлов, у которых содержимое не превышает по длине 10 символов
function task_4(catalog) {
    const arr = fs.readdirSync(catalog);
    let count_files = 0;
    const folders = [];
    for (let i = 0; i < arr.length; i++) {
        if (is_txt_file(arr[i])) {
            count_files++;
            const contentString = fs.readFileSync(catalog + "/" + arr[i], "utf8");
            if (contentString.length <= 10)
                console.log(arr[i]);
        }
        else
            folders.push(arr[i]);
    }

    for (let i = 0; i < folders.length; i++)
        task_4(catalog + "/" + folders[i]);
}

// склеить всё содержимое введенных файлов в одну большую строку и сохранить в новый файл.
function task_5(file_name) {
    const N = readlineSync.question("N = ");
    const arr_names = [];
    let string;
    
    for (let i = 0; i < parseInt(N); i++) {
        string = readlineSync.question("Input " + (i + 1) + " name of file: ");
        arr_names.push(string);
    }

    let string_data = "";
    for (let i = 0; i < arr_names.length; i++) {
        if (fs.existsSync(arr_names[i]))
            string_data += fs.readFileSync(arr_names[i], "utf8");
        else
            console.log("File " + arr_names[i] + " was not found");
    }

    fs.writeFileSync(file_name, string_data);
}

// определить максимальный возможный уровень вложенности друг в друга полей в объекте,
//чтобы данный объект можно было преобразовать в строку формата JSON
function task_6() {

    let noErrorFlag = true
    let head = {
        num: 0,
        next: null
    }

    let curNode = head

    while (noErrorFlag) {
        try {
            let testStr = JSON.stringify(head)
            curNode.next = {
                num: curNode.num + 1,
                next: null
            }
            curNode = curNode.next
        }
        catch (e) {
            noErrorFlag = false
            console.log(curNode.num - 1)
        }
    }
}

//рекурсивно обработать дерево и найти максимальную вложенность в дереве
function task_7(filename){

    function copyList(dst, src) {
        let dstBuf = dst
        let srcBuf = src

        while (srcBuf != null) {
            dstBuf.info = srcBuf.info
            dstBuf.next = {
                info: null,
                next: null
            }
            dstBuf = dstBuf.next

            srcBuf = srcBuf.next
        }
    }

    function find_max_deep(jsonObject, i, maxDeepInfo, buf, bufHead) {
        for (let elem in jsonObject) {
            buf.next = {
                info: elem,
                next: null
            }
            
            if (i > maxDeepInfo.maxDeep) {
                maxDeepInfo.maxDeep = i
                copyList(maxDeepInfo, bufHead)
            }

            if (typeof jsonObject[elem] === "object") {
                find_max_deep(jsonObject[elem], i + 1, maxDeepInfo, buf.next, bufHead)
            }
        }
    }

    let jsonString = fs.readFileSync(filename, "utf8")
    let jsonObj = JSON.parse(jsonString)

    let bufHead = {
        info: jsonObj,
        next: null
    }

    let res = {
        maxDeep: 0,
        info: null,
        next: null
    }

    find_max_deep(jsonObj, 1, res, bufHead, bufHead)

    console.log(JSON.stringify(res, null, 4))
}

task_1("test.txt");
task_2("test.txt");
task_3("txt", "./");
task_4("folder/files");
task_5("result.txt");

task_6();
task_7("task7.json");