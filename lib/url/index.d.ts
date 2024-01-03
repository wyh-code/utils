/**
 * 获取url参数
 * @param key 指定key
 */
export type TGetUrlParamsFunction = (key?: string) => undefined | string | {
    [key: string]: string;
};
export declare const getUrlParams: TGetUrlParamsFunction;
/**
 * 修改href
 * @param query
 */
export type TSetSearchParamsFunction = (query: {
    [key: string]: any;
}) => void;
export declare const setSearchParams: TSetSearchParamsFunction;
export type TPackUrlParamsFunction = (patams: {
    [key: string]: any;
}) => string;
export declare const packUrlParams: TPackUrlParamsFunction;
