/*
  属性描述对象:
    描述对象的属性, 控制它的行为
    该属性是否可写
    该属性是否具有可遍历性
    每个属性都有自己对应的属性描述对象, 保存该属性的一些元信息
*/

/*
  第一类
    value 默认为 undefined
    writable 默认为 true
    enumerable  默认为 true 如果设为 false 则 for...in Object.keys() 跳过该属性
    configurable 默认为 true 控制属性描述对象的可写性(可配置性)
      如果设为 false "锁死"
        阻止某些操作改写该属性, 无法删除该属性, 不得改变该属性的 "属性描述符对象(value 属性除外)"
*/

/*
  第二类
    get 取值函数 默认为 undefined
    set 存值函数 默认为 undefined
    enumerable 默认为 true 如果设为 false 则 for...in Object.keys() 跳过该属性
    configurable 默认为 true 属性描述对象的可写性
      如果设为 false "锁死"
        阻止某些操作改写改属性, 无法删除该属性, 不得改变该属性的 "属性描述符对象, 其中 value 属性除外"
*/

var obj = {
  p: 'a',
};
/*
  getOwnPropertyDescriptor 方法
    只能用于对象自身的属性
    第一个参数是目标对象
    第二个参数是一个字符串, 对应目标对象的某个属性名
*/
// { value: 'a', writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptor(obj, 'p'));
// 不能用于继承的属性
console.log(Object.getOwnPropertyDescriptor(obj, 'toString')); // undefined

/*
  Object.getOwnPropertyNames() 自身 + 可遍历 + 不可遍历 => 属性名 返回值是数组
*/
var obj = Object.defineProperties(
  {},
  {
    p1: {
      value: 1,
      enumerable: true,
    },
    p2: {
      value: 2,
      enumerable: false,
    },
  }
);
console.log(Object.getOwnPropertyNames(obj)); // [ 'p1', 'p2' ] 自身 + 可遍历 + 不可遍历
console.log(Object.keys(obj)); // [ 'p1' ] 自身 + 可遍历

// 通过属性描述对象, 定义或修改一个属性, 然后返回修改后的对象 Object.defineProperty()
/*
  返回值: 修改后的对象
  第一个参数: 属性所在的对象 Object
  第二个参数: 属性名 string
  第三个参数: 属性描述符对象
*/
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
});
console.log(obj.p); // 123
obj.p = 246; // writable: false
console.log(obj.p); // 123

// 一次性定义或者修改多个属性(的属性描述对象), 使用 Object.defineProperties() 方法
/*
  第一个参数: 目标对象
  第二个参数: 全部属性的属性描述符对象集合(对象里面还有多个对象, 其中每一个对象就是一个"属性描述符对象")
  返回值: 修改后的对象
*/
var obj = Object.defineProperties(
  {},
  {
    p1: {
      value: 123,
      enumerable: true,
    },
    p2: {
      value: 'abc',
      enumerable: true,
    },
    p3: {
      get: function () {
        return this.p1 + this.p2;
      },
      enumerable: true,
      configurable: true,
    },
  }
);
console.log(obj.p1); // 123
console.log(obj.p2); // abc
console.log(obj.p3); // 123abc

// 一旦定义了取值函数(get)或者存值函数(set), 就不能同时定义 value 属性以及 writable 属性, 否则报错
/*
  两套 "属性描述符对象" 的形式
  value writable configurable enumerable
  get set configurable enumerable
*/
var obj = {};
// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
Object.defineProperty(obj, 'p', {
  value: 123,
  get: function () {
    return 456;
  },
});

var obj = {};
// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
Object.defineProperty(obj, 'p', {
  // writable: false,
  writable: true,
  get: function () {
    return 456;
  },
});

/*
  Object.defineProperty() 和
  Object.defineProperties()
  参数里面的属性描述符对象, writable configurable enumerable 这三个属性默认值都是 false
*/
var obj = {};
Object.defineProperty(obj, 'foo', {});
/*
  {
    value: undefined,
    writable: false,
    enumerable: false,
    configurable: false
  }
*/
console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));

var obj = {};
Object.defineProperties(obj, {
  p1: {},
  p2: {},
});
/*
  {
  value: undefined,
  writable: false,
  enumerable: false,
  configurable: false
}
{
  value: undefined,
  writable: false,
  enumerable: false,
  configurable: false
}
*/
console.log(Object.getOwnPropertyDescriptor(obj, 'p1'));
console.log(Object.getOwnPropertyDescriptor(obj, 'p2'));

/*
  元属性, 属性描述对象的各个属性, 控制属性的属性
*/
// 如果原型对象的某个属性的 元属性 writable 的值为 false, 那么子对象将无法自定义这个属性
var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false,
});
var obj = Object.create(proto);
// 子对象不可以对 foo 进行再定义
obj.foo = 'b';
console.log(obj.foo); // 'a'

// 子对象直接通过覆盖属性描述对象, 绕过这个限制, 此时原型链会被忽略
Object.defineProperty(obj, 'foo', {
  value: 'b',
});
console.log(obj.foo); // 'b'

/*
  enumerable 可遍历性
  toString 这一类实例对象继承的原生属性, 都是不可遍历的
  为 false
    for in
    Object.keys
    JSON.stringify
  这三个操作不会取到该属性
  基于此 enumerable 可以用来设置 "秘密" 属性
*/
/*
  {
    value: [Function: toString],
    writable: true,
    enumerable: false,
    configurable: true
  }
*/
console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString'));

