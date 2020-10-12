// 获取原型对象
var F = function () {}
var f = new F()
console.log(Object.getPrototypeOf(f) === F.prototype)
console.log(F.prototype) // F {}

// 空对象的原型是 Object.prototype
console.log(Object.getPrototypeOf({}) === Object.prototype) // true
// Object.prototype 的原型对象是 null
console.log(Object.getPrototypeOf(Object.prototype) === null) // true
// 函数的原型对象是 Function.prototype
function f() {}
console.log(Object.getPrototypeOf(f) === Function.prototype) // true

// 为参数对象设置原型, 返回该参数对象, 第一个参数: 现有对象, 第二个参数: 原型对象
var a = {}
var b = { x: 1 }
Object.setPrototypeOf(a, b)
console.log(Object.getPrototypeOf(a) === b) // true
console.log(a.prototype === b) // true 构造函数才有 prototype 普通对象 a 没有 prototype 属性

// new 命令与 setPrototypeOf
/*
  第一步: 将一个空对象的原型设为构造函数的 prototype 属性
  第二步: 将构造函数内部的 this 绑定这个空对象, 然后执行构造函数(中的代码), 使得定义在 this 上面的方法和属性, 转移到这个空对象上(构造过程)
*/
var F = function () {
  this.foo = 'bar'
}
var f = new F()
// 等同于
var f = Object.setPrototypeOf({}, F.prototype)
F.call(f)

// 很多时候, 我们只能拿到一个实例对象, 无法获取到构造函数(根本就不是由构造函数生成的), 从一个实例对象, 生成另一个实例对象
// Object.create() 接受一个对象作为参数, 然后以它为原型, 返回一个实例对象, 该实例完全继承原型对象的属性
var A = {
  print: function () {
    console.log('hello')
  },
}
// 实例对象
var B = Object.create(A)
console.log(Object.getPrototypeOf(B) === A) // true
B.print() // 'hello'
console.log(A.print === B.print) // true

/*
  create 方法的实质
  新建一个空的构造函数 F, 然后让 F.prototype 属性指向参数对象 obj, 最后返回一个 F 的实例, 从而实现让该实例继承 obj 的属性
*/
if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    // 新建一个空的构造函数 F
    function F() {}
    // 将构造函数 F 的原型对象设为传入的参数对象 obj
    F.prototype = obj
    // 执行构造构造函数 F 生成的对象就继承了 F.prototype 也就是 obj 对象上的所有属性和方法
    /*
      第一步: 将一个空对象的原型设为构造函数 F 的原型对象(也就是 obj)
      第二步: 将构造函数中的 this 绑定到这个空对象上, 执行构造函数 F 中的代码, 如此一来, 定义在 this 上的方法和属性转移到了这个新的空对象上
    */
    return new F()
  }
}
/*
  三种等价的对象生成方法
  生成普通对象
*/
var obj1 = Object.create({})
var obj2 = Object.create(Object.prototype)
var obj3 = new Object()

/*
  生成一个不继承任何属性的对象(连 toString 和 valueOf 方法都没有)
  将 Object.create 的参数设为 null
*/
var obj = Object.create(null)
console.log(obj.valueOf()) // TypeError: obj.valueof is not a function

// 使用 create 方法时, 必须填写参数对象
Object.create() // TypeError: Object prototype may only be an Object or null: undefined

// create 方法生成的对象, 继承了它的原型对象的构造函数
function A() {}
var a = new A()
var b = Object.create(a)
console.log(Object.getPrototypeOf(b) === a) // true A {}
console.log(b.constructor === A) // true
console.log(b instanceof A) // true
// 推荐使用 Object.getPrototypeOf() 方法来获取参数对象的原型对象

/*
  获取参数对象本身的所有属性的键名
  keys: 自身 + 可遍历
  getOwnPropertyNames: 自身 + 可遍历 + 不可遍历
*/

/*
  hasOwnProperty 方法是 JavaScript 之中唯一一个处理对象属性时, 不会遍历原型链的方法
*/

/*
  对象的拷贝
  确保拷贝后的对象, 与原对象具有同样的原型(内在也一样)
  确保拷贝后的对象, 与原对象具有同样的实例属性(长得一样)
*/
function copyObject(origin) {
  // create 方法的第二个参数, 接受一个属性描述对象(所有属性的描述对象)
  return Object.create(
    Object.getPrototypeOf(origin),
    Object.getOwnPropertyDescriptor(origin),
  )
}
