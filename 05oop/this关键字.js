/*
  this 关键字
  用在构造函数之中, 表示实例对象
  用在普通场合
  特点: 总是返回一个对象

  简单地说, this 就是属性或者方法 "当前" 所在的对象
*/
var person = {
  name: '张三',
  describe: function () {
    return `姓名: ${this.name}`
  },
}
console.log(person.describe()) // 姓名: 张三
/*
  this.name 表示 name 属性所在的那个对象,
  由于 this.name 是在 describe 方法中调用的,
  而 describe 方法所在的当前对象是 person, 因此 this 指向 person, this.name 就是 person.name
*/

// 对象的属性可以赋值给另一个对象, 因此, 属性所在的当前对象是可变的, 即 this 的指向是可变的
var A = {
  name: '张三',
  describe: function () {
    return `姓名: ${this.name}`
  },
}
var B = {
  name: '李四',
}
B.describe = A.describe
console.log(B.describe()) // '姓名: 李四'
// 重构
function f() {
  return `姓名: ${this.name}`
}
var A = {
  name: '张三',
  describe: f,
}
var B = {
  name: '李四',
  describe: f,
}
// 随着 f 所在的对象不同, this 的指向也不同
console.log(A.describe()) // 姓名: 张三
console.log(B.describe()) // 姓名: 李四

// 函数 f 内部使用了 this 关键字, 随着 f 所在的对象不同, this 的指向也不同
var A = {
  name: '张三',
  describe: function () {
    return `姓名: ${this.name}`
  },
}
var name = '李四'
var f = A.describe
// 在全局作用域下调用, this 指向全局对象(global)
console.log(f()) // '姓名: 李四'

/*
  在 JavaScript 语言之中, 一切皆对象, 运行环境也是对象, 所以函数都是在某个对象之中运行
  this 就是函数运行时所在的对象(环境)

  JavaScript 支持运行环境动态切换, 也就是说 this 的指向是动态的, 无法事先确定到底指向哪一个对象, 这一点让人很迷惑
*/

/*
  this 如此设计其实和 "内存里面的数据结构有关"(对象的设计)
*/
var obj = { foo: 5 }
// 变量 obj 是一个地址(引用) { foo: 5 } 的地址

obj.foo
// 引擎先从 obj 拿到内存地址, 然后再从该地址读出原始的对象, 返回它的 foo 属性

{
  foo: 5
}
// 实际面目, 每一个属性名都对应一个属性描述对象
// {
//   foo: {
//     [[value]]: 5,
//     [[writable]]: true,
//     [[enumerable]]: true,
//     [[configurable]]: true,
//   }
// }

// 特殊: 如果 [[value]] 保存的是一个 function 呢
var obj = { obj: function () {} }
// 实际面目, 引擎将函数单独保存在内存中, 然后再将函数的地址赋值给 foo 属性的 value 属性
// {
//   foo: {
//     [[value]]: 函数的地址(函数实际单独保存在内存中, 而非和对象强耦合)
//   }
// }

// 那么由于函数是一个单独的值, 所有它可以在不同的环境(上下文)执行
var f = function () {}
var obj = { f: f }
// 单独执行
f()
// obj 环境执行
obj.f()

// JavaScript 允许在函数体内部, 引用当前环境的其他变量(子函数可以访问父函数的变量)
var f = function () {
  // 变量 x 由运行环境提供
  console.log(x)
}

// 由于函数可以在不同的运行环境执行, 所以需要有一种机制, 能够在函数体内部获得当前的运行环境(context)
// this 的设计目的就是在函数体内部指代函数当前的运行环境
var f = function () {
  // this.x 就是指当前运行环境的 x
  console.log(this.x)
}
// 全局环境
var x = 1
var obj = {
  f: f,
  x: 2,
}
// 单独执行
f()
// obj 环境执行
obj.f()

// this 的使用场合
// 全局, this 指代 global
function f() {
  console.log(this === globalThis)
}
f() // true

// 构造函数, 构造函数中的 this 指的是实例对象
var Obj = function (p) {
  // this 指向实例对象
  this.p = p
}
var o = new Obj('Hello World!')
console.log(o.p) // 'Hello World!'

// 对象的方法, 如果对象的方法里面包含 this, this 的指向就是方法运行时所在的对象, 该方法赋值给另一个对象, 就会改变 this 的指向
/*
obj: 内存地址A
obj.foo: 内存地址B
obj.foo() A => B, 因此 B 的运行环境就是 A this 指向 obj

直接取出 obj.foo (取出内存地址 B), 真正调用在全局环境下, 因此 this 指向全局环境 */
// // 情况一
// ;(obj.foo = obj.foo)() // global
// // 情况二
// ;(false || obj.foo)() // global
// // 情况三
// ;(1, obj.foo)() // global

// // 情况一
// ;(obj.foo = function () {
//   console.log(this)
// })()

// // 情况二
// ;(
//   false ||
//   function () {
//     console.log(this)
//   }
// )
// ;(
//   // 情况三
//   1,
//   function () {
//     console.log(this)
//   },
// )

// 如果 this 所在的方法不在对象的第一层, 这时 this 只是指向当前一层的对象, 而不会继承更上面的层
var a = {
  p: 'hello',
  b: {
    m: function () {
      // 这里的 this 指向 b 对象(a.b)而不会指向 a 对象
      console.log(this.p)
    },
  },
}
// 运行环境为 a.b 而不是 a
a.b.m() // undefined

