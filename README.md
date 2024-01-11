
## [文档地址](https://utils.mockdata.cn)

## 版本更新
### <code>v1.3.1</code> 2024-01-11
#### 增加
  - <code>date</code>补充延迟函数

    - <code>sleep</code>同步延迟
    - <code>asyncSleep</code>异步延迟

### <code>v1.3.0</code> 2024-01-04
  #### 增加
  - <code>date</code>添加时间模块
    - <code>isDate</code> 获取日期对象
    - <code>isLeapYear</code> 是否闰年
    - <code>getDaysOfMonth</code> 获取月份天数
    - <code>getBeginDayOfMonth</code> 获取月份开始
    - <code>getMonthInfo</code> 获取月份信息
    - <code>getMonthDays</code> 获取日历月份视图信息
  - <code>assets</code>添加资源模块
    - <code>downloadFile</code>下载文件
    - <code>dataURItoBlob</code>base64转二进制
    - <code>imageToBase64</code>图像转Base64 
    - <code>getImageSize</code>获取图片尺寸

  - <code>storage</code>补充缓存函数
    - <code>setLocalStorage</code> 存储 localStorage
    - <code>getLocalStorage</code> 获取 localStorage
    - <code>setSessionStorage</code> 存储 sessionStorage
    - <code>getSessionStorage</code> 获取 sessionStorage

  - <code>format</code>添加格式化模块
    - <code>numberWithCommas</code>数字千分位分割
    - <code>formatBankCardNumber</code>格式化银行卡号

  - <code>math</code>添加数学计算模块
    - <code>compute</code>四则运算

  - <code>DOM</code>添加DOM模块
    - <code>getParentNode</code>获取指定class的祖先元素
    - <code>requestFullscreen</code>指定dom元素全屏
    - <code>exitFullScreen</code>退出全屏

  - <code>颜色值</code>添加颜色值模块
    - <code>rgbaRegex</code> 匹配rgba或rgb颜色
    - <code>hexRegex</code> 匹配十六进制颜色
    - <code>hslRegex</code> 匹配hsl颜色
    - <code>hslaRegex</code> 匹配hsla颜色
    - <code>rgbaToHex</code> rgba转十六进制
    - <code>hexToRgba</code> 十六进制转rgba
    - <code>rgbaToHsl</code> rgba转hsl
    - <code>hslToRgb</code> hsl转rgb
    - <code>hslaToRgba</code> hsla转rgba

  - <code>utils</code>补充工具函数
    - <code>copyAsync</code>复制
    - <code>debounce</code>防抖函数
    - <code>throttle</code>节流函数
 
  #### 删除

  - <code>utils</code>其他函数中移除
    - <code>requestFullscreen</code> 指定 dom 元素全屏
    - <code>exitFullScreen</code> 退出全屏
  - <code>file</code>文件模块移除
### <code>v1.0.4</code> 2023-12-18

- 修复 README

### <code>v1.0.3</code> 2023-12-18

- <code>utils</code>添加工具模块
  - <code>getDataType</code> 获取数据类型
  - <code>getParentNode</code> 递归获取指定 class 的祖先元素
  - <code>hasNotNullValue</code> 判断对象是否至少有一项值
  - <code>hasNullValue</code> 判断对象是否有空值
  - <code>uniqueByKey</code> 根据指定 key 的值，对对象数组进行去重
  - <code>requestFullscreen</code> 指定 dom 元素全屏
  - <code>exitFullScreen</code> 退出全屏
  - <code>copy</code> 复制函数
- <code>file</code>添加文件模块
  - <code>dataURItoBlob</code> 将 base64 转换为字符串中的原始二进制数据
  - <code>downloadFile</code> 下载文件
- <code>storage</code>添加缓存模块
  - <code>getCookies</code> 获取 cookie
- <code>url</code>添加路由模块
  - <code>getUrlParams</code> 获取 url 参数
  - <code>setSearchParams</code> 修改 href
  - <code>packUrlParams</code> 组装 url 参数

### <code>v1.0.2</code> 2023-12-17

- 添加 ts
- 添加部署脚本 deploy.sh

### <code>v1.0.1</code> 2023-12-17

- 添加 rollup 打包

### <code>v1.0.0</code> 2023-12-17

- 初始化测试 scope 发布