var obj = {};
Object.defineProperty(obj, 'x', {
  value: 123,
  enumerable: false,
});
console.log(obj.x); // 123

for (var key in obj) {
  console.log(key); // undefined
}
console.log(Object.keys(obj)); // []
// 利用 JSON.stringify() 方法会排除 enumerable 为 false 的属性, 这一特点, 如果对象的 JSON 格式输出要排除某些属性, 就可以把这些属性的 enumerable 设为 false
console.log(JSON.stringify(obj)); // {}

/*
  configurable 决定了是否可以修改属性描述对象, 属性描述符对象的可配置可修改性
  configurable 为 false 则 value writable enumerable configurable 都不能被修改了 锁死
*/
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false,
});
// TypeError: Cannot redefine property: p
Object.defineProperty(obj, 'p', {
  value: 2,
});
// TypeError: Cannot redefine property: p
Object.defineProperty(obj, 'p', {
  writable: true,
});
// TypeError: Cannot redefine property: p
Object.defineProperty(obj, 'p', {
  enumerable: true,
});
// TypeError: Cannot redefine property: p
Object.defineProperty(obj, 'p', {
  configurable: true,
});
// 权限只能继续收窄 writable: false => true 报错, true => false 允许
var obj = Object.defineProperty({}, 'p', {
  writable: true,
  configurable: false,
});
Object.defineProperty(obj, 'p', {
  writable: false,
});

// 只要 writable 和 configurable 有一个为 true 就允许改动 value 值
/*
  writable || configurable === true 就允许改动 value 值
*/
var o1 = Object.defineProperty({}, 'p', {
  value: 1,
  writable: true,
  configurable: true,
});
console.log(o1.p); // 1
Object.defineProperty(o1, 'p', {
  value: 2,
});
// 修改成功
console.log(o1.p); // 2

var o2 = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  configurable: true,
});
console.log(o2.p); // 1
Object.defineProperty(o2, 'p', {
  value: 2,
});
console.log(o2.p); // 2 writable: false configurable: true 允许修改

var o3 = Object.defineProperty({}, 'p', {
  value: 1,
  writable: true,
  configurable: false,
});
console.log(o3.p); // 1
Object.defineProperty(o3, 'p', {
  value: 2,
});
console.log(o3.p); // 2 writable: true configurable: false 允许修改

// writable 为 false 时, 直接赋值不生效, 严格模式, 报错
// 'use strict'
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  configurable: false,
});
obj.p = 2;
console.log(obj.p); // 1

// configurable 可配置性, 决定了目标属性是否可以被删除 delete
var obj = Object.defineProperties(
  {},
  {
    p1: {
      value: 1,
      configurable: true,
    },
    p2: {
      value: 2,
      configurable: false,
    },
  }
);
delete obj.p1;
delete obj.p2;
console.log(obj.p1); // undefined
console.log(obj.p2); // 2 configurable 为 false 无法被删除

// 存取器 getter 不能接受参数 setter 只能接受一个参数, 即属性的值
/*
  写法一: 原始写法
  configurable enumerable 默认都为 false
*/
var obj = Object.defineProperty({}, 'p', {
  get: function () {
    return 'getter';
  },
  set: function (value) {
    console.log('setter: ' + value);
  },
});
console.log(obj.p); // 'getter'
obj.p = 123; // 'setter: 123'
/*
  {
    get: [Function: get],
    set: [Function: set],
    enumerable: false,
    configurable: false
  }
  enumerable configurable 默认为 false
*/
console.log(Object.getOwnPropertyDescriptor(obj, 'p'));

/*
  写法二: 没有 function
  configurable enumerable 默认为 true 实际开发中更为常用
*/
var obj = {
  get p() {
    return 'getter';
  },
  set p(value) {
    console.log('setter: ' + value);
  },
};
console.log(obj.p);
obj.p = 123;
/*
  {
    get: [Function: get p],
    set: [Function: set p],
    enumerable: true,
    configurable: true
  }
  enumerable configurable 默认为 true, 实际开发中更为常用
*/
console.log(Object.getOwnPropertyDescriptor(obj, 'p'));

// 存取器往往用于, 属性的值依赖对象内部数据的场合
var obj = {
  $n: 5,
  get next() {
    return this.$n++;
  },
  set next(n) {
    if (n >= this.$n) {
      this.$n = n;
    } else {
      throw new Error('新的值必须大于当前值');
    }
  },
};
console.log(obj.next);
obj.next = 10;
console.log(obj.next);
obj.next = 5;

// 对象的拷贝, 通过 Object.defineProperty() 方法来拷贝属性
const extend = function (to, from) {
  for (const property in from) {
    // 跳过继承的属性
    if (!from.hasOwnProperty(property)) {
      continue;
    }
    // 开始拷贝
    Object.defineProperty(
      to,
      property,
      // 拷贝属性的描述符对象, getOwnPropertyDescriptor 读不到继承属性的属性描述对象, 因此需要过滤掉继承的属性
      Object.getOwnPropertyDescriptor(from, property)
    );
  }
  return to;
};
const copy = extend(
  {} /* to */,
  {
    get a() {
      return 1;
    },
  } /*  */
);
console.log(copy); // { a: [Getter] }
