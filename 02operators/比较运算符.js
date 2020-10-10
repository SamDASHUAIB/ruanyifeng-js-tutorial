/*
  比较运算符
  相等比较
  非相等比较
    非相等比较
      字符串? 是, 按照字典顺序比较(比较 Unicode 码点)
      字符串? 否, 将两个运算子都转成数值, 再比较数值大小
*/

/*
  非相等运算符: 非字符串的比较
    原始类型
      转成数值再比较
    对象
      转为原始类型的值, 再进行比较
      valueOf ?返回的还是对象 => toString 方法
*/
// 原始类型
console.log(5 > '4') // true
console.log(true > false) // true
console.log(2 > true) // true

// 对象
var x = [2]
console.log(x > '11') // true 等同于 [2].valueOf().toString() > '11' 即 '2' > '11'
x.valueOf = function () {
  return '1'
}
console.log(x > '11') // false [2].valueOf() > '11' 即 '1' > '11'

/*
  严格相等运算符, 比较是否为同一个值, 相等运算符, 比较两个值是否相等
  严格相等运算符
    不同类型的值
      直接返回 false
    同一类型
      原始类型值(number string boolean)
        值相同返回 true 值不同就返回 false
      复合类型值(对象, 数组, 函数)
        比较它们是否指向同一个地址(是否引用同一个内存地址)
*/
// NaN 与任何值都不相等(包括自身)
console.log(NaN === NaN) // false
console.log(+0 === -0) // true
// 如果两个变量引用同一个对象, 则它们相等
var v1 = {}
var v2 = v1
console.log(v1 === v2) // true

// undefined 和 null 与自身严格相等
console.log(undefined === undefined) // true
console.log(null === null) // true

// 建议不要使用相等运算符, 最好只使用严格相等运算符

