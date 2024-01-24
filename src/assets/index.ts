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
export const dataURItoBlob: TDataURItoBlobFunction = (dataURI: string) => {
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
export function imageToBase64(file: File | undefined): Promise<string> {
  return new Promise((resolve, reject) => {

    if (!file) {
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

/**
 * 获取 Base64 编码图片的大致文件大小
 * @param base64String string: Base64 编码的图片字符串。
 * 如果这个字符串包含了数据 URI 前缀（如 data:image/png;base64,），该前缀将会在计算之前被移除。
 * @returns number: 表示 Base64 编码数据的近似字节大小。
 */
export function getBase64ImageSize(base64String: string): number {
  // 移除 Base64 URL 前缀（如果存在）
  const base64WithoutPrefix = base64String.split(',')[1] || base64String;

  // Base64 编码的字符串长度（不包括前缀）
  const stringLength = base64WithoutPrefix.length;

  // Base64 编码字符串可能包含尾随的 '=' 字符（填充字符）。每个 '=' 表示少了一个字符。
  const paddingCount = base64WithoutPrefix.endsWith('==') ? 2 : base64WithoutPrefix.endsWith('=') ? 1 : 0;

  // 实际编码的数据长度等于字符串长度减去填充字符的数量
  const encodedLength = stringLength - paddingCount;

  // 每4个Base64字符包含3个字节的信息，计算字节大小
  const sizeInBytes = Math.ceil((encodedLength / 4) * 3);

  return sizeInBytes;
}

/**
 * 图片压缩
 * @param file File: 必须，要压缩的图像文件对象。
 * @param options ICompressImageOptions: 非必须，压缩配置。
 * @returns Promise<Blob>: 一个 Promise，它在压缩操作成功完成时解析为包含压缩后图像数据的 Blob 对象。
 */
interface ICompressImageOptions {
  maxWidth?: number; // 目标最大宽度。如果图像宽度大于此值，则将按比例缩小图像的尺寸，默认取图片宽度。
  maxHeight?: number; // 目标最大高度。如果图像高度大于此值，则将按比例缩小图像的尺寸，默认取图片高度。
  quality?: number; // 图像压缩的质量系数。值应在 0 到 1 之间，其中 1 为最高质量（无损压缩），默认取 0.8。
  mime?: string; // 图像压缩后输出格式，默认值为 ‘image/jpeg’。
}
export function compressImage(file: File, options?: ICompressImageOptions): Promise<Blob> {
  let { maxWidth, maxHeight, quality, mime } = options || {};
  quality = quality || 0.8;
  mime = mime || 'image/jpeg';

  return new Promise((resolve, reject) => {
    // 创建一个图片对象
    const image = new Image();
    
    // 通过文件创建一个临时的URL
    const url = URL.createObjectURL(file);
    
    // 图片加载完成后执行压缩操作
    image.onload = () => {
      // 创建一个canvas元素
      const canvas = document.createElement('canvas');
      
      // 计算压缩比例，保持图片的宽高比
      let width = image.width;
      let height = image.height;

      maxWidth = maxWidth || width;
      maxHeight = maxHeight || height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      
      // 设置canvas的尺寸
      canvas.width = width;
      canvas.height = height;
      
      // 在canvas上绘制调整尺寸后的图片
      const ctx = canvas.getContext('2d');
      ctx!.drawImage(image, 0, 0, width, height);
      
      // 将canvas内容导出为Blob对象
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas to Blob conversion failed'));
        }
      }, mime, quality);
      
      // 清理临时创建的URL
      URL.revokeObjectURL(url);
    };
    
    // 注册图片加载错误事件
    image.onerror = () => {
      reject(new Error('There was an error loading the image.'));
      URL.revokeObjectURL(url);
    };
    
    // 设置图像源为创建的临时URL
    image.src = url;
  });
}
