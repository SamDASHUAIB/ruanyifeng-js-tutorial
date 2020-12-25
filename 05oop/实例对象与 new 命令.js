/*
  对象到底是什么?
  第一:
    对象是单个实物的抽象
  第二:
    对象是一个容器, 封装了属性(property)和方法(method)
    属性是状态, 方法是行为
*/

/*
  JavaScript 语言的对象体系, 基于构造函数(constructor)和原型链(prototype)
  构造函数作为对象的模板, 构造函数其实就是普通的函数, 但是有自己的特征和用法
  第一个字母大写
  构造函数的特点:
    函数体内部使用了 this 关键字, 代表了所要生成的对象实例
    生成对象的时候, 必须使用 new 命令
*/
/*
  new 命令的作用:
    执行构造函数, 返回一个实例对象
    new 命令执行时, 构造函数内部的 this 就代表了新生成的实例对象

  如果没有使用 new 而是直接调用构造函数, 此时构造函数就变成了普通函数, 并不会生成实例对象, this 此时代表全局对象
*/
// 如果发现没有使用 new 命令, 直接返回一个实例对象
function Fubar(foo, bar) {
  if (!(this instanceof Fubar)) {
    return new Fubar(foo, bar);
  }
  this._foo = foo;
  this._bar = bar;
}
console.log(Fubar(1, 2)._foo); // 1
console.log(new Fubar(1, 2)._foo); // 1

/*
  new  命令的原理
  1.创建一个空对象, 作为将要返回的实例对象  空对象 => 实例对象
  2.将这个空对象的原型, 指向构造函数的 prototype 属性(继承原型)  继承 prototype
  3.将这个空对象赋值给函数内部的 this 关键字  空对象 => this 关键字
  4.开始执行构造函数内部的代码  开始执行构造函数内部的代码

  在构造函数内部, this 指的是一个新生成的空对象, 所有针对 this 的操作, 都会发生在这个空对象上
  操作一个空对象(this 对象)将其 "构造" 成需要的样子

  构造函数有 return 语句, 且 return 后面跟着一个对象, new 命令会返回 return 语句指定的对象,
  否则, 就不会管 return 语句, 返回 this 对象

  使用 new 命令, 总是返回一个对象, 要么是实例对象, 要么是 return 语句指定的对象
*/
var Vehicle = function () {
  this.price = 1000;
  // 非对象, 忽略
  return 1000;
};
console.log(new Vehicle() === 1000); // false

var Vehicle = function () {
  this.price = 1000;
  // 对象, 直接返回此对象, 而非 this 对象
  return { price: 2000 };
};
console.log(new Vehicle().price); // 2000

// 对普通函数(内部没有 this 关键词的函数)使用 new 命令, 返回一个空对象
function getMessage() {
  return 'this is a message';
}
var msg = new getMessage();
console.log(msg); // getMessage {}
console.log(typeof msg); // object

/* 以现有对象为模板, 生成新的实例对象 */
var person1 = {
  name: '张三',
  age: 18,
  greeting: function () {
    console.log(`Hi! I'm ${this.name}.`);
  },
};
var person2 = Object.create(person1);
console.log(person2.name); // 张三
person2.greeting(); // Hi! I'm 张三.
