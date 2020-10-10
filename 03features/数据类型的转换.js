/*
  强制转换
    Number()
    String()
    Boolean()
*/

/*
  Number() 将任意类型的值转化成数值
    原始类型
    对象
*/
// 原始类型
// Number() 将字符串转为数值时, 非常严格, 只要有一个字符无法转成数值, 整个字符串就会被转为 NaN
console.log(Number('123abc')) // NaN 不可被解析为数值, 返回 NaN
console.log(Number('')) // 0 空字符串, 转为 0
console.log(Number(true)) // 1
console.log(Number(false)) // 0
console.log(Number(undefined)) // NaN
console.log(Number(null)) // 0

// 对象
// 除非是包含单个数值的数组, 其他对象都是 NaN
/*
  第一步: 调用自身的 valueOf 方法, 如果返回原始类型的值, 则直接对该值使用 Number 函数, 不再进行后续步骤
  第二步: 如果 valueOf 方法返回的还是对象, 调用对象自身的 toString 方法, 如果 toString 方法返回原始类型的值, 对该值使用 Number 函数, 不再进行后续步骤
  第三步: 如果 toString 返回的是对象, 报错
*/
console.log(Number({ a: 1 })) // NaN
console.log(Number([1, 2, 3])) // NaN
console.log(Number([5])) // 5

var obj = { x: 1 }
console.log(Number(obj))
// 等同于
if (typeof obj.valueOf() === 'object') {
  Number(obj.toString()) // Number("[object Object]") => NaN
} else {
  Number(obj.valueOf())
}
// 自定义 valueOf 和 toString
var obj = {
  valueOf: function () {
    return {}
  },
  toString: function () {
    return {}
  },
}
console.log(Number(obj)) // TypeError: Cannot convert object to primitive value

/*
  String() 函数可以将任意类型的值转化为字符串
    原始类型
      数值 => "数值"
      字符串 => 字符串
      布尔值: true => "true" false => "false"
      undefined => "undefined"
      null => "null"
    对象
      返回一个类型字符串
      数组
        数组的字符串形式
*/
console.log(String(true))
console.log(String(false))
console.log(String(undefined))
console.log(String(null))
console.log(String({ a: 1 })) // [object Object]
console.log(String([1, 2, 3])) // "1,2,3"

/*
  String() 转换对象的规律
    toString
    >>
    valueOf
    >>
    报错
*/
String({ a: 1 })
// 等同于
String({ a: 1 }.toString())

/*
  Boolean() 函数可以将任意类型的值转为布尔值
  一下六个转为 false 其余都为 true
  undefined
  null
  0
  ''(空字符串)
  NaN
  false
*/

/*
  自动转换: 预期 + 调用(Number | String | Boolean) 以强制转换为基础
  既可以是字符串, 也可以是数值, 默认转换为数值
  建议在预期为布尔值、数值、字符串的地方， 全部使用 Number String Boolean 强制显式转换
*/
// 一: 不同类型的数据相互运算
console.log(123 + 'abc') // 123abc 看似是加法, 其实执行连接
console.log(123 - 'abc') // NaN
// 二: 对非布尔值类型的数据求布尔值
if ('abc') {
  console.log('hello')
}
// 三: 对非数值类型的值使用一元运算符(+ -)
console.log(+{ foo: 'bar' }) // NaN
console.log(-[1, 2, 3]) // NaN

/*
  自动转换为字符串
  先将复合类型的值转为原始类型的值, 再将原始类型的值转为字符串
  主要发生在字符串的加法(连接)运算时 +
*/
console.log(5 + []) // "5"
/*
  自动转换为数值
  除了 + 加法运算符(执行连接)可能将运算子转为字符串, 其他运算符都会把运算子自动转为数值
*/
console.log(+[]) // 0

