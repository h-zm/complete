// 针对http 文件上传
import http from "axios";
let formData = new FormData(); // 存放上传参数如下
/**
 *  formData.append('file', content.file);
    formData.append('username', this.username);
    formData.append('token', this.token);
    formData.append('guid', this.guid);
    formData.append('type', 0);
 */
let config = { "Content-Type": "multipart/form-data" };

/**
 * 描述
 * @date 2020-12-17
 * @param {any} url 文件上传的地址
 * @param {any} options 上传附带的参数
 * @returns {any}
 */
function formHttp(url, options) {
  let keyList = Object.keys(options);
  keyList.filter(key => {
    formData.append(key, options[key]);
  });
  // 发送请求
  http
    .post(url, formData, config)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log("上传失败");
    });
}
module.exports = {
  formHttp
};
