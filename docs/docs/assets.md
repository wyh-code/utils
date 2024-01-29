---
title: 资源
author: wyh-code
date: '2024-01-03'
---

## 下载文件（downloadFile）

`从指定的URL下载文件，并为下载的文件命名为给定的文件名。`

<b>原理：</b>该函数通过获取给定`url`的文件，然后从响应中创建一个`Blob`。接着，它创建一个锚点（`<a>`）元素，将其`href`属性设置为代表`Blob`的 URL，并将`download`属性设置为提供的`label`。通过模拟点击这个锚点元素，用户的浏览器将启动下载过程。在触发下载后，临时对象`URL`会被撤销以释放内存。

使用示例:

```js
/**
 * @param url - 要下载文件的URL地址。
 * @param label - 下载文件时使用的文件名。
 * @returns 返回一个Promise对象，该对象解析为一个指示下载操作成功状态的对象。
 *          如果下载成功，对象将包含一个设置为`true`的`status`属性。
 *          如果下载失败，对象将包含一个设置为`false`的`status`属性和一个包含错误信息的`message`属性。
 */

import { downloadFile } from '@ostore/utils';

downloadFile('http://example.com/file.pdf', 'MyFile.pdf').then((result) => {
  if (result.status) {
    console.log('成功启动下载');
  } else {
    console.error('下载失败:', result.message);
  }
});
```

## base64转二进制（dataURItoBlob）

`将数据URI转换为Blob对象。`

`dataURItoBlob`函数接受一个 Base64 编码的数据 URI 字符串作为参数，并将其转换为 Blob 对象。这使得可以将数据 URI 表示的文件内容以 Blob 的形式用于如文件下载或表单提交等场景。

<b>原理：</b>数据 URI 通常包含两部分：一是媒体类型（MIME 类型），二是 Base64 编码的数据本体。函数首先从数据 URI 中解析出这两部分。然后，它创建一个与数据等长的 ArrayBuffer，并创建一个 Uint8Array 视图来操作该缓冲区。函数逐字节地将 Base64 解码后的数据复制到 ArrayBuffer 中。最后，函数使用解析出的 MIME 类型和填充了数据的 ArrayBuffer 创建一个新的 Blob 对象并返回。

<b>注意事项:</b>

- 输入的数据 URI 需要是有效的 Base64 编码字符串，且包含 MIME 类型。
- 对于大型数据 URI，此操作可能会消耗较多内存，并且可能在一些旧的浏览器上不被支持。

使用示例:

```js
/**
 * @param dataURI - 一个编码为Base64的数据URI字符串。
 * @returns 返回一个表示数据内容的Blob对象。
 */

import { dataURItoBlob } from '@ostore/utils';

// 假设有一个Base64编码的PNG图片的数据URI
const dataURI = 'data:image/png;base64,iVBORw0KGgo...';

// 转换数据URI为Blob对象
const imageBlob = dataURItoBlob(dataURI);

// 使用Blob对象（例如上传到服务器或创建一个可下载的链接）
const formData = new FormData();
formData.append('file', imageBlob, 'image.png');
```

## 图片转Base64（imageToBase64）

`将图片文件转换为 Base64 编码的字符串。这个函数返回一个 Promise，该 Promise 成功解析为图片的 Base64 字符串，或在失败时被拒绝。`

<b>注意事项:</b>

- 请确保在使用此函数时处理 Promise 的拒绝情况，以避免未捕获的 Promise 异常。
- 转换大文件为 Base64 可能会消耗较多的内存，并且可能导致性能问题，建议仅对较小的图片文件使用此函数。
- Base64 编码的图片数据通常比原始二进制数据大约 33%，需要考虑这额外的数据大小。
- 返回的 Base64 字符串可以直接用在 HTML 的 img 元素的 src 属性中，或者用于网络请求中传输图片数据。

使用示例：

```js
/**
 * 将图片文件转换为 Base64 编码的字符串。
 * @param file (File|undefined): 一个 File 对象，代表用户选取的图片文件。如果为 undefined，Promise 将会被拒绝。
 * @returns 一个 Promise，成功时解析为 Base64 编码的字符串，失败时被拒绝并返回一个错误对象。
 */
import { imageToBase64 } from '@ostore/utils';

const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  imageToBase64(file)
    .then((base64String) => {
      console.log('图片的 Base64 编码: ', base64String);
    })
    .catch((error) => {
      console.error('转换失败: ', error.message);
    });
});
```

## 获取图片尺寸（getImageSize）

`用于获取网络图片的尺寸。该函数接受一个图片的URL作为参数，返回一个包含宽度和高度的对象的Promise。`

<b>注意事项:</b>

