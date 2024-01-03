---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 路由
order: 1
toc: content
---

# 路由相关工具函数

## getUrlParams

`从当前页面的URL中提取查询参数。`

<b>原理：</b>`getUrlParams`函数创建一个`URL`对象，该对象表示当前页面的 URL。它使用`URL.search`属性获取查询字符串，并使用`URLSearchParams`将查询字符串解析为一个迭代器。迭代器使用`Object.fromEntries`转换为一个对象，该对象包含所有的查询参数。如果调用时传入了`key`参数，则返回该键名对应的查询参数值；如果没有传入`key`参数，则返回包含所有查询参数的对象。

<b>注意事项:</b>

- 如果查询参数不存在，返回`undefined`。
- 如果没有提供`key`且当前 URL 没有查询参数，返回的对象将为空。

使用示例:

```js
/**
 * @param key - 可选参数。指定要获取的查询参数的键名。
 * @returns 如果提供了`key`参数，则返回与该键名对应的查询参数值。
 *          如果没有提供`key`，则返回一个包含所有查询参数的对象，对象的键为参数名称，值为参数值。
 */

import { getUrlParams } from '@ostore/utils';

// 假设当前URL为: https://example.com/page?user=alice&token=123
// 获取名为"user"的查询参数值
const userParam = getUrlParams('user');
console.log(userParam); // 输出 "alice"

// 获取所有查询参数
const allParams = getUrlParams();
console.log(allParams); // 输出 { user: "alice", token: "123" }
```

## setSearchParams

`更新当前页面的URL查询参数。`

<b>原理：</b>`setSearchParams`函数接收一个包含查询参数键值对的对象，并根据该对象更新当前 URL 的查询参数。它创建一个`URL`对象来表示当前页面的 URL，并使用`URLSearchParams`来处理查询字符串。函数会遍历`query`对象中的所有键值对，使用`URLSearchParams.set`方法更新或添加查询参数。更新查询参数后，函数将修改后的查询字符串赋值给`URL.search`属性，并利用`history.pushState`方法更新浏览器的历史记录而不刷新页面。

<b>注意事项:</b>

- 函数不会影响页面内容，只会改变 URL 和浏览器的历史记录。
- 如果查询参数的值为 `null` 或 `undefined`，则该参数会被设置为字符串 "null" 或 "undefined"。
- 使用此函数时，应考虑兼容性和前进、后退按钮对 SPA（单页面应用）的影响。

<b>使用示例:</b>

```js
/**
 * @param query - 一个包含查询参数的对象，该对象的键为参数名称，值为参数值。
 */

import { setSearchParams } from '@ostore/utils';

// 假设当前URL为: https://example.com/page?user=alice
// 更新查询参数 "user" 的值，并添加新的参数 "token"
setSearchParams({ user: 'bob', token: '123' });
// URL将更新为: https://example.com/page?user=bob&token=123

// 添加新的查询参数 "page"，并保留现有的参数
setSearchParams({ page: '2' });
// URL将更新为: https://example.com/page?user=bob&token=123&page=2
```

## packUrlParams

`将提供的参数对象打包成URL查询字符串。`

<b>原理：</b>`packUrlParams`函数接收一个对象作为参数，对象的键代表参数名称，值为参数值。函数遍历这个对象，并将每个键值对转换成`key=value`格式的字符串，然后将这些字符串用`&`字符连接起来，生成符合 URL 查询字符串格式的字符串。最终返回的字符串末尾不包含`&`字符。

<b>注意事项:</b>

- 函数不会对参数名称或参数值进行 URL 编码。如果参数值中包含 URL 特殊字符（如空格或`&`），则可能需要在传入函数之前先对其进行编码（例如使用`encodeURIComponent`函数）。
- 如果`params`对象为空，或者不传入任何参数，函数将返回空字符串。

使用示例:

```js
/**
 * @param params - 一个键值对映射对象，其中键为字符串，值为将要编码为URL参数的值。
 * @returns 返回一个编码后的查询字符串，其中包含`params`中的所有参数。参数之间用`&`连接，不包含开始的问号(`?`)。
 */

import { packUrlParams } from '@ostore/utils';

// 创建一个查询参数对象
const params = {
  user: 'alice',
  token: '123',
  active: true,
};

// 根据参数对象生成URL查询字符串
const queryString = packUrlParams(params);
console.log(queryString); // 输出 "user=alice&token=123&active=true"
// 将生成的查询字符串附加到URL上
const url = `https://example.com/page?${queryString}`;
console.log(url); // 输出 "https://example.com/page?user=alice&token=123&active=true"
```
