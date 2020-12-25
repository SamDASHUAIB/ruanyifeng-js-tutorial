// 不建议使用 new Array() 生成新数组, 直接使用数组字面量是更好的做法

// 静态方法 Array.isArray() 弥补 typeof 运算符只能显示数组的类型是 Object
var arr = [1, 2]
console.log(typeof arr) // object
console.log(Array.isArray(arr)) // true

// 实例方法
var arr = [1, 2, 3]
console.log(arr.valueOf()) // [ 1, 2, 3 ] 返回数组自身
console.log(arr.toString()) // '1,2,3' 覆盖了 Object.prototype.toString()

// 出入栈 push pop 改变原数组, 最后, 关键词: 摞盘子(横着)
var arr = []
arr.push(1)
arr.push('a')
arr.push(true, {})
console.log(arr) // [ 1, 'a', true, {} ]
// pop 删除最后一项, 并且返回该元素
var arr = ['a', 'b', 'c']
console.log(arr.pop()) // 'c'
console.log(arr) // [ 'a', 'b' ]

// push + pop 构成了 "后进先出" 的栈结构(一摞盘子 横躺着的 在栈顶或者说数组末尾)
var arr = []
arr.push(1, 2)
arr.push(3)
arr.pop()
console.log(arr) // [1, 2]

// shift  删除第一个元素, 并且返回该元素, 改变原数组
var a = ['a', 'b', 'c']
console.log(a.shift()) // 'a'
console.log(a) // [ 'b', 'c' ]

// push + shift 构成了 "先进先出" 的队列结构

// unshift 方法用于在数组的第一个位置添加元素, 并返回添加新元素后的数组长度 改变原数组
var a = ['a', 'b', 'c']
console.log(a.unshift('x')) // 4 数组添加新值后的长度
console.log(a) // [ 'x', 'a', 'b', 'c' ]
// unshift 接收多个参数
var arr = ['c', 'd']
arr.unshift('a', 'b')
console.log(arr) // [ 'a', 'b', 'c', 'd' ]

// join 数组成员 + 分隔符 => 一个字符串, 默认使用逗号进行分隔
var a = [1, 2, 3, 4]
console.log(a.join(' ')) // 1 2 3 4
console.log(a.join(' | ')) // 1 | 2 | 3 | 4
console.log(a.join()) // 1,2,3,4
// 如果数组成员是 undefined 或 null 或 空位, 会被转成空字符串
console.log([undefined, null].join('#')) // #
console.log(['a', , 'b'].join('-')) // a--b

// 通过 call 方法, 将这个方法应用于字符串或类似数组的对象
Array.prototype.join.call('hello', '-')
var obj = { 0: 'a', 1: 'b', length: 2 }
console.log(Array.prototype.join.call(obj, '-')) // a-b

// concat 方法用于多个数组的合并, 它将新数组的成员, 添加到原数组成员的后部, 然后返回一个新数组, 原数组不变
console.log(['hello'].concat(['world'])) // [ 'hello', 'world' ]
// 合并多个数组
console.log(['hello'].concat(['world'], ['!'])) // [ 'hello', 'world', '!' ]

// 接收其他类型的值作为参数, 添加到目标数组尾部
console.log([1, 2, 3].concat(4, 5, 6)) // [ 1, 2, 3, 4, 5, 6 ]
console.log([].concat({ a: 1 }, { b: 2 })) // [ { a: 1 }, { b: 2 } ]

// 注意: 如果数组成员包括对象, concat 方法返回当前数组的一个浅拷贝, 新数组拷贝的是对象的引用
var obj = { a: 1 }
var oldArray = [obj]
var newArray = oldArray.concat()
obj.a = 2
console.log(newArray[0].a) // 2 改变原对象后, 新数组跟着改变

// reverse() 该方法将改变原数组
var a = ['a', 'b', 'c']
console.log(a.reverse()) // [ 'c', 'b', 'a' ]
console.log(a) // [ 'c', 'b', 'a' ] 改变原数组

// slice() 方法用于提取数组的一部分, 返回一个新数组, 原数组不变
arr.slice(start, end) // [start, end)
var a = ['a', 'b', 'c']
console.log(a.slice(0)) // [ 'a', 'b', 'c' ]
console.log(a.slice(1)) // [ 'b', 'c' ]
console.log(a.slice(1, 2)) // [ 'b' ]
console.log(a.slice(2, 6)) // [ 'c' ]
console.log(a.slice()) // [ 'a', 'b', 'c' ] 没有参数, 复制数组
// 类数组 => 数组 使用 slice 方法
var arrLike = {
  0: 'a',
  1: 'b',
  length: 2,
}
var arr = Array.prototype.slice.call(arrLike)
console.log(arr) // [ 'a', 'b' ]

