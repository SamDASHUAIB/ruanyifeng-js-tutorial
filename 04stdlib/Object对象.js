// JavaScript 的所有其他对象都继承自 Object 对象, 那些对象都是 Object 对象的实例
/*
  Object 对象本身的方法
  Object 的实例方法
    Object.prototype 上的方法, 可以被 Object 实例直接使用
*/
// 直接定义在 Object 对象上的方法就是 Object 对象本身的方法
Object.print = function (o) {
  console.log(o);
};

/*
  定义在 Object.prototype 上(Object 对象的原型对象)的方法, 叫做 Object 的实例方法, 可以被 Object 实例直接使用
  定义在 Object.prototype 上的属性和方法, 能够被所有 Object 的实例对象所共享
*/
Object.prototype.print = function () {
  console.log(this);
};
var obj = new Object();
obj.print(); // {} 本质上就是调用 Object.prototype.print 方法

/*
  instanceof 运算符用来验证, 一个对象是否为指定的构造函数的实例
  左 是不是 右 的实例
  左 的构造函数是不是 右
  原始类型 => 对应的包装对象的实例
*/
var obj = Object(1);
console.log(obj instanceof Object); // true
console.log(obj instanceof Number); // true
var obj = Object('foo');
console.log(obj instanceof Object);
console.log(obj instanceof String);
var obj = Object(true);
console.log(obj instanceof Object);
console.log(obj instanceof Boolean);

/*
  工具方法 Object() 可以保证某个值一定是对象, 将任意值转为对象

  如果 Object() 方法的参数是一个对象, 它总是返回该对象, 不用转换
  可以利用此特性写一个判断变量是否为对象的函数
*/
function isObject(value) {
  return value === Object(value);
}
console.log(isObject([])); // true
console.log(isObject(true)); // false
/*
  如果 Object() 的参数为 空 null undefined 返回一个空对象
*/
var obj = Object();
var obj = Object(null);
var obj = Object(undefined);
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
// 遍历对象的属性, 自身 + 可枚举
Object.keys();
var obj = {
  p1: 123,
  p2: 456,
};
// keys() 可枚举 + 自身 一般情况下, 用 keys 比较多
console.log(Object.keys(obj)); // [ 'p1', 'p2' ]
// getOwnPropertyNames() 自身 + 可枚举 + 不可枚举
console.log(Object.getOwnPropertyNames(obj)); // // [ 'p1', 'p2' ]

var a = ['hello', 'world'];
console.log(Object.keys(a)); // [ '0', '1' ]
console.log(Object.getOwnPropertyNames(a)); // [ '0', '1', 'length' ]

// 指定原型对象和属性, 返回一个新的对象
Object.create();
// 获取对象的 Prototype 对象
Object.getPrototypeOf();
// 获取某个属性的描述对象
Object.getOwnPropertyDescriptor();
// 通过描述对象, 定义某个属性
Object.defineProperty();
// 通过描述对象, 定义多个属性
Object.defineProperties();

/*
  定义在 Object.prototype 对象上的方法, 即 Object 的实例方法
  所有 Object 的实例对象都继承了这些方法
  Object.prototype.valueOf()
    默认情况下返回对象本身, JavaScript 自动类型转换时会默认调用这个方法
  Object.prototype.toString()
    默认情况下返回类型字符串 '[object 类型]' 数组 字符串 Date 函数 部署了自定义的 toString 方法覆盖了 Object.prototype.toString 方法
  toLocalString
  hasOwnProperty 自身 Or 继承的属性
  isPrototypeOf
    判断当前对象是否为另一个对象的原型
  propertyIsEnumerable
    判断某个属性是否可枚举
*/

/*
  Array String 函数 Date 对象分别部署了自定义的 toString 方法覆盖了 Object.prototype.toString 方法
*/
// toString() 的应用, 判断数据类型 [object, 类型(Number String Boolean Undefined Null Math Object Array)]
var obj = {};
console.log(obj.toString()); // [object Object]
// 由于实例对象可能会自定义 toString 方法, 覆盖掉 Object.prototype.toString 方法, 所以为了得到类型字符串, 最好直接使用 Object.prototype.toString 方法
Object.prototype.toString.call(value);
// ****
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(''); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
// 写一个比 typeof 运算符更准确的类型判断函数
// type 是一个函数, 同时也是一个对象
var type = function (o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};
console.log(type); // [Function: type]
[
  'Null',
  'Undefined',
  'Object',
  'Array',
  'String',
  'Number',
  'Boolean',
  'Function',
  'RegExp',
].forEach((t) => {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});
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
console.log(type);

console.log(type.isObject({})); // true
