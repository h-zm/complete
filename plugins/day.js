import dayjs from "dayjs";
import vue from "vue";

vue.filter("timeFormat", function(value) {
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
});

// 增加一个自定义 判断日期的方法 通过 prototype 挂载的dayjs
dayjs.prototype.judgeDate = function(value) {
  // let currentDate = new Date(); // 获取当前的年月日
  // let currentTimes = new Date(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth(),
  //     currentDate.getDate()
  // ).getTime(); // 获取currentDate的年月日格式
  let currentTimes = new Date(new Date().toDateString()).getTime();
  let timeDev = Math.abs(value - currentTimes);
  // 判断是否在一当天
  if (value - currentTimes > 0) {
    return "今天" + dayjs(value).format("HH:mm");
  } else if (timeDev < 1000 * 60 * 60 * 24) {
    return "昨天" + dayjs(value).format("HH:mm");
  } else if (timeDev < 1000 * 60 * 60 * 24 * 30) {
    return dayjs(value).format("MM-DD HH:mm");
  } else {
    return dayjs(value).format("YYYY-MM-DD");
  }
};

export default dayjs;