/*
  splice() 方法 删 + 插 万能方法
  用于删除原数组的一部分成员,
  并可以在删除的位置添加新的数组成员,
  返回值: 被删除的元素,
  有无副作用: 有, 改变原数组

  start: 开始删除的位置(包含)
  count: 删除的个数
  addElement1
    添加元素替换 start 如果原来的 start 已经被删除了
    添加元素跟着 start 后面, 如果单纯插入不删除 start
  ...
*/

// 删
var a = ['a', 'b', 'c', 'd', 'e', 'f']
console.log(a.splice(4, 2)) // [ 'e', 'f' ]
console.log(a) // [ 'a', 'b', 'c', 'd' ]
// 删 + 插
var a = ['a', 'b', 'c', 'd', 'e', 'f']
console.log(a.splice(4, 2, 1, 2))
console.log(a)
// 插
var a = [1, 1, 1]
console.log(a.splice(1, 0, 2)) // []
console.log(a) // [ 1, 2, 1, 1 ]
// 只提供第一个参数, 将原数组在指定位置拆分成两个数组
var a = [1, 2, 3, 4]
console.log(a.splice(2)) // [ 3, 4 ]
console.log(a) // [ 1, 2 ]

// 原始 sort 不是按照大小排序, 而是按照字典顺序, 数值 => 字符串, 再按照字典顺序进行比较
console.log([10111, 1101, 111].sort()) // [ 10111, 1101, 111 ]
// 一般都需要我们自定义 sort
// [ 111, 1101, 10111 ]
console.log(
  [10111, 1101, 111].sort((a, b) => {
    return a - b
  }),
)
// 按照年龄进行排序
/*
  [
    { name: '李四', age: 24 },
    { name: '王五', age: 28 },
    { name: '张三', age: 30 }
  ]
*/
console.log(
  [
    { name: '张三', age: 30 },
    { name: '李四', age: 24 },
    { name: '王五', age: 28 },
  ].sort((o1, o2) => {
    return o1.age - o2.age
  }),
)
// map 方法将数组的所有成员依次传入参数函数, 然后把每一次的执行结果组成一个新数组返回
var numbers = [1, 2, 3]
console.log(
  numbers.map((n) => {
    return n + 1
  }),
) // [ 2, 3, 4 ] 返回新数组, 把每一次的执行结果组成一个新数组返回

console.log(numbers) // [ 1, 2, 3 ] 原数组不变
/*
  map((elem, index, arr) => {})
  第一个参数: elem 当前成员
  第二个参数: index 当前成员的索引
  第三个参数: arr 数组本身
*/
console.log(
  [1, 2, 3].map((elem, index, arr) => {
    return elem * index
  }),
) // [ 0, 2, 6 ]

// map(func, this) 接收第二个参数绑定回调函数内部的 this 对象
var arr = ['a', 'b', 'c']
console.log(
  [1, 2].map((e) => {
    return this[e]
  }, arr),
) // [undefined, undefined] 箭头函数的 this 总是指向外层函数的 this (在这里就是 global)
console.log(globalThis[1]) // undefined
console.log(globalThis[2]) // undefined

var arr = ['a', 'b', 'c']
console.log(
  [1, 2].map(function (e) {
    return this[e]
  }, arr),
) // ['b', 'c']

// map 会跳过数组的空位
var f = function (n) {
  return 'a'
}
console.log([1, undefined, 2].map(f)) // [ 'a', 'a', 'a' ] 不跳过 undefined
console.log([1, null, 2].map(f)) // [ 'a', 'a', 'a' ] 不跳过 null
console.log([1, , 2].map(f)) // [ 'a', <1 empty item>, 'a' ] 跳过空位

// forEach 和 map 很类似, 但是, forEach 不返回值, 只用来操作数据, 如果数组遍历的目的是为了得到返回值, 那么使用 map 方法, 否则使用 forEach 方法
function log(elem, index, array) {
  // console.log('[' + index + '] = ' + elem)
  console.log(`[${index}] = ${elem}`)
}
/*
  [0] = 2
  [1] = 5
  [2] = 9

*/
;[2, 5, 9].forEach(log)
// forEach 无法中断执行
// forEach 跳过数组的空位
var log = function (n) {
  console.log(n + 1)
}

;[1, undefined, 2].forEach(log) // 2 NaN 3 不会跳过 undefined
;[1, null, 2].forEach(log) // 2 1 3 不会跳过 NaN
;[1, , 2].forEach(log) // 2 3 跳过空位

