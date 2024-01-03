export interface IAnyObj {
    [key: string]: any;
}
export type AnyFunction = (...args: any[]) => any;
/**
 * 复制函数
 * @param text 需要复制的内容
 * @param callback 复制结束后的回调函数
 */
export interface ICopyCallbackProps {
    status: boolean;
    message?: string;
}
export type TCopyFunction = (text: string, callback?: (result: ICopyCallbackProps) => void) => void;
export declare const copy: TCopyFunction;
export type TCopyAsyncFunction = (text: string, callback?: (result: ICopyCallbackProps) => void) => Promise<ICopyCallbackProps>;
export declare const copyAsync: TCopyAsyncFunction;
/**
 * 根据指定key的值，对对象数组进行去重
 * @param arr 需要去重的数组
 * @param key 指定key
 * @returns
 */
export type TUniqueByKeyFunction = (arr: IAnyObj[], key: string) => IAnyObj[];
export declare const uniqueByKey: TUniqueByKeyFunction;
/**
 * 判断对象是否有空值
 * @param obj
 */
export type THasNullValue = (obj: IAnyObj) => boolean;
export declare const hasNullValue: THasNullValue;
/**
 * 判断对象是否至少有一项值
 * @param obj
 */
export declare const hasNotNullValue: THasNullValue;
/**
 * 获取数据类型
 * @param obj
 * @returns  TGetDataTypeReturn
 */
export type TGetDataTypeFunction = (obj: any) => TGetDataTypeReturn;
export type TGetDataTypeReturn = "array" | "object" | "number" | "string" | "null" | "undefined" | "function" | "date" | "regexp" | null;
export declare const getDataType: TGetDataTypeFunction;
/**
 * 防抖函数
 * @param obj
 * @returns  debounce 函数接收一个函数 F，等待时间 wait，以及一个可选的 immediate 标志
 */
export declare function debounce<F extends AnyFunction>(func: F, wait: number, immediate?: boolean): (...args: Parameters<F>) => void;
/**
 * 节流函数
 * @param func
 * @param limit
 * @returns
 */
export declare function throttle<F extends AnyFunction>(func: F, limit: number): F;
