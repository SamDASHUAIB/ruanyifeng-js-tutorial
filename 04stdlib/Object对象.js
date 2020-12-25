// JavaScript 的所有其他对象都继承自 Object 对象, 哪些对象都是 Object 对象的实例
/*
  Object 对象本身的方法
  Object 的实例方法
    Object.prototype 上的方法, 可以被 Object 实例直接使用
*/
// 直接定义在 Object 对象上的方法就是 Object 对象本身的方法
Object.print = function (o) {
  console.log(o)
}
// 定义在 Object.prototype 上(Object 对象的原型对象)的方法, 叫做 Object 的实例方法, 可以被 Object 实例直接使用
// 定义在 Object.prototype 上的属性和方法, 能过被所有 Object 的实例对象所共享
Object.prototype.print = function () {
  console.log(this)
}
var obj = new Object()
obj.print() // {}

// instanceof 运算符用来验证, 一个对象是否为指定的构造函数的实例
// 左 是不是 右 的实例
// 左 的构造函数是不是 右
// 原始类型 => 对应的包装对象的实例
var obj = Object(1)
console.log(obj instanceof Object) // true
console.log(obj instanceof Number) // true
var obj = Object('foo')
console.log(obj instanceof Object)
console.log(obj instanceof String)
var obj = Object(true)
console.log(obj instanceof Object)
console.log(obj instanceof Boolean)
// 如果 Object() 方法的参数是一个对象, 它总是返回该对象, 不用转换
// 判断变量是否为对象的函数
function isObject(value) {
  return value === Object(value)
}
console.log(isObject([])) // true
console.log(isObject(true)) // false

/*
  Object 构造函数
  new Object()
  与
  {}
  等价
*/

/*
  Object 的静态方法, 定义在 Object 对象自身上的方法
*/
// 遍历对象的属性, 自身而非继承
Object.keys()
var obj = {
  p1: 123,
  p2: 456,
}
// keys() 可枚举
console.log(Object.keys(obj)) // [ 'p1', 'p2' ]
// getOwnPropertyNames() 可枚举 + 不可枚举
console.log(Object.getOwnPropertyNames(obj)) // // [ 'p1', 'p2' ]

// 指定原型对象和属性, 返回一个新的对象
Object.create()
// 获取对象的 Prototype 对象
Object.getPrototypeOf()
// 获取某个属性的描述对象
Object.getOwnPropertyDescriptor()
// 通过描述对象, 定义某个属性
Object.defineProperty()
// 通过描述对象, 定义多个属性
Object.defineProperties()

/*
  定义在 Object.prototype 对象上的方法, 即 Object 的实例方法
  所有 Object 的实例对象都继承了这些方法
  valueOf
    默认情况下返回对象本身, JavaScript 自动类型转换时会默认调用这个方法
  toString
    默认情况下返回类型字符串 '[object Object]' 数组 字符串 Date 函数 部署了自定义的 toString 方法覆盖了 Object.prototype.toString 方法
  toLocalString
  hasOwnProperty 自身 Or 继承的属性
  isPrototypeOf
  propertyIsEnumerable
*/
// toString() 的应用, 判断数据类型
var obj = {}
console.log(obj.toString()) // [object Object]
// 由于实例对象可能会自定义 toString 方法, 覆盖掉 Object.prototype.toString 方法, 所以为了得到类型字符串, 最好直接使用 Object.prototype.toString 方法
Object.prototype.toString.call(value)
// ****
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
// 写一个比 typeof 运算符更准确的类型判断函数
// type 是一个函数, 同时也是一个对象
var type = function (o) {
  var s = Object.prototype.toString.call(o)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}
console.log(type) // [Function: type]
;['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp'].forEach((t) => {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase()
  }
})
/*
  [Function: type] {
  isNull: [Function],
  isUndefined: [Function],
  isObject: [Function],
  isArray: [Function],
  isString: [Function],
  isNumber: [Function],
  isBoolean: [Function],
  isFunction: [Function],
  isRegExp: [Function]
}
*/
console.log(type)

console.log(type.isObject({})) // true

/* Object 本身的方法, 和 Object 实例的方法 */
/* Object 和 Object.prototype */
/* Object() 将任意值转为对象, 保证某个值一定是对象, 工具函数 */
var obj = Object()
console.log(obj instanceof Object) // true, 一个对象(左边)是否为指定的构造函数(右边)的实例
/* Object() 原始类型 => 包装类型 */
var obj = Object(1)
console.log(obj instanceof Number) // true
console.log(obj instanceof Object) // true
var obj = Object('foo')
console.log(obj instanceof String)
console.log(obj instanceof Object)
var obj = Object(true)
console.log(obj instanceof Boolean)
console.log(obj instanceof Object)
/* 参数是一个对象, 原封不动返回 */
var arr = []
var obj = Object(arr)
console.log(arr === obj) // true 说明没有任何改变
/* 利用 Object() 函数的特性, 写一个判断变量是否为对象的函数 */
function isObject(value) {
  return value === Object(value) // 是对象, 原封不动, 原始类型 => 包装类型
}
console.log(isObject([]), isObject(true)) // true false