// filter 方法, 过滤数组成员, 满足条件的成员组成一个新数组返回(true => 添加到结果集中)
var newArray = [1, 2, 3, 4, 5].filter((elem) => {
  return elem > 3
})
console.log(newArray) // [4, 5]
/*
  同样接收三个参数
  elem
  index
  arr
*/
var newArray = [1, 2, 3, 4, 5].filter((elem, index, arr) => {
  return index % 2 === 0
})
// 返回偶数位置的成员组成的新数组
console.log(newArray) // [ 1, 3, 5 ]

// some every 断言, 表示判断数组成员是否符合某种条件, 返回一个布尔值
// some 只要一个成员的返回值是 true 整个 some 方法的返回值就是 true 否则返回 false
var arr = [1, 2, 3, 4, 5]
console.log(
  arr.some((elem, index, arr) => {
    return elem >= 3
  }),
) // true
// every 所有成员的返回值是 true 整个 every 方法的返回值就是 true 否则返回 false
var arr = [1, 2, 3, 4, 5]
console.log(
  arr.every((elem, index, arr) => {
    return elem >= 3
  }),
) // false

// indexOf() 第一次出现的位置, 如果没有出现返回 -1
var a = ['a', 'b', 'c']
console.log(a.indexOf('b')) // 1
console.log(a.indexOf('y')) // -1
// 接收第二个参数, 表示搜索的开始位置
console.log(['a', 'b', 'c'].indexOf('a', 1)) // -1

// lastIndexOf() 最后一次出现的位置, 如果没有出现返回 -1
var a = [2, 5, 9]
console.log(a.lastIndexOf(2)) // 0
console.log(a.lastIndexOf(4)) // -1
// indexOf 和 lastIndexOf 内部使用严格相等运算符 (===) 进行比较, 而 NaN 是唯一一个不等于自身的值
console.log([NaN].indexOf(NaN)) // -1
console.log([NaN].lastIndexOf(NaN)) // -1

// 链式调用
var users = [
  { name: 'tom', email: 'tom@example.com' },
  { name: 'peter', email: 'peter@example.com' },
]

users
  .map(function (user) {
    return user.email
  })
  .filter(function (email) {
    return /^t/.test(email)
  })
  .forEach(function (email) {
    console.log(email)
  }) // tom@example.com 过滤出以 t 开头的 Email 地址

/*
  Array() 构造函数有一个很大的缺陷, 不同的参数会导致行为不一致, 不要使用
  直接用数组字面量是更好的做法
*/
var arr = []
console.log(arr)

/* 静态方法 Array.isArray() 返回一个布尔值, 表示参数是否为数组, 可以弥补 typeof 运算符的不足 */
var arr = [1, 2, 3]
console.log(typeof arr) // object 不能精准识别数组
console.log(Array.isArray(arr)) // true 可以识别数组

/*
  实例方法, valueOf() toString()
  valueOf() 一个所有对象都拥有的方法, 表示对该对象求值, 不同对象的 valueOf 方法不一定相同, 数组的 valueOf() 返回数组本身
  toString() 方法返回数组的字符串形式
*/
var arr = [1, 2, 3]
console.log(arr.valueOf()) // [ 1, 2, 3 ]
console.log(arr.toString()) // 1,2,3

/* push 方法, 在数组末端添加一个或多个元素, 并返回添加新元素后的长度, 改变原数组 */
var arr = []
arr.push(1)
console.log(arr.push('a')) // 2 返回添加后的长度
console.log(arr) // [ 1, 'a' ]

/* pop 方法用于删除数组的最后一个元素, 并返回该元素, 改变原数组 */
var arr = ['a', 'b', 'c']
console.log(arr.pop()) // c 返回被删除的元素
console.log(arr) // [ 'a', 'b' ]

/* pop + push = 后进先出的 "栈" 结构 */
var arr = []
arr.push(1, 2)
arr.push(3)
arr.pop()
console.log(arr) // [ 1, 2 ]

/* shift() 用于删除第一个元素, 并且返回该元素, 改变原数组 */
var a = ['a', 'b', 'c']
console.log(a.shift()) // a 返回被删除的元素
console.log(a) // [ 'b', 'c' ]

/*
  实例方法
    push pop 末端添加, 末端删除 改变原来数组 push + pop = 后进先出"栈结构"
    shift unshift 删除, 添加第一个元素, 改变原来数组, push + shift = 先进先出 "队列结构"
    join 将所有数组成员连接成一个字符串返回, 默认用逗号分隔(可以传入分隔符)
    reverse 颠倒排列数组元素, 返回改变后的数组, 注意, 此方法将改变原数组
    slice 提取目标数组的一部分, 返回一个新的数组, 原来的数组不变 [)
*/
let name = ['sam']
console.log(name.shift())
