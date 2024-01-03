export declare const rgbaRegex: RegExp;
export declare const hexRegex: RegExp;
export declare const hslRegex: RegExp;
export declare const hslaRegex: RegExp;
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
export declare function rgbaToHex(rgba: string): colorResult;
/**
 * 用于将十六进制颜色代码（包括可选的透明度）转换为多种颜色格式。
 * 这包括rgba、rgb、带透明度的hex（十六进制）、不带透明度的hex以及HSL（色相、饱和度、亮度）格式。
 * @param hexa: string  一个符合十六进制颜色代码格式的字符串。可以是3位、4位、6位或8位十六进制数，例如：#FFF，#FFFF，#FFFFFF，#FFFFFFFF。
 * @returns
 */
export declare function hexToRgba(hexa: string): colorResult;
/**
 * 用于将RGBA颜色值转换为HSL（色相、饱和度、亮度）或HSLA（加上透明度）格式的颜色字符串。
 * @param r: number 红色通道的值，范围从0到255。
 * @param g g: number 绿色通道的值，范围从0到255。
 * @param b: number 蓝色通道的值，范围从0到255。
 * @param a?: number (可选) 透明度值，范围从0到1。如果省略该参数，返回的颜色字符串将是HSL格式；如果提供该参数，返回的颜色字符串将是HSLA格式。
 * @returns 返回一个HSL或HSLA格式的颜色字符串，例如："hsl(120, 100%, 50%)" 或 "hsla(120, 100%, 50%, 0.75)"。
 */
export declare function rgbaToHsl(r: number, g: number, b: number, a?: number): string;
/**
 * 用于将HSL颜色格式（色相、饱和度、亮度）转换为RGB格式。
 * 同时，这个函数还能提供十六进制（HEX）颜色格式、RGBA颜色格式以及HSLA颜色格式的转换结果。
 * @param hsl: string HSL格式的颜色字符串，例如："hsl(120, 50%, 50%)"。
 * @returns 返回一个colorResult对象，格式同函数 rgbaToHex 返回值。
 */
export declare function hslToRgb(hsl: string): colorResult;
/**
 * 用于将HSLA（色相、饱和度、亮度、透明度）格式的颜色字符串转换为包含RGBA、RGB、HEX、HSL、HSLA格式的颜色值。
 * 该函数可以处理带有透明度的颜色，并返回一个对象，其中包括了转换后的各种颜色表示方法。
 * @param hsla: string  HSLA格式的颜色字符串，例如："hsla(120, 50%, 50%, 0.5)"。
 * @returns 返回一个colorResult对象，格式同函数 rgbaToHex 返回值。
 */
export declare function hslaToRgba(hsla: string): colorResult;
