// 返回星期
export const weekFunc = weekday => {
    let resultDay = "";
    switch (weekday) {
      case 0:
        resultDay = "星期一";
        break;
      case 1:
        resultDay = "星期二";
        break;
      case 2:
        resultDay = "星期三";
        break;
      case 3:
        resultDay = "星期四";
        break;
      case 4:
        resultDay = "星期五";
        break;
      case 5:
        resultDay = "星期六";
        break;
      default:
        resultDay = "星期天";
        break;
    }
    return resultDay;
  };
  
  // 检验出现次数
  /**
   * @param {*} testFactor 检验目标元素
   * @param {*} data 源数据
   * @returns 
   */
  export const testTimes = (testFactor, data) => {
    let testReg = "/" + testFactor + "/g";
    return data.match(testReg).length;
  };
  
  // 获取某一元素的CSS信息
  /**
   * @param  {any} searchName 要找寻的标签名字
   * @param  {any} cssName 找寻具体的某一属性 可不传
   */
  export function getElementInfo(searchName, cssName = "") {
    let resultData = "";
    let searchData = document.querySelector(searchName);
    if (cssName) {
      resultData = searchData[cssName];
    } else {
      resultData = searchData;
    }
    return new Promise((resolve, reject) => {
      if (searchData) {
        resolve(resultData);
      } else {
        reject("error");
      }
    });
  }
  
  // 防抖 在一段时间内同时触发相同函数只执行一次
  export function _debounce(fn, delay) {
    // var number = 0;
    var delay = delay || 1000;
    var timer = null;
    return function() {
      var _this = this; // 供后续_this转向使用
      var arg = arguments;
      // console.log(timer, number, '函数再次被触发');
      if (timer !== null) {
        // number++;
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        fn.apply(_this, arg);
      }, delay);
    };
  }
  
  // 节流
  export function _throttle(fn, delay) {
    var startTime = null;
    var timer = null;
    return function() {
      var _this = this;
      var args = arguments;
      var currTime = new Date();
      clearTimeout(timer);
      if (currTime - startTime >= delay) {
        fn.apply(_this, args);
        startTime = new Date();
      } else {
        var timer = setTimeout(() => {
          fn.apply(_this, args);
        }, delay - (currTime - startTime));
      }
    };
  }
  