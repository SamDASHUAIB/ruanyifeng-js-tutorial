// JavaScript 语言的继承通过 "原型对象" prototype 实现, 原型链
/*
  构造函数的缺点
  同一个构造函数的多个实例之间, 无法共享属性, 从而造成对系统资源的浪费
*/
function Cat(name, color) {
  this.name = name
  this.color = color
  this.meow = function () {
    console.log('喵喵')
  }
}
var cat1 = new Cat('大毛', '白色')
var cat2 = new Cat('二毛', '黑色')
// 每新建一个实例, 就会新建一个 meow 方法, 既无必要要, 也浪费系统资源, meow 完全应该共享
console.log(cat1.meow === cat2.meow) // false

/*
  prototype 属性的作用
  原型对象的所有属性和方法, 都能被实例对象共享
  节省内存
  体现了实例对象之间的关系(兄弟)

  每一个函数(函数Function)都有一个 prototype 属性, 指向一个对象
*/
function f() {}
console.log(typeof f.prototype) // object, 函数 f 默认具有 prototype 属性, 指向一个对象
// 对于构造函数来说, 生成实例的时候, 该属性会自动成为实例对象的原型
function Animal(name) {
  this.name = name
}
Animal.prototype.color = 'white'
var cat1 = new Animal('大毛')
var cat2 = new Animal('二毛')
console.log(cat1.color) // 'white'
console.log(cat2.color) // 'white'

// 原型对象的属性不是实例对象自身的属性, 只要改变原型对象, 变动就立刻会体现在所有实例对象上
Animal.prototype.color = 'yellow'
console.log(cat1.color) // 'yellow'
console.log(cat2.color) // 'yellow'
/*
  也就是说, 当实例对象本身没有某个属性或方法的时候, 它会到原型对象去寻找该属性或方法
*/
cat1.color = 'black'
console.log(cat1.color) // 'black' 覆盖掉原型
console.log(cat2.color) // 'yellow'
/*
  总的来说, 原型对象的作用, 就是定义所有实例对象共享的属性和方法
  实例对象可以视作从原型对象衍生出来的子对象
*/

/*
  原型链
  任何一个对象, 都可以充当其他对象的原型
  原型对象也是对象, 所以也有自己的原型
  对象 => 原型 => 原型的原型 => Object.prototype => null
  原型链的尽头是 null
  所有的对象的原型都可以上溯到 Object.prototype, 这是所有对象都有 valueOf 和 toString 方法的原因, 从 Object.prototype 继承的
*/
console.log(Object.getPrototypeOf(Object.prototype)) // null
/*
  覆盖: 优先读取对象自身的同名属性(prototype 和 自身都有)
*/
// 如果让构造函数的 prototype 属性指向一个数组, 就意味着实例对象可以调用数组方法
var MyArray = function () {}
// 让构造函数的 prototype 属性指向一个数组
MyArray.prototype = new Array()
MyArray.prototype.constructor = MyArray

var mine = new MyArray()
mine.push(1, 2, 3)
console.log(mine.length) // 3
// 说明 mine 是 Array 构造函数的实例对象
console.log(mine instanceof Array) // true

/*
  constructor 属性
  默认指向 prototype 对象所在的构造函数
*/
function P() {}
console.log(P.prototype.constructor === P) // true 函数的原型对象默认指向函数自身(构造函数)

// 由于 constructor 定义在 prototype 对象上, 意味着可以被所有实例对象继承
function P() {}
var p = new P()
console.log(p.constructor === P) // true
console.log(p.constructor === P.prototype.constructor) // true p 从原型对象 P.prototype 上读取而来 constructor 属性
console.log(p.hasOwnProperty('constructor')) // false p 自身没有 constructor 属性
// constructor 属性可以得知某个实例对象, 到底是哪一个构造函数产生的
function F() {}
var f = new F()
console.log(f.constructor === F) // true
console.log(f.constructor === RegExp) // false

/*
  有了 constructor 属性, 就可以从一个实例新建另一个实例
  同时使得在实例方法中, 调用自身的构造函数成为可能
*/
function Constr() {}
var x = new Constr()
console.log(x.constructor) // [Function: Constr]
var y = new x.constructor()
console.log(y instanceof Constr) // true

