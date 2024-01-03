---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 缓存
order: 3
toc: content
---

# 缓存相关工具函数

## getCookies

`获取当前页面的cookie值。`

<b>原理：</b>`getCookies`函数首先获取`document.cookie`字符串，并以`;`为分隔符将其分割成数组。然后遍历数组，对每个 cookie 字符串进行进一步分割以获取 cookie 名称和值，最终累积成一个 cookie 对象。如果调用时传入了`name`参数，则返回该名称对应的 cookie 值；如果没有传入`name`参数，则返回包含所有 cookie 的对象。

<b>`请注意，此函数只能获取非HttpOnly的cookie。`</b>

<b>注意事项:</b>

- 如果 cookie 名不存在，返回`undefined`。
- 如果没有提供`name`且当前页面没有 cookie，返回的对象将为空。

使用示例:

```js
/**
 * @param name - 可选参数。指定要获取的cookie名称。
 * @returns 如果提供了`name`参数，则返回与该名称对应的cookie值。
 *          如果没有提供`name`，则返回一个包含所有cookie的对象，对象的键为cookie名称，值为cookie值。
 */

import { getCookies } from '@ostore/utils';

// 获取所有cookie
const allCookies = getCookies(); // console.log(allCookies);
// 获取名为"user"的cookie值
const userCookie = getCookies('user'); // console.log(userCookie);
```

## setLocalStorage

`用于将指定的键值对存储到浏览器的localStorage中，并允许设置额外的选项，包括截止时间、过期时间和访问权限。`

<b>使用方式：</b>要使用 setLocalStorage 函数，可以将要保存的数据（data），以及一个可选的 options 对象传入。options 对象可以包含截止时间（endTime），相对于当前时间的过期时间（expiry），以及一个字符串数组，指定哪些用户权限可以访问此数据（permissions）。

<b>注意事项</b>

- localStorage 是持久存储，即使关闭浏览器，数据也会保留。
- 存储在 localStorage 中的数据必须是字符串。本函数通过 JSON.stringify 自动序列化非字符串数据。
- 如果浏览器的 localStorage 已满，存储尝试可能会失败。应检查本函数是否返回错误。
- 因为数据是明文存储的，敏感信息不应该存储在 localStorage 中。
- localStorage 受同源策略限制，只能在相同协议、域名和端口下的页面之间共享。

使用示例:

```js
/**
 * 用于将指定的键值对存储到浏览器的localStorage中
 * @param key 用于存储数据项的键名
 * @param value 需要存储到localStorage中的数据值
 * @param options?:  IOptions (可选) 一个包含缓存选项的对象
 *          - endTime?: number; Unix时间戳，表示数据的最后截止时间。如果设置了endTime，当当前时间超过endTime时，存储的数据将被认为无效。
            - expiry?: number; 表示从当前时间开始多少毫秒后数据过期的时间跨度。如果设置了expiry，它将在当前时间的基础上增加指定的毫秒数，用于计算过期时间戳。
            - permissions?: string[];  一个字符串数组，指定哪些用户权限可以访问存储的数据。仅当检索数据时提供匹配的权限时，该数据才可用。
 *
 */

import { setLocalStorage } from '@ostore/utils';

// 将用户数据存储到localStorage中
setLocalStorage('user-data', { name: 'John Doe', age: 30 });

// 将用户数据存储到localStorage中，设置30分钟后过期
setLocalStorage(
  'user-data',
  { name: 'John Doe', age: 30 },
  {
    expiry: 1800000,
  },
);

// 将用户数据存储到localStorage中，设置2999-12-12日过期，并且只允许具有admin权限的用户访问：
setLocalStorage(
  'user-data',
  { name: 'John Doe', age: 30 },
  {
    endTime: 32501952000000, // 2999-12-12
    permissions: ['admin'],
  },
);
```

## getLocalStorage

`用来从浏览器的 localStorage 中检索数据，并做处理验证检查，例如过期和用户权限。`

<b>行为描述：</b>

- 函数开始尝试使用给定的键从 `localStorage` 中检索项。
- 如果找到项，函数尝试将其解析为 `JSON`。
- 解析出的对象应该包含一个可能是可选的 `options` 对象和一个 `data` 属性。
- options 对象可能包含：
  - `endTime`: 指示缓存项何时过期的时间戳
  - expiry: 缓存项基于当前时间不应超过的时间戳。
  - permissions: 需要访问缓存项的权限字符串数组。
