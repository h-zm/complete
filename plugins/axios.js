// axios 的简单封装
// import { Toast } from "vant"; // 处理请求错误
// import Cookie from "js-cookie";
import qs from "qs";
export default function({ $axios, store, app, redirect }) {
    // 配置请求头
    $axios.defaults.timeout = 10000; // 超时时间
    // console.log("请求头信息", $axios.defaults.headers);

    // 配置一些公共请求参数什么的
    $axios.onRequest(config => {
        // console.log(config, "请求参数"); // 存放的请求类型 时间什么的
        switch (config.method) {
            case "post":
                // headers里的content-Type和Content-Type在请求时都会整合到一起
                // config.headers["content-Type"] =
                //     "application/json;charset=UTF-8";
                // "application/x-www-form-urlencoded;charset=UTF-8";
                // 转化为没有"{}"（引号和括号）的键值对
                break;
                // config.data = qs.stringify(config.data); 
        }

        // 有的接口需要自定义
        if (config.headers && config.headers["Content-Type"]) {
            config.headers["content-Type"] = config.headers["Content-Type"];
        }

        // 判断是否有传json请求方式 有的需要通过JSON.stringify设置
        // if (
        //     config.headers &&
        //     config.headers["Content-Type"] == "application/json"
        // ) {
        //     config.transformRequest = function(data) {
        //         return JSON.stringify(data);
        //     };
        // }

        // console.log(config, "请求参数");
        return config;
    });

    //asyncData中的统一请求  返回一个promise对象
    $axios.all = function(promise) {
        return Promise.all(promise);
    };

    //asyncData对统一请求后的返回参数 做区别处理
    $axios.spread = function(callback) {
        return function(arg) {
            return callback.apply(null, arg);
        };
    };

    // 请求失败
    $axios.onError(error => {
        console.log(`请求失败${error}`);
        // Toast("请求失败");
    });

    // 为返回做统一处理
    $axios.onResponse(res => res.data);
}
