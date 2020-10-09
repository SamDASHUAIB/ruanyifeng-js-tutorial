/*  JavaScript 一共有七种数据类型
    number string boolean null undefined object symbol
    原始类型: number string boolean
    合成类型: object => {狭义的对象 数组(Array) 函数(function)}
    两个特殊值: null undefined
 */

/*  typeof 运算符可以返回一个值的数据类型   */

console.log(typeof 123) // number
console.log(typeof '123') // string
console.log(typeof true) // boolean

function f() {}
console.log(typeof f) // function

console.log(typeof undefined) // undefined

/*  IMP(important)
    1995 年的 JavaScript 第一版将 null 当做 object 的一种特殊值, 后来 null 独立出来, 为了兼容性, typeof null 返回 object 已经无法改变了
*/
console.log(typeof null) // object

// 说明 typeof 无法区分合成类型(引用类型, 复杂类型), typeof 用在原始类型上
console.log(typeof {}) // object
console.log(typeof []) // object
console.log(typeof global) // object
