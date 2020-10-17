"use strict";

function createNote(StudentsArr, studticket, group, grades)
{
    let n = StudentsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (studticket === StudentsArr[i].studticket)
        {
            console.log("Студент с таким билетом уже существует!");
            return 0
        }
    }
    let student = {studticket : studticket, group : group, grades : grades}
    StudentsArr.push(student);
}

function delet(StudentsArr, studticket)
{
    let n = StudentsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (studticket === StudentsArr[i].studticket)
        {
            StudentsArr.splice(i, 1);
            break
        }
    }
}

function read(StudentsArr, studticket)
{
    let n = StudentsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (studticket === StudentsArr[i].studticket)
        {
            console.log(StudentsArr[i]);
            break
        }
    }
}

function update(StudentsArr, studticket, newstudticket, newgroup, newgrades)
{
    let n = StudentsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (studticket === StudentsArr[i].studticket)
        {
            StudentsArr[i].studticket = newstudticket;
            StudentsArr[i].group = newgroup;
            StudentsArr[i].grades = newgrades;
            break
        }
    }
}


//Получение средней оценки заданного студента
function AverageGrades(StudentsArr, studticket)
{
    let n = StudentsArr.length;
    let avg = 0;
    let number

    for (let i = 0; i < n; i++)
    {
        if (StudentsArr[i].studticket === studticket)
        {
            number = i;
            break
        }
    }

    n = StudentsArr[number].grades.length;
    for (let i = 0; i < n; i++)
    {
        avg += StudentsArr[number].grades[i];
    }

    avg = parseFloat(avg / n);
    console.log("Средняя оценка студента = " + avg);
    return avg;
}

//Получение информации о студентах в заданной группе
function FindGroup(StudentsArr, group)
{
    let n = StudentsArr.length;
    let i = 0;

    console.log("Students from group " + group + ": ");
    while (i < n)
    {
        if (StudentsArr[i].group === group)
        {
            console.log(StudentsArr[i]);
        }
        i++;
    }
    console.log();
}

// Получение студента, у которого наибольшее количество оценок в заданной группе
function FindMaxGrades(StudentsArr, group)
{
    let n = StudentsArr.length;
    let student = null;
    let maxgrades = 0;

    for (let i = 0; i < n; i++)
    {
        if ((maxgrades < StudentsArr[i].grades.length) && (StudentsArr[i].group === group))
        {
            maxgrades = StudentsArr[i].grades.length;
            student = StudentsArr[i];
        }
    }
    console.log("Student: ")
    console.log(student);
}


// Получение студента, у которого нет оценок
function FindNoGrades(StudentsArr)
{
    let n = StudentsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (StudentsArr[i].grades.length === 0)
        {
            console.log("Student without grades: ")
            console.log(StudentsArr[i]);
        }
    }
}


let StudentsArr = [];

createNote(StudentsArr, 12, 1, [5,4,5,3,5]);
createNote(StudentsArr, 13, 1, [3,2,4,3]);
createNote(StudentsArr, 19, 1, [3,2,4,3]);
createNote(StudentsArr, 14, 2, [5,5,5,5]);
createNote(StudentsArr, 15, 3, [4,4,5,3]);
createNote(StudentsArr, 20, 5, []);

console.log(StudentsArr);

update(StudentsArr, 13, 13, 2, [5,4,5,3]);
console.log(StudentsArr);
read(StudentsArr, 12);
delet(StudentsArr, 14);

console.log(StudentsArr);

let average = AverageGrades(StudentsArr, 12);
console.log("Average " + average);

FindGroup(StudentsArr, 1);
FindNoGrades(StudentsArr);
FindMaxGrades(StudentsArr, 1);
