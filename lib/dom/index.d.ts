/**
 * 递归获取指定class的祖先元素
 * @param dom
 * @param classname
 * @returns
 */
export type TGetParentNode = (dom: HTMLElement, classname: string) => ParentNode | null | undefined;
export declare const getParentNode: TGetParentNode;
/**
 * 指定dom元素全屏
 * @param id domId
 */
export type TRequestFullscreenFunction = (id: string) => void;
export declare const requestFullscreen: TRequestFullscreenFunction;
export type TExitFullScreenFunction = () => void;
export declare const exitFullScreen: TExitFullScreenFunction;
