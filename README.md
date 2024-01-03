---
nav:
  title: 函数
  path: /utils/version

group:
  title: 版本更新
  order: 99999

title: 历史版本
toc: content
---

## [文档地址](utils.ostore.site)

## 版本更新
### <code>v1.3.0</code> 2024-01-03


### <code>v1.0.4</code> 2023-12-18

- 修复 README

### <code>v1.0.3</code> 2023-12-18

- <code>utils</code>工具类函数添加
  - <code>getDataType</code> 获取数据类型
  - <code>getParentNode</code> 递归获取指定 class 的祖先元素
  - <code>hasNotNullValue</code> 判断对象是否至少有一项值
  - <code>hasNullValue</code> 判断对象是否有空值
  - <code>uniqueByKey</code> 根据指定 key 的值，对对象数组进行去重
  - <code>requestFullscreen</code> 指定 dom 元素全屏
  - <code>exitFullScreen</code> 退出全屏
  - <code>copy</code> 复制函数
- <code>file</code>文件类函数添加
  - <code>dataURItoBlob</code> 将 base64 转换为字符串中的原始二进制数据
  - <code>downloadFile</code> 下载文件
- <code>storage</code>缓存类函数添加
  - <code>getCookies</code> 获取 cookie
- <code>url</code>路由类函数补充
  - <code>packUrlParams</code> 组装 url 参数
  - <code>setSearchParams</code> 修改 href
  - <code>getUrlParams</code> 获取 url 参数

### <code>v1.0.2</code> 2023-12-17

- 添加 ts
- 添加部署脚本 deploy.sh

### <code>v1.0.1</code> 2023-12-17

- 添加 rollup 打包

### <code>v1.0.0</code> 2023-12-17

- 初始化测试 scope 发布
