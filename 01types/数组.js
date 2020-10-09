/*
  数组本质上属于一种特殊的对象
  特殊性: 键名是按次序排列的一组整数(0 1 2 3...)
  数组的键名(key)其实也是字符串
*/
var arr = ['a', 'b', 'c']
console.log(Object.keys(arr)) // [ '0', '1', '2' ]
// 对于数值的键名, 不能使用点结构
var arr = [1, 2, 3]
// arr.0 // 报错
console.log(arr[0]) // 1
console.log(arr['0']) // 1

// 数组的 length 属性是可写的, 人为设置一个小于当前成员个数的值, 该数组的成员数量会自动减少到 length 设置的值
// 减少后面
var arr = [1, 2, 3, 4]
arr.length = 2
console.log(arr) // [ 1, 2 ]

// 清空数组的一个有效方法就是将 length 属性设为 0
var arr = [1, 2, 3, 4]
arr.length = 0
console.log(arr) // []

// 如果人为设置 length 大于当前元素个数, 新增的位置都是空位
var a = ['a']
a.length = 3
console.log(a[1]) // undefined

// 可以为数组添加属性, 但是不影响 length 属性的值
var a = []
a['p'] = 'abc'
console.log(a.length) // 0

a[2.1] = 'abc'
console.log(a.length) // 0

// length 属性的值就是等于最大的数字键(整数)加1

// 不要使用 for in 遍历 Array 会取得非数字键
// 使用 forEach
var array = [1, 2, 3]
array.forEach((element) => {
  console.log(element)
})

/*
  数组的空位
  数组的空位不影响 length 属性, length 属性不过滤数组的空位
  数组的空位可以读取, 返回 undefined
  数组的空位与某个位置是 undefined 是不一样的
  ******* 数组的空位, forEach for in Object.keys 方法将会跳过空位 *******
*/
var a = [, , ,]
a.forEach((element, i) => {
  console.log(i + '. ' + element)
}) // 不产生任何输出
for (const i in a) {
  console.log(i)
} // 不产生任何输出
console.log(Object.keys(a)) // []

/*
  类似数组的对象
  arguments DOM 元素集 字符串
  根本特征: 具有 length 属性
*/
console.log('abc'[1]) // b
console.log('abc'.length) // 3
console.log('abc' instanceof Array) // false

// 数组的 slice 方法可以将"类似数组的对象"变成真正的数组
var arr = Array.prototype.slice.call(arrayLike)
