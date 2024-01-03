---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: DOM
order: 7
toc: content
---

# DOM 相关工具函数

## getParentNode

`根据给定的类名递归地向上查找并返回一个DOM元素的父节点。`

`getParentNode`函数接收两个参数：一个`HTMLElement`对象`dom`和一个字符串`classname`。函数从`dom`开始向上遍历 DOM 树，寻找具有指定类名的父节点。如果当前节点的父节点拥有该类名，则返回该父节点；如果没有，则继续向上递归在祖先节点中查找。

<b>注意事项：</b>

- 如果`dom`是`null`或者`classname`为空字符串，函数会直接返回 undefined。
- 如果`dom`是最顶层节点或者没有任何父节点具有指定的类名，则函数最终返回 undefined。
- 此函数不会修改传入的 DOM 元素。

使用示例：

```js
/**
 * @param dom - 待查找的初始DOM元素。
 * @param classname - 用于匹配父节点的类名。
 * @returns 如果找到具有指定类名的父节点，则返回该节点；如果未找到或参数无效，则返回undefined。
 */

import { getParentNode } from '@ostore/utils';

// 假设HTML结构如下：
// <div class="ancestor">
//   <div class="parent">
//     <div class="child"></div>
//   </div>
// </div>
const childNode = document.querySelector('.child');
const parentWithClass = getParentNode(childNode, 'ancestor');

if (parentWithClass) {
  console.log('找到具有指定类的父节点:', parentWithClass);
} else {
  console.log('未找到具有指定类的父节点');
}
```

## requestFullscreen

`请求使指定元素进入全屏模式。`

`requestFullscreen`函数接受一个字符串参数`id`，它是待全屏元素的 ID。函数尝试获取该元素并请求将其切换到全屏模式。为了确保跨浏览器兼容性，函数检查并调用了元素的多个全屏 API 方法，包括标准的`requestFullscreen`方法及各个浏览器厂商的前缀版本。

<b>注意事项：</b>

- 全屏请求通常必须由用户的一些形式的交互来触发，如点击事件，否则可能不会生效。
- 不同浏览器的全屏 API 方法可能略有不同，本函数尽可能兼容了主流浏览器的不同版本。
- 如果元素不存在或者浏览器阻止了全屏操作，该函数将不会执行任何操作。
- 在某些情况下，比如 iframe 内部的元素请求全屏，还需要考虑额外的因素，如 iframe 的`allowfullscreen`属性。

使用示例：

```js
/**
 * @param id - 要全屏显示的DOM元素的ID。
 */

import { requestFullscreen } from '@ostore/utils';

// 请求ID为'myVideo'的视频元素进入全屏模式
requestFullscreen('myVideo');
```

## exitFullscreen

`退出全屏模式。`

此函数尝试退出当前全屏模式，如果有的话。它检查并调用了多个浏览器特定的方法来退出全屏，包括标准的`exitFullscreen`方法以及各个浏览器提供的带前缀的版本。

<b>注意事项：</b>

- 退出全屏操作通常不需要由用户的直接交互来触发。
- 兼容性考虑是必要的，因为不同的浏览器可能需要使用不同的方法来退出全屏。
- 在某些情况下，如果文档不在全屏模式，调用退出全屏的方法可能不会产生任何效果。
- 此函数不会返回任何值或提供回调函数来表明操作是否成功。

使用示例：

```js
import { exitFullScreen } from '@ostore/utils';

// 当用户点击退出全屏按钮时调用
button.addEventListener('click', () => {
  exitFullScreen();
});
```
