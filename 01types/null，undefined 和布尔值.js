/*  null 和 undefined 的区别:
    null 是一个表示为 "空" 的对象, 转为数值时为 0
    undefined 是一个表示 "此处无定义" 的原始值, 转为数值时为 NaN
*/
console.log(Number(undefined)) // NaN
console.log(5 + undefined) // NaN
console.log(Number(null)) // 0
console.log(5 + null) // 5

/*
  null 的用处, null 表示空值
  函数参数未设置任何值, 传入 null, 表示参数为空
*/
/*
  undefined 的应用场景, undefined 表示未定义
*/
// 声明但没有赋值
var i
console.log(i)

// 调用函数时, 应该提供的参数没有提供, 该参数等于 undefined
function f(x) {
  return x
}
f()

// 对象没有赋值的属性
var o = new Object()
o.p // undefined

// 函数没有返回值的时候, 默认返回 undefined
function f() {}
f() // 返回 undefined


// 除了以下六个值被转为 false 其他值都视为 true
undefined
null
false
0
NaN
'' // (空字符串)


