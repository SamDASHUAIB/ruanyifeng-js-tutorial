/*
  对象: JavaScript 语言的核心概念, 最重要的数据结构
  对象: 一组 "键值对" 的集合, 是一种无序的复合数据集合
*/
var obj = {
  foo: 'Hello',
  bar: 'World',
};

/*
  键名:
    string 加不加引号都可以
    symbol 值, es6新添
    如果键名不符合标识名的条件, 第一个字符为数字(数字 + 字母), 或者含有空格或运算符, 且不是数字, 则必须添加引号, 否则报错
*/
// var obj = {
//   1p: 'hello, world' /* 标识符或关键字不能紧跟在数字文本之后。ts(1351)  */
// }
var obj = {
  '1p': 'hello world',
  'h w': 'hello world',
  'p+d': 'hello world',
};
/*
  对象的引用:
  不同的变量名指向同一个对象, 指向同一个内存地址, 修改其中一个变量, 会影响到其他所有变量
  原始类型:
  值的拷贝(不指向同一个内存地址)
*/

/*
  属性的读取:
    点运算符
    方括号运算符: 键名必须放在引号里面, 否则会被当做变量处理
    方括号运算符内部还可以使用表达式: obj['hello' + ' world'] obj[3 + 3]
    数字键名不能使用点运算符(因为会被当做小数点), 只能使用方括号运算符
*/
var foo = 'bar';
var obj = {
  foo: 1,
  bar: 2,
};
console.log(obj.foo); // 1
// 由于没有加引号 foo 表示一个变量, 该变量值为 'bar'
console.log(obj[foo]); // 2
// 加上引号, 表示 key
console.log(obj['foo']); // 1

// 数值键名不能使用点运算符(与小数点混淆), 只能使用方括号运算符
var obj = {
  123: 'hello world',
};
// console.log(obj.123); // 报错
console.log(obj[123]);

// 查看一个对象本身的所有属性(可遍历), 使用 Object.keys 方法
var obj = {
  key1: 1,
  key2: 2,
};
console.log(Object.keys(obj)); // [ 'key1', 'key2' ]

/*
  属性的删除:
  delete 命令, 删除成功后返回 true
  删除一个不存在的属性, delete 不报错, 而是返回 true, 因此不能根据 delete 命令的结果, 认定某个属性是存在的
  属性存在 + 该属性不得删除 => delete 返回 false
  delete 只能删除对象本身的属性, 无法删除继承的属性, 使用 delete 删除继承的属性返回 true 且无效,
  因此, 即使 delete 返回 true 该属性依然可能读取到值(此属性属于继承的属性)
*/
var obj = {};
console.log(delete obj.p); // true

var obj = Object.defineProperty({}, 'p', {
  value: 123,
  configurable: false /* 不得删除 */,
});
console.log(delete obj.p); // false 属性存在 + 不得删除

var obj = {}
console.log(delete obj.toString); // true 删除继承的属性
console.log(obj.toString); // [Function: toString]


// in 操作符, 继承 + 自身 + 可遍历, 筛选自身配合 hasOwnProperty
var obj = {};
if ('toString' in obj) {
  console.log(obj.hasOwnProperty('toString')); // false
}

// for in 自身 + 继承 + 不可遍历, 往往和 hasOwnProperty 一起配合使用
// for in + hasOwnProperty
for (const key in object) {
  if (object.hasOwnProperty(key)) {
    const element = object[key];
  }
}
