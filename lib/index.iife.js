var ostore_utils = (function (exports) {
    'use strict';

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

    function compute(type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 计算放大倍数
        var getPower = function (numbers) {
            var lens = numbers.map(function (num) { var _a; return ((_a = num.toString().split(".")[1]) === null || _a === void 0 ? void 0 : _a.length) || 0; });
            // 获取最大长度
            var len = Math.max.apply(Math, lens);
            // 计算返回放大倍数
            return Math.pow(10, len);
        };
        // 获取放大倍数
        var power = getPower(args);
        // 获取放大后的值
        var newNumbers = args.map(function (num) { return Math.round(num * power); });
        // 计算结果
        var result = 0;
        switch (type) {
            case "+":
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber + nextNumber; }, result) / power;
                break;
            case "-":
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber - nextNumber; }) / power;
                break;
            case "*":
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber * nextNumber; }) / (Math.pow(power, newNumbers.length));
                break;
            case "/":
                result = newNumbers.reduce(function (preNumber, nextNumber) { return preNumber / nextNumber; });
                break;
        }
        return {
            result: result,
            next: function (nextType) {
                var nextArgs = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    nextArgs[_i - 1] = arguments[_i];
                }
                return compute.apply(void 0, __spreadArray([nextType, result], nextArgs, false));
            }
        };
    }

    function format() {
        console.log('format date');
    }

    function getUrlParams() {
        console.log('getUrlParams');
    }

    exports.compute = compute;
    exports.format = format;
    exports.getUrlParams = getUrlParams;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
