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
export function isDate(date?: string | Date): Date {
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
    const separator = date.indexOf('-') > -1 ? '-' : '/';
    const dateArr = date.split(separator);
    // 如果没有提供完整的日期，则返回当前日期
    if (!dateArr[2]) return new Date(); 
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
export function isLeapYear(year: number | string): boolean {
  const Y = parseInt(year.toString());
  if ((Y % 4 === 0 && Y % 100 !== 0) || (Y % 400 === 0)) {
    return true;
  }
  return false;
}


export interface DateInfo {
  year: number;
  month: number; // 注意月份应该是 0 到 11，其中0代表一月，11代表十二月
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
export function getDaysOfMonth(d: DateInfo): number {
  const daysPerMonth = [
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
export function getBeginDayOfMonth(d: DateInfo): number {
  // 注意: JavaScript中月份是从0开始的，所以d.month已经是正确的月份索引
  return new Date(d.year, d.month, 1).getDay();
}


/**
 * 用于获取传入时间对应月份的显示信息，包括年份、月份、该月的总天数以及该月第一天是星期几。
 * @param time?: string | Date (可选) 可选参数，可以是以下两种之一：
 * 日期字符串：应符合YYYY-MM-DD格式的字符串，将被转换为Date对象。 
 * Date对象：一个标准的JavaScript日期对象。如果未提供参数，则函数使用当前日期。
 * @returns 返回一个对象，包含以下属性：
 * year: 数字（number），表示年份。
 * month: 数字（number），表示月份的索引，从0开始，其中0代表一月，11代表十二月。
 * days: 数字（number），表示传入时间所在月份的总天数。
 * beginWeek: 数字（number），表示该月第一天是星期几，从0（星期日）到6（星期六）的一个整数。
 */
export interface MonthInfo {year: number; month: number; days: number; beginWeek: number}
export function getMonthInfo(time?: string | Date): MonthInfo {
  const date = isDate(time); // 转换time参数为Date对象
  const d: DateInfo = {
    year: date.getFullYear(),
    month: date.getMonth()
  };
  // 这个月一共多少天
  const days = getDaysOfMonth(d);
  // 这个月是星期几开始的
  const beginWeek = getBeginDayOfMonth(d);

  return {
    year: d.year,
    month: d.month, // 注意：月份返回的是从0开始的月份索引
    days: days,
    beginWeek: beginWeek
  };
}


export interface DayInfo {
  year: number;
  month: number;
  day: number;
  time: number; // 时间的时间戳
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
export function getMonthDays(time: Date): DayInfo[] {
  const info: MonthInfo = getMonthInfo(time);
  let { year, month, days, beginWeek } = info;
  
  const dayArr: DayInfo[] = [];
  
  // 需要添加的日期
  let len: number = days + beginWeek + (7 - (days + beginWeek) % 7);
  for (let i = 0; i < len; i++) {
    let day: number = i - beginWeek + 1;
    
    // 重置时间
    let Y: number = new Date(year, month, day).getFullYear();
    let M: number = new Date(year, month, day).getMonth();
    let D: number = new Date(year, month, day).getDate();
    let T: number = new Date(year, month, day).getTime();
    
    dayArr.push({ year: Y, month: M, day: D, time: T });
  }
  
  return dayArr;
}