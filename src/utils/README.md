---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 其他工具
order: 999
toc: content
---

# 其他工具函数

## copy

`将指定的文本复制到剪贴板。`

`copy`函数接收一个字符串`text`和一个可选的回调函数`callback`。当调用该函数时，它会尝试将`text`复制到用户的剪贴板。如果提供了`callback`函数，根据复制操作的成功与否，会传入一个包含状态的对象。

<b>原理：</b>创建一个文本输入元素（`input`）并设置其为只读，以防止用户修改。将要复制的文本赋值到该`input`元素的`value`属性。将该`input`元素添加到文档的`body`中，并选择其内容。使用`document.execCommand('Copy')`尝试执行复制操作。根据复制操作的结果，调用回调函数并传入结果对象。最后，从`body`中移除`input`元素。

<b>注意事项：</b>

- 由于浏览器的安全性限制，`document.execCommand`可能在某些情境下不可用，比如非用户交互的异步调用中。
- 该函数可能不在所有浏览器中都有效，特别是`document.execCommand('Copy')`方法在一些现代浏览器中已被废弃，取而代之的是新的剪贴板 API。

使用示例：

```js
/**
 * @param text - 要复制到剪贴板的文本内容。
 * @param callback - 可选的回调函数，当复制操作完成时被调用，带有一个结果对象。
 *
 * 结果对象包含以下属性：
 * - `status`：一个布尔值，表示复制操作是否成功。
 * - `message`：一个字符串，仅当复制失败时包含错误信息。
 */

import { copy } from '@ostore/utils';

copy('要复制的文本内容', (result) => {
  if (result.status) {
    console.log('文本复制成功！');
  } else {
    console.error('文本复制失败：', result.message);
  }
});
```

## copyAsync

`以异步方式将指定的文本复制到剪贴板。`

<b>原理：</b>`copyAsync`函数创建一个`input`元素，并将其添加到文档中，然后使用`document.execCommand('Copy')`命令尝试复制文本。操作完成后，无论成功与否，`input`元素都会从文档中移除。成功时，返回的对象中的`status`属性为`true`；如果复制操作失败，会捕获错误，并通过 Promise 的拒绝（`reject`）返回一个对象，该对象的`status`属性为`false`，并且包含了一个`message`属性描述了错误信息。

<b>注意事项：</b>

- 由于浏览器的安全性限制，`document.execCommand`可能在某些情况下不可用，例如在非用户交互的异步调用中。
- 该函数可能不在所有浏览器中都有效，特别是`document.execCommand('Copy')`方法在一些现代的浏览器中已被废弃，取而代之的是新的剪贴板 API。
- 如果文本参数为空或未定义，Promise 将不会进行任何操作，即不会被解析也不会被拒绝。

使用示例：

```js
/**
 * @param text - 要复制到剪贴板的文本内容。
 * @returns 返回一个Promise对象。如果复制成功，Promise将被解析为包含成功状态的对象；
 *          如果复制失败，Promise将被拒绝，并返回包含失败状态和错误信息的对象。
 */

import { copyAsync } from '@ostore/utils';

copyAsync('要复制的文本内容')
  .then((result) => {
    console.log('文本复制成功！', result);
  })
  .catch((error) => {
    console.error('文本复制失败：', error.message);
  });
```

## uniqueByKey

`根据指定的键对对象数组进行去重。`

`uniqueByKey`函数接受一个对象数组`arr`和一个字符串`key`，返回一个新数组。其中每个对象在指定键`key`上具有唯一的值。如果存在重复的键值，仅第一个遇到的对象会被包含在返回的数组中。

<b>原理：</b>函数通过创建一个`hash`对象来跟踪已经添加到结果数组中的键值，从而实现去重。这个过程使用`reduce`方法迭代数组，检查每个对象的`key`值是否已被记录在`hash`中，如果没有，则将其添加到结果数组中，并将其键值记录在`hash`对象中。

<b>注意事项：</b>

- 输入数组应包含对象，其中每个对象都应至少包含作为去重依据的指定键。
- 如果对象的键值为`undefined`或者在对象中不存在该键，那么这个对象将不会被包含在返回的数组中。
- 函数不会修改原始数组，而是返回一个新数组。

使用示例：

```js
/**
 * @param arr - 包含对象的数组。
 * @param key - 用作唯一性检查的键名。
 * @returns 返回一个新的数组，其中包含具有唯一键值的对象。
 */

import { uniqueByKey } from '@ostore/utils';

// 一个包含重复键值的数组
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Charlie' },
];
// 去重后的数组
const uniqueItems = uniqueByKey(items, 'id');
console.log(uniqueItems);
// 输出: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```

## hasNullValue

`检查给定对象中是否包含空字符串或null值。`

`hasNullValue`函数接受一个对象`obj`作为参数，遍历该对象的所有属性值。如果任何一个属性值等于空字符串(`''`)或者 null，那么函数将返回 true，表示对象中至少存在一个这样的值。如果所有属性值都不为空字符串且不为 null，那么函数将返回 false。

<b>注意事项：</b>

- 该函数仅检查对象的直接属性值，并不会递归检查嵌套对象。
- 仅检查属性值为`null`或空字符串的情况，未定义的属性（`undefined`）或其他“假值”不会被认定为 null 值。
- 函数不会改变传入的对象，它是纯函数。

使用示例：

