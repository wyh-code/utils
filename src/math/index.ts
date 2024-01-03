/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: 数学计算相关工具函数
 */

export type TComputType = "+" | '-' | '*' | '/';
export type TComputResult = { result: number, next: TComputFunction };
export type TComputFunction = (type: TComputType, ...args: number[]) => TComputResult;
/**
 * @param type - 计算类型，可以是加法("+")、减法("-")、乘法("*")或除法("/")。
 * @param args - 要进行计算的数字序列。
 * @returns 返回一个包含计算结果的对象。该对象还包含一个next方法，可以用于链式调用进一步的计算。
 *
 * next方法允许进行链式计算:
 * compute("+", 0.1, 0.2).next("*", 10) 返回 { result: 3, next: [Function] }
 */
export const compute: TComputFunction = (type: TComputType, ...args: number[]) => {
  // 计算放大倍数
  const getPower = (numbers: number[]) => {
    // 获取所有数字中小数位数
    const lens = numbers.map((num: number) => num.toString().split(".")[1]?.length || 0);
    // 获取所有数字中最大小数位数
    const len = Math.max(...lens);
    // 计算放大倍数，即10的最大小数位数次幂
    return Math.pow(10, len)
  }

  // 获取当前数字序列的放大倍数
  const power = getPower(args);

  // 将所有数字放大为整数
  const newNumbers = args.map(num => Math.round(num * power));

  // 初始化计算结果
  let result = 0;
  switch (type) {
    case "+":
      // 加法：累加放大后的所有数字，然后缩小回原来的倍数
      result = newNumbers.reduce((preNumber, nextNumber) => preNumber + nextNumber, result) / power;
      break;
    case "-":
      // 减法：累减放大后的所有数字，然后缩小回原来的倍数
      result = newNumbers.reduce((preNumber, nextNumber) => preNumber - nextNumber) / power;
      break;
    case "*":
      // 乘法：累乘放大后的所有数字，然后除以放大倍数的相应次方
      result = newNumbers.reduce((preNumber, nextNumber) => preNumber * nextNumber) / (power ** newNumbers.length);
      break;
    case "/":
      // 除法：累除放大后的所有数字
      result = newNumbers.reduce((preNumber, nextNumber) => preNumber / nextNumber);
      break;
  }

  // 返回计算结果及next方法，以支持链式计算
  return {
    result,
    next(nextType, ...nextArgs) {
      // next方法接收一个新的计算类型及其他数字，并以当前结果作为下一次计算的起点
      return compute(nextType, result, ...nextArgs);
    }
  }
}
