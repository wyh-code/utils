var ostore_utils = (function (exports) {
    'use strict';

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 资源操作相关工具函数
     */
    var downloadFile = function (url, label) {
        return fetch(url)
            .then(function (response) { return response.blob(); })
            .then(function (blobResponse) {
            var blob = new Blob([blobResponse]);
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = label;
            link.click();
            URL.revokeObjectURL(link.href);
            return {
                status: true
            };
        })
            .catch(function (err) {
            return {
                status: false,
                message: err.message
            };
        });
    };
    var dataURItoBlob = function (dataURI) {
        // 解码Base64数据
        var byteString = atob(dataURI.split(',')[1]);
        // 解析MIME类型
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // 创建一个新的ArrayBuffer，其长度等于解码后的数据长度
        var ab = new ArrayBuffer(byteString.length);
        // 创建一个Uint8Array视图来操作ArrayBuffer
        var ia = new Uint8Array(ab);
        // 将解码后的数据逐字节复制到ArrayBuffer
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        // 使用解析出的MIME类型和填充了数据的ArrayBuffer创建Blob对象
        var blob = new Blob([ab], { type: mimeString });
        // 返回Blob对象
        return blob;
    };
    /**
     * 将图像文件转换为 Base64 编码的字符串。
     * @param file (File|undefined): 一个 File 对象，代表用户选取的图像文件。如果为 undefined，Promise 将会被拒绝。
     * @returns 一个 Promise，成功时解析为 Base64 编码的字符串，失败时被拒绝并返回一个错误对象。
     */
    function imageToBase64(file) {
        return new Promise(function (resolve, reject) {
            if (!file) {
                reject(new Error('文件内容为空'));
                return;
            }
            // 确保提供的文件是一个图像
            if (!file.type.startsWith('image/')) {
                reject(new Error('文件内容为空'));
                return;
            }
            var reader = new FileReader();
            // 文件加载成功后，将内容转换为Base64编码
            reader.onload = function () {
                // `reader.result` 包含了Base64编码的图像
                resolve(reader.result);
            };
            // 文件加载失败时触发reject
            reader.onerror = function (error) { return reject(error); };
            // 开始读取文件内容
            reader.readAsDataURL(file);
        });
    }
    /**
     * 用于获取网络图片的尺寸。
     * @param imageSrc imageSrc: string; 需要获取尺寸的网络图片的源URL。
     * @returns 返回一个包含宽度和高度的对象的Promise。
     */
    function getImageSize(imageSrc) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            // 图片加载完成时触发的事件
            img.onload = function () {
                resolve({ width: img.width, height: img.height });
            };
            // 图片加载失败时触发的事件
            img.onerror = function (errorEvent) {
                reject(new Error('Image could not be loaded.'));
            };
            // 设置图片源
            img.src = imageSrc;
        });
    }

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 颜色值相关工具函数
     */
    // 此正则表达式用于匹配符合 CSS rgba 或 rgb 颜色格式的字符串。
    var rgbaRegex = /^rgba?\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\s*(?:,\s*(1|0|0?\.\d+))?\s*\)$/;
    // 用于验证十六进制颜色代码的正则表达式。
    var hexRegex = /^#(?:[A-Fa-f0-9]{3}){1,2}$|^#(?:[A-Fa-f0-9]{4}){1,2}$/;
    var hslRegex = /^hsl\(\s*(360|3[0-5]\d|[12]?\d{1,2})\s*,\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*\)$/;
    var hslaRegex = /^hsla\(\s*(360|3[0-5]\d|[12]?\d{1,2})\s*,\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*,\s*(1|0|0\.\d+|\.\d+)\s*\)$/;
    /**
     * 将rgb或rgba颜色字符串转换为多种颜色格式，包括hex（十六进制）、hexa（带透明度的十六进制）、rgb、rgba以及HSL（色相、饱和度、亮度）相关格式。
     * @param rgba: string  一个符合rgba格式的颜色字符串，例如："rgba(255, 165, 0, 0.8)"。
     * @returns 返回一个colorResult对象，其中包含以下属性：
     * hex: string; 不带透明度的十六进制颜色代码。
     * hexa: string; 带有透明度的十六进制颜色代码。
     * rgb: string; 不带透明度的RGB颜色表示，即使原始rgba字符串包含透明度信息。
     * rgba: string; 包括透明度的原始RGB颜色表示。
     * hsl: string; 转换为HSL颜色表示的字符串。
     * hsla: string; 转换为带透明度的HSL颜色表示的字符串。
     * r: number; 红色通道的值。
     * g: number; 绿色通道的值。
     * b: number; 蓝色通道的值。
     * a: number; 透明度值。
    */
    function rgbaToHex(rgba) {
        var _a = Array.from(rgba.match(rgbaRegex) || []); _a[0]; var r = _a[1], g = _a[2], b = _a[3], _b = _a[4], a = _b === void 0 ? 1 : _b;
        var toHex = function (n) { return Number(n).toString(16).padStart(2, '0'); };
        var alpha = a !== undefined ? toHex(Math.round(Number(a) * 255)) : '';
        var hsl = rgbaToHsl(r, g, b);
        var hsla = rgbaToHsl(r, g, b, a);
        return {
            hex: "#".concat(toHex(r)).concat(toHex(g)).concat(toHex(b)),
            hexa: "#".concat(toHex(r)).concat(toHex(g)).concat(toHex(b)).concat(alpha),
            rgb: "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ")"),
            rgba: "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")"),
            hsl: hsl,
            hsla: hsla,
            r: r,
            g: g,
            b: b,
            a: a
        };
    }
    /**
     * 用于将十六进制颜色代码（包括可选的透明度）转换为多种颜色格式。
     * 这包括rgba、rgb、带透明度的hex（十六进制）、不带透明度的hex以及HSL（色相、饱和度、亮度）格式。
     * @param hexa: string  一个符合十六进制颜色代码格式的字符串。可以是3位、4位、6位或8位十六进制数，例如：#FFF，#FFFF，#FFFFFF，#FFFFFFFF。
     * @returns
     */
    function hexToRgba(hexa) {
        hexa = hexa.replace(/^#/, '');
        if ([3, 4].includes(hexa.length)) {
            hexa = hexa.split('').map(function (char) { return char + char; }).join('');
        }
        if (hexa.length === 6) {
            hexa = hexa + 'FF';
        }
        var r = parseInt(hexa.slice(0, 2), 16);
        var g = parseInt(hexa.slice(2, 4), 16);
        var b = parseInt(hexa.slice(4, 6), 16);
        var a = +(parseInt(hexa.slice(6, 8), 16) / 255).toFixed(2);
        var hsl = rgbaToHsl(r, g, b);
        var hsla = rgbaToHsl(r, g, b, a);
        return {
            hsl: hsl,
            hsla: hsla,
            rgb: "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ")"),
            rgba: "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")"),
            hex: "#".concat(hexa.slice(0, 6)),
            hexa: "#".concat(hexa),
            r: r,
            g: g,
            b: b,
            a: a
        };
    }
    /**
     * 用于将RGBA颜色值转换为HSL（色相、饱和度、亮度）或HSLA（加上透明度）格式的颜色字符串。
     * @param r: number 红色通道的值，范围从0到255。
     * @param g g: number 绿色通道的值，范围从0到255。
     * @param b: number 蓝色通道的值，范围从0到255。
     * @param a?: number (可选) 透明度值，范围从0到1。如果省略该参数，返回的颜色字符串将是HSL格式；如果提供该参数，返回的颜色字符串将是HSLA格式。
     * @returns 返回一个HSL或HSLA格式的颜色字符串，例如："hsl(120, 100%, 50%)" 或 "hsla(120, 100%, 50%, 0.75)"。
     */
    function rgbaToHsl(r, g, b, a) {
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        s = s * 100;
        l = l * 100;
        h = Math.round(h * 360);
        s = Math.round(s);
        l = Math.round(l);
        // 如果提供了alpha值，返回HSLA格式
        if (a !== undefined) {
            return "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(a, ")");
        }
        // 如果没有提供alpha值，返回HSL格式
        return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
    }
    /**
     * 用于将HSL颜色格式（色相、饱和度、亮度）转换为RGB格式。
     * 同时，这个函数还能提供十六进制（HEX）颜色格式、RGBA颜色格式以及HSLA颜色格式的转换结果。
     * @param hsl: string HSL格式的颜色字符串，例如："hsl(120, 50%, 50%)"。
     * @returns 返回一个colorResult对象，格式同函数 rgbaToHex 返回值。
     */
    function hslToRgb(hsl) {
        var _a = Array.from(hsl.match(hslRegex) || []); _a[0]; var h = _a[1], s = _a[2], l = _a[3];
        s /= 100;
        l /= 100;
        var c = (1 - Math.abs(2 * l - 1)) * s;
        var x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        var m = l - c / 2;
        var r = 0;
        var g = 0;
        var b = 0;
        if (h >= 0 && h < 60) {
            r = c;
            g = x;
            b = 0;
        }
        else if (h >= 60 && h < 120) {
            r = x;
            g = c;
            b = 0;
        }
        else if (h >= 120 && h < 180) {
            r = 0;
            g = c;
            b = x;
        }
        else if (h >= 180 && h < 240) {
            r = 0;
            g = x;
            b = c;
        }
        else if (h >= 240 && h < 300) {
            r = x;
            b = c;
            g = 0;
        }
        else if (h >= 300 && h < 360) {
            r = c;
            b = x;
            g = 0;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        var hexResult = rgbaToHex("rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")"));
        return {
            rgb: "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")"),
            rgba: "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ", 1)"),
            hex: hexResult.hex,
            hexa: hexResult.hexa,
            hsl: hsl,
            hsla: "hsla(".concat(h, ", ").concat(Math.round(s * 100), "%, ").concat(Math.round(l * 100), "%, 1)"),
            r: r,
            g: g,
            b: b,
            a: 1
        };
    }
    /**
     * 用于将HSLA（色相、饱和度、亮度、透明度）格式的颜色字符串转换为包含RGBA、RGB、HEX、HSL、HSLA格式的颜色值。
     * 该函数可以处理带有透明度的颜色，并返回一个对象，其中包括了转换后的各种颜色表示方法。
     * @param hsla: string  HSLA格式的颜色字符串，例如："hsla(120, 50%, 50%, 0.5)"。
     * @returns 返回一个colorResult对象，格式同函数 rgbaToHex 返回值。
     */
    function hslaToRgba(hsla) {
        var _a = Array.from(hsla.match(hslaRegex) || []); _a[0]; var h = _a[1], s = _a[2], l = _a[3], _b = _a[4], a = _b === void 0 ? 1 : _b;
        var _c = hslToRgb("hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)")), r = _c.r, g = _c.g, b = _c.b;
        var hexResult = rgbaToHex("rgb(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")"));
        return {
            rgb: "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")"),
            rgba: "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")"),
            hex: hexResult.hex,
            hexa: hexResult.hexa,
            hsl: "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)"),
            hsla: hsla,
            r: r,
            g: g,
            b: b,
            a: a
        };
    }

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 时间操作相关工具函数
     */
    /**
     * 函数用于检查传入的参数是否为日期对象或能转换为日期对象的字符串
     * 如果是，则返回相应的Date对象；如果不是，或者参数未提供，则默认返回当前日期的Date对象。
     * @param date?: string | Date (可选) 可选参数，可以是下面两种之一：
     * Date对象：直接返回这个Date对象。
     * 字符串：应符合YYYY-MM-DD或MM/DD/YYYY格式，将被解析为Date对象。
     * 如果未提供参数或提供的字符串不符合格式要求，则函数返回当前日期的Date对象。
     * @returns 返回一个Date对象，可以是基于传入参数解析的日期，或者当前日期。
     */
    function isDate(date) {
        // 如果没有提供参数，则返回当前日期
        if (!date) {
            return new Date();
        }
        // 如果提供的是Date对象
        if (date instanceof Date) {
            return date;
        }
        // 如果提供的是字符串，尝试解析字符串并返回日期对象
        if (typeof date === 'string') {
            var separator = date.indexOf('-') > -1 ? '-' : '/';
            var dateArr = date.split(separator);
            // 如果没有提供完整的日期，则返回当前日期
            if (!dateArr[2])
                return new Date();
            // 返回解析后的日期，注意月份从0开始，所以需要减1
            return new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]));
        }
        // 如果提供的参数无法识别为有效的日期，则返回当前日期
        return new Date();
    }
    /**
     * 判断是否为闰年
     * @param year: number | string 年份，可以是一个整数或整数形式的字符串。
     * @returns 布尔值（boolean），true表示是闰年，false表示不是闰年。
     */
    function isLeapYear(year) {
        var Y = parseInt(year.toString());
        if ((Y % 4 === 0 && Y % 100 !== 0) || (Y % 400 === 0)) {
            return true;
        }
        return false;
    }
    /**
     * 获取传入时间的当月天数
     * @param d: DateInfo DateInfo是一个接口，定义如下：
     *  interface DateInfo {
     *    year: number;  // 年份，为四位数的整数
     *    month: number; // 月份，为0到11的整数，其中0代表一月，11代表十二月
     *  }
     * @returns  数字（number），表示传入的日期所在月份的天数。
     */
    function getDaysOfMonth(d) {
        var daysPerMonth = [
            31,
            isLeapYear(d.year) ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ];
        return daysPerMonth[d.month];
    }
    /**
     * 用于获取指定年月的第一天是星期几。
     * @param d: DateInfo：一个 DateInfo 类型的对象，其中包含两个属性：
     * year: number：年份，为四位数的数字。
     * month: number：月份，为一个从 0 开始的数字，其中 0 表示一月，11 表示十二月。
     * @returns 一个数字，范围从 0（星期日）到 6（星期六），表示指定月份的第一天是星期几。
     */
    function getBeginDayOfMonth(d) {
        // 注意: JavaScript中月份是从0开始的，所以d.month已经是正确的月份索引
        return new Date(d.year, d.month, 1).getDay();
    }
    function getMonthInfo(time) {
        var date = isDate(time); // 转换time参数为Date对象
        var d = {
            year: date.getFullYear(),
            month: date.getMonth()
        };
        // 这个月一共多少天
        var days = getDaysOfMonth(d);
        // 这个月是星期几开始的
        var beginWeek = getBeginDayOfMonth(d);
        return {
            year: d.year,
            month: d.month, // 注意：月份返回的是从0开始的月份索引
            days: days,
            beginWeek: beginWeek
        };
    }
    /**
     *
     * @param time: Date：一个JavaScript Date 对象，代表要显示的月份和年份。
     * @returns DayInfo[]：一个包含多个 DayInfo 对象的数组，每个 DayInfo 对象代表一个特定的天数，并包含以下属性：
     * year: number：年份。
     * month: number：月份，从0开始（0代表一月，11代表十二月）。
     * day: number：天数。
     * time: number：该日期的时间戳。
     */
    function getMonthDays(time) {
        var info = getMonthInfo(time);
        var year = info.year, month = info.month, days = info.days, beginWeek = info.beginWeek;
        var dayArr = [];
        // 需要添加的日期
        var len = days + beginWeek + (7 - (days + beginWeek) % 7);
        for (var i = 0; i < len; i++) {
            var day = i - beginWeek + 1;
            // 重置时间
            var Y = new Date(year, month, day).getFullYear();
            var M = new Date(year, month, day).getMonth();
            var D = new Date(year, month, day).getDate();
            var T = new Date(year, month, day).getTime();
            dayArr.push({ year: Y, month: M, day: D, time: T });
        }
        return dayArr;
    }

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: dom操作相关工具函数
     */
    var getParentNode = function (dom, classname) {
        if (!dom)
            return;
        var parentNode = dom.parentNode;
        if (parentNode && classname) {
            if (Array.from(parentNode.classList).includes(classname)) {
                return parentNode;
            }
            else {
                return getParentNode(parentNode, classname);
            }
        }
        return parentNode;
    };
    var requestFullscreen = function (id) {
        // 尝试通过ID获取DOM元素,使用`any`类型以便调用全屏相关的方法
        var docElm = document.getElementById(id);
        if (docElm.requestFullscreen) {
            // 标准方法
            docElm.requestFullscreen();
        }
        else if (docElm.msRequestFullscreen) {
            // IE11的全屏方法
            docElm.msRequestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            // Firefox的全屏方法
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            // Chrome及较早的Safari的全屏方法
            docElm.webkitRequestFullScreen();
        }
    };
    var exitFullScreen = function () {
        if (document.exitFullscreen) {
            // 使用标准方法退出全屏模式
            document.exitFullscreen();
        }
        else if (document.msExitFullscreen) {
            // 针对IE浏览器的退出全屏方法
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            // 针对Firefox浏览器的退出全屏方法
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            // 针对Chrome以及旧版Safari的退出全屏方法
            document.webkitCancelFullScreen();
        }
    };

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 格式化相关工具函数
     */
    /**
     * 数字千分位分割
     * @param x: number | string  一个数字或者是一个表示数字的字符串。
     * @returns 返回一个字符串，其中输入数字的每三位数由逗号分隔。
     */
    function numberWithCommas(x) {
        // 将输入转换成字符串
        var parts = x.toString().split(".");
        // 使用正则表达式在千位上添加逗号
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // 将整数部分和小数部分重新连接起来
        return parts.join(".");
    }
    /**
     * 用于格式化银行卡号，使其更易于阅读。
     * @param cardNumber: string  银行卡号字符串，可以包含数字和（可选的）分隔符如破折号或空格。
     * @returns 格式化后的银行卡号字符串，每四位数字之间由一个空格分隔。
    */
    function formatBankCardNumber(cardNumber) {
        // 移除非数字字符
        var digitsOnly = cardNumber.replace(/\D/g, '');
        // 使用正则表达式，在每4个数字后添加一个空格
        var formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
        return formatted.trim(); // 如果有尾随空格，去掉它
    }

    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    }
    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 数学计算相关工具函数
     */
    /**
     * @param type - 计算类型，可以是加法("+")、减法("-")、乘法("*")或除法("/")。
     * @param args - 要进行计算的数字序列。
     * @returns 返回一个包含计算结果的对象。该对象还包含一个next方法，可以用于链式调用进一步的计算。
     *
     * next方法允许进行链式计算:
     * compute("+", 0.1, 0.2).next("*", 10) 返回 { result: 3, next: [Function] }
     */
    var compute = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 计算放大倍数
        var getPower = function (numbers) {
            // 获取所有数字中小数位数
            var lens = numbers.map(function (num) { var _a; return ((_a = num.toString().split(".")[1]) === null || _a === void 0 ? void 0 : _a.length) || 0; });
            // 获取所有数字中最大小数位数
            var len = Math.max.apply(Math, lens);
            // 计算放大倍数，即10的最大小数位数次幂
            return Math.pow(10, len);
        };
        // 获取当前数字序列的放大倍数
        var power = getPower(args);
        // 将所有数字放大为整数
        var newNumbers = args.map(function (num) { return Math.round(num * power); });
        // 初始化计算结果
        var result = 0;
        switch (type) {
            case "+":
                // 加法：累加放大后的所有数字，然后缩小回原来的倍数
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber + nextNumber; }, result) / power;
                break;
            case "-":
                // 减法：累减放大后的所有数字，然后缩小回原来的倍数
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber - nextNumber; }) / power;
                break;
            case "*":
                // 乘法：累乘放大后的所有数字，然后除以放大倍数的相应次方
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber * nextNumber; }) / (Math.pow(power, newNumbers.length));
                break;
            case "/":
                // 除法：累除放大后的所有数字
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber / nextNumber; });
                break;
        }
        // 返回计算结果及next方法，以支持链式计算
        return {
            result: result,
            next: function (nextType) {
                var nextArgs = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    nextArgs[_i - 1] = arguments[_i];
                }
                // next方法接收一个新的计算类型及其他数字，并以当前结果作为下一次计算的起点
                return compute.apply(void 0, __spreadArray([nextType, result], nextArgs, false));
            }
        };
    };

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: localStorage、cookie 相关工具函数
     */
    var getCookies = function (name) {
        // 分割`document.cookie`字符串，并将其转换为cookie对象
        var obj = document.cookie.split(';').reduce(function (map, str) {
            // 获取每一对cookie名称和值
            map[str.split('=')[0].trim()] = str.split('=')[1].trim();
            return map;
        }, {});
        // 如果提供了cookie名，返回对应的值；否则返回整个cookie对象
        return name ? obj[name] : obj;
    };
    function setLocalStorage(key, value, options) {
        var err;
        try {
            // 获取当前时间
            var currentTime = Date.now();
            // 设置过期时间
            var expiry = options === null || options === void 0 ? void 0 : options.expiry;
            if (expiry) {
                expiry += currentTime;
            }
            var item = {
                data: value,
                options: options,
            };
            localStorage.setItem(key, JSON.stringify(item)); // 将对象序列化后存储到localStorage
        }
        catch (error) {
            err = error;
        }
        return err;
    }
    /**
     * 用于获取localStorage中指定的键的值
     * @param key 用于获取数据项的键名
     * @param userPermissions?: string[] (可选);一个字符串数组，代表请求数据的用户所拥有的权限。这些权限将与缓存项的权限进行比较，以确定用户是否有权访问数据。
     * @returns 函数返回与key关联的数据，如果数据未过期并且用户具有足够的访问权限。如果数据不存在、已过期、或用户权限不足，将返回null。
     */
    function getLocalStorage(key, userPermissions) {
        var _a, _b, _c;
        var itemStr = localStorage.getItem(key);
        if (itemStr) {
            try {
                var item = JSON.parse(itemStr);
                var currentTime = Date.now();
                // 检查是否设置了截止时间并且是否已过期
                if (((_a = item.options) === null || _a === void 0 ? void 0 : _a.endTime) && currentTime > item.options.endTime) {
                    localStorage.removeItem(key);
                    return null;
                }
                // 检查基于当前时间的过期时间
                if (((_b = item.options) === null || _b === void 0 ? void 0 : _b.expiry) && currentTime > item.options.expiry) {
                    localStorage.removeItem(key);
                    return null;
                }
                // 检查用户是否有权访问缓存数据
                if ((_c = item.options) === null || _c === void 0 ? void 0 : _c.permissions) {
                    if (!userPermissions || !userPermissions.length) {
                        return null;
                    }
                    var hasPermission = item.options.permissions.some(function (permission) { return userPermissions.includes(permission); });
                    if (!hasPermission) {
                        console.error('Access denied: User does not have the required permissions.');
                        return null;
                    }
                }
                return item.data; // 返回未过期且具有权限的数据
            }
            catch (error) {
                console.error('Error parsing localStorage item:', error);
                return null;
            }
        }
        return null;
    }
    /**
     * 用于将指定的键值对存储到浏览器的 sessionStorage
     * @param key
     * @param value
     * @param options
     * @returns
     */
    function setSessionStorage(key, value, options) {
        var err;
        try {
            // 获取当前时间
            var currentTime = Date.now();
            // 设置过期时间
            var expiry = options === null || options === void 0 ? void 0 : options.expiry;
            if (expiry) {
                expiry += currentTime;
            }
            var item = {
                data: value,
                options: options,
            };
            sessionStorage.setItem(key, JSON.stringify(item)); // 将对象序列化后存储到 sessionStorage
        }
        catch (error) {
            err = error;
        }
        return err;
    }
    /**
     * 用于获取sessionStorage中指定的键的值
     * @param key 用于获取数据项的键名
     * @param userPermissions
     * @returns
     */
    function getSessionStorage(key, userPermissions) {
        var _a, _b, _c;
        var itemStr = sessionStorage.getItem(key);
        if (itemStr) {
            try {
                var item = JSON.parse(itemStr);
                var currentTime = Date.now();
                // 检查是否设置了截止时间并且是否已过期
                if (((_a = item.options) === null || _a === void 0 ? void 0 : _a.endTime) && currentTime > item.options.endTime) {
                    sessionStorage.removeItem(key);
                    return null;
                }
                // 检查基于当前时间的过期时间
                if (((_b = item.options) === null || _b === void 0 ? void 0 : _b.expiry) && currentTime > item.options.expiry) {
                    sessionStorage.removeItem(key);
                    return null;
                }
                // 检查用户是否有权访问缓存数据
                if ((_c = item.options) === null || _c === void 0 ? void 0 : _c.permissions) {
                    if (!userPermissions || !userPermissions.length) {
                        return null;
                    }
                    var hasPermission = item.options.permissions.some(function (permission) { return userPermissions.includes(permission); });
                    if (!hasPermission) {
                        console.error('Access denied: User does not have the required permissions.');
                        return null;
                    }
                }
                return item.data; // 返回未过期且具有权限的数据
            }
            catch (error) {
                console.error('Error parsing sessionStorage item:', error);
                return null;
            }
        }
        return null;
    }

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: url 相关工具函数
     */
    var getUrlParams = function (key) {
        // 创建一个新的URL对象，用于解析当前页面的URL
        var url = new URL(window.location.href);
        // 使用URLSearchParams解析查询字符串，并将其转换为对象
        var params = Object.fromEntries(new URLSearchParams(url.search));
        // 如果提供了查询参数的键名，返回对应的值；否则返回整个查询参数对象
        return key ? params[key] : params;
    };
    var setSearchParams = function (query) {
        // 创建一个新的URL对象，用于操作当前页面的URL
        var url = new URL(window.location.href);
        // 使用URLSearchParams处理当前URL的查询字符串
        var params = new URLSearchParams(url.search);
        // 遍历提供的查询参数对象，并更新URL的查询参数
        for (var key in query) {
            params.set(key, query[key]);
        }
        // 更新URL对象的查询字符串
        url.search = params.toString();
        // 使用history.pushState更新浏览器历史记录，并更新地址栏的URL，不刷新页面
        history.pushState({ url: url.href, title: document.title }, document.title, url.href);
    };
    var packUrlParams = function (params) {
        if (params === void 0) { params = {}; }
        var query = '';
        // 遍历参数对象，将每个参数转换为URL查询字符串的一部分
        for (var key in params) {
            // 拼接每个键值对为key=value格式，并用&连接
            query += "".concat(key, "=").concat(params[key], "&");
        }
        // 返回查询字符串，移除末尾多余的&
        return query.slice(0, -1);
    };

    /*
     * @Author: wyh-code <578311720@qq.com>
     * @Date: 2023-12-18 15:56:53
     * @LastEditors: wyh-code<578311720@qq.com>
     * @LastEditTime: 2023-12-18 15:56:53
     * @Description: 其他相关工具函数
     */
    var copy = function (text, callback) {
        if (text) {
            var input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', text);
            document.body.appendChild(input);
            input.setSelectionRange(0, 99999);
            input.select();
            try {
                if (document.execCommand('Copy')) {
                    document.execCommand('Copy');
                    callback && callback({ status: true });
                }
                else {
                    callback && callback({ status: false, message: "document.execCommand('Copy')不存在" });
                }
            }
            catch (err) {
                callback && callback({ status: false, message: err.message });
            }
            document.body.removeChild(input);
        }
    };
    var copyAsync = function (text) {
        return new Promise(function (resolve, reject) {
            if (text) {
                var input = document.createElement('input');
                input.setAttribute('readonly', 'readonly');
                input.setAttribute('value', text);
                document.body.appendChild(input);
                input.setSelectionRange(0, 99999);
                input.select();
                try {
                    if (document.execCommand('Copy')) {
                        document.execCommand('Copy');
                        resolve({ status: true });
                    }
                    else {
                        reject({ status: false, message: "document.execCommand('Copy')不存在" });
                    }
                }
                catch (err) {
                    reject({ status: false, message: err.message });
                }
                document.body.removeChild(input);
            }
        });
    };
    var uniqueByKey = function (arr, key) {
        var hash = {};
        var result = arr.reduce(function (total, currentValue) {
            if (currentValue && typeof currentValue === 'object' && !hash[currentValue[key]]) {
                // 如果当前元素的key值没有在hash对象里，则可放入最终结果数组
                hash[currentValue[key]] = true; // 标记键值已经处理
                total.push(currentValue); // 添加唯一对象到结果数组
            }
            return total; // 返回累积的结果
        }, []);
        return result;
    };
    var hasNullValue = function (obj) {
        var _a;
        var result = false;
        // 使用可选链确保obj不为null或undefined
        (_a = Object.values(obj)) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
            // 检查属性值是否为空字符串或null
            if (item === '' || item === null) {
                result = true;
            }
        });
        // 返回检查结果
        return result;
    };
    /**
     * 判断对象是否至少有一项值
     * @param obj
     */
    var hasNotNullValue = function (obj) {
        var _a;
        var result = false;
        (_a = Object.values(obj)) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
            if (item !== '' && item !== null && item !== undefined) {
                result = true;
            }
        });
        return result;
    };
    var getDataType = function (obj) {
        var s = Object.prototype.toString.call(obj);
        var result = s.match(/\[object (.*?)\]/);
        // 从匹配结果中提取类型字符串，并将其转换为小写
        // 如果匹配失败，即result为null，则直接返回null
        return result && result[1].toLowerCase();
    };
    /**
     * 防抖函数
     * @param obj
     * @returns  debounce 函数接收一个函数 F，等待时间 wait，以及一个可选的 immediate 标志
     */
    function debounce(func, wait, immediate) {
        if (immediate === void 0) { immediate = false; }
        var timeout = null;
        // 返回的函数与输入函数 F 接受相同的参数
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // 保存 this 上下文和传入的参数
            var context = this;
            // 清理函数，用于在等待时间结束后执行
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            };
            // 判断是否立即执行
            var callNow = immediate && timeout === null;
            // 如果已经有计时器存在，清除它，这样我们就可以重设等待时间
            if (timeout !== null) {
                clearTimeout(timeout);
            }
            // 重新设置计时器
            timeout = setTimeout(later, wait);
            // 如果设置了立即执行，那么没有计时器存在时就执行函数
            if (callNow)
                func.apply(context, args);
        };
    }
    /**
     * 节流函数
     * @param func
     * @param limit
     * @returns
     */
    function throttle(func, limit) {
        var inThrottle;
        var lastFunc;
        var lastRan;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var context = this;
            if (!inThrottle) {
                func.apply(context, args);
                lastRan = Date.now();
                inThrottle = true;
            }
            else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, Math.max(limit - (Date.now() - lastRan), 0));
            }
        };
    }

    exports.compute = compute;
    exports.copy = copy;
    exports.copyAsync = copyAsync;
    exports.dataURItoBlob = dataURItoBlob;
    exports.debounce = debounce;
    exports.downloadFile = downloadFile;
    exports.exitFullScreen = exitFullScreen;
    exports.formatBankCardNumber = formatBankCardNumber;
    exports.getBeginDayOfMonth = getBeginDayOfMonth;
    exports.getCookies = getCookies;
    exports.getDataType = getDataType;
    exports.getDaysOfMonth = getDaysOfMonth;
    exports.getImageSize = getImageSize;
    exports.getLocalStorage = getLocalStorage;
    exports.getMonthDays = getMonthDays;
    exports.getMonthInfo = getMonthInfo;
    exports.getParentNode = getParentNode;
    exports.getSessionStorage = getSessionStorage;
    exports.getUrlParams = getUrlParams;
    exports.hasNotNullValue = hasNotNullValue;
    exports.hasNullValue = hasNullValue;
    exports.hexRegex = hexRegex;
    exports.hexToRgba = hexToRgba;
    exports.hslRegex = hslRegex;
    exports.hslToRgb = hslToRgb;
    exports.hslaRegex = hslaRegex;
    exports.hslaToRgba = hslaToRgba;
    exports.imageToBase64 = imageToBase64;
    exports.isDate = isDate;
    exports.isLeapYear = isLeapYear;
    exports.numberWithCommas = numberWithCommas;
    exports.packUrlParams = packUrlParams;
    exports.requestFullscreen = requestFullscreen;
    exports.rgbaRegex = rgbaRegex;
    exports.rgbaToHex = rgbaToHex;
    exports.rgbaToHsl = rgbaToHsl;
    exports.setLocalStorage = setLocalStorage;
    exports.setSearchParams = setSearchParams;
    exports.setSessionStorage = setSessionStorage;
    exports.throttle = throttle;
    exports.uniqueByKey = uniqueByKey;

    return exports;

})({});
