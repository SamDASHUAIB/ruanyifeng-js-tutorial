/*
  非数值的相加
  布尔值 + 布尔值: 转为数值, 再进行相加
  字符串 + 非字符串: 非字符串转为字符串, 执行连接

  只有加法有重载, 其他运算没有(运算子的类型不同, 导致了不同的语法行为, 叫做重载)
*/
// 相加
console.log(true + true) // 2
console.log(true + 1) // 2
// 连接
console.log(1 + 'a') // 1a
console.log(false + 'a') // falsea

/*
  对象的相加
  先转成原始类型的值, 然后再相加
  valueOf 方法 => toString 方法
  valueOf 方法总是返回对象自身
  toString 方法将其转为字符串
*/
var obj = { p: 1 }
console.log(obj + 2) // [object Object]2

// 自增, 自减 一元运算符, 将运算子首先转为数值, 然后 +1或者 -1, 会修改原始变量
var x = 1
++x
console.log(x);

// 数值运算符 + 同样使用加号, 一元运算符, 将任何值转为数值(与 Number 函数的作用相同) 返回一个新值, 不会改变原始变量的值
console.log(+ true) // 1
console.log(+ []) // 0
console.log(+ {}) // NaN

// 复合的赋值运算符, 都是先进行指定运算, 然后将得到值返回给左边的变量
x += y // x = x + y
x >>= y // x = x >> y
