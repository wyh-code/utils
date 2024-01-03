---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 颜色值
order: 8
toc: content
---

## rgbaRegex

`此正则表达式用于匹配符合 CSS rgba 或 rgb 颜色格式的字符串。`

使用示例：

```js
import { rgbaRegex } from '@ostore/utils';

rgbaRegex.test('rgb(0, 0, 0)'); // true
rgbaRegex.test('rgba(0, 0, 0, .1)'); // true

const result = 'rgba(0, 0, 0)'.match(rgbaRegex);
console.log(result); // ['rgba(0, 0, 0)', '0', '0', '0', undefined, index: 0, input: 'rgba(0, 0, 0)', groups: undefined]

const result1 = 'rgba(0, 0, 0, 1)'.match(rgbaRegex);
console.log(result); // ['rgba(0, 0, 0, 1)', '0', '0', '0', '1', index: 0, input: 'rgba(0, 0, 0, 1)', groups: undefined]
```

## hexRegex

`用于验证十六进制颜色代码的正则表达式`

使用示例：

```js
import { hexRegex } from '@ostore/utils';

hexRegex.test('#fff'); // true
hexRegex.test('#f1f1f1'); // true
hexRegex.test('#ffff'); // true
hexRegex.test('#f1f1f1ff'); // true
```

## hslRegex

`此正则表达式用于匹配符合 CSS hsl 颜色格式的字符串。`

使用示例：

```js
import { hexRegex } from '@ostore/utils';

hexRegex.test('hsl(320, 20%, 20%)'); // true
const result = 'hsl(320, 20%, 20%)'.match(hexRegex);
console.log(result); // ['hsl(320, 20%, 20%)', '320', '20', '20', index: 0, input: 'hsl(320, 20%, 20%)', groups: undefined]
```

## hslaRegex

`此正则表达式用于匹配符合 CSS hsla 颜色格式的字符串。`

使用示例：

```js
import { hslaRegex } from '@ostore/utils';

hslaRegex.test('hsla(320, 20%, 20%, .1)'); // true
const result = 'hsla(320, 20%, 20%)'.match(hslaRegex);
console.log(result); // ['hsla(320, 20%, 20%, .1)', '320', '20', '20', '.1', index: 0, input: 'hsla(320, 20%, 20%, .1)', groups: undefined]
```

## rgbaToHex

`将rgb或rgba颜色字符串转换为多种颜色格式，包括hex（十六进制）、hexa（带透明度的十六进制）、rgb、rgba以及HSL（色相、饱和度、亮度）相关格式。`

这个函数接受一个标准的 rgba 颜色字符串作为输入，并返回一个包含各种颜色格式的对象。

<b>注意事项：</b>

- 输入的 rgba 颜色字符串必须符合 rgba()格式的规范，否则函数可能无法正确解析并返回结果。
- 如果输入的 rgba 字符串没有明确指定透明度值，则默认使用 1（不透明）。

使用示例：

```js
/**
 * 将rgb或rgba颜色字符串转换为多种颜色格式，包括hex（十六进制）、hexa（带透明度的十六进制）、rgb、rgba以及HSL（色相、饱和度、亮度）相关格式。
 * @param rgba: string  一个符合rgba格式的颜色字符串，例如："rgba(255, 165, 0, 0.8)"。
 * @returns 返回一个colorResult对象，其中包含以下属性：
 * hex: string; 不带透明度的十六进制颜色代码。
 * hexa: string; 带有透明度的十六进制颜色代码。
 * rgb: string; 不带透明度的RGB颜色表示，即使原始rgba字符串包含透明度信息。
 * rgba: string; 包括透明度的原始RGB颜色表示。
 * hsl: string; 转换为HSL颜色表示的字符串。
 * hsla: string; 转换为带透明度的HSL颜色表示的字符串。
 * r: number; 红色通道的值。
 * g: number; 绿色通道的值。
 * b: number; 蓝色通道的值。
 * a: number; 透明度值。
 */

import { rgbaToHex } from '@ostore/utils';

const color = rgbaToHex('rgba(255, 165, 0, 0.8)');
console.log(color.hex); // 输出: #ffa500
console.log(color.hexa); // 输出: #ffa500cc
```

## rgbaToHex

`用于将十六进制颜色代码（包括可选的透明度）转换为多种颜色格式。这包括rgba、rgb、带透明度的hex（十六进制）、不带透明度的hex以及HSL（色相、饱和度、亮度）格式。`

传入一个符合十六进制颜色代码格式的字符串（可带有或不带有透明度），函数将解析这个字符串并返回一个对象，包含转换后的多种颜色表示方法。

<b>注意事项：</b>

- 输入的十六进制颜色代码必须是有效的，否则无法正确转换并返回结果。
- 如果输入的十六进制字符串没有明确指定透明度值，则默认使用 FF（不透明）。

使用示例

