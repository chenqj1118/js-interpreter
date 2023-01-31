'use strict';
const { sandboxRunScript } = require('../src/index');

const str1 = sandboxRunScript(`
  var xx = "zhangsan";
  var yy = "zhangsan's name is " + xx;
  log.log(111, yy);`); // 不支持${}写法

console.log(222, str1); // 不支持return, 可以使用 setValue, getValue 代替

sandboxRunScript(`
  var xx = [1, 2, 3];
  log.log(333, xx.some(function(item){return item === 3}))`
) // 支持[].some & [].map

sandboxRunScript('88 === 88 ? "11" : "22"')
