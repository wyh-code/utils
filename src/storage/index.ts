/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: localStorage、cookie 相关工具函数
 */


/**
 * 获取cookie
 * @param name 要取的key
 */
export type IGetCookiesFunction = (name?: string) => string | undefined | { [key: string]: any };
export const getCookies: IGetCookiesFunction = (name?: string) => {
  // 分割`document.cookie`字符串，并将其转换为cookie对象
  let obj = document.cookie.split(';').reduce<{ [key: string]: string }>((map, str) => {
    // 获取每一对cookie名称和值
    map[str.split('=')[0].trim()] = str.split('=')[1].trim()
    return map
  }, {})
  // 如果提供了cookie名，返回对应的值；否则返回整个cookie对象
  return name ? obj[name] : obj;
};

/**
 * 用于将指定的键值对存储到浏览器的localStorage中
 * @param key 用于存储数据项的键名
 * @param value 需要存储到localStorage中的数据值
 * @param options?:  IOptions (可选) 一个包含缓存选项的对象
 *          - endTime?: number; Unix时间戳，表示数据的最后截止时间。如果设置了endTime，当当前时间超过endTime时，存储的数据将被认为无效。
            - expiry?: number; 表示从当前时间开始多少毫秒后数据过期的时间跨度。如果设置了expiry，它将在当前时间的基础上增加指定的毫秒数，用于计算过期时间戳。
            - permissions?: string[];  一个字符串数组，指定哪些用户权限可以访问存储的数据。仅当检索数据时提供匹配的权限时，该数据才可用。
 *
 */
interface CacheItem {
  data: any;
  options?: IOptions;
}
interface IOptions {
  endTime?: number; // 最后截止时间
  expiry?: number, // 过期时间，基于当前时间
  permissions?: string[]
}
export function setLocalStorage(key: string, value: any, options?: IOptions): any {
  let err;
  try {
    // 获取当前时间
    const currentTime = Date.now();
    // 设置过期时间
    let expiry = options?.expiry;
    if (expiry) {
      expiry += currentTime;
    }
    const item: CacheItem = {
      data: value,
      options,
    };
    localStorage.setItem(key, JSON.stringify(item)); // 将对象序列化后存储到localStorage
  } catch (error) {
    err = error;
  }

  return err;
}

/**
 * 用于获取localStorage中指定的键的值
 * @param key 用于获取数据项的键名
 * @param userPermissions?: string[] (可选);一个字符串数组，代表请求数据的用户所拥有的权限。这些权限将与缓存项的权限进行比较，以确定用户是否有权访问数据。
 * @returns 函数返回与key关联的数据，如果数据未过期并且用户具有足够的访问权限。如果数据不存在、已过期、或用户权限不足，将返回null。
 */
export function getLocalStorage(key: string, userPermissions?: string[]): any {
  const itemStr = localStorage.getItem(key);
  if (itemStr) {
    try {
      const item: CacheItem = JSON.parse(itemStr);
      const currentTime = Date.now();

      // 检查是否设置了截止时间并且是否已过期
      if (item.options?.endTime && currentTime > item.options.endTime) {
        localStorage.removeItem(key);
        return null;
      }

      // 检查基于当前时间的过期时间
      if (item.options?.expiry && currentTime > item.options.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      // 检查用户是否有权访问缓存数据
      if (item.options?.permissions) {
        if(!userPermissions || !userPermissions.length){
          return null;
        }
        const hasPermission = item.options.permissions.some(permission => userPermissions.includes(permission));
        if (!hasPermission) {
          console.error('Access denied: User does not have the required permissions.');
          return null;
        }
      }

      return item.data; // 返回未过期且具有权限的数据
    } catch (error) {
      console.error('Error parsing localStorage item:', error);
      return null;
    }
  }
  return null;
}

/**
 * 用于将指定的键值对存储到浏览器的 sessionStorage
 * @param key 
 * @param value 
 * @param options 
 * @returns 
 */
export function setSessionStorage(key: string, value: any, options?: IOptions): any {
  let err;
  try {
    // 获取当前时间
    const currentTime = Date.now();
    // 设置过期时间
    let expiry = options?.expiry;
    if (expiry) {
      expiry += currentTime;
    }
    const item: CacheItem = {
      data: value,
      options,
    };
    sessionStorage.setItem(key, JSON.stringify(item)); // 将对象序列化后存储到 sessionStorage
  } catch (error) {
    err = error;
  }

  return err;
}

/**
 * 用于获取sessionStorage中指定的键的值
 * @param key 用于获取数据项的键名
 * @param userPermissions 
 * @returns 
 */
export function getSessionStorage(key: string, userPermissions?: string[]): any {
  const itemStr = sessionStorage.getItem(key);
  if (itemStr) {
    try {
      const item: CacheItem = JSON.parse(itemStr);
      const currentTime = Date.now();

      // 检查是否设置了截止时间并且是否已过期
      if (item.options?.endTime && currentTime > item.options.endTime) {
        sessionStorage.removeItem(key);
        return null;
      }

      // 检查基于当前时间的过期时间
      if (item.options?.expiry && currentTime > item.options.expiry) {
        sessionStorage.removeItem(key);
        return null;
      }

      // 检查用户是否有权访问缓存数据
      if (item.options?.permissions) {
        if(!userPermissions || !userPermissions.length){
          return null;
        }
        const hasPermission = item.options.permissions.some(permission => userPermissions.includes(permission));
        if (!hasPermission) {
          console.error('Access denied: User does not have the required permissions.');
          return null;
        }
      }

      return item.data; // 返回未过期且具有权限的数据
    } catch (error) {
      console.error('Error parsing sessionStorage item:', error);
      return null;
    }
  }
  return null;
}
