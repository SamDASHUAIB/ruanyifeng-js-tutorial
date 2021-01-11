/*
  Promise 是 JavaScript 的异步操作解决方案, 为异步操作提供统一接口
  避免了回调地狱, 使得异步操作具有同步操作的接口(像写同步代码一样写异步代码)
*/
/*
  Promise 的设计思想是: 所有的异步任务都返回一个 Promise 实例, Promise 实例有一个 then 方法, 用来指定下一步的回调函数
  多层嵌套 => 链式操作
  改善可读性, 可维护性

  Promise 对象的状态
    pending 异步操作未完成
    fulfilled 异步操作成功
    rejected 异步操作失败
    pending => resolved 未完成到成功 传回一个 value
    pending => rejected 未完成到失败 传回一个 error

    一旦状态发生改变, 凝固, 不会再有新的状态变化(Promise 实例的状态变化只能发生一次)
    一次性, 凝固, 不会再改变
*/

/*
  Promise 构造函数, 构造 Promise 的实例对象
*/
var promise = new Promise((resolve, reject) => {
  if (true) {
    resolve(value); /* 异步操作成功, 将结果作为 resolve 函数的参数传递出去 */
  } else {
    reject(
      new Error()
    ); /* 异步操作失败, 将异步操作报出的错误, 作为参数传递出去 */
  }
});

// Promise.prototype.then() 添加回调函数(两个)
var p1 = new Promise((resolve, reject) => {
  resolve('成功');
});
p1.then(console.log, console.error);

var p2 = new Promise((resolve, reject) => {
  reject(new Error('失败!'));
});
p2.then(console.log, console.error);

/*
  Promise 对象的报错具有传递性
*/

// 写法一
f1().then(function () {
  return f2();
});

// 写法二
f1().then(function () {
  f2();
  return;
});

// 写法三
f1().then(f2());

// 写法四
f1().then(f2);

// 解析
// 写法一
f1()
  .then(function () {
    return f2();
  })
  .then(f3); // f3 的回调函数的参数是 f2() 函数的运行结果

// 写法二
f1()
  .then(function () {
    f2();
    return; // undefined
  })
  .then(f3); // f3 的回调函数的参数是 undefined

// 写法三 f2() 的返回值是一个函数
f1().then(f2()).then(f3); // f3 的回调函数的参数是 f2 函数返回的函数的(f2 函数的返回值是一个函数, 这个函数的运行结果传递给了 f3, 相当于执行了两个函数 f2()())运行结果

// 写法四

f1().then(f2).then(f3); // 和写法一只有一个差别, 就是 f2 会接收到 f1() 返回的结果

/*
  Promise 的优点:
  回调地狱 => 链式调用, 程序流程可以看得很清楚
  状态一旦改变, 无论何时查询, 都能得到这个状态 "凝固",
    这意味着, 无论何时为 Promise 实例添加回调函数, 该函数都能正确执行
    不用担心是否错过了某个事件或信号
    如果是传统写法, 通过监听事件来执行回调函数, 一旦错过了事件, 再添加回调函数是不会执行的

  Promise 的缺点:
  代码的可阅读性较差, 不能一眼看出功能, 一堆 then, 自己必须在 then 的回调函数里面理清逻辑
*/

/*
  Promise 的回调函数属于异步任务, 会在同步任务之后执行
  属于 "微任务"
  正常的异步任务追加到下一轮事件循环, "微任务" 追加到本轮事件循环
  这意味着, "微任务" 的执行时间一定早于正常的异步任务任务
*/
setTimeout(() => {
  console.log(1);
}, 0);

new Promise(function (resolve, reject) {
  resolve(2);
}).then(console.log);

console.log(3);
/*
  3 同步任务最先输出
  2 Promise 的回调函数不是正常的异步任务而是微任务, 在本轮事件循环的末尾执行, 但是早于正常的异步任务
  1 setTimeout 作为正常的异步任务, 被添加到下一轮事件循环, 晚于微任务

  then 是在本轮事件循环执行(末), setTimeout(fn, 0) 在下一轮事件循环开始时执行
*/
