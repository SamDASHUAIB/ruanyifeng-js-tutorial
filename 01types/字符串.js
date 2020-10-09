// JavaScript 使用 Unicode 字符集, 在引擎内部, 所有字符都用 Unicode 表示
// JavaScript 允许直接在程序中使用 Unicode 码点表示字符, 即 \uxxxx 的形式, 其中 xxxx 代表该字符的 Unicode 码点
var s = '\u00A9'
console.log(s); // ©

/*
  每个字符在 JavaScript 内部都是以 16 位(2 个字节)的 UTF-16 格式储存
  也就是说 JavaScript 的单位字符长度固定为 16 位长度, 即 2 个字节
  UTF-16 有两种长度, 2 个字节(u+0000 到 u+FFFF 之间的字符) 4 个字节
  JavaScript 对 UTF-16 的支持不完整, 只支持 2 字节的字符, 不支持四字节的字符
  对于码点在`U+10000`到`U+10FFFF`之间的字符，JavaScript 总是认为它们是两个字符（`length`属性为2）

  Base64 转码, 为了不出现特殊字符, 简化程序的处理
*/
