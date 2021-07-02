import { Message } from "element-ui";
import Vue from "vue";
function copyfunc(contentData, e) {
  // console.log(e, "点击信息"); e $event 是页面中点击处的位置信息 后面可以补充其实现点击位置的展示效果
  var otj = document.createElement("input");
  otj.value = contentData;
  document.body.appendChild(otj);
  // otj.append();
  otj.select();
  document.execCommand("Copy");
  // document.body.removeChild(otj);
  otj.remove();
  Message({
    type: "success",
    message: "信息复制成功"
  });
}

Vue.prototype.$copyFunc = copyfunc;
