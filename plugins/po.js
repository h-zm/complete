// option
var mediaOptions;

//用于录制视频
var mediaRecord;

//视频流
var mediaStream;

// 录制开始时间
var startTime = 0;

// 录制倒计时
var recordTimer = null;

//保存整段视频数据
var videoBuffer = [];

//用于记录某段视频视频
var partBuffer = [];

// 支持的视频类型
var supportedList = [];

// 记录视频流数据的录入限制
var videoSize;

// 视频展示区
var videoLive;

var videoPreview;

// 倒计时
var countdown = null;

// 录制
var countTime = 0;

// 视频下载方式 一次性下载 one 间隔下载 more
var recordType;

// 获取当前支持的录制类型
function getSupports() {
    const media = "video";
    // 常用的视频格式
    const types = [
        "webm",
        "mp4",
        "ogg",
        "mov",
        "avi",
        "wmv",
        "flv",
        "mkv",
        "ts",
        "x-matroska"
    ];

    // 常用的视屏编码
    const codecs = [
        "vp9",
        "vp9.0",
        "vp8",
        "vp8.0",
        "avc1",
        "av1",
        "h265",
        "h264"
    ];

    // 返回布尔值来表示是否支持
    const isSupportted = MediaRecorder.isTypeSupported;

    // 支持的结果
    const supported = [];

    // 遍历类型，排列组合
    types.forEach(type => {
        const mimeType = `${media}/${type}`;
        codecs.forEach(codec => {
            [
                `${mimeType};codecs=${codec}`,
                `${mimeType};codecs=${codec.toUpperCase()}`
            ].forEach(variation => {
                if (isSupportted(variation)) supported.push(variation);
            });
        });

        if (isSupportted(mimeType)) supported.push(mimeType);
    });

    supportedList = supported;

    // console.log("fe-wecrtc support--", supportedList);
}

// 数据初始化
async function init(defaultData = "") {
    await getSupports();

    mediaOptions = {
        // 音频码率
        audioBitsPerSecond: defaultData.audioBitsPerSecond || 128000,
        // 视频码率
        videoBitsPerSecond: defaultData.videoBitsPerSecond || 2500000,
        // 指定类型
        mimeType: defaultData.mimeType || supportedList[0] || "video/webm"
    };

    videoSize = defaultData.videoSize || 1024 * 10;

    recordType = defaultData.recordType || "one";

    countTime = defaultData.countTime || 1000;

    // 渲染自定义样式
    if (!defaultData.noRender) {
        render();
    }

    // 页面卸载去除倒计时
    window.addEventListener("beforeunload", event => {
        if (recordTimer) {
            clearInterval(recordTimer);
            recordTimer = null;
        }
    });

    // 视频展示区
    videoLive = document.getElementById("live");
}

/**
 * 开始录屏
 */
async function startRecord() {
    if (!navigator.mediaDevices && !navigator.mediaDevices.getDisplayMedia) {
        alert("当前浏览器不支持屏幕捕捉");
        return;
    }

    reset();

    //获取视频流，这时候会弹出用户选择框，前提用户设备支持
    mediaStream = await navigator.mediaDevices.getDisplayMedia();

    console.log("fe-webrtc mediaStream--", mediaStream);

    if (videoLive) {
        videoLive.srcObject = mediaStream;
    }

    // 初始化开始
    mediaRecord = new MediaRecorder(mediaStream, mediaOptions);

    mediaRecord.ondataavailable = e => {
        // console.log("视频大小", e.data.size);
        if (e.data.size > videoSize) {
            videoBuffer.push(e.data);
            partBuffer.push(e.data);
        }
    };

    //每隔倒计时时间保存一下 兼容分段下载;
    mediaRecord.start(countTime);

    startTime = new Date().valueOf();

    recordTimer = setInterval(() => {
        setTimeHtml();
    }, 1000);

    // 先注释 按照录制分片下载
    // if (recordType !== "one") {
    //     countdown = setInterval(() => {
    //         mediaRecord.stop();
    //         mediaRecord.start(countTime);
    //     }, countTime);
    // }

    console.log("fe-webrtc begin--");
}

// 下载某段视频
function downloadPart() {
    mediaRecord.stop();
    createVideo(partBuffer);
    partBuffer = [];
    mediaRecord.start(countTime);
}

// 下载整段视频
function download() {
    createVideo(videoBuffer);
}

function reset() {
    stopRecord();
    mediaRecord = null;
    mediaStream = null;
    startTime = 0;
    videoBuffer = [];
    partBuffer = [];
}

// 清湖倒计时
function clearCount() {
    clearInterval(countdown);
    countdown = null;
}

/**
 * 停止录制
 */
