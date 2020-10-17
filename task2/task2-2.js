class Triangle
{
    constructor(a,b,c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    init (a,b,c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    checkTriangle() {
        if (this.a + this.b <= this.c || this.a + this.c <= this.b ||
            this.b + this.c <= this.a)
            return false;
        return true;
    }
    findPerimeter() {
        return this.a + this.b + this.c;
    }
    findSquare() {
        let p = this.findPerimeter / 2;
        let square = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
        return square;
    }
    checkRectangular() {
        let a_sq = this.a * this.a;
        let b_sq = this.b * this.b;
        let c_sq = this.c * this.c;
        if(a_sq + b_sq === c_sq || b_sq + c_sq === a_sq || a_sq + c_sq === b_sq){
            return true;
        }
        return false;
    }
}

t = new Triangle(2, 3, 9);
t.init(3, 3, 9);
if (t.checkTriangle()){
    console.log("Треугольник не существует");
    return false;
}
console.log("Периметр: " + t.findPerimeter());
console.log("Площадь: " + t.findSquare());
if (t.checkRectangular())
{
    console.log("Треугольник прямогуольный");
}
return 0;