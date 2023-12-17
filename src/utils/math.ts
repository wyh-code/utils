type TComputType = "+" | '-' | '*' | '/';

export function compute(type: TComputType, ...args: number[]) {
  // 计算放大倍数
  const getPower = (numbers: number[]) => {
    const lens = numbers.map((num: number) => num.toString().split(".")[1]?.length || 0);
    // 获取最大长度
    const len = Math.max(...lens);
    // 计算返回放大倍数
    return Math.pow(10, len)
  }

  // 获取放大倍数
  const power = getPower(args);

  // 获取放大后的值
  const newNumbers = args.map(num => Math.round(num * power));

  // 计算结果
  let result = 0;
  switch (type) {
    case "+":
      result = newNumbers.reduce((preNumber, nextNumber) => preNumber + nextNumber, result) / power;
      break;
    case "-":
      result = newNumbers.reduce((preNumber, nextNumber) => preNumber - nextNumber) / power;
      break;
    case "*":
      result = newNumbers.reduce((preNumber, nextNumber) => preNumber * nextNumber) / (power ** newNumbers.length);
      break;
    case "/":
      result = newNumbers.reduce((preNumber, nextNumber) => preNumber / nextNumber);
      break;
  }

  return {
    result,
    next(nextType: TComputType, ...nextArgs: number[]) {
      return compute(nextType, result, ...nextArgs);
    }
  }
}
