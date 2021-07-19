// 中国的省份
export const provinceList = [
  "北京市",
  "天津市",
  "上海市",
  "重庆",
  "河北省",
  "山西省",
  "辽宁省",
  "吉林省",
  "黑龙江省",
  "江苏省",
  "浙江省",
  "安徽省",
  "福建省",
  "江西省",
  "山东省",
  "河南省",
  "湖北省",
  "湖南省",
  "广东省",
  "海南省",
  "四川省",
  "贵州省",
  "云南省",
  "陕西省",
  "甘肃省",
  "青海省",
  "台湾省",
  "内蒙古自治区",
  "广西壮族自治区",
  "西藏自治区",
  "宁夏回族自治区",
  "新疆维吾尔自治区",
  "香港特别行政区",
  "澳门特别行政区"
];

// 周期
export const weekInfo = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日"
];
// scheduleTime 时间点
let basicFunc = () => {
  let resultData = [];
  for (let i = 0; i < 24; i++) {
    let hour = "";
    let nextHour = "";
    if (i < 10) {
      hour = `0${i}`;
    } else {
      hour = i;
    }
    if (i + 1 < 10) {
      nextHour = `0${i + 1}`;
    } else if (hour == 23) {
      nextHour = "24"; // 24 即 00
    } else {
      nextHour = i + 1;
    }
    let templist = [`${hour}:00~${hour}:30`, `${hour}:30~${nextHour}:00`];
    resultData.push(...templist);
  }
  return resultData;
};
export const hourList = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23
];
// 一天的scheduleTime信息
export const exampleTime = basicFunc();
// 七天的scheduleTime信息
let sevenDaySchedule = () => {
  let resultData = [];
  for (let i = 0; i < 7; i++) {
    let tempTime = {
      dayName: weekInfo[i],
      children: [],
      maxIndex: -1,
      minIndex: -1,
      indexList: [],
      resultList: []
    };

    for (let m = 0; m < exampleTime.length; m++) {
      tempTime.children.push({
        value: (m + 1) * 0.5,
        check: false,
        hover: false,
        label: exampleTime[m]
      });
    }
    resultData.push(tempTime);
  }
  return resultData;
};
export const aWeekSchedule = sevenDaySchedule();
