"use strict";

function createPoints(PointsArr, name, x, y)
{
    let n = PointsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (name === PointsArr[i].name)
        {
            console.log("Студент с таким билетом уже существует!");
            return 0
        }
    }
    let student = {name : name, x : x, y : y}
    PointsArr.push(student);
}

function delet(PointsArr, name)
{
    let n = PointsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (name === PointsArr[i].name)
        {
            PointsArr.splice(i, 1);
            break
        }
    }
}

function read(PointsArr, name)
{
    let n = PointsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (name === PointsArr[i].name)
        {
            console.log(PointsArr[i]);
            break
        }
    }
}

function update(PointsArr, name, newname, newx, newy)
{
    let n = PointsArr.length;

    for (let i = 0; i < n; i++)
    {
        if (name === PointsArr[i].name)
        {
            PointsArr[i].name = newname;
            PointsArr[i].x = newx;
            PointsArr[i].y = newy;
            break
        }
    }
}

// Функция для вычисления расстояния между двумя точками
function Interval(x1, y1, x2, y2)
{
    let len = Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2);
    len = Math.sqrt(len);
    return len;
}


// Получение двух точек, между которыми наибольшее расстояние
function FarPoints(PointsArr)
{
    let n = PointsArr.length;
    let maxlen = 0;
    let len = 0;
    let dot_1 = 0;
    let dot_2 = 0;
    
    for (let i = 0; i < n; i++)
    {
        for (let j = i; j < n; j++)
        {
            len = Interval(PointsArr[i].x, PointsArr[i].y, PointsArr[j].x, PointsArr[j].y);
            if (len > maxlen)
            {
                maxlen = len;
                dot_1 = i;
                dot_2 = j;
            }
        }
    }

    console.log("Наибольшее растояние между точками: " + PointsArr[dot_1].name + " and " + PointsArr[dot_2].name);
}

// Получение точек, находящихся от заданной точки на расстоянии, не превышающем заданную константу
function FindPoints(PointsArr, dot, maxlen)
{
    let n = PointsArr.length;
    let len = 0;
    let dot_1 = 0;
    
    for (let i = 0; i < n; i++)
    {
        if (dot === PointsArr[i].name)
        {
            dot_1 = i;
            break;
        }
    }

    for (let i = 0; i < n; i++)
        {
            len = Interval(PointsArr[dot_1].x, PointsArr[dot_1].y, PointsArr[i].x, PointsArr[i].y);
            if (len < maxlen)
            {
                console.log(PointsArr[i]);
            }
        }
}


// Получение точек, находящихся выше / ниже / правее / левее заданной оси координат
function FindForAxis(PointsArr, axis, postion)
{
    let n = PointsArr.length;

    if (axis === "y")
    {
        for (let i = 0; i < n; i++)
        {
            if ((PointsArr[i].x < 0) && (postion === "left"))
            {
                console.log(PointsArr[i]);
            }
            else if ((PointsArr[i].x > 0) && (postion === "right"))
            {
                console.log(PointsArr[i]);
            }
        }
    }
    if (axis === "x")
    {
        for (let i = 0; i < n; i++)
        {
            if ((PointsArr[i].y < 0) && (postion === "down"))
            {
                console.log(PointsArr[i]);
            }
            else if ((PointsArr[i].y > 0) && (postion === "up"))
            {
                console.log(PointsArr[i]);
            }
        }
    }

}

// Получение точек, входящих внутрь заданной прямоугольной зоны
function FindPointsInside(PointsArr, x1, y1, x2, y2)
{
    let n = PointsArr.length;
    console.log("Точки входящие в область: ");
    
    for (let i = 0; i < n; i++)
    {
        if ((x1 < PointsArr[i].x) && (x2 > PointsArr[i].x) && (y1 < PointsArr[i].y) && (y2 > PointsArr[i].x))
        {
            console.log(PointsArr[i]);
        }
    }
}

let PointsArr = [];

createPoints(PointsArr, "dot_1", 0, 0);
createPoints(PointsArr, "dot_2", 1, 1);
createPoints(PointsArr, "dot_3", 5, 5);
createPoints(PointsArr, "dot_4", 3, 3);
createPoints(PointsArr, "dot_5", 2, 1);
createPoints(PointsArr, "dot_6", 10, 1);
createPoints(PointsArr, "dot_7", 1, -1);
createPoints(PointsArr, "dot_8", -2, -2);
createPoints(PointsArr, "dot_9", -2, 2);


console.log(PointsArr);

update(PointsArr, "dot_5", "dot_5", 4, 4);
console.log(PointsArr);
read(PointsArr, "dot_4");
delet(PointsArr, "dot_4");

FarPoints(PointsArr);
console.log("Точки до 4");
FindPoints(PointsArr, "dot_1", 4);
console.log("Точки справа от оси y");
FindForAxis(PointsArr, "y", "right");
console.log("Точки снизу от оси х");
FindForAxis(PointsArr, "x", "down");
console.log("Область от [-4,-2] до [4,2]: ")
FindPointsInside(PointsArr, -4, -2, 4, 2);

let obj = {a:1, b:2};
obj["c"] = 3
console.log(obj);