function stopRecord() {
    if (countdown) {
        clearCount();
    }

    if (recordTimer) {
        clearInterval(recordTimer);
        recordTimer = null;
    }
    setTimeHtml("00:00");

    if (mediaStream) {
        for (let track of mediaStream.getTracks()) {
            track.stop();
        }
    }

    mediaRecord && mediaRecord.state !== "inactive" && mediaRecord.stop();

    console.log("fe-webrtc stop---");
}

// 返回下载的视频类型
function getDownloadType() {
    // 设置 a 标签的 download 属性为文件名
    let type = mediaOptions.mimeType.split("/")[1];
    if (type.includes(";")) {
        type = mediaOptions.mimeType.split("/")[1].split(";")[0];
    }
    return type;
}

// 生成视频
function createVideo(data) {
    if (data == null || data.length == 0) {
        alert("没有视频数据");
        return;
    }

    // 将 Blob 对象转换成一个 URL 地址
    let blob = new Blob(data, {
        type: mediaOptions.mimeType
    });

    let url = URL.createObjectURL(blob);

    console.log("fe-webrtc create--", url);

    // 预览 没起node服务 可能存在展示不了
    if (videoPreview) {
        videoPreview.controls = "controls";
        videoPreview.src = url;
    }

    let a = document.createElement("a");
    a.style = "display: none";
    // 设置 a 标签的 href 属性为刚刚生成的 URL 地址
    a.href = url;
    // 设置 a 标签的 download 属性为文件名
    a.download = `${new Date().getTime()}.${getDownloadType()}`;
    document.body.appendChild(a);
    // 模拟点击 a 标签
    a.click();
    // 释放 URL 地址
    window.URL.revokeObjectURL(url);
}

function judgeNine(data) {
    if (data) {
        if (parseInt(data) > 9) {
            return parseInt(data);
        } else {
            return "0" + parseInt(data);
        }
    } else {
        return "00";
    }
}

// 计算录制时长
function judgeTime() {
    if (!startTime) {
        return "00:00";
    }

    // 获取秒差值
    // var secondTime = (new Date().valueOf() - startTime) / 1000 + 600.789;
    var secondTime = parseInt((new Date().valueOf() - startTime) / 1000);
    // 分
    var minuteTime = 0;
    // 小时
    var hourTime = 0;
    if (secondTime >= 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime >= 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }

    var time = judgeNine(secondTime);

    if (minuteTime > 0) {
        time = judgeNine(minuteTime) + ":" + time;
    } else {
        time = "00:" + time;
    }

    if (hourTime > 0) {
        time = judgeNine(hourTime) + ":" + time;
    }

    if (time == "10:00") {
        downloadPart();
    } else if (time == "20:00") {
        downloadPart();
        stopRecord();
    }

    return time;
}

// 设置展示时长
function setTimeHtml(data = "") {
    let timeEle = document.getElementsByClassName("fetab__block")[0];
    timeEle.innerHTML = data || judgeTime();
}

// 渲染样式
function render() {
    const content = document.createElement("div");
    content.className = "fetab";
    content.style.cssText =
        "position: fixed;top: 28px;left: 0;right: 0;z-index: 1200;margin: auto;padding: 8px 10px;width: fit-content;background: #fff;border: 1px solid #f5f5f5;border-radius: 2px 2px 16px 16px;box-shadow: 0px 6px 8px 0px rgba(174, 185, 181, 0.2);/* 字体 */font-size: 12px;line-height: 1.4;color: #28282a;opacity:0;transition:.2s opacity ease;";

    // 块级元素
    const contenTime = document.createElement("div");
    contenTime.className = "fetab__block";
    contenTime.style.cssText =
        "/* 布局 */display: flex;align-items: center;justify-content: center;";

    // 展示时长
    contenTime.innerHTML = "00:00";
    content.appendChild(contenTime);

    const contentBtn = document.createElement("div");
    contentBtn.className = "fetab__block";
    contentBtn.style.cssText =
        "/* 布局 */display: flex;align-items: center;justify-content: center;";

    // 展示按钮区域
    let btnList = ["共享屏幕", "下载分段视频", "下载整段视频", "结束共享"];
    for (let i = 0; i < btnList.length; i++) {
        const element = document.createElement("div");
        element.innerHTML = btnList[i];
        element.className = "fetab__item";
        element.style.cssText = "padding: 6px 8px;cursor: pointer;";
        switch (btnList[i]) {
            case "共享屏幕":
                element.onclick = startRecord;
                break;
            case "下载分段视频":
                element.onclick = downloadPart;
                break;
            case "下载整段视频":
                element.onclick = download;
                break;
            case "结束共享":
                element.onclick = stopRecord;
                break;
        }
        contentBtn.appendChild(element);
    }

    content.appendChild(contentBtn);

    // 加入页面中
    if (document?.body) {
        document.body.appendChild(content);
        setTimeout(() => {
            content.style.opacity = 1;
        }, 800);
    }
}

module.exports = {
    init,
    getSupports,
    startRecord,
    stopRecord,
    download,
    clearCount
};
