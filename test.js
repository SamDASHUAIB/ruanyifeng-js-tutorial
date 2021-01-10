// var n = 123;
/*
  在 node 环境中需要显式将全局变量挂载到 globalThis 中
  不像浏览器环境中, 未在函数中使用 var 声明的变量直接就是全局变量
*/
globalThis.n = 123
var obj = {
  n: 456,
};
function a() {
  console.log(this.n);
}
a.call();
a.call(null);
a.call(undefined);
a.call(obj);
