/*
  事件驱动编程模式:
    通过监听函数对事件做出反应, 事件发生后, 浏览器听到了这个事件, 就会执行对应的监听函数
*/

/*
  三种方法, 可以为事件绑定监听函数
  html 的 on- 属性 冒泡阶段
  元素节点的事件属性
*/
/* html 的 on- 属性 */
{/* <body onload="doSomething()"></body>
<div onclick="console.log('触发事件' ) " ></div> */}

/* 元素节点的事件属性 只会在冒泡阶段触发 同一个事件只能定义一个监听函数, 不推荐使用 */
window.onload = doSomething
div.onclick = function (event) {
  console.log('触发事件');
}

/* EventTarget.addEventListener() */
/* 所有的 DOM 节点实例都有 addEventListener 方法, 用来为该节点定义事件的监听函数 */
/* 推荐使用, 同一个事件可以添加多个监听函数, 能够指定在哪个阶段(捕获 OR 冒泡)触发监听函数 */
/* 整个 JavaScript 统一的监听函数接口 */
window.addEventListener('load', doSomething, false)
