/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: 其他相关工具函数
 */

export interface IAnyObj {
  [key: string]: any;
}
// 定义函数类型，它可以接收任意数量的任意类型参数，并且可以返回任意类型的值
export type AnyFunction = (...args: any[]) => any;

/**
 * 复制函数
 * @param text 需要复制的内容
 * @param callback 复制结束后的回调函数   
 */
export interface ICopyCallbackProps {
  status: boolean; // 标识是否复制成功
  message?: string; // 失败原因
}
export type TCopyFunction = (text: string, callback?: (result: ICopyCallbackProps) => void) => void;
export const copy: TCopyFunction = (text: string, callback?: (result: ICopyCallbackProps) => void) => {
  if (text) {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.setSelectionRange(0, 99999);
    input.select();
    try {
      if (document.execCommand('Copy')) {
        document.execCommand('Copy');
        callback && callback({ status: true });
      } else {
        callback && callback({ status: false, message: "document.execCommand('Copy')不存在" });
      }
    } catch (err: any) {
      callback && callback({ status: false, message: err.message });
    }
    document.body.removeChild(input);
  }
};

export type TCopyAsyncFunction = (text: string, callback?: (result: ICopyCallbackProps) => void) => Promise<ICopyCallbackProps>;
export const copyAsync:TCopyAsyncFunction = (text: string) => {
  return new Promise((resolve, reject) => {
    if (text) {
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', text);
      document.body.appendChild(input);
      input.setSelectionRange(0, 99999);
      input.select();
      try {
        if (document.execCommand('Copy')) {
          document.execCommand('Copy');
          resolve({ status: true });
        } else {
          reject({ status: false, message: "document.execCommand('Copy')不存在" });
        }
      } catch (err: any) {
        reject({ status: false, message: err.message });
      }
      document.body.removeChild(input);
    }
  })
};

/**
 * 根据指定key的值，对对象数组进行去重
 * @param arr 需要去重的数组
 * @param key 指定key
 * @returns
 */
export type TUniqueByKeyFunction = (arr: IAnyObj[], key: string) => IAnyObj[];
export const uniqueByKey:TUniqueByKeyFunction = (arr: IAnyObj[], key: string): IAnyObj[] => {
  const hash: { [key: string]: boolean } = {};
  const result = arr.reduce<IAnyObj[]>((total, currentValue) => {
    if (currentValue && typeof currentValue === 'object' && !hash[currentValue[key]]) {
      // 如果当前元素的key值没有在hash对象里，则可放入最终结果数组
      hash[currentValue[key]] = true; // 标记键值已经处理
      total.push(currentValue); // 添加唯一对象到结果数组
    }
    return total; // 返回累积的结果
  }, []);
  return result;
}

/**
 * 判断对象是否有空值
 * @param obj
 */
export type THasNullValue = (obj: IAnyObj) => boolean;
export const hasNullValue: THasNullValue = (obj: IAnyObj) => {
  let result = false;
  // 使用可选链确保obj不为null或undefined
  Object.values(obj)?.forEach((item) => {
    // 检查属性值是否为空字符串或null
    if (item === '' || item === null) {
      result = true;
    }
  });
  // 返回检查结果
  return result;
}

/**
 * 判断对象是否至少有一项值
 * @param obj
 */
export const hasNotNullValue:THasNullValue = (obj: IAnyObj) => {
  let result = false;
  Object.values(obj)?.forEach((item) => {
    if (item !== '' && item !== null && item !== undefined) {
      result = true;
    }
  });
  return result;
}

/**
 * 获取数据类型
 * @param obj
 * @returns  TGetDataTypeReturn
 */ 
export type TGetDataTypeFunction = (obj: any) => TGetDataTypeReturn;
export type TGetDataTypeReturn = "array" | "object" | "number" | "string" | "null" | "undefined" | "function" | "date" | "regexp" | null;
export const getDataType: TGetDataTypeFunction = (obj: any) => {
  const s: string = Object.prototype.toString.call(obj);
  const result = s.match(/\[object (.*?)\]/);
  // 从匹配结果中提取类型字符串，并将其转换为小写
  // 如果匹配失败，即result为null，则直接返回null
  return result && result[1].toLowerCase() as TGetDataTypeReturn;
};

/**
 * 防抖函数
 * @param obj
 * @returns  debounce 函数接收一个函数 F，等待时间 wait，以及一个可选的 immediate 标志
 */ 
export function debounce<F extends AnyFunction>(
  func: F,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  // 返回的函数与输入函数 F 接受相同的参数
  return function(this: ThisParameterType<F>, ...args: Parameters<F>): void {
    // 保存 this 上下文和传入的参数
    const context = this;
    // 清理函数，用于在等待时间结束后执行
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    // 判断是否立即执行
    const callNow = immediate && timeout === null;
    // 如果已经有计时器存在，清除它，这样我们就可以重设等待时间
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    // 重新设置计时器
    timeout = setTimeout(later, wait);
    // 如果设置了立即执行，那么没有计时器存在时就执行函数
    if (callNow) func.apply(context, args);
  };
}

/**
 * 节流函数
 * @param func 
 * @param limit 
 * @returns 
 */
export function throttle<F extends AnyFunction>(func: F, limit: number): F {
  let inThrottle: boolean;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function(this: ThisParameterType<F>, ...args: Parameters<F>): void {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, Math.max(limit - (Date.now() - lastRan), 0));
    }
  } as F;
}