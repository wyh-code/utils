function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function compute(type) {
  // 计算放大倍数
  var getPower = function getPower(numbers) {
    var lens = numbers.map(function (num) {
      var _num$toString$split$;
      return ((_num$toString$split$ = num.toString().split(".")[1]) === null || _num$toString$split$ === void 0 ? void 0 : _num$toString$split$.length) || 0;
    });
    // 获取最大长度
    var len = Math.max.apply(Math, _toConsumableArray(lens));
    // 计算返回放大倍数
    return Math.pow(10, len);
  };

  // 获取放大倍数
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var power = getPower(args);

  // 获取放大后的值
  var newNumbers = args.map(function (num) {
    return Math.round(num * power);
  });

  // 计算结果
  var result = 0;
  switch (type) {
    case "+":
      result = newNumbers.reduce(function (preNumber, nextNumber) {
        return preNumber + nextNumber;
      }, result) / power;
      break;
    case "-":
      result = newNumbers.reduce(function (preNumber, nextNumber) {
        return preNumber - nextNumber;
      }) / power;
      break;
    case "*":
      result = newNumbers.reduce(function (preNumber, nextNumber) {
        return preNumber * nextNumber;
      }) / Math.pow(power, newNumbers.length);
      break;
    case "/":
      result = newNumbers.reduce(function (preNumber, nextNumber) {
        return preNumber / nextNumber;
      });
      break;
  }
  return {
    result: result,
    next: function next(nextType) {
      for (var _len2 = arguments.length, nextArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        nextArgs[_key2 - 1] = arguments[_key2];
      }
      return compute.apply(void 0, [nextType, result].concat(nextArgs));
    }
  };
}

function format() {
  console.log('format date');
}

function getUrlParams() {
  console.log('getUrlParams');
}

export { compute, format, getUrlParams };