/* Object 的静态方法, 或者说 Object 自身的方法 */
/*
  Object.keys() Object.getOwnPropertyNames() 都是用来遍历对象的属性
  Object.keys() 可枚举√ 不可枚举×
  Object.getOwnPropertyNames() 可枚举√ 不可枚举√
*/
var obj = {
  p1: 123,
  p2: 456,
}
console.log(Object.keys(obj)) // [ 'p1', 'p2' ] Object.keys() 返回一个数组, 该数组的成员都是该对象自身的所有属性名
console.log(Object.getOwnPropertyNames(obj)) // [ 'p1', 'p2' ] 可以返回不可枚举的属性名

var a = ['Hello', 'World']
console.log(Object.keys(a)) // [ '0', '1' ]
console.log(Object.getOwnPropertyNames(a)) // [ '0', '1', 'length' ]

/* 计算对象的属性个数 */
var obj = {
  p1: 123,
  p2: 456,
}
console.log(Object.getOwnPropertyNames(obj).length) // 2

/* Object 的实例方法 Object.prototype */
Object.prototype.valueOf() /* 返回当前对象对应的值 */
Object.prototype.toString() /* 返回当前对象对应的字符串形式 */
Object.prototype.toLocaleString() /* 返回当前对象对应的本地字符串形式 */
Object.prototype.hasOwnProperty() /* 判断某个属性是否为当前对象自身的属性, 还是继承自原型对象的属性 */
Object.prototype.isPrototypeOf() /* 判断当前对象是否为另一个对象的原型 */
Object.prototype.propertyIsEnumerable() /* 判断某个属性是否可枚举 */

/* Object.prototype.valueOf() 默认情况下返回对象本身, JavaScript 自动类型转换时会默认调用此方法 */
var obj = new Object()
console.log(obj.valueOf() === obj) // true 默认情况下, 返回对象本身

var obj = new Object()
console.log(1 + obj) // 1[object Object]
obj.valueOf = function () {
  return 2
}
console.log(1 + obj) // 3
console.log(typeof (1 + obj)) // number

/* Object.prototype.toString() 方法的作用是返回一个对象的字符串形式, 默认情况下返回类型字符串 */
var o1 = new Object()
console.log(o1.toString()) // [object Object] 默认情况下返回类型字符串
var o2 = { a: 1 }
console.log(o2.toString()) // [object Object]

/* Array String Function Date 对象都分别部署了自定义的 toString 方法, 覆盖了 Object.prototype.toString 方法 */
console.log([1, 2, 3].toString()) // "1,2,3"
console.log('123'.toString()) // "123"
console.log(
  function () {
    return 123
  }.toString(),
)
/* function () {
  return 123
} */
console.log(new Date().toString()) // Sat Dec 05 2020 10:44:31 GMT+0800 (中国标准时间)

/* 对象用于字符串加法(执行连接), 会自动调用 toString 方法 */
var obj = new Object()
obj.toString = function () {
  return 'hello'
}
console.log(obj + ' ' + 'world') // hello world

/* 利用 Object.prototype.toString 方法默认返回类型字符串的特性写一个比 typeof 运算符更准确的类型判断函数 */
var type = function (o) {
  var s = Object.prototype.toString.call(o)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}
console.log(type({})) // object
console.log(type([])) // array
console.log(type(5)) // number
console.log(type(null)) // null
console.log(type()) // undefined
console.log(type(/abcd/)) // regexp
console.log(type(new Date())) // date

/* type 函数拓展, 专门判断某种类型数据的方法(族) */
var type = function (o) {
  var s = Object.prototype.toString.call(o)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}
;['Null', 'Undefined', 'Object', 'Array', 'Number', 'String', 'Boolean', 'Function', 'RegExp'].forEach((t) => {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase()
  }
})
console.log(type.isObject({})) // true
console.log(type.isNumber(NaN)) // true
console.log(type.isRegExp(/abcd/)) // true
console.log(type)
/*
  [Function: type] {
  isNull: [Function (anonymous)],
  isUndefined: [Function (anonymous)],
  isObject: [Function (anonymous)],
  isArray: [Function (anonymous)],
  isString: [Function (anonymous)],
  isBoolean: [Function (anonymous)],
  isFunction: [Function (anonymous)],
  isRegExp: [Function (anonymous)]
}
*/
var date = new Date()
console.log(date.toString()) // Sat Dec 05 2020 11:02:00 GMT+0800 (中国标准时间)
console.log(date.toLocaleString()) // 2020/12/5 上午11:02:00
