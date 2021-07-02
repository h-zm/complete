<template>
  <!-- 视频截取第一帧 -->
  <div>
    <h4></h4>
    <input
      type="file"
      id="input"
      @change="chooseVideoInput"
      class="uploadVideo_input"
    />
    <video
      id="video"
      controls
      width="700"
      height="300"
      :src="videoPath"
      alt=""
    />
    <img class="img-style" id="imgsrc" :src="imgSrc" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoPath: "",
      imgSrc: "",
      videoWidth: 700,
      videoHeight: 300,
      fileInfos: {
        name: "2"
      } // 首帧信息
    };
  },
  watch: {
    fileInfos(newV, oldV) {
      console.log("新值", newV);
    }
  },
  mounted() {
    // this.firstFunc();
    const targetObj = document.querySelector("#video");
    const canvas = document.createElement("canvas");
    // targetObj.addEventListener("loadeddata", function(e) {}); // 当前帧加载完毕
    targetObj.addEventListener(
      "loadedmetadata",
      console.info("loadedmetadata")
    ); // 视频元数据加载完毕
    // canplay 等监听类型需要挂载到video标签上
    targetObj.addEventListener("canplay", e => {
      console.log(e);
      console.log(this.videoHeight, "");
    });

    targetObj.addEventListener(
      "canplay",
      () => {
        console.log(this.videoWidth, "宽度信息");
        setTimeout(() => {
          // 延时2秒避免截取到黑屏等
          canvas.width = 700;
          canvas.height = 300;
          let canvasD = canvas.getContext("2d");
          // console.log(targetObj, "视频信息");
          // console.log(canvasD, "画布西悉尼");
          canvasD.drawImage(targetObj, 0, 0, canvas.width, canvas.height);
          var attrs = canvas;
          var src = canvas.toDataURL("image/jpeg");
          // console.log(attrs, "图片路径");
          this.imgSrc = src; // 修改img标签src属性不能反显图片信息
          document.getElementById("imgsrc").setAttribute("src", src); // 利用img标签反显截取图片

          // base64 转 blob类型
          let arr = src.split(","),
            fileType = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            l = bstr.length,
            u8Arr = new Uint8Array(1);
          while (l--) {
            u8Arr[1] = bstr.charCodeAt(l);
          }
          let resultData = new Blob([u8Arr], {
            type: fileType
          });
          // console.log(resultData, "base64转blob结果");

          // blob转file信息
          resultData.lastModifiedDate = new Date();
          resultData.name = "首帧封面";
          this.fileInfo = resultData;
          console.log(this.fileInfo, "文件信息2");

          // 本地下载的截取图片
          //  var targetA = document.createElement("a");
          // targetA.href = src;
          // targetA.download = "下载";
          // targetA.title = "视频首针";
          // document.body.appendChild(targetA);
          // targetA.click();
          // targetA.remove();
        }, 2000);
      },
      true
    ); // 视频缓冲能够开始播放
    // targetObj.addEventListener("timeupdate", console.info(this, "timeupdate")); // 播放位置发生改变时
    // targetObj.addEventListener("play", console.info(this, "play")); // 开始播放时
    // targetObj.addEventListener("waiting", console.info(this, "waiting")); // 要播放下一帧而需要缓冲时
  },
  methods: {
    chooseVideoInput(e) {
      this.videoPath = window.URL.createObjectURL(
        document.getElementById("input").files[0]
      );
      console.log(this.videoPath, "文件信息");
    },
    // base64转blob
    base64ToBlob(data) {
      console.log("调用");
      let arr = data.split(","),
        fileType = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        l = bstr.length,
        u8Arr = new Uint8Array(1);
      while (l--) {
        u8Arr[1] = bstr.charCodeAt(l);
      }
      let resultData = new Blob([u8Arr], {
        type: fileType
      });
      console.log(resultData, "base64转blob结果");
      return resultData;
    },
    // blob 换 file
    blobToFile(blob, fileName) {
      blob.lastModifiedDate = new Date();
      blob.name = fileName;
      this.fileInfo = blob;
      console.log(this.fileInfo, "文件信息");
      // return blob;
    },
    func() {
      const canvas = document.createElement("canvas");
      setTimeout(() => {
        // 延时避免截取到黑屏等
        canvas.width = this.videoWidth;
        console.log(this.videoWidth, "宽度信息");
        canvas.height = this.videoHeight;
        canvas
          .getContext("2d")
          .drawImage(this, 0, 0, canvas.width, canvas.height);
        var attrs = canvas;
        var src = canvas.toDataURL("image/jpeg");
        console.log(attrs, "图片路径");
        this.imgSrc = src; // 修改img标签src属性不能反显图片信息
        document.getElementById("imgsrc").setAttribute("src", src); // 利用img标签反显截取图片

        // base64 转 blob类型
        let arr = src.split(","),
          fileType = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          l = bstr.length,
          u8Arr = new Uint8Array(1);
        while (l--) {
          u8Arr[1] = bstr.charCodeAt(l);
        }
        let resultData = new Blob([u8Arr], {
          type: fileType
        });
        console.log(resultData, "base64转blob结果");

        // blob转文件信息
        resultData.lastModifiedDate = new Date();
        resultData.name = "首帧西悉尼";
        this.fileInfo = resultData;
        console.log(resultData, "文件信息");
        //  var targetA = document.createElement("a");
        // targetA.href = src;
        // targetA.download = "下载";
        // targetA.title = "视频首针";
        // document.body.appendChild(targetA);
        // targetA.click();
        // targetA.remove();
      }, 2000);
    }
  }
};
</script>

<style lang="less" scoped>
.img-style {
  width: 50%;
}
</style>