```js
/**
 * @param obj - 待检查的对象。
 * @returns 返回一个布尔值，如果对象中至少有一个属性值为空字符串或null，则为true，否则为false。
 */

import { hasNullValue } from '@ostore/utils';
// 一个包含空值的对象
const data = {
  name: 'Alice',
  age: null,
  email: 'alice@example.com',
};
// 检查对象中是否含有空字符串或null值
const containsNull = hasNullValue(data);
console.log(containsNull); // 输出：true
```

## hasNotNullValue

`检查给定对象中是否至少包含一个非空（非null、非空字符串、非undefined）的值。`

`hasNotNullValue`函数接受一个对象`obj`作为参数，遍历该对象的所有属性值。如果任何一个属性值不是空字符串(`''`)、不是 null 且不是 undefined，则函数返回 true，表示对象中至少存在一个非空的值。如果所有属性值都为空字符串、null 或者 undefined，则函数返回 false。

<b>注意事项：</b>

- 该函数仅检查对象的直接属性值，并不会递归检查嵌套对象。
- 函数不会改变传入的对象，它是纯函数。

使用示例：

```js
import { hasNullValue } from '@ostore/utils';
// 一个对象，其中一些属性可能包含空值
const data = {
  name: '', // 空字符串
  age: 25, // 非空值
  email: undefined, // 未定义
};

// 检查对象中是否至少有一个非空值
const containsValue = hasNotNullValue(data);
console.log(containsValue); // 输出：true
```

## getDataType

`获取给定值的精确数据类型。`

`getDataType`函数接受一个参数`obj`，并返回一个字符串表示其数据类型。它利用`Object.prototype.toString`方法获取到`obj`的内部`[[Class]]`属性，以此来判断`obj`实际的数据类型，然后将结果转换为小写字符串。支持的数据类型包括："array"、"object"、"number"、"string"、"null"、"undefined"、"function"、"date"、"regexp"。如果`obj`的类型不是这些中的一个，则返回 null。

<b>注意事项：</b>

- 传入的`obj`可以是任何类型。
- 如果传入的是非原始对象（如 Map、Set 等非直接支持的类型），则函数返回 null。
- 函数为纯函数，不改变输入的值。

使用示例：

```js
/**
 * @param obj - 任意值，用于确定其数据类型。
 * @returns 返回一个字符串，表示`obj`的数据类型，或者如果无法确定数据类型，则为null。
 */

import { getDataType } from '@ostore/utils';

console.log(getDataType([])); // "array"
console.log(getDataType({})); // "object"
console.log(getDataType(123)); // "number"
console.log(getDataType('abc')); // "string"
console.log(getDataType(null)); // "null"
console.log(getDataType(undefined)); // "undefined"
console.log(getDataType(() => {})); // "function"
console.log(getDataType(new Date())); // "date"
console.log(getDataType(/abc/)); // "regexp"
console.log(getDataType(new Map())); // null (不是直接支持的类型)
```

## debounce

`创建一个`debounced`函数，该函数将延迟调用`func`直到过了`wait`毫秒数之后再调用。如果设置了`immediate`为true，`func`将在延迟开始前被调用。`

`debounce`函数有助于限制函数执行的频率。防抖动函数会在调用动作停止一段时间后才执行，这通常用于处理频繁的事件触发场合，如窗口大小调整、文本输入、滚动等。

<b>注意事项：</b>

- `debounce`函数返回的函数不具备取消防抖动的直接方法，如果需要取消，可以手动清除定时器。
- `immediate`参数允许在延迟等待之前立即调用函数。注意，这样做会导致函数在每次等待时间的开始时调用，而不是结束时调用。
- 返回的防抖动函数的`this`上下文与原函数`func`的`this`上下文保持一致，同时也继承了原函数的参数。

使用示例：

```js
/**
 * @param func - 要防抖动的函数。
 * @param wait - 在执行调用之前要等待的毫秒数。
 * @param immediate - 是否在延迟开始前立即调用该函数。
 * @returns 返回一个新的防抖动函数。
 */

import { debounce } from '@ostore/utils';

// 创建一个防抖动函数，延迟500毫秒后调用
const debouncedResize = debounce(() => {
  console.log('窗口大小改变事件处理');
}, 500);

// 在窗口大小调整时调用防抖动函数
window.addEventListener('resize', debouncedResize);
```

## throttled

`创建一个`throttled`函数，该函数最多每隔`limit`毫秒调用一次`func`函数。`

`throttle`函数有助于限制函数的调用频率。节流函数在被调用后，会暂时禁止再次调用，直到经过了设定的时间间隔`limit`。这通常用于处理连续的事件触发场合，如滚动、窗口大小调整、鼠标移动等。不同于`debounce`函数，`throttle`将确保在指定的时间间隔内至少执行一次函数。

<b>注意事项：</b>

- 调用`throttle`函数返回的函数时，它的`this`上下文与原函数`func`的`this`上下文保持一致，同时也继承了原函数的参数。
- 如果需要取消节流，可以通过清除`lastFunc`定时器来实现。

使用示例：

```js
/**
 * @param func - 要节流的函数。
 * @param limit - 调用之间的最小时间间隔（毫秒）。
 * @returns 返回一个新的节流函数。
 */

import { throttle } from '@ostore/utils';

// 创建一个节流函数，每隔100毫秒最多调用一次
const throttledScroll = throttle(() => {
  console.log('滚动事件处理');
}, 100);

// 在窗口滚动时调用节流函数
window.addEventListener('scroll', throttledScroll);
```
