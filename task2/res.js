function compare_string(a, b) {
    return (a.length > b.length);
}

function compare_num(a, b) {
    return a > b;
}

function ArrIsMonotone(arr, comp) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        if (comp(arr[i], arr[i+1]))
        {
            return false;
        }
    }
    return true
}

let arr = [1, 3, 2, 5]

if (ArrIsMonotone(arr, compare_num))
{
    console.log("Array is monotone");
}
else console.log("Array isn't monotone")

arr = [1, 2, 2, 3, 5]

if (ArrIsMonotone(arr, compare_num))
{
    console.log("Array is monotone");
}
else console.log("Array isn't monotone")

arr = ["abc","abcd","abcde","abcder"];

if (ArrIsMonotone(arr, compare_string))
{
    console.log("Array is monotone");
}
else console.log("Array isn't monotone")

arr = ["abc","ab","abcde","abcder"];

if (ArrIsMonotone(arr, compare_string))
{
    console.log("Array is monotone");
}
else console.log("Array isn't monotone")