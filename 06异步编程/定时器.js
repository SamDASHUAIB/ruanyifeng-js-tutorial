// 向任务队列添加定时任务, 也就是添加异步任务
/*
  指定某段代码, 某个函数, 在多少毫秒之后执行
  第一个参数: 将要推迟执行的函数名, 或者一段代码(箭头函数等)
  第二个参数: 推迟执行的毫秒数
  更多的参数: 依次传入推迟执行的函数中
  返回值: 一个整数, 表示定时器的编号(根据此编号可以取消定时器)
*/
setTimeout(() => {}, timeout)

setInterval(() => {}, interval)

/*
  如果回调函数是对象的方法, 那么 setTimeout 使得方法内部的 this 关键字指向全局环境
  而不是定义时所在的那个对象
*/
var x = 1

var obj = {
  x: 2,
  y: function () {
    console.log(this.x)
  },
}
// 由于 obj.y 在 1000 毫秒后执行, this 所指向的已经不是 obj 而是全局环境了
setTimeout(obj.y, 1000) // 1 this 指向 window 而非 obj
// 解决方案一: 将 obj.y 放入一个函数

setTimeout(function()  {
  obj.y()
}, 1000); // 2

// 解决方案二: 使用 bind 方法(返回一个新的函数(绑定了 this 的指向)), 将 obj.y 绑定在 obj 上面
setTimeout(obj.y.bind(obj), 1000) // 2

// setInterval 与 setTimeout 的用法完全一致, 区别仅仅在于 setInterval 指定某个任务每隔一段时间就执行一次, 无限次执行
var i = 1
var timer = setInterval(() => {
  console.log(2)
}, 1000)

// setInterval 常用于实现轮询
var hash = window.location.hash
var hashWatcher = setInterval(() => {
  if (window.location.hash != hash) {
    updatePage()
  }
}, 1000)
/*
  setInterval 指的是 "开始执行" 之间的间隔
  setInterval 不考虑每次任务执行本身所消耗的时间, 因此, 实际上, 两次执行之间的间隔会小于指定的时间
  为了确保两次执行之间有固定的间隔, 使用 setTimeout (递归调用自身)
*/
var i = 1
var timer = setTimeout(function f() {
  // ... 代码
  // 不断递归调用自身实现 setInterval 的效果
  timer = setTimeout(f, 2000)
}, 2000)

/**
 * setTimeout 以及 setInterval函数, 都返回一个整数值, 表示计数器编号
 * clearTimeout 以及 clearInterval 函数传入计数器编号后, 就可以取消对应的定时器
 */
var id1 = setTimeout(f, 1000);
var id2 = setInterval(f, 1000);
clearInterval(id1)
clearInterval(id2)

/*
  setTimeout 以及 setInterval 返回的整数是连续的, 第二个 setTimeout 方法返回的整数值, 将比第一个整数值大 1
*/
(function() {
  // 每轮事件循环检查一次
  var gid = setInterval(clearAllTimeouts, 0);
  // console.log(gid);
  function clearAllTimeouts() {
      // 得到最大的定时器的序号 id
    var id = setTimeout(function() {}, 0);
    while (id > 0) {
      if (id !== gid) {
        clearTimeout(id);
      }
      id--;
    }
  }
})();

/*
  实例: debounce 函数
  设置一个门槛值, 表示两次 Ajax 通信的最小间隔时间
  在间隔时间内, 发生新的 keydown 事件, 不触发 Ajax 请求
  如果过了指定时间, 没有发生新的 keydown 事件, 再将数据发送出去
*/
$('textarea').on('keydown', debounce(ajaxAction, 2500))
function debounce(fn ,delay) {
  var timer = null // 声明计时器
  return function () {
    var context = this,
    var args = arguments
    // 清除上一次的定时器
    clearTimeout(timer)
    // 用户每次点击都将新建一个定时器
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay);
  }
}

/*
  setTimeout 和 setInterval 的运行机制
  将指定的代码移出本轮事件循环, 等到下一轮事件循环, 再检查是否到了指定事件
  setTimeout 和 setInterval 指定的回调函数, 必须等到本轮事件循环的所有同步任务都执行完, 才会开始执行
*/

/*
  setTimeout(f, 0) 会在下一轮事件循环一开始就执行
  目的是, 尽可能早地执行 f 但是并不能保证立刻就执行 f
  可以调整事件的发生顺序,
*/
<input type="button" id="myButton" value="click" />
var input = document.getElementById('myButton')
input.onclick = function A() {
  // 将函数 B 推迟到下一轮事件循环中执行
  setTimeout(function B() {
    input.value += ' input'
  }, 0);
}
// 先触发函数 C
document.body.onclick = function C() {
  input.value += ' body'
}
