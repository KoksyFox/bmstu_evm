class Point
{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    init(x, y) {
        this.x = x;
        this.y = y;
    }
    set X(x) {
        this.x = x;
    }

    set Y(y) {
        this.y = y;
    }

    get X() {
        return this.x;
    }

    get Y() {
        return this.y
    }
    showXY() {
        console.log("(x: " + this.x + ", y:" + this.y + ")");
    }
}

class Line
{
    constructor(start_pnt, end_pnt) {
        this.start_pnt = new Point(start_pnt.x, start_pnt.y)
        this.end_pnt = new Point(end_pnt.x, end_pnt.y)
    }
    init(start_pnt, end_pnt) {
        this.start_pnt = start_pnt
        this.end_pnt = end_pnt
    }
    show() {
        console.log("Start_pnt point: ");
        this.start_pnt.showXY();
        console.log("End_pnt point: ");
        this.end_pnt.showXY();
    }
    getLength() {
        let len = Math.pow((this.start_pnt.x - this.end_pnt.x), 2) + Math.pow((this.start_pnt.y - this.end_pnt.y), 2);
        len = Math.sqrt(len);
        return len;
    }
}

let a = new Point(2, 7);
a.showXY();
let b = new Point(2, 9);
b.showXY();

let c = new Line(a, b);
c.show();

let len = c.getLength();
console.log(len);