// 对象: 一组 "键值对" 的集合, 一种无序的复合数据集合
var obj = {
  foo: 'Hello',
  bar: 'World',
}

// 键名: string 或者 symbol 值

/*
  对象的引用:
  指向同一个内存地址, 不同的变量名指向同一个对象
  原始类型:
  值的拷贝(不指向同一个内存地址)
*/

// 使用方括号运算符, 键名必须放在引号里面, 否则会被当做变量处理
var foo = 'bar'
var obj = {
  foo: 1,
  bar: 2,
}
console.log(obj.foo) // 1
// 由于没有加引号 foo 表示一个变量, 该变量值为 'bar'
console.log(obj[foo]) // 2
// 加上引号, 表示 key
console.log(obj['foo']) // 1

// 数值键名不能使用点运算符(与小数点混淆), 只能使用方括号运算符
var obj = {
  123: 'hello world',
}
// console.log(obj.123); // 报错
console.log(obj[123])

// 查看一个对象本身的所有属性, 使用 Object.keys 方法
var obj = {
  key1: 1,
  key2: 2,
}
console.log(Object.keys(obj)) // [ 'key1', 'key2' ]

// in 操作符, 继承 + 自身, 筛选自身配合 hasOwnProperty
var obj = {}
if ('toString' in obj) {
  console.log(obj.hasOwnProperty('toString')) // false
}

// for in 跳过不可遍历的属性 + 遍历继承的属性
// for in + hasOwnProperty
for (const key in object) {
  if (object.hasOwnProperty(key)) {
    const element = object[key];

  }
}
