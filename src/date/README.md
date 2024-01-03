---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 时间
order: 2
toc: content
---

## isDate

`函数用于检查传入的参数是否为日期对象或能转换为日期对象的字符串。如果是，则返回相应的Date对象；如果不是，或者参数未提供，则默认返回当前日期的Date对象。`

调用 isDate 函数时可以传入一个可选参数，该参数可以是一个 Date 对象或能表示日期的字符串。根据传入参数的不同，函数将返回相应的 Date 对象。

<b>注意事项：</b>

- 如果传入的字符串中包含的日期分隔符既不是破折号-也不是斜杠/，函数将无法正确解析日期，会返回当前日期的 Date 对象。
- 当从字符串解析日期时，如果字符串不包含完整的日期信息（比如只有年份和月份），函数也会返回当前日期的 Date 对象。
- 在 JavaScript 中，Date 对象的月份是从 0 开始计数的，即 0 代表一月，1 代表二月，以此类推，因此在解析月份时需要减去 1。

使用示例：

```js
/**
 * 函数用于检查传入的参数是否为日期对象或能转换为日期对象的字符串
 * 如果是，则返回相应的Date对象；如果不是，或者参数未提供，则默认返回当前日期的Date对象。
 * @param date?: string | Date (可选) 可选参数，可以是下面两种之一：
 * Date对象：直接返回这个Date对象。
 * 字符串：应符合YYYY-MM-DD或MM/DD/YYYY格式，将被解析为Date对象。
 * 如果未提供参数或提供的字符串不符合格式要求，则函数返回当前日期的Date对象。
 * @returns 返回一个Date对象，可以是基于传入参数解析的日期，或者当前日期。
 */

import { isDate } from '@ostore/utils';

console.log(isDate()); // 输出: 当前日期的Date对象
console.log(isDate(new Date(2021, 3, 15))); // 输出: 2021年4月15日的Date对象
console.log(isDate('2021-04-15')); // 输出: 2021年4月15日的Date对象
console.log(isDate('2021/04/15')); // 输出: 2021年4月15日的Date对象
```

## isLeapYear

`函数用于判断给定的年份是否为闰年。`

调用 isLeapYear 函数时传入一个年份，可以是数字或字符串形式。函数将返回一个布尔值，true 表示该年份为闰年，false 表示非闰年。

闰年定义为满足以下条件之一的年份：

- 能被 4 整除但不能被 100 整除的年份。
- 能被 400 整除的年份。

<b>注意事项：</b>

- 输入的年份应为标准公历年份，函数不对输入的值进行范围检查。
- 如果传入的字符串不能被解析为有效的整数，则 parseInt 可能返回 NaN，这样的情况下函数将返回 false。
- 为了避免隐式类型转换的问题，函数内部使用了严格相等（===）和严格不等（!==）运算符。

使用示例：

```js
/**
 * 判断是否为闰年
 * @param year: number | string 年份，可以是一个整数或整数形式的字符串。
 * @returns 布尔值（boolean），true表示是闰年，false表示不是闰年。
 */
import { isLeapYear } from '@ostore/utils';

console.log(isLeapYear(2020)); // 输出: true
console.log(isLeapYear('2000')); // 输出: true
console.log(isLeapYear(1900)); // 输出: false
console.log(isLeapYear('1999')); // 输出: false
```

## getDaysOfMonth

`函数用于获取传入日期所在月份的天数。`

当传入的年份是闰年时，二月份的天数为 29，否则为 28 天。其它月份的天数按照正常的公历月份天数计算。

调用 getDaysOfMonth 函数时传入一个包含年份（year）和月份（month）的对象。月份的值应该是 0 到 11 的整数，其中 0 代表一月，11 代表十二月。函数将返回一个数字，代表指定月份的天数。

<b>注意事项：</b>

- 确保传入的 month 值是正确的，即 0 代表一月，1 代表二月，以此类推。
- 如果 month 传入的值超出了 0 到 11 的范围，函数可能会返回 undefined，因为该值超出了天数数组的索引范围。

使用示例：

