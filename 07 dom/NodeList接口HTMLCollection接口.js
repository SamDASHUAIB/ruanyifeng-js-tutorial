/* 需要一种数据结构, 能够容纳多个节点, DOM 提供两种节点集合, NodeList 和 HTMLCollection */
/* NodeList 可以包含各种类型的节点, HTMLCollection 只能包含 HTML 节点 */

/* NodeList 实例是一个类似数组的对象, 有 length 属性 */
Node.childNodes
document.querySelectorAll()
/* NodeList 实例不是数组, 但是具有 length 属性和 forEach 方法, 但不可以使用 push pop 等数组方法 */
var children = document.body.childNodes
Array.isArray(children) // false
children.length
children.forEach(console.log)
// NodeList => Array
var children = document.body.childNodes
var nodeArr = Array.from(children)
instanceof nodeArr // Array

/*
  只有 Node.childNodes 返回的是一个动态集合, 其他的 NodeList 都是静态集合
*/


