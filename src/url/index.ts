/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: url 相关工具函数
 */

/**
 * 获取url参数
 * @param key 指定key
 */
export type TGetUrlParamsFunction = (key?: string) => undefined | string | { [key: string]: string };
export const getUrlParams:TGetUrlParamsFunction = (key?: string) => {
  // 创建一个新的URL对象，用于解析当前页面的URL
  const url = new URL(window.location.href);
  // 使用URLSearchParams解析查询字符串，并将其转换为对象
  const params = Object.fromEntries(new URLSearchParams(url.search))
  // 如果提供了查询参数的键名，返回对应的值；否则返回整个查询参数对象
  return key ? params[key] : params;
}

/**
 * 修改href
 * @param query 
 */
export type TSetSearchParamsFunction = (query: {[key:string]: any}) => void;
export const setSearchParams: TSetSearchParamsFunction = (query: {[key:string]: any}) => {
  // 创建一个新的URL对象，用于操作当前页面的URL
  const url = new URL(window.location.href);
  // 使用URLSearchParams处理当前URL的查询字符串
  const params = new URLSearchParams(url.search);
  // 遍历提供的查询参数对象，并更新URL的查询参数
  for(let key in query){
    params.set(key, query[key]);
  }
  // 更新URL对象的查询字符串
  url.search = params.toString();
  // 使用history.pushState更新浏览器历史记录，并更新地址栏的URL，不刷新页面
  history.pushState({ url: url.href, title: document.title }, document.title, url.href);
};

/*
 * 组装url参数
 */
export type TPackUrlParamsFunction = (patams: {[key: string]: any}) => string;
export const packUrlParams:TPackUrlParamsFunction = (params = {}) => {
  let query = '';
  // 遍历参数对象，将每个参数转换为URL查询字符串的一部分
  for (const key in params) {
    // 拼接每个键值对为key=value格式，并用&连接
    query += `${key}=${params[key]}&`;
  }
  // 返回查询字符串，移除末尾多余的&
  return query.slice(0, -1);
};

