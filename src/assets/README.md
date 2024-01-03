---
nav:
  title: 函数

group:
  title: 工具函数
  order: 0

title: 资源
order: 4
toc: content
---

# 资源相关工具函数

## downloadFile

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

## dataURItoBlob

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

## imageToBase64

`将图像文件转换为 Base64 编码的字符串。这个函数返回一个 Promise，该 Promise 成功解析为图像的 Base64 字符串，或在失败时被拒绝。`

<b>注意事项:</b>

- 请确保在使用此函数时处理 Promise 的拒绝情况，以避免未捕获的 Promise 异常。
- 转换大文件为 Base64 可能会消耗较多的内存，并且可能导致性能问题，建议仅对较小的图像文件使用此函数。
- Base64 编码的图像数据通常比原始二进制数据大约 33%，需要考虑这额外的数据大小。
- 返回的 Base64 字符串可以直接用在 HTML 的 img 元素的 src 属性中，或者用于网络请求中传输图像数据。

使用示例：

```js
/**
 * 将图像文件转换为 Base64 编码的字符串。
 * @param file (File|undefined): 一个 File 对象，代表用户选取的图像文件。如果为 undefined，Promise 将会被拒绝。
 * @returns 一个 Promise，成功时解析为 Base64 编码的字符串，失败时被拒绝并返回一个错误对象。
 */
import { imageToBase64 } from '@ostore/utils';

const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  imageToBase64(file)
    .then((base64String) => {
      console.log('图像的 Base64 编码: ', base64String);
    })
    .catch((error) => {
      console.error('转换失败: ', error.message);
    });
});
```

## getImageSize

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
