/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: 颜色值相关工具函数
 */

// 此正则表达式用于匹配符合 CSS rgba 或 rgb 颜色格式的字符串。
export const rgbaRegex: RegExp = /^rgba?\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\s*(?:,\s*(1|0|0?\.\d+))?\s*\)$/;
// 用于验证十六进制颜色代码的正则表达式。
export const hexRegex: RegExp = /^#(?:[A-Fa-f0-9]{3}){1,2}$|^#(?:[A-Fa-f0-9]{4}){1,2}$/;
export const hslRegex: RegExp = /^hsl\(\s*(360|3[0-5]\d|[12]?\d{1,2})\s*,\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*\)$/;
export const hslaRegex: RegExp = /^hsla\(\s*(360|3[0-5]\d|[12]?\d{1,2})\s*,\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*,\s*(1|0|0\.\d+|\.\d+)\s*\)$/;

export interface colorResult {
  rgb: string;
  rgba: string;
  hex: string;
  hexa: string;
  hsl: string;
  hsla: string;
  r: number;
  g: number;
  b: number;
  a?: number;
}

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
export function rgbaToHex(rgba: string): colorResult {
  const [rgb, r, g, b, a = 1] = Array.from(rgba.match(rgbaRegex) || []) as any;
  const toHex = (n: number): string => Number(n).toString(16).padStart(2, '0');

  const alpha = a !== undefined ? toHex(Math.round(Number(a) * 255)) : '';

  const hsl = rgbaToHsl(r, g, b);
  const hsla = rgbaToHsl(r, g, b, a);

  return {
    hex: `#${toHex(r)}${toHex(g)}${toHex(b)}`,
    hexa: `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha}`,
    rgb: `rgba(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, ${a})`,
    hsl,
    hsla,
    r, g, b, a
  };
}

/**
 * 用于将十六进制颜色代码（包括可选的透明度）转换为多种颜色格式。
 * 这包括rgba、rgb、带透明度的hex（十六进制）、不带透明度的hex以及HSL（色相、饱和度、亮度）格式。
 * @param hexa: string  一个符合十六进制颜色代码格式的字符串。可以是3位、4位、6位或8位十六进制数，例如：#FFF，#FFFF，#FFFFFF，#FFFFFFFF。
 * @returns 
 */
export function hexToRgba(hexa: string): colorResult {
  hexa = hexa.replace(/^#/, '');

  if ([3, 4].includes(hexa.length)) {
    hexa = hexa.split('').map((char: string) => char + char).join('');
  }

  if (hexa.length === 6) {
    hexa = hexa + 'FF';
  }

  const r: number = parseInt(hexa.slice(0, 2), 16);
  const g: number = parseInt(hexa.slice(2, 4), 16);
  const b: number = parseInt(hexa.slice(4, 6), 16);
  const a: number = +(parseInt(hexa.slice(6, 8), 16) / 255).toFixed(2);

  const hsl = rgbaToHsl(r, g, b);
  const hsla = rgbaToHsl(r, g, b, a);

  return {
    hsl,
    hsla,
    rgb: `rgba(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, ${a})`,
    hex: `#${hexa.slice(0, 6)}`,
    hexa: `#${hexa}`,
    r,
    g,
    b,
    a
  };
}

/**
 * 用于将RGBA颜色值转换为HSL（色相、饱和度、亮度）或HSLA（加上透明度）格式的颜色字符串。
 * @param r: number 红色通道的值，范围从0到255。
 * @param g g: number 绿色通道的值，范围从0到255。
 * @param b: number 蓝色通道的值，范围从0到255。
 * @param a?: number (可选) 透明度值，范围从0到1。如果省略该参数，返回的颜色字符串将是HSL格式；如果提供该参数，返回的颜色字符串将是HSLA格式。
 * @returns 返回一个HSL或HSLA格式的颜色字符串，例如："hsl(120, 100%, 50%)" 或 "hsla(120, 100%, 50%, 0.75)"。
 */
export function rgbaToHsl(r: number, g: number, b: number, a?: number): string {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number, l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  s = s * 100;
  l = l * 100;
  h = Math.round(h * 360);
  s = Math.round(s);
  l = Math.round(l);

  // 如果提供了alpha值，返回HSLA格式
  if (a !== undefined) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }

  // 如果没有提供alpha值，返回HSL格式
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * 用于将HSL颜色格式（色相、饱和度、亮度）转换为RGB格式。
 * 同时，这个函数还能提供十六进制（HEX）颜色格式、RGBA颜色格式以及HSLA颜色格式的转换结果。
 * @param hsl: string HSL格式的颜色字符串，例如："hsl(120, 50%, 50%)"。
 * @returns 返回一个colorResult对象，格式同函数 rgbaToHex 返回值。
 */
export function hslToRgb(hsl: string): colorResult {
  let [hslcolor, h, s, l] = Array.from(hsl.match(hslRegex) || []) as any;
  s /= 100;
  l /= 100;
  
  const c: number = (1 - Math.abs(2 * l - 1)) * s;
  const x: number = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m: number = l - c / 2;
  let r: number = 0;
  let g: number = 0;
  let b: number = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; b = c; g = 0;
  } else if (h >= 300 && h < 360) {
    r = c; b = x; g = 0;
  } 

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const hexResult = rgbaToHex(`rgb(${r}, ${g}, ${b})`);

  return  { 
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgb(${r}, ${g}, ${b}, 1)`,
    hex: hexResult.hex,
    hexa: hexResult.hexa,
    hsl,
    hsla: `hsla(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, 1)`,
    r, 
    g, 
    b,
    a: 1
  };
}

/**
 * 用于将HSLA（色相、饱和度、亮度、透明度）格式的颜色字符串转换为包含RGBA、RGB、HEX、HSL、HSLA格式的颜色值。
 * 该函数可以处理带有透明度的颜色，并返回一个对象，其中包括了转换后的各种颜色表示方法。
 * @param hsla: string  HSLA格式的颜色字符串，例如："hsla(120, 50%, 50%, 0.5)"。 
 * @returns 返回一个colorResult对象，格式同函数 rgbaToHex 返回值。
 */
export function hslaToRgba(hsla: string): colorResult {
  const [hslaColor, h, s, l, a = 1] = Array.from(hsla.match(hslaRegex) || []) as any;
  const { r, g, b } = hslToRgb(`hsl(${h}, ${s}%, ${l}%)`);
  const hexResult = rgbaToHex(`rgb(${r}, ${g}, ${b}, ${a})`);
  return {
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgb(${r}, ${g}, ${b}, ${a})`,
    hex: hexResult.hex,
    hexa: hexResult.hexa,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
    hsla,
    r, 
    g, 
    b,
    a
  }
}
