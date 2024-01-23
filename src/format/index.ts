/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: 格式化相关工具函数
 */

/**
 * 数字千分位分割
 * @param x: number | string  一个数字或者是一个表示数字的字符串。
 * @returns 返回一个字符串，其中输入数字的每三位数由逗号分隔。
 */
export function numberWithCommas(x: number | string): string {
  // 将输入转换成字符串
  const parts = x.toString().split(".");
  // 使用正则表达式在千位上添加逗号
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // 将整数部分和小数部分重新连接起来
  return parts.join(".");
}

/**
 * 用于格式化银行卡号，使其更易于阅读。
 * @param cardNumber: string  银行卡号字符串，可以包含数字和（可选的）分隔符如破折号或空格。 
 * @returns 格式化后的银行卡号字符串，每四位数字之间由一个空格分隔。
*/
export function formatBankCardNumber(cardNumber: string): string {
  // 移除非数字字符
  const digitsOnly = cardNumber.replace(/\D/g, '');
  // 使用正则表达式，在每4个数字后添加一个空格
  const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
  return formatted.trim(); // 如果有尾随空格，去掉它
}

/**
 * 文件大小单位格式化
 * @param bytes: number - 文件大小，以字节为单位的非负数。
 * @param decimals?: number - （可选）小数点后要保留的位数，默认为 2。如果提供的小数位数为负数，函数将自动将其设置为 0。
 * @param k?: number = 1024 - （可选）计算文件大小单位的基数，默认为1024（二进制，1 KiB = 1024 Bytes）。
 * 可以设置为1000（十进制，1 KB = 1000 Bytes）。
 * @returns string - 表示文件大小的格式化字符串，包含了适当的单位。例如 "1.46 KiB", "23.74 MB"。
 */
export function formatFileSize(bytes: number, decimals: number = 2, base: number = 1024): string {
  if (bytes < 0) {
    throw new Error('File size cannot be negative.');
  }

  if (bytes === 0) return '0 Bytes';

  const k = base; // 允许自定义基数，例如 1024 或 1000
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = base === 1024 
    ? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'] 
    : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (i >= sizes.length) {
    throw new Error('File size is too large and exceeds the supported unit range.');
  }

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}