```js
/**
 * 获取传入时间的当月天数
 * @param d: DateInfo DateInfo是一个接口，定义如下：
 *  interface DateInfo {
 *    year: number;  // 年份，为四位数的整数
 *    month: number; // 月份，为0到11的整数，其中0代表一月，11代表十二月
 *  }
 * @returns  数字（number），表示传入的日期所在月份的天数。
 */

import { getDaysOfMonth } from '@ostore/utils';
console.log(getDaysOfMonth({ year: 2020, month: 1 })); // 输出: 29 (2020年2月)
console.log(getDaysOfMonth({ year: 2021, month: 1 })); // 输出: 28 (2021年2月)
console.log(getDaysOfMonth({ year: 2021, month: 0 })); // 输出: 31 (2021年1月)
```

## getBeginDayOfMonth

`用于获取指定年月的第一天是星期几。`

该函数接收一个包含年份和月份的对象作为参数，并返回一个数字，表示对应月份的第一天是星期几。

<b>注意事项</b>

- 在使用该函数时请注意，月份参数是从 0 开始计数的，即 0 表示一月，1 表示二月，依此类推，直到 11 表示十二月。
- 函数返回的是一个数字索引，客户端在显示时可能需要将其转换为更易懂的星期文本，例如将 0 转换为 "星期日"。
- 该函数仅用于计算月份开始的星期几，不应用于其他日期计算场景。

使用示例

```js
/**
 * 用于获取指定年月的第一天是星期几。
 * @param d: DateInfo：一个 DateInfo 类型的对象，其中包含两个属性：
 * year: number：年份，为四位数的数字。
 * month: number：月份，为一个从 0 开始的数字，其中 0 表示一月，11 表示十二月。
 * @returns 一个数字，范围从 0（星期日）到 6（星期六），表示指定月份的第一天是星期几。
 */
import { getBeginDayOfMonth, DateInfo } from '@ostore/utils';

// 定义输入的日期信息
const dateInfo: DateInfo = { year: 2023, month: 3 }; // 2023年4月，注意month是从0开始的

// 调用函数获取给定月份第一天是星期几
const beginDay: number = getBeginDayOfMonth(dateInfo);

// 输出结果，可能是0-6的数字，分别代表星期日到星期六
console.log(beginDay);
```

## getMonthInfo

`用于获取传入时间对应月份的显示信息，包括年份、月份、该月的总天数以及该月第一天是星期几。`

调用 getDisplayInfo 函数时可以传入一个可选参数，该参数可以是一个日期字符串或 Date 对象。如果未提供参数，则函数使用当前日期。函数返回一个对象，包含年份、月份索引（从 0 开始）、该月的总天数和该月第一天所在的星期几。

<b>注意事项：</b>

- 月份索引从 0 开始计数，即 0 表示一月，11 表示十二月。这与 JavaScript 中 Date 对象的处理方式相同。
- beginWeek 返回值遵循 JavaScript Date 对象的星期值规则，其中 0 表示星期日，6 表示星期六。

使用示例

```js
/**
 * 用于获取传入时间对应月份的显示信息，包括年份、月份、该月的总天数以及该月第一天是星期几。
 * @param time?: string | Date (可选) 可选参数，可以是以下两种之一：
 * 日期字符串：应符合YYYY-MM-DD格式的字符串，将被转换为Date对象。
 * Date对象：一个标准的JavaScript日期对象。如果未提供参数，则函数使用当前日期。
 * @returns 返回一个对象，包含以下属性：
 * year: 数字（number），表示年份。
 * month: 数字（number），表示月份的索引，从0开始，其中0代表一月，11代表十二月。
 * days: 数字（number），表示传入时间所在月份的总天数。
 * beginWeek: 数字（number），表示该月第一天是星期几，从0（星期日）到6（星期六）的一个整数。
 */

import { getMonthInfo } from '@ostore/utils';
console.log(getMonthInfo('2021-03-15'));
// 应输出：{ year: 2021, month: 2, days: 31, beginWeek: 1 }
// 注释：月份为2表示3月，因为月份索引从0开始计数，beginWeek为1表示3月1日是星期一。
```

## getMonthDays

`函数用于计算并返回包含特定月份所有天数的数组，每个元素包含年、月、日和时间戳信息。`

此函数特别适用于生成日历视图时，需要显示整个月份并包括上个月的最后几天和下个月的开始几天。

<b>注意事项：</b>

- 返回的日期数组包含了整个月份加上前后多余的日期，以填充完整的日历网格。

使用示例：

```js
import { getMonthDays, DayInfo } from '@ostore/utils';

// 假定当前日期
const date = new Date();
// 调用函数获取日期信息数组
const daysArray: DayInfo[] = getMonthDays(date);
// 输出结果
console.log(daysArray);
```
