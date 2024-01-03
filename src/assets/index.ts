/*
 * @Author: wyh-code <578311720@qq.com>
 * @Date: 2023-12-18 15:56:53
 * @LastEditors: wyh-code<578311720@qq.com>
 * @LastEditTime: 2023-12-18 15:56:53
 * @Description: 资源操作相关工具函数
 */

/**
 * 下载文件
 * @param url 文件下载路径
 * @param label 下载文件名
 * @returns 返回一个Promise对象，该对象解析为一个指示下载操作成功状态的对象
 */
export type IDownloadFileFunction = (url: string, label: string) => Promise<IDownloadFileResult>;
export interface IDownloadFileResult {
  status: boolean; // 下载状态
  message?: string; // 错误信息
}
export const downloadFile: IDownloadFileFunction = (url: string, label: string) => {
  return fetch(url)
    .then((response) => response.blob())
    .then((blobResponse) => {
      const blob = new Blob([blobResponse]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = label;
      link.click();
      URL.revokeObjectURL(link.href);
      return {
        status: true
      }
    })
    .catch(err => {
      return {
        status: false,
        message: err.message
      }
    });
}


/**
 * 将base64转换为字符串中的原始二进制数据
 * @param dataURI base64
 * @returns 
 */
export type TDataURItoBlobFunction = (dataURI: string) => Blob;
export const dataURItoBlob:TDataURItoBlobFunction = (dataURI: string) => {
  // 解码Base64数据
  const byteString = atob(dataURI.split(',')[1]);
  // 解析MIME类型
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // 创建一个新的ArrayBuffer，其长度等于解码后的数据长度
  const ab = new ArrayBuffer(byteString.length);
  // 创建一个Uint8Array视图来操作ArrayBuffer
  const ia = new Uint8Array(ab);
  // 将解码后的数据逐字节复制到ArrayBuffer
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  // 使用解析出的MIME类型和填充了数据的ArrayBuffer创建Blob对象
  const blob = new Blob([ab], { type: mimeString });
  // 返回Blob对象
  return blob;
};

/**
 * 将图像文件转换为 Base64 编码的字符串。
 * @param file (File|undefined): 一个 File 对象，代表用户选取的图像文件。如果为 undefined，Promise 将会被拒绝。
 * @returns 一个 Promise，成功时解析为 Base64 编码的字符串，失败时被拒绝并返回一个错误对象。
 */
export function imageToBase64(file: File|undefined): Promise<string> {
  return new Promise((resolve, reject) => {

    if(!file){
      reject(new Error('文件内容为空'));
      return;
    }

    // 确保提供的文件是一个图像
    if (!file.type.startsWith('image/')) {
      reject(new Error('文件内容为空'));
      return;
    }

    const reader = new FileReader();
    
    // 文件加载成功后，将内容转换为Base64编码
    reader.onload = () => {
      // `reader.result` 包含了Base64编码的图像
      resolve(reader.result as string);
    };

    // 文件加载失败时触发reject
    reader.onerror = (error) => reject(error);

    // 开始读取文件内容
    reader.readAsDataURL(file);
  });
}

/**
 * 用于获取网络图片的尺寸。
 * @param imageSrc imageSrc: string; 需要获取尺寸的网络图片的源URL。
 * @returns 返回一个包含宽度和高度的对象的Promise。
 */
export function getImageSize(imageSrc: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // 图片加载完成时触发的事件
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    // 图片加载失败时触发的事件
    img.onerror = (errorEvent) => {
      reject(new Error('Image could not be loaded.'));
    };

    // 设置图片源
    img.src = imageSrc;
  });
}
