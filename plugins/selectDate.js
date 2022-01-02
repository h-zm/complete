// 页面框选 时间段会用到

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

// 小时列表
export const hourList = () => {
  let temp = []
  let i = 0
  while (i < 24) {
    temp.push(i);
    i++;
  }
  return  temp
};

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
