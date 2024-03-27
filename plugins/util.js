// 返回星期
export const weekFunc = (weekday) => {
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

// 计算页面中样式zindex的最大值 返回至少为1
export function getZindex() {
    // 获取耶页面搜有元素构成集合
    // document.body.querySelectorAll('*')
    // 方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有 CSS 属性的值
    // window.getComputedStyle 可能会返回auto所以使用Number()或+()方法 Number('auto')返回NaN ,比值时会作0，方便计算
    return (
        Array.from(document.body.querySelectorAll("*")).reduce(
            (pre, cur) =>
                Math.max(pre, +window.getComputedStyle(cur).zIndex || 0),
            0
        ) || 1
    );
}

// 防抖 在一段时间内同时触发相同函数只执行一次
export function _debounce(fn, delay) {
    // var number = 0;
    // 这里的声明只有在首次声明时执行，一般执行在服务端。之后页面中交互时触发防抖
    // 只会走return里返回的逻辑
    var delay = delay || 1000;
    var timer = null;
    // console.log("终端timer1", timer);
    return function () {
        var _this = this; // 供后续_this转向使用
        var arg = arguments;
        // console.log(timer, number, '函数再次被触发');
        // console.log("timer2", timer);
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
    return function () {
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

// 排序
export function handleSort(data, handleFunc = () => {}) {
    if (!Array.isArray(data)) {
        console.log("传入比较的元素不是数组");
        return false;
    }

    let sortType = null;

    let loopFunc = function (data) {
        let length = data?.length - 1;
        // 因为有i+1,所以取到倒数第二个索引就行
        for (let i = 0; i < length; i++) {
            let a = JSON.parse(JSON.stringify(data[i]));
            let b = JSON.parse(JSON.stringify(data[i + 1]));
            let result = handleFunc(a, b);

            if (sortType == null) {
                // 用户期望最后的排序结果 sortType
                // 为 true 降序
                // 为 false 升序
                sortType = !!result;
            }

            if (sortType && result > 0) {
                // 排列为升序 但是 a大于b需要啊调整顺序
                data.splice(i + 1 + 1, 0, a);
                data.splice(i, 1);
            } else if (!sortType && sortType < 0) {
                // 排列为降序 但是 a小于b需要调整顺序
                data.splice(i, 1);
                data.splice(i - 1, 0, a);
            }
            // 俩个一样 不处理
        }
    };

    let startIndex = 0;

    while (startIndex < data.length) {
        loopFunc(data);
        startIndex++;
    }
    // 会直接更改data结构，也可以通过赋值接收
    return data;
}

export function isPhoneNumber(phoneNumber) {
    const regExp = /^1[3456789]\d{9}$/; // 定义手机号的正则表达式
    return regExp.test(phoneNumber); // 使用 test 方法进行匹配
}

export function hidePhoneNumber(phoneNumber) {
    // 使用正则表达式匹配手机号的前三位和后四位，并将中间的数字替换为 * 号
    if (isPhoneNumber(phoneNumber)) {
        return phoneNumber.replace(/^(\d{3})\d+(\d{4})$/, "$1****$2");
    }
    return phoneNumber;
}