```js
/**
 * 用于将十六进制颜色代码（包括可选的透明度）转换为多种颜色格式。
 * 这包括rgba、rgb、带透明度的hex（十六进制）、不带透明度的hex以及HSL（色相、饱和度、亮度）格式。
 * @param hexa: string  一个符合十六进制颜色代码格式的字符串。可以是3位、4位、6位或8位十六进制数，例如：#FFF，#FFFF，#FFFFFF，#FFFFFFFF。
 * @returns 返回一个colorResult对象，格式同函数 rgbaToHex 返回值。
 */
import { hexToRgba } from '@ostore/utils';

const color = hexToRgba('#ffa500cc');
console.log(color.rgba); // 输出: rgba(255, 165, 0, 0.8)
console.log(color.hexa); // 输出: #ffa500cc
```

## rgbaToHsl

`用于将RGBA颜色值转换为HSL（色相、饱和度、亮度）或HSLA（加上透明度）格式的颜色字符串。`

函数接受红色（R）、绿色（G）、蓝色（B）三个颜色通道的值（0-255 范围内的整数），以及一个可选的透明度（A）值（0-1 范围内的数字），并返回相应的 HSL 或 HSLA 颜色字符串。

<b>注意事项：</b>

- 输入的 R、G、B 值应在 0 到 255 的范围内，A 值（如果提供）应在 0 到 1 的范围内。
- 颜色转换可以涉及复杂的计算，但此函数已考虑了所有可能的情况，以确保准确转换颜色值。
- 如果不需要转换成带透明度的 HSLA 格式，请确保不要传入 A 值参数。

使用示例：

```js
/**
 * 用于将RGBA颜色值转换为HSL（色相、饱和度、亮度）或HSLA（加上透明度）格式的颜色字符串。
 * @param r: number 红色通道的值，范围从0到255。
 * @param g: number 绿色通道的值，范围从0到255。
 * @param b: number 蓝色通道的值，范围从0到255。
 * @param a?: number (可选) 透明度值，范围从0到1。如果省略该参数，返回的颜色字符串将是HSL格式；如果提供该参数，返回的颜色字符串将是HSLA格式。
 * @returns 返回一个HSL或HSLA格式的颜色字符串，例如："hsl(120, 100%, 50%)" 或 "hsla(120, 100%, 50%, 0.75)"。
 */

import { rgbaToHsl } from '@ostore/utils';

const hslColor = rgbaToHsl(255, 165, 0); // 转换RGB到HSL
console.log(hslColor); // 输出: "hsl(39, 100%, 50%)"

const hslaColor = rgbaToHsl(255, 165, 0, 0.8); // 转换RGBA到HSLA
console.log(hslaColor); // 输出: "hsla(39, 100%, 50%, 0.8)"
```

## hslToRgb

`用于将HSL颜色格式（色相、饱和度、亮度）转换为RGB格式。同时，这个函数还能提供十六进制（HEX）颜色格式、RGBA颜色格式以及HSLA颜色格式的转换结果。`

传入一个符合 HSL 格式的颜色字符串（例如："hsl(120, 50%, 50%)"），函数将解析这个字符串并返回一个包含 RGB、RGBA、HEX、HSL 和 HSLA 等颜色表示方法的对象。

<b>注意事项：</b>

- 输入的 HSL 值应是有效的 HSL 格式字符串。
- 如果输入的 HSL 值无效，函数可能无法正确解析并返回结果。

使用示例：

```js
/**
 * 用于将HSL颜色格式（色相、饱和度、亮度）转换为RGB格式。
 * 同时，这个函数还能提供十六进制（HEX）颜色格式、RGBA颜色格式以及HSLA颜色格式的转换结果。
 * @param hsl: string HSL格式的颜色字符串，例如："hsl(120, 50%, 50%)"。
 * @returns 返回一个colorResult对象，格式同函数 rgbaToHex 返回值。
 */

import { hslToRgb } from '@ostore/utils';
const color = hslToRgb('hsl(120, 50%, 50%)');
console.log(color.rgb); // 输出: "rgb(64, 191, 64)"
console.log(color.hex); // 输出: "#40BF40"
```

## hslaToRgba

`用于将HSLA（色相、饱和度、亮度、透明度）格式的颜色字符串转换为包含RGBA、RGB、HEX、HSL、HSLA格式的颜色值。`

传入一个符合 HSLA 格式的颜色字符串（例如："hsla(120, 50%, 50%, 0.5)"），函数将解析这个字符串并返回一个包含多种颜色表示方法的对象。

<b>注意事项：</b>

- 输入的 HSLA 值应是有效的 HSLA 格式字符串。
- 如果输入的 HSLA 值无效，函数可能无法正确解析并返回结果。

使用示例

```js
/**
 * 用于将HSLA（色相、饱和度、亮度、透明度）格式的颜色字符串转换为包含RGBA、RGB、HEX、HSL、HSLA格式的颜色值。
 * 该函数可以处理带有透明度的颜色，并返回一个对象，其中包括了转换后的各种颜色表示方法。
 * @param hsla: string  HSLA格式的颜色字符串，例如："hsla(120, 50%, 50%, 0.5)"。
 * @returns 返回一个colorResult对象，格式同函数 rgbaToHex 返回值。
 */

import { hslaToRgba } from '@ostore/utils';

const color = hslaToRgba('hsla(120, 50%, 50%, 0.5)');
console.log(color.hexa); // 输出: "#40BF4080"
console.log(color.rgba); // 输出: "rgba(64, 191, 64, 0.5)"
```
