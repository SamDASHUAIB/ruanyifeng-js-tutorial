/* valueOf() 方法返回原始字符串 */
var s1 = 'abc'
var s2 = new String('abc')
console.log(s2.valueOf()) // 'abc'
console.log(typeof s2) // object

/* 字符串对象是一个类数组的对象, 有 length 属性, 可以使用 [] 取值 */
var s = new String('abc')
console.log(s[0]) // 'a'

/* 除了构造函数之外, String 对象还可以当做工具方法使用, 将任意类型的值转为字符串 */
console.log(String(true))
console.log(String(5))

/* 实例属性 */
String.prototype.length
console.log('abc'.length) // 3

/* 实例方法 */
String.prototype.charAt() // 返回指定位置的字符, 参数从 0 开始编号的位置
var s = new String('abc')
console.log(s.charAt(1)) // b
console.log(s.charAt(s.length - 1)) // c
// 完全可以使用下标代替 charAt()
console.log('abc'[1]) // b

String.prototype.slice() // 从原字符串去除子字符串并返回, 不改变原字符串, 第一个参数是子字符串的开始位置, 第二个参数是子字符串的结束位置(不包含) [)

console.log('JavaScript'.slice(0, 4)) // Java
console.log('JavaScript'.slice(4)) // 忽略第二个参数, 表示子字符串一直到原字符串结束

String.prototype.substring() // 从原字符串取出子字符串并返回, 不改变原字符串, 和 slice 方法很像, 不建议使用, 推荐使用 slice() 方法

String.prototype.split() // split 方法按照给定的规则分割字符串, 返回一个由分割出来的子字符串组成的数组
console.log('a|b|c'.split('|')) // [ 'a', 'b', 'c' ]
/* 分割规则为空字符串, 返回数组的成员是原字符串的每一个字符 */
console.log('a|b|c'.split('')) // [ 'a', '|', 'b', '|', 'c' ]
/* 忽略参数, 返回数组的唯一成员就是原字符串 */
console.log('a|b|c'.split()) // [ 'a|b|c' ]

