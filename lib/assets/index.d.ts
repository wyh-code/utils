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
