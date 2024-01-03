/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: dom操作相关工具函数
 */

/**
 * 递归获取指定class的祖先元素
 * @param dom 
 * @param classname 
 * @returns 
 */
export type TGetParentNode = (dom: HTMLElement, classname: string) => ParentNode | null | undefined;
export const getParentNode: TGetParentNode = (dom: HTMLElement, classname: string) => {
  if (!dom) return;
  const parentNode: HTMLElement = dom.parentNode as HTMLElement;
  if (parentNode && classname) {
    if (Array.from(parentNode.classList).includes(classname)) {
      return parentNode;
    } else {
      return getParentNode(parentNode, classname);
    }
  }
  return parentNode;
};

/**
 * 指定dom元素全屏
 * @param id domId
 */
export type TRequestFullscreenFunction = (id: string) => void;
export const requestFullscreen:TRequestFullscreenFunction = (id: string) => {
  // 尝试通过ID获取DOM元素,使用`any`类型以便调用全屏相关的方法
  const docElm = document.getElementById(id) as any;
  if (docElm.requestFullscreen) {
    // 标准方法
    docElm.requestFullscreen();
  } else if (docElm.msRequestFullscreen) {
    // IE11的全屏方法
    docElm.msRequestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
    // Firefox的全屏方法
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {
     // Chrome及较早的Safari的全屏方法
    docElm.webkitRequestFullScreen();
  }
};

// 退出全屏
export type TExitFullScreenFunction = () => void;
export const exitFullScreen: TExitFullScreenFunction = () => {
  if (document.exitFullscreen) {
    // 使用标准方法退出全屏模式
    document.exitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    // 针对IE浏览器的退出全屏方法
    (document as any).msExitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    // 针对Firefox浏览器的退出全屏方法
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitCancelFullScreen) {
    // 针对Chrome以及旧版Safari的退出全屏方法
    (document as any).webkitCancelFullScreen();
  }
};
