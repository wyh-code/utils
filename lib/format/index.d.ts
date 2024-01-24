/**
 * 数字千分位分割
 * @param x: number | string  一个数字或者是一个表示数字的字符串。
 * @returns 返回一个字符串，其中输入数字的每三位数由逗号分隔。
 */
export declare function numberWithCommas(x: number | string): string;
/**
 * 用于格式化银行卡号，使其更易于阅读。
 * @param cardNumber: string  银行卡号字符串，可以包含数字和（可选的）分隔符如破折号或空格。
 * @returns 格式化后的银行卡号字符串，每四位数字之间由一个空格分隔。
*/
export declare function formatBankCardNumber(cardNumber: string): string;
/**
 * 文件大小单位格式化
 * @param bytes: number - 文件大小，以字节为单位的非负数。
 * @param decimals?: number - （可选）小数点后要保留的位数，默认为 2。如果提供的小数位数为负数，函数将自动将其设置为 0。
 * @param k?: number = 1024 - （可选）计算文件大小单位的基数，默认为1024（二进制，1 KiB = 1024 Bytes）。
 * 可以设置为1000（十进制，1 KB = 1000 Bytes）。
 * @returns string - 表示文件大小的格式化字符串，包含了适当的单位。例如 "1.46 KiB", "23.74 MB"。
 */
export declare function formatFileSize(bytes: number, decimals?: number, base?: number): string;
