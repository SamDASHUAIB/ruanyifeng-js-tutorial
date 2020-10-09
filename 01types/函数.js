/*
  在 JavaScript 中, 函数是第一等公民, 凡是可以使用值的地方, 就能使用函数
  函数赋值给变量和对象的属性, 当做参数传入其他函数, 作为函数的结果返回
  函数只是一个可以执行的值, 此外并无特殊之处
*/

/*
  JavaScript 引擎将函数名视同变量名, 提升
*/
var f = function () {
  console.log(1)
}
function f() {
  console.log(2)
}
f() // 1
// 等价于
var f
// 函数声明提升
function f() {
  console.log(2)
}
// 后覆盖前
f = function () {
  console.log(1)
}

// 函数的 length 属性就是函数定义之中的参数个数

/*
  函数内部的变量提升
  var 命令声明的变量, 不管在什么位置, 变量声明都会被提升到函数体的头部
*/

/*
  函数本身的作用域:
  就是其声明所在的作用域, 与其运行时所在的作用域无关
  函数执行时所在的作用域, 是定义时的作用域, 而不是调用时所在的作用域
*/
var a = 1
var x = function () {
  console.log(a)
}
function f() {
  var a = 2
  x()
}
// 函数 x 声明在最顶层, 因此绑定全局作用域, 所以会取到全局变量 a 的值 1 而非函数 f 的局部变量 a 值为 2
f() // 1

// 函数体内声明的函数, 作用域绑定函数体内部
function foo() {
  var x = 1
  function bar() {
    console.log(x)
  }
  return bar
}
var x = 2
var f = foo()
// 函数 bar 在函数 foo 内定义, 绑定了 foo 的局部作用域, 因此取到局部变量 x 的值为 1
f() // 1

/*
  函数参数的传递方式
  原始类型(number string boolean): 传值传递, 原始值的拷贝, 无论怎么修改都不会改变原始值
  复合类型(数组 对象 函数): 传址传递, 传入函数的原始值的地址, 引用, 因此在函数内部修改参数, 将会影响到原始值
*/
// 传值传递
var p = 2
function f(p) {
  p = 3
}
f(p)
console.log(p) // 2 传入的是原始值的拷贝, 在函数内部无论怎么修改都不会改变原始值

// 传址传递
var obj = { p: 1 }
function f(o) {
  o.p = 2
}
f(obj)
console.log(obj.p) // 2 传入函数的原始值的地址, 因此在函数内部修改参数, 将会影响到原始值

// 如果是替换掉整个参数, 这时不会影响到原始值
var obj = [1, 2, 3]
function f(o) {
  o = [2, 3]
}
f(obj)
console.log(obj) // [ 1, 2, 3 ] 重新对 o 赋值导致 o 指向另一个地址, 保存在原地址上的值当然不受影响

// arguments 对象, 一种可以在函数体内部读取所有参数的机制, 只在函数体内部, 才可以使用
var f = function (one) {
  console.log(arguments[0])
  console.log(arguments[1])
  console.log(arguments[2])
}
f(1, 2, 3)
// 通过 arguments 对象的 length 属性, 可以判断函数调用时到底带几个参数
function f() {
  return arguments.length
}
console.log(f(1, 2, 3)) // 3
console.log(f(1)) // 1
console.log(f()) // 0
// arguments 是一个类数组对象
// arguments => Array
var args = Array.prototype.slice.call(arguments)
// 或者
var args = []
for (let i = 0; i < array.length; i++) {
  args.push(arguments)
}
/*

  闭包, 需要理解变量作用域
  定义在一个函数内部的函数
  能够读取其他函数内部变量的函数

*/
