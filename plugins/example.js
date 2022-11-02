// 开始录制
function isRecord() {
    let record = this.$refs.record;
    if (this.stopRecord) {
        record.title = "停止录制";
        let stream = this.mergeStream(),
            //注意要判断浏览器对webm的支持情况，有些时候video格式不对，在ondataavailable监听的时候会拿不到data数据（data的size为空）
            mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
                ? "video/webm; codecs=vp9"
                : "video/webm";
        //第一次建新的MediaRecorder对象
        this.recorder = this.recordAndUpload(stream, mime, this.recordTime);
        //后面每隔一分钟创建新的MediaRecorder对象
        this.setIntervalTimer = setInterval(() => {
            this.recorder = this.recordAndUpload(stream, mime, this.recordTime);
        }, this.recordTime * 1000);
        this.stopRecord = false;
        this.$message({
            message: "开始录制",
            type: "success",
            customClass: "message-alert"
        });
    } else {
        record.title = "开始录制";
        this.endCapture();
        this.$message({
            message: "录制完成",
            type: "success",
            customClass: "message-alert"
        });
        //取消动画
        window.cancelAnimationFrame(this.animationFrame);
        this.stopRecord = true;
        this.recorder = null;
    }
}
//每隔recordTime时间(60秒)录制一个视频
function recordAndUpload(stream, mime, recordTime) {
    let chunks = [],
        that = this,
        videoStartTime,
        //创建新的MediaRecorder对象
        recorder = new MediaRecorder(stream, {
            mimeType: mime
        });
    //当触发start或者stop都会执行这个方法
    recorder.ondataavailable = function(e) {
        chunks.push(e.data);
    };
    recorder.onstop = () => {
        //因为设置了时间，所以文件的时间是确定的
        if (that.setTimeoutTimer) {
            that.uploadFile(chunks, recordTime * 1000);
        } else {
            //当手动点了停止，那么这个时间就不是确定的了，需要计算
            that.uploadFile(chunks, Date.now() - videoStartTime);
        }
    };
    //每隔recordTime时间(60秒)自动去触发停止stop录像事件
    this.setTimeoutTimer = setTimeout(() => {
        recorder.stop();
    }, recordTime * 1000);
    recorder.start();
    videoStartTime = Date.now();
    return recorder;
}

//上传文件到服务，保存录像到数据库
function uploadFile(chunks, recordTime) {
    let blob = new Blob(chunks, {
            type: "video/mp4"
        }),
        that = this;
    //recordTime为文件的时间，fixWebmDuration方法为文件设置时间（可以快进，快退），第三个参数是一个回调函数
    fixWebmDuration(blob, recordTime, fixedBlob => {
        //下载MP4到本地
        let fileName = `file_${new Date().getTime()}.mp4`,
            file = new window.File([fixedBlob], fileName),
            formData = new FormData();
        let url = URL.createObjectURL(
                new Blob([fixedBlob], { type: "video/mp4" })
            ),
            aLink = document.createElement("a");
        aLink.download = fileName;
        aLink.href = url;
        document.body.appendChild(aLink);
        aLink.click();
        aLink.remove();
        window.URL.revokeObjectURL(url);

        //上传到ftp服务器
        formData.append("file", file);
        that.axios
            .post(
                //接口
                `/ftp/ftpUpload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            )
            .then(data => {
                //保存录像到数据库
                let params = new URLSearchParams(); //装载post传值
                params.append("cameraID", that.cameraIdChanged);
                params.append("videoName", fileName);
                params.append("videoUrl", fileName);
                that.axios
                    .post("/video/addVideo", params)
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        that.$message.error("服务器异常");
                        console.log(error);
                    });
            })
            .catch(error => {
                that.$message.error("服务器异常");
                console.log(error);
            });
    });
}

//结束录制
function endCapture() {
    //清除定时器
    clearTimeout(this.setTimeoutTimer);
    clearInterval(this.setIntervalTimer);
    this.setTimeoutTimer = this.setIntervalTimer = null;
    this.recorder.stop();
}
