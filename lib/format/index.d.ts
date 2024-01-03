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
