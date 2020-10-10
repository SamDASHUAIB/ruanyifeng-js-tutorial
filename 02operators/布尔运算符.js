/*

  四个布尔运算符, 将表达式转为布尔值
  ! && || ?:
  以下六个值取反后为 true 其他值都为 false
    undefined
    null
    false
    0
    ''(空字符串)
    NaN
  对一个数连续做两次取反运算, 等于将其转为对应的布尔值(与 Boolean 函数的作用相同)

*/
!!x
// 等同于
Boolean(x)

/*
  且运算符 &&
    如果第一个运算子的布尔值为 true, 则返回第二个运算子的值(非布尔值, 原值)
    如果第一个运算子的布尔值为 false, 则直接返回第一个运算子的值, 短路, 不再对第二个运算子求值
  多个连用
    返回第一个布尔值为 false 的表达式的值
    如果所有表达式的布尔值都为 true 返回最后一个表达式的值
  关键词: 后 找 false
*/
var x = 1
var y = 1 - 1 && (x += 1)
console.log(x) // 1
console.log(y) // 0
// 连用
console.log(true && 'foo' && '' && 4 && 'foo' && true) // ''
console.log(1 && 2 && 3) // 3

/*
  或运算符 ||
    如果第一个运算子的布尔值为 true, 返回第一个运算子的值, 且不再对第二个运算子求值
    如果第一个运算子的布尔值为 false, 则返回第二个运算子的值
  连用
    返回第一个布尔值为 true 的表达式的值
    如果所有表达式都为 false, 返回最后一个表达式的值
  关键词: 后 找 true
  短路: 只通过第一个表达式的值, 控制是否运行第二个表达式的机制, 称为 "短路"
*/
var x = 1
true || (x = 2)
console.log(x) // 1
// 连用, 返回第一个布尔值为 true 的表达式的值, 如果所有表达式都为 false 返回最后一个表达式的值
console.log(false || 0 || '' || 4 || 'foo' || true) // 4 第一个 true
console.log(false || 0 || '') // '' 最后

// 三元条件运算符 ?: 唯一一个需要三个运算子的运算符, 如果第一个表达式的布尔值为 true, 则返回第二个表达式的值, 否则返回第三个表达式的值
console.log('t' ? 'hello' : 'world') // hello
console.log(0 ? 'hello' : 'world') // world
// if ... else 是语句没有返回值
// 三元条件表达式是表达式, 具有返回值
