"use strict";

const readlineSync = require("readline-sync");
const fs = require("fs");

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

function task_3(extension, folder_address) {
    const arr = fs.readdirSync(folder_address);

    console.log("Files::");

    for (let i = 0; i < arr.length; i++) {
        const parse_arr = arr[i].split(".");
        if (parse_arr.pop() === extension)
            console.log(arr[i]);
    }
}

function is_txt_file(file_name) {
    return (file_name.split(".").pop() === "txt");
}

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
            if (curNode.num % 500 === 0) {
                    console.log(curNode.num)
            }
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

function task_7(file_name) {
    function find(object, cur_deep, max_deep) {
        object['DEEPER'] = "DEEPER";
        for (let leaf in object)
            if (typeof(object[leaf]) === "object") {
                cur_deep++;
                let res = find(object[leaf], cur_deep, max_deep);
                max_deep = res.max_deep;
                cur_deep = res.cur_deep;
            }

        if (cur_deep > max_deep)
            max_deep = cur_deep;
        if (cur_deep < max_deep)
            object['DEEPER'] = "";

        return {
            max_deep: max_deep,
            cur_deep: cur_deep,
        };
    }

    function output_tree(obj) {
        for (let leaf in obj) {
            if (typeof (obj[leaf]) === "object") {
                if (obj["DEEPER"] === "DEEPER")
                    console.log(leaf);
                output_tree(obj[leaf]);
            }
        }
    }

    if (fs.existsSync(file_name)) {
        const contentString = fs.readFileSync(file_name, "utf8");
        const obj = JSON.parse(contentString);
        console.log(obj);

        console.log(find(obj, 0, 0));
        output_tree(obj);
    }
    else
        console.log("File was not found");
}

//task_1("test.txt");
//task_2("test.txt");
//task_3("txt", "./");
//task_4("folder/files");
task_5("result.txt");

task_6();
task_7("7.txt");