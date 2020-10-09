/*
  在 JavaScript 中, 所有的数字都是以 64 位浮点数形式储存, 即使整数也是如此
  也就是说, JavaScript 语言底层根本没有整数, 所有数字都是小数(64 位浮点数)
  64 位小数 => 32 位整数(某些必须整数才能完成的运算)
*/
console.log(1 === 1.0) // true

/* 浮点数不是精确的值, 所以涉及小数的比较和运算需要特别小心 */
console.log(0.1 + 0.2 === 0.3) // false
console.log(0.3 / 0.1) // 2.9999999999999996
console.log(0.3 - 0.2 === 0.2 - 0.1) // false

/*
  JavaScript 64 位浮点数的组成
  第1位: 符号位 0 表示正数, 1 表示负数
  第2位 - 第12位: 指数部分 (决定数值的大小, 共 11 位)
  第13位 - 第64位: 小数部分(有效数字, 决定了数值的精度, 共 52 位) 下面的 xxxx
  (-1)^符号位 * 1.xx...xx * 2^指数部分
  因此 JavaScript 提供的有效数字最长为 53 个二进制位
  因此绝对值小于2的53次方的整数, 都可以精确表示(大约是 15 位的十进制数)
*/
console.log(Math.pow(2, 53)) // 9007199254740992
// 超出有效数字开始出错
console.log(Math.pow(2, 53) + 1) // 9007199254740992
console.log(Math.pow(2, 53) + 2) // 9007199254740994
console.log(Math.pow(2, 53) + 3) // 9007199254740996
console.log(Math.pow(2, 53) + 4) // 9007199254740996

/*
  JavaScript 的数值范围(指数部分的长度为 11 个二进制位)意味着指数部分最大值是 2047 (分出一半表示负数 -1023 ~ 1024)
  JavaScript 能够表示的数值范围为 2^1024 到 2^-1075(开区间, -1023 + -52), 超过此范围无法表示(正向溢出, 0)
*/
console.log(Math.pow(2, 1024)) // Infinity
console.log(Math.pow(2, -1075)) // 0

// 0b // 二进制
// 0o // 八进制
// 0x // 十六进制

// +0 和 -0 唯一有区别的场合, +0 和 -0 当做分母, 返回的值是不相等的
console.log(1 / +0 === 1 / -0) // false +Infinity 不等于 -Infinity

// NaN 主要出现在将字符串解析成数字出错的场合
console.log(5 - 'x') // NaN
// NaN 是一个特殊数值, 数据类型依然是 Number
console.log(typeof NaN) // number

// parseInt 的返回值只有两种可能, 要么是一个十进制整数, 要么是 NaN string => number(整数)

// 判断 NaN: 利用 NaN 为唯一不等于自身的值这个特点, 进行判断
function myIsNaN(value) {
  return value !== value
}
