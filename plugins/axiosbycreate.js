// 使用axsios中的create方法模块化
import axios from "axios";

let baseUrl = "";

const demand = axios.create({
  baseUrl: baseUrl,
  timeout: 10000, // 请求超时时间
  heades: {
    "content-Type": "application/x-www-form-urlencoded"
  }
});

// 设置请求参数
demand.interceptors.request = request => {
  let guid = "1234567";
  let token = "hzm123";
  request.headers["guid"] = guid;
  request.headers["token"] = token;
  return request;
};
// 设置请求
demand.interceptors.response = response => {
  return response;
};

export default demand;