Constr.prototype.createCopy = function () {
  // 调用构造函数, 新建另一个实例
  return new this.constructor()
}
// constructor 属性表示原型对象与构造函数之间的关联关系, 如果修改了原型对象, 一般会同时修改 constructor 属性, 防止引用的时候出错
function Person(name) {
  this.name = name
}
console.log(Person.prototype.constructor === Person) // true
// 构造函数 Person 的原型对象改掉了, 但是没有修改 constructor 属性, 导致这个属性不再指向 Person
Person.prototype = {
  // 同时修改 constructor 属性
  // constructor: Person,
  method: function () {},
}
console.log(Person.prototype.constructor === Person) // false
console.log(Person.prototype.constructor === Object) // true 由于 Person 的新原型是一个普通对象, 而普通对象的 constructor 属性指向 Object 构造函数

/*
  要么 constructor 和 prototype 同时改
  要么只在 prototype 对象上添加属性和方法, 而不要重新指定 prototype 对象
  以上可以保证 instanceof 不会失真
*/

function Foo() {}
var f = new Foo()
console.log(f.constructor.name) // 通过 name 属性(函数的 name 属性), 从而得到构造函数的名称

/*
  instanceof 运算符返回一个布尔值, 表示对象是否为某个构造函数的实例
  左边是实例对象, 右边是构造函数
  左边的构造函数是不是右边

  instanceof 检查整个原型链, 因此同一个实例对象, 可能会对多个构造函数都返回 true
  instanceof 的原理
    检查右边构造函数的 prototype 属性, 是否在左边实例对象的原型链上

  instanceof 失真
    左边实例对象的原型链上, 只有 null 对象
*/
function Vehicle() {}
var v = new Vehicle()
console.log(v instanceof Vehicle) // true

var d = new Date()
console.log(d instanceof Date) // true
console.log(d instanceof Object) // true

var obj = Object.create(null) // obj 的原型是 null
console.log(typeof obj) // object
console.log(obj instanceof Object) // false instanceof 失真

// instanceof 可以判断值的类型
var x = [1, 2, 3]
var y = {}
console.log(x instanceof Array) // true
console.log(y instanceof Object) // true
// 注意, instanceof 运算符只能用于对象, 不适用原始类型的值
var s = 'hello'
console.log(s instanceof String) // false

// 对于 undefined 和 null instanceof 总是返回 false
console.log(undefined instanceof Object)
console.log(null instanceof Object)

// 利用 instanceof 运算符, 可以解决调用构造函数时, 忘了加 new 命令的问题
function Fubar(foo, bar) {
  if (this instanceof Fubar) {
    this._foo = foo
    this._bar = bar
  } else {
    return new Fubar(foo, bar)
  }
}

/*
  构造函数的继承
  第一步: 在子类的构造函数中, 调用父类构造函数
  第二步: 让子类的原型指向父类的原型, 从而让子类继承父类原型
*/
function Sub(value) {
  // this 是子类 Sub 的实例, 在实例上调用父类的构造函数 Super 就会让子类实例具有父类实例的属性
  super.call(this)
  this.prop = value
}
// 不要直接赋值为 Super.prototype, (共享, 容易一起被修改)
Sub.prototype = Object.create(Super.prototype)
// 或者, 都是将父类的一个实例赋值给 Sub.prototype
// ***** 弊端: 子类会具有父类实例的方法 ****** 不推荐
Sub.prototype = new Super()
Sub.prototype.constructor = Sub
Sub.prototype.method = function () {}

// 例子
function Shape() {
  this.x = 0
  this.y = 0
}
Shape.prototype.move = function (x, y) {
  this.x += x
  this.y += y
  console.info('Shape moved.')
}
// Rectangle 构造函数继承 Shape
// 第一步: 在子类的构造函数中, 调用父类构造函数
function Rectangle() {
  Shape.call(this)
}
// 第二步: 子类的原型指向父类的原型, 从而让子类继承父类的原型
Rectangle.prototype = Object.create(Shape.prototype)
// 记得同时修改 constructor 属性(保持, 固定)
Rectangle.prototype.constructor = Rectangle

/*
  单个方法的继承
*/
ClassB.prototype.print = function () {
  ClassA.prototype.print.call(this)
  // ... other code
}
