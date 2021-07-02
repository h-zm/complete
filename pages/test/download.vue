<template>
  <!-- 测试一些下载方式回 -->
  <div>
    <a href="/favicon.ico" download="图标">a标签下载</a>

    <div class="like-line"></div>

    <el-button @click="download">window/location下载图片</el-button>

    <div class="like-line"></div>

    <span>使用toDataUrl下载本域图片时 --></span>
    <img class="img-style" src="/favicon.ico" alt="" @click="clickIMG" />

    <div class="like-line"></div>

    <span> 使用toDataUrl下载其他链接图片 --></span>
    <img
      class="img-style2"
      src="http://video.pezy.cn/rest/img/86/2655609324874919186.png"
      alt=""
      crossOrigin="anonymous"
      @click="clickIMG2('url')"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: "",
      saveUrl: "" // 保存的base64地址
    };
  },
  mounted() {
    // vue单页面中引入cdn的方法
    // this.$createElement("script", {
    //   attrs: {
    //     type: "text/javascript",
    //     src:
    //       "https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.min.js"
    //   }
    // });
    // createElement('link',{
    //   attrs: {
    //     rel: 'stylesheet',
    //     type: 'text/css',
    //     href: 'https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.min.js'
    //   }
    // })

    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src =
      "https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.min.js";
    document.body.appendChild(s);
  },
  methods: {
    onePor() {
      console.log("执行一些测试函数的方法");
    },
    download() {
      this.$message.warning(
        "window/location不能下载浏览器可以识别的文件，如PNG,text等"
      );
      window.open("/favicon.ico"); // 这里会直接在新窗口中打开
    },
    testOther() {
      // 测试函数内调用另一
      function range(x, y) {
        console.log(arguments, "可调用的参数");
        return x * y;
      }

      function other(callback, arg) {
        console.log(arg, "参数");
        // 调用其他函数时若需要使用本函数的属性则需要通过apply或者call方法修改this指向
        return callback.apply(null, arg); // apply的第二个参数必须是一个数组
        // return callback.call(null, ...arg); 2.2.
      }

      var c = other(range, [2, 4]);
      console.log("运算结果:O", c);
    },
    clickIMG(type) {
      if (type) {
        // 下载的其他地址
      }
      var target = document.querySelector(".img-style");
      console.log(target, "查找后的图片");
      // document.body.append(target);
      html2canvas(target, {
        allowTaint: false,
        taintTest: false,
        useCORS: false,
        onrendered: function(canvas) {
          var link = document.createElement("a");
          link.download = "下载图片";
          console.log(canvas, "canvas调用对象");
          // return;
          link.href = canvas.toDataURL("image/png");
          link.click();
        }
      });
      // setTimeout(() => {
      //   document.body.removeChild(target);
      // }, 1000);
    },
    async clickIMG2(type) {
      if (type) {
        // 下载的其他地址
      }

      let opts = {
        useCORS: true
      };
      let ele = document.querySelector(".img-style2");
      let canvas = await html2canvas(ele, opts);
      console.log(canvas, "返回结果");
      var link = document.createElement("a");
      // link.onload = () => {
      link.download = "下载图片";
      link.href = canvas.toDataURL("image/png");
      // this.saveUrl = canvas.toDataURL("imahe/png");
      console.log(this.saveUrl, "canvas调用对象");
      link.click();
      // return;
    },
    clickIMG3() {
      var target = document.querySelector(".img-style2");
      console.log(target, "查找后的图片");
      // document.body.append(target);
      html2canvas(target, {
        // allowTaint: true,
        taintTest: false,
        useCORS: true,
        onrendered: function(canvas) {
          var link = document.createElement("a");
          // link.onload = () => {
          link.download = "下载图片";

          // return;
          link.setAttribute("crossOrigin", "Anonymous");
          link.href = canvas.toDataURL("image/png");
          this.saveUrl = canvas.toDataURL("imahe/png");
          console.log(this.saveUrl, "canvas调用对象");
          link.click();
          // };
        }
      });
      // setTimeout(() => {
      //   document.body.removeChild(target);
      // }, 1000);
    }
  }
};
</script>

<style>
.img-style {
  max-width: 75px;
  max-height: 160px;
}
.like-line {
  height: 20px;
}
</style>