// 实际运行的是以下代码
var b = {
  m: function () {
    console.log(this.p)
  },
}
var a = {
  p: 'hello',
  b: b,
}(a.b).m() // 等同于 b.m() 对象 b 没有属性 p 因此返回 undefined

// 始终牢记, 方法是独立于内存的(无论在对象中定义还是全局中定义)
var a = {
  b: {
    m: function () {
      console.log(this.p)
    },
    p: 'Hello',
  },
}
// a.b.m 存储的依旧是函数 m 的地址
var hello = a.b.m
// 直接从全局中调用函数 m 的地址(a.b.m), 运行环境当然是全局作用域
hello() // undefined 全局

// 正确的方法
var hello = a.b
// hello 存储的是对象 b 的地址, 经过对象 b 调用函数 m, 那么函数 m 的运行环境当然是对象 b 了
hello.m() // 'Hello'

/*
  避免多层 this
    切勿在函数中包含多层 this
*/
var o = {
  f1: function () {
    console.log(this)
    // 第二层实际指向 global
    var f2 = (function () {
      console.log(this)
    })()
  },
}
/*
{ f1: [Function: f1] }
Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  }
}
*/
o.f1()
// 实际运行代码
var temp = function () {
  console.log(this)
}
var o = {
  f1: function () {
    console.log(this)
    var f2 = temp()
  },
}
o.f1()

// 解决办法: 使用 that 固定外层的 this
var o = {
  f1: function () {
    console.log(this)
    var that = this
    // 始终牢记, 函数独立于内存而非和对象耦合
    var f2 = (function () {
      console.log(that)
    })()
  },
}
/*
  { f1: [Function: f1] }
  { f1: [Function: f1] }
*/
o.f1()

/*
  避免数组处理方法中的 this
  map forEach 方法, 允许提供一个函数作为参数, 这个函数内部不应该使用 this
*/
var o = {
  v: 'hello',
  p: ['a1', 'a2'],
  f: function f() {
    this.p.forEach(function (item) {
      // forEach 回调函数中的this 其实指向 global 对象
      // 同样还是内存的 this 不指向外部, 而是指向顶层对象
      console.log(this.v + ' ' + item)
    })
  },
}
/*
  undefined a1
  undefined a2
  global 中并没有定义属性 v
*/
o.f()
// 解决方案一: 使用 that 固定住 this(外层)
var o = {
  v: 'hello',
  p: ['a1', 'a2'],
  f: function f() {
    var that = this
    this.p.forEach(function (item) {
      console.log(that.v + ' ' + item)
    })
  },
}
/*
  hello a1
  hello a2
*/
o.f()

// 解决方案二: 将 this 当做 forEach 方法的第二个参数, 固定住它的运行环境
var o = {
  v: 'hello',
  p: ['a1', 'a2'],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item)
    }, this)
  },
}
/*
  hello a1
  hello a2
*/
o.f()

/*
  避免回调函数中的 this, 回调函数中的 this 往往会改变指向, 最好避免使用
*/

/*
  this 固定指向某个对象, 减少不确定性
  Function.prototype.call()
  Function.prototype.apply()
  Function.prototype.bind()

  指定函数内部 this 的指向(函数执行时所在的作用域), 然后再所指定的作用域中, 调用该函数
*/
var obj = {}
var f = function () {
  return this
}
console.log(f() === globalThis) // true
console.log(f.call(obj) === obj) // true
// call 方法的参数, 应该是一个对象, 如果参数为空、null 和 undefined，默认传入全局对象
var n = 123
var obj = {
  n: 456,
}
function a() {
  console.log(this.n)
}
a.call()
a.call(null)
a.call(undefined)

// call 接受多个参数, 第一个参数就是 this 所要指定的那个对象, 后面的参数则是函数调用时所需的参数
function add(a, b) {
  return a + b
}
console.log(add.call(this, 1, 2)) // 3

// 调用对象的原生方法
var obj = {}
console.log(obj.hasOwnProperty('toString'))
// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true
}
console.log(obj.hasOwnProperty('toString'))
// 直接调用原生方法
// 把 hasOwnProperty 方法的原始定义放到 obj 对象上执行, 这样无论 obj 上有没有同名方法, 都不会影响结果
console.log(Object.prototype.hasOwnProperty.call(obj, 'toString'))

/*
  Function.prototype.apply()
  与
  Function.prototype.call()
  唯一的区别就是, 前者接收一个数组作为函数执行时的参数
*/

function f(x, y) {
  console.log(x + y)
}
f.call(null, 1, 1) // 2
f.apply(null, [1, 1]) // 2

/*
  apply 的应用
*/
// 找出数组最大值, apply 结合 Math.max 方法
var a = [10, 2, 4, 15, 9]
console.log(Math.max.apply(null, a)) // 15
// 将数组的空元素变为 undefined
console.log(['a', , 'b']) // [ 'a', <1 empty item>, 'b' ]
console.log(Array.apply(null, ['a', , 'b'])) // [ 'a', undefined, 'b' ]
// 转换类似数组的对象 apply + slice
console.log(Array.prototype.slice.apply({ 0: 1, length: 1 })) // [1]
console.log(Array.prototype.slice.apply({ 0: 1 })) // []
console.log(Array.prototype.slice.apply({ 0: 1, length: 2 })) // [ 1, <1 empty item> ]
console.log(Array.prototype.slice.apply({ length: 1 })) // [ <1 empty item> ]
// 绑定回调函数的对象
var o = new Object()
o.f = function () {
  console.log(this === o)
}
var f = function () {
  o.f.apply(o)
}
$('#button').on('click', f)
