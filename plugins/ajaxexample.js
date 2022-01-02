// ajax 实例
// return;
// function likeXml(url, method, async) {
//   // XMLHttpRequest 是 AJAX 的基础  先创建一个实例
//   var xhm = new XMLHttpRequest();
//   // 发出请求 url请求地址 method 请求方式 async是否异步的布尔形参
//   xhm.open(method,url, async);
//   // 通过 onreadystatechange 方法监听 xhm中readyState的变化
//   // readyState
//   // 0: 请求未初始化
//   // 1: 服务器连接已建立
//   // 2: 请求已接收
//   // 3: 请求处理中
//   // 4: 请求已完成，且响应已就绪
//   // status
//   // 200: "OK"
//   // 404: 未找到页面
//   xhm.onreadystatechange = function() {
//     if (xhm.readyState == 4 && xhm.status == 200) {
//       // 如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。
//       console.log(xhm.responseText);
//     }
//   };
//   if (method == "get") {
//     xhm.send(null);
//   } else {
//   }
// }
// likeXml("/mock/data.js", get, true);
