---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 格式化
order: 5
toc: content
---

## numberWithCommas

`用于将数字转换为格式化的字符串，使其每三位数由逗号分隔。`

该函数支持处理包含小数点的数字，对小数部分不进行分隔。该函数可以接受数字类型或数字格式的字符串作为输入。

<b>注意事项：</b>

- 如果函数接收的是一个非法格式的字符串（即不是有效的数字表示），它可能无法按预期工作，并可能返回原始输入字符串或异常结果。
- 该函数也适用于负数和非常大的数字。
- 函数不会改变小数部分。

使用示例：

```js
/**
 * 数字千分位分割
 * @param x: number | string  一个数字或者是一个表示数字的字符串。
 * @returns 返回一个字符串，其中输入数字的每三位数由逗号分隔。
 */

import { numberWithCommas } from '@ostore/utils';

console.log(numberWithCommas(1234567.89)); // 输出: "1,234,567.890"
console.log(numberWithCommas(1234567)); // 输出: "1,234,567"
console.log(numberWithCommas('1234567')); // 输出: "1,234,567"
```

## formatBankCardNumber

`用于格式化银行卡号，使其更易于阅读。`

该函数会移除任何非数字字符，包括空格、破折号等，只保留和格式化数字部分。并将银行卡号中的数字每四位添加一个空格进行分隔。

<b>注意事项：</b>

- 如果输入包含字母或特殊字符，这些非数字字符将被移除，并不会出现在输出中。
- 函数旨在处理标准长度的银行卡号（通常为 16 位），但也可以处理非标准长度的数字串。
- 如果银行卡号已经部分或完全格式化，该函数仍然能够正确处理，并返回统一格式的结果。
- 最后一组数字可能包含少于四位数字，取决于银行卡号的总长度。

使用示例：

```js
/**
 * 用于格式化银行卡号，使其更易于阅读。
 * @param cardNumber: string  银行卡号字符串，可以包含数字和（可选的）分隔符如破折号或空格。
 * @returns 格式化后的银行卡号字符串，每四位数字之间由一个空格分隔。
 */
import { formatBankCardNumber } from '@ostore/utils';
console.log(formatBankCardNumber('1234567890123456')); // 输出: "1234 5678 9012 3456"
console.log(formatBankCardNumber('1234-5678-9012-3456')); // 输出: "1234 5678 9012 3456"
console.log(formatBankCardNumber('1234 5678 9012 3456')); // 输出: "1234 5678 9012 3456"
```
