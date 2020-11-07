"use strict";

function createNote(ChildsArr, surname, age)
{
    let n = ChildsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (surname === ChildsArr[i].surname)
        {
            console.log("Ребёнок с такой фамилией уже есть");
            return 0
        }
    }
    let child = {surname : surname, age : age}
    ChildsArr.push(child);
}

function delet(ChildsArr, surname)
{
    let n = ChildsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (surname === ChildsArr[i].surname)
        {
            ChildsArr.splice(i, 1);
            break
        }
    }
}

function read(ChildsArr, surname)
{
    let n = ChildsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (surname === ChildsArr[i].surname)
        {
            console.log(ChildsArr[i]);
            break
        }
    }
}

function update(ChildsArr, surname, newsurnmae, newage)
{
    let n = ChildsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (surname === ChildsArr[i].surname)
        {
            ChildsArr[i].surname = newsurnmae;
            ChildsArr[i].age = newage;
            break
        }
    }
}

// Получение среднего возраста детей
function AverageAge(ChildsArr)
{
    let n = ChildsArr.length;
    let avg = 0;

    for (let i = 0; i < n; i++)
    {
        avg += ChildsArr[i].age;
    }

    avg = parseFloat(avg / n);
    return avg;
}

// информации о детях, возраст которых входит в заданный отрезок
function FindByAge(ChildsArr, from, to)
{
    let n = ChildsArr.length;
    let i = 0;

    console.log("Children with age from "+ from + " to " + to);
    while (i < n)
    {
        if (from <= ChildsArr[i].age && ChildsArr[i].age <= to)
        {
            console.log(ChildsArr[i]);
        }
        i++;
    }
    console.log();
}

// информации о детях, фамилия которых начинается с заданной буквы
function FindFirstLetter(ChildsArr, letter)
{
    let n = ChildsArr.length;
    let first

    console.log("Children with surname beginning = " + letter);
    for (let i = 0; i < n; i++)
    {
        first = ChildsArr[i].surname.charAt(0);
        if (first === letter)
        {
            console.log(ChildsArr[i]);
        }
    }
    console.log();

}

// информации о детях, фамилия которых длиннее заданного количества символов
function FindByLength(ChildsArr, length)
{
    let n = ChildsArr.length;
    let len;

    console.log("Children with surname > " + length);
    for (let i = 0; i < n; i++)
    {
        len = ChildsArr[i].surname.length;
        if (len > length)
        {
            console.log(ChildsArr[i]);
        }
    }
    console.log();
}

// информации о детях, фамилия которых начинается с гласной буквы
function FindByVowels(ChildsArr)
{
    let vowels = ["а", "е", "и", "о", "у", "э", "я", "ю", "А", "Е", "И", "О", "У", "Э", "Я", "Ю"];
    let n = ChildsArr.length;
    let first;

    console.log("Children with surname started by vowel: ");
    for (let i = 0; i < n; i++)
    {
        first = ChildsArr[i].surname.charAt(0);
        for (let j = 0; j < vowels.length; j++)
        {
            if (first === vowels[j])
            {
                console.log(ChildsArr[i]);
                break
            }
        }
        
    }
    console.log();
}

// Страший ребёнок
function FindOld(ChildsArr)
{
    let n = ChildsArr.length;
    let old = ChildsArr[0];
    let maxAge = ChildsArr[0].age;

    for (let i = 0; i < n; i++)
    {
        if (maxAge < ChildsArr[i].age)
        {
            maxAge = ChildsArr[i].age;
            old = ChildsArr[i];
        }
    }
    console.log("The oldest: ")
    console.log(old);
}

let ChildsArr = [];

createNote(ChildsArr, "Лоев", 15);
createNote(ChildsArr, "Иванов", 13);
createNote(ChildsArr, "Рыбников", 9);
createNote(ChildsArr, "Нарица", 12);

console.log("Начальный вид: ");
console.log(ChildsArr);

update(ChildsArr, "Лоев", "Лынев", 16);

console.log("Изменили Лоева на Лынева");
console.log(ChildsArr);

read(ChildsArr, "Нарица");
console.log("Удалили Рыбникова: ");
delet(ChildsArr, "Рыбников");

console.log(ChildsArr);

let average = AverageAge(ChildsArr);
console.log("Среднее число: " + average);

FindByAge(ChildsArr, 10, 14);
FindFirstLetter(ChildsArr, "Н");
FindByLength(ChildsArr, 5);
FindByVowels(ChildsArr);
FindOld(ChildsArr);