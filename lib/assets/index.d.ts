/**
 * 下载文件
 * @param url 文件下载路径
 * @param label 下载文件名
 * @returns 返回一个Promise对象，该对象解析为一个指示下载操作成功状态的对象
 */
export type IDownloadFileFunction = (url: string, label: string) => Promise<IDownloadFileResult>;
export interface IDownloadFileResult {
    status: boolean;
    message?: string;
}
export declare const downloadFile: IDownloadFileFunction;
/**
 * 将base64转换为字符串中的原始二进制数据
 * @param dataURI base64
 * @returns
 */
export type TDataURItoBlobFunction = (dataURI: string) => Blob;
export declare const dataURItoBlob: TDataURItoBlobFunction;
/**
 * 将图像文件转换为 Base64 编码的字符串。
 * @param file (File|undefined): 一个 File 对象，代表用户选取的图像文件。如果为 undefined，Promise 将会被拒绝。
 * @returns 一个 Promise，成功时解析为 Base64 编码的字符串，失败时被拒绝并返回一个错误对象。
 */
export declare function imageToBase64(file: File | undefined): Promise<string>;
/**
 * 用于获取网络图片的尺寸。
 * @param imageSrc imageSrc: string; 需要获取尺寸的网络图片的源URL。
 * @returns 返回一个包含宽度和高度的对象的Promise。
 */
export declare function getImageSize(imageSrc: string): Promise<{
    width: number;
    height: number;
}>;
/**
 * 获取 Base64 编码图片的大致文件大小
 * @param base64String string: Base64 编码的图片字符串。
 * 如果这个字符串包含了数据 URI 前缀（如 data:image/png;base64,），该前缀将会在计算之前被移除。
 * @returns number: 表示 Base64 编码数据的近似字节大小。
 */
export declare function getBase64ImageSize(base64String: string): number;
/**
 * 图片压缩
 * @param file File: 必须，要压缩的图像文件对象。
 * @param options ICompressImageOptions: 非必须，压缩配置。
 * @returns Promise<Blob>: 一个 Promise，它在压缩操作成功完成时解析为包含压缩后图像数据的 Blob 对象。
 */
interface ICompressImageOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    mime?: string;
}
export declare function compressImage(file: File, options?: ICompressImageOptions): Promise<Blob>;
export {};
