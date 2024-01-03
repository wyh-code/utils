---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 数学计算
order: 6
toc: content
---

# 数学计算相关工具函数

## compute

`根据给定的计算类型和一系列数字执行基本的数学运算。`

<b>原理：</b>该函数首先确定所有传入数字中最大小数位数，随后将所有数字放大到整数进行计算，以避免浮点数计算的精度问题。最后将结果缩小回正确的小数位数。

<b>`注意：该函数并未处理除数为0的情况，若进行除法时遇到除数为0，将会返回Infinity或NaN。`</b>

使用示例:

```js
/**
 * @param type - 计算类型，可以是加法("+")、减法("-")、乘法("*")或除法("/")。
 * @param args - 要进行计算的数字序列。
 * @returns 返回一个包含计算结果的对象。该对象还包含一个next方法，可以用于链式调用进一步的计算。
 *
 * next方法允许进行链式计算:
 * compute("+", 0.1, 0.2).next("*", 10) 返回 { result: 3, next: [Function] }
 */

import { compute } from '@ostore/utils';

compute('+', 0.1, 0.2); // { result: 0.3, next: [Function] }
compute('-', 5, 3); // { result: 2, next: [Function] }
compute('*', 3, 4); // { result: 12, next: [Function] }
compute('/', 10, 2); // { result: 5, next: [Function] }
```
