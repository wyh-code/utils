/**
 * 获取cookie
 * @param name 要取的key
 */
export type IGetCookiesFunction = (name?: string) => string | undefined | {
    [key: string]: any;
};
export declare const getCookies: IGetCookiesFunction;
interface IOptions {
    endTime?: number;
    expiry?: number;
    permissions?: string[];
}
export declare function setLocalStorage(key: string, value: any, options?: IOptions): any;
/**
 * 用于获取localStorage中指定的键的值
 * @param key 用于获取数据项的键名
 * @param userPermissions?: string[] (可选);一个字符串数组，代表请求数据的用户所拥有的权限。这些权限将与缓存项的权限进行比较，以确定用户是否有权访问数据。
 * @returns 函数返回与key关联的数据，如果数据未过期并且用户具有足够的访问权限。如果数据不存在、已过期、或用户权限不足，将返回null。
 */
export declare function getLocalStorage(key: string, userPermissions?: string[]): any;
/**
 * 用于将指定的键值对存储到浏览器的 sessionStorage
 * @param key
 * @param value
 * @param options
 * @returns
 */
export declare function setSessionStorage(key: string, value: any, options?: IOptions): any;
/**
 * 用于获取sessionStorage中指定的键的值
 * @param key 用于获取数据项的键名
 * @param userPermissions
 * @returns
 */
export declare function getSessionStorage(key: string, userPermissions?: string[]): any;
export {};
