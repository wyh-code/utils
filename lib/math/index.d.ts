export type TComputType = "+" | '-' | '*' | '/';
export type TComputResult = {
    result: number;
    next: TComputFunction;
};
export type TComputFunction = (type: TComputType, ...args: number[]) => TComputResult;
/**
 * @param type - 计算类型，可以是加法("+")、减法("-")、乘法("*")或除法("/")。
 * @param args - 要进行计算的数字序列。
 * @returns 返回一个包含计算结果的对象。该对象还包含一个next方法，可以用于链式调用进一步的计算。
 *
 * next方法允许进行链式计算:
 * compute("+", 0.1, 0.2).next("*", 10) 返回 { result: 3, next: [Function] }
 */
export declare const compute: TComputFunction;