- 由于图片加载是异步进行的，所以结果是通过 Promise 返回的。
- 确保提供的图片 URL 是有效的，并且服务器支持跨域请求（如果图片和您的网站不同源）。
- 由于浏览器的同源策略，一些图片可能无法直接通过脚本获取其尺寸。需要服务器配置适当的 CORS 设置，以允许跨域资源共享。
- 在使用此函数时，应当对 Promise 进行适当的错误处理，以避免未处理的 Promise 拒绝（rejections）导致的问题。

使用示例：

```js
/**
 * 用于获取网络图片的尺寸。
 * @param imageSrc imageSrc: string; 需要获取尺寸的网络图片的源URL。
 * @returns 返回一个包含宽度和高度的对象的Promise。{ width: number; height: number }
 */

import { getImageSize } from '@ostore/utils';

getImageSize('https://example.com/image.jpg')
  .then((size) => {
    console.log(`Image size: width=${size.width}, height=${size.height}`);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

## 获取Base64编码图片文件大小（getBase64ImageSize）
`此函数用于计算 Base64 编码图片的大致文件大小（以字节为单位）。它通过分析 Base64 编码字符串的长度（排除任何前缀和填充字符）来估算原始二进制数据的大小。`

<b>注意事项:</b>

- 此函数提供的大小是原始图片数据的近似大小，不包括与文件格式相关的任何额外元数据。
- Base64 编码通常会增加原始数据大小约为 1/3。因此，该函数试图通过除去编码引入的附加大小来估算原始大小。
- 如果 Base64 字符串不符合标准编码，函数可能无法正确工作。
- 函数返回的大小是估算值。如果需要精确的原始二进制数据大小，应该将 Base64 字符串转换回二进制形式进行测量。

使用示例：

```js
/**
 * 获取 Base64 编码图片的大致文件大小
 * @param base64String string: Base64 编码的图片字符串。
 * 如果这个字符串包含了数据 URI 前缀（如 data:image/png;base64,），该前缀将会在计算之前被移除。
 * @returns number: 表示 Base64 编码数据的近似字节大小。
 */
import { getBase64ImageSize } from '@ostore/utils';

const base64Image: string = 'data:image/png;base64,iVBORw0...'; // 使用您的实际 Base64 字符串
const imageSizeInBytes: number = getBase64ImageSize(base64Image);
console.log(`Image size: ${imageSizeInBytes} bytes`);

```

## 图片压缩（compressImage）
`compressImage 函数通过使用 HTML Canvas API 来调整图像尺寸并压缩图像质量，以减少图像文件的大小。`

这个函数返回一个 Promise，该 Promise 在图像压缩成功时解析为一个 Blob 对象。

<b>注意事项:</b>

- 函数返回的 Blob 对象默认为 JPEG 格式。如果需要其他格式，请在方法的第二个参数中指定相应的 MIME 类型。
- 确保压缩的质量系数 quality 在 0 到 1 之间，以避免无效参数错误。
- 该函数在浏览器环境中运行，需要支持 HTML Canvas API。

<b>options（ICompressImageOptions）</b>
|参数|类型|说明|默认值|
|:----:|:----:|:----:|:----:|
|maxWidth|number|非必须，目标最大宽度。如果图像宽度大于此值，则将按比例缩小图像的尺寸|默认取图片宽度。|
|maxHeight|number|非必须，目标最大高度。如果图像高度大于此值，则将按比例缩小图像的尺寸|默认取图片高度。|
|quality|number|非必须，图像压缩的质量系数。值应在 0 到 1 之间，其中 1 为最高质量（无损压缩）|默认取 0.8。|
|mime|string|非必须，目标最大宽度。如果图像宽度大于此值，则将按比例缩小图像的尺寸|image/jpeg|

使用示例：
```js
/**
 * 图片压缩
 * @param file File: 必须，要压缩的图像文件对象。
 * @param options ICompressImageOptions: 非必须，压缩配置。
 * @returns Promise<Blob>: 一个 Promise，它在压缩操作成功完成时解析为包含压缩后图像数据的 Blob 对象。
 */
import { compressImage } from '@ostore/utils';

const fileInput = document.getElementById('file-input') as HTMLInputElement;

fileInput.onchange = (event) => {
  const file = (event.target as HTMLInputElement).files![0];

  compressImage(file, 800, 600, 0.7)
    .then((compressedBlob) => {
      // 处理压缩后的 Blob 对象
      console.log('Compressed image Blob:', compressedBlob);
      // 可以将 Blob 转换为 File 对象以便上传或使用
      const compressedFile = new File([compressedBlob], file.name, { type: 'image/jpeg' });
      // 可以创建一个 URL 用于图像预览
      const previewUrl = URL.createObjectURL(compressedFile);
      // 在这里展示图像或将文件上传到服务器
      ... ...
    })
    .catch((error) => {
      // 处理可能发生的压缩错误
      console.error('Image compression error:', error);
    });
};
```