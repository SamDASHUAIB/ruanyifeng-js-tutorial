/*
  包装对象, 数值 字符串 布尔值, 分别对应的 Number String Boolean 三个原生对象 new Number() new String() new Boolean()
  包装对象的目的:
    使得"对象"类型可以覆盖 JavaScript 所有的值, 整门语言有一个通用的数据模型
    原始类型的值也有办法调用自己的方法
  new Number(): 原始类型 => 对象 和 Number(): 任意类型 => 数值(原始类型)
*/

// 包装对象的实例方法
// valueOf() 方法返回包装对象实例对应的原始类型的值
console.log(new Number(123).valueOf()) // 123
console.log(new String('abc').valueOf()) // 'abc'
console.log(new Boolean(true).valueOf()) // true

// toString() 方法返回对应的字符串形式
console.log(new Number(123).toString()) // 123
console.log(new String('abc').toString()) // 'abc'
console.log(new Boolean(true).toString()) // 'true'

// 原始类型与实例对象的自动转换
// 在某些场合, 原始类型的值会自动当做包装对象调用, 即调用包装对象的属性和方法
// 原始类型 => 包装对象实例, 使用后立即销毁
console.log('abc'.length) // 3
// 自动转换生成的包装对象是只读的, 无法修改, 所以, 字符串无法添加新属性
var s = 'Hello World'
s.x = 123
console.log(s.x) // undefined 只读, 无法修改

// 自定义方法, 在包装类型的原型对象上增加自定义方法和属性, 以供原始类型的值直接调用
String.prototype.double = function () {
  return this.valueOf() + this.valueOf()
}
console.log('abc'.double()) // 'abcabc'
Number.prototype.double = function () {
  return this.valueOf() + this.valueOf()
}
console.log((123).double()) // 246