- 如果设置了 endTime 并且当前时间晚于 endTime，则该项将从 localStorage 中移除，并返回 null。
- 如果设置了 expiry 并且当前时间已经超过了 expiry，则该项将从 localStorage 中移除，并返回 null。
- 如果设置了 permissions，函数检查是否提供了 userPermissions 并且包含至少一个所需的权限。如果没有，则在控制台记录一个错误，并返回 null。
- 如果所有检查都通过，则返回缓存项的 data 属性。

使用示例：

```js
/**
 * 用于获取localStorage中指定的键的值
 * @param key 用于获取数据项的键名
 * @param userPermissions?: string[] (可选);一个字符串数组，代表请求数据的用户所拥有的权限。这些权限将与缓存项的权限进行比较，以确定用户是否有权访问数据。
 * @returns 函数返回与key关联的数据，如果数据未过期并且用户具有足够的访问权限。如果数据不存在、已过期、或用户权限不足，将返回null。
 */
import { getLocalStorage } from '@ostore/utils';

// 假设 localStorage 有一个 'user-data' 的键，其中包含了所需的权限
const userPermissions = ['read', 'write'];
const userData = getLocalStorage('user-data', userPermissions);

if (userData) {
  console.log('已检索到用户数据:', userData);
} else {
  console.log('未能检索到用户数据或访问被拒绝。');
}
```

## setSessionStorage

`用于将指定的键值对存储到浏览器的sessionStorage中，并允许设置额外的选项，包括截止时间、过期时间和访问权限。`

使用示例:

```js
/**
 * 用于将指定的键值对存储到浏览器的sessionStorage中
 * @param key 用于存储数据项的键名
 * @param value 需要存储到sessionStorage中的数据值
 * @param options?:  IOptions (可选) 一个包含缓存选项的对象
 *          - endTime?: number; Unix时间戳，表示数据的最后截止时间。如果设置了endTime，当当前时间超过endTime时，存储的数据将被认为无效。
            - expiry?: number; 表示从当前时间开始多少毫秒后数据过期的时间跨度。如果设置了expiry，它将在当前时间的基础上增加指定的毫秒数，用于计算过期时间戳。
            - permissions?: string[];  一个字符串数组，指定哪些用户权限可以访问存储的数据。仅当检索数据时提供匹配的权限时，该数据才可用。
 *
 */

import { setSessionStorage } from '@ostore/utils';

// 将用户数据存储到sessionStorage中
setSessionStorage('user-data', { name: 'John Doe', age: 30 });

// 将用户数据存储到sessionStorage中，设置30分钟后过期
setSessionStorage(
  'user-data',
  { name: 'John Doe', age: 30 },
  {
    expiry: 1800000,
  },
);

// 将用户数据存储到sessionStorage中，设置2999-12-12日过期，并且只允许具有admin权限的用户访问：
setSessionStorage(
  'user-data',
  { name: 'John Doe', age: 30 },
  {
    endTime: 32501952000000, // 2999-12-12
    permissions: ['admin'],
  },
);
```

## getSessionStorage

`用来从浏览器的 sessionStorage 中检索数据，并做处理验证检查，例如过期和用户权限。`

使用示例：

```js
/**
 * 用于获取sessionStorage中指定的键的值
 * @param key 用于获取数据项的键名
 * @param userPermissions?: string[] (可选);一个字符串数组，代表请求数据的用户所拥有的权限。这些权限将与缓存项的权限进行比较，以确定用户是否有权访问数据。
 * @returns 函数返回与key关联的数据，如果数据未过期并且用户具有足够的访问权限。如果数据不存在、已过期、或用户权限不足，将返回null。
 */
import { getSessionStorage } from '@ostore/utils';

// 假设 sessionStorage 有一个 'user-data' 的键，其中包含了所需的权限
const userPermissions = ['read', 'write'];
const userData = getSessionStorage('user-data', userPermissions);

if (userData) {
  console.log('已检索到用户数据:', userData);
} else {
  console.log('未能检索到用户数据或访问被拒绝。');
}
```
