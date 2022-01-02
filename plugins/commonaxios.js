// 一般调用的情况
import axios from "axios";
import qs from "qs";
// 创建实例
const instance = axios.create({
  baseUrl: "http:1.0.0:3000", // 设置基础路由 乱写的
  timeout: 10000, // 请求超时时间
  headers: {
    // 请求头参数配置
    // 'content-Type': 'application/x-www-form-urlencoded' // 一版用于post请求
  },
  //  后面数组中的函数必须返回一个字符串
  transformRequest: data => {
    return qs.stringify(data);
  }, // 在传递给 then/catch 前，允许修改响应数据
  transformResponse: data => {
    return qs.stringify(data);
  },
  widhCredentials: false // 跨域时是否需要使用凭证 默认false
});

// 请求处理
instance.interceptors.request.use(
  config => {
    console.log(config, "请求体里的信息");
    // 拦截config 可以在此添加公参什么的
    config.token = "1234";
    return config; // 要返回
  },
  error => {
    console.log("拦截失败");
    return Promise.reject(error);
  }
);

// 返回处理
instance.interceptors.response.use(
  response => {
    let { res } = response.data;
    switch (res.code) {
      case 200:
        console.log("请求成功");
        break;
      case 400:
        console.log("请检查是否缺少参数");
        break;
      case 500:
        console.log("请检查接口是否能走通");
        break;
      default:
        console.log("返回数据信息", res);
    }
  },
  error => {
    if (!window.navigator.onLine) {
      console.log("请检查网络连接是否正常");
      return;
    }
  }
);

export default instance; // 导出封装后的axios
