<template>
    <!-- 新建文件的模板 -->
    <div class="page">
        <contents> <codes>usermedia</codes> 分享屏幕视频流信息 </contents>

        <div class="page__area">
            <video
                id="localVideo"
                class="page__area_video"
                autoplay
                playsinline
                muted
            ></video>

            <video
                id="userVideo"
                class="page__area_video"
                autoplay
                playsinline
                muted
            ></video>
        </div>
        <div class="page__list" id="imgarea">
            <!-- <img id="testimg" class="page__list_item" src="" alt="" /> -->
            <!-- <div
                v-for="(item, index) in imgList.length"
                :key="index"
                class="page__list_item"
            >
                <img :src="item" alt="" />
            </div> -->
        </div>

        <div class="page__operate">
            <el-button class="page__operate_button" type="primary" @click="join"
                >加入</el-button
            >
            <el-button
                class="page__operate_button"
                type="primary"
                @click="leave"
                >离开</el-button
            >
            <el-button
                class="page__operate_button"
                type="primary"
                @click="takePhoto"
                >拍照</el-button
            >
            <el-button
                class="page__operate_button"
                type="primary"
                @click="sharScreen"
                >分享屏幕</el-button
            >

            <el-select
                class="page__operate_button"
                v-model="recordType"
                placeholder="请选择录制方式"
            >
                <el-option label="一次性录制" value="all"> </el-option>
                <el-option label="间隔录制" value="interval"> </el-option>
            </el-select>
        </div>
        <div class="page__operate">
            <el-button
                class="page__operate_button"
                type="primary"
                @click="startRecord(1)"
                >录制用户视频</el-button
            >
            <el-button
                class="page__operate_button"
                type="primary"
                @click="startRecord(2)"
                >录制屏幕视频</el-button
            >

            <el-button
                class="page__operate_button"
                type="primary"
                @click="stopRecord"
                >结束录制</el-button
            >
            <el-button
                class="page__operate_button"
                type="primary"
                @click="downloadVideo"
                >下载录制视频</el-button
            >
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "webrtc",
            meta: "",
            description: "练习webrtc",
            script: []
        };
    },
    data() {
        return {
            imgList: [],
            canvas: {
                width: "300px",
                height: "300px"
            },
            showImg: false,
            // 滤镜信息
            filterList: [
                "blur(5px)", // 模糊
                "brightness(0.5)", // 亮度
                "contrast(200%)", // 对比度
                "grayscale(100%)", // 灰度
                "hue-rotate(90deg)", // 色相旋转
                "invert(100%)", // 反色
                "opacity(90%)", // 透明度
                "saturate(200%)", // 饱和度
                "saturate(20%)", // 饱和度
                "sepia(100%)", // 褐色
                "drop-shadow(4px 4px 8px blue)" // 阴影
            ],

            // 支持的数据类型
            supported: [],

            // 媒体流数据 用于录制共享屏幕
            localStream: "",

            mediaRecorder: null,

            // 录制的数据列表
            blobList: [],

            // 一次性下载 all , 间隔下载 interval
            recordType: "interval",

            // 录制数据
            blobData: "",

            // 设置时间轮询获取
            timer: null,

            // 时间间隔
            timecell: 3000,

            mediaOptions: {
                // 音频码率
                audioBitsPerSecond: 128000,
                // 视频码率
                videoBitsPerSecond: 2500000,
                // 指定类型
                mimeType: "video/webm"
            }
        };
    },
    mounted() {
        // this.getDevices();
        this.getSupportMimeTypes();
    },
    methods: {
        join() {
            this.getUserMedia();
        },

        leave() {
            document.querySelector("#userVideo").srcObject = null;
        },

        // 获取屏幕共享的媒体流
        async sharScreen() {
            try {
                let localStream = await navigator.mediaDevices.getDisplayMedia({
                    audio: true,
                    video: true
                });

                // 播放本地视频流
                this.playStream(localStream);
            } catch {
                console.log("Error: 获取屏幕媒体流信息失败!");
            }
        },

        playStream(stream) {
            console.log("视屏流信息", stream);
            const video = document.querySelector("#localVideo");
            // srcObject 属性设定或返回一个对象，这个对象提供了一个与HTMLMediaElement关联的媒体源，这个对象通常是 MediaStream ，
            // 但根据规范可以是 MediaSource， Blob 或者 File。
            video.srcObject = stream;
        },

        // 获取摄像头信息
        async getUserMedia() {
            try {
                // constraints参数中具体支持哪些配置项
                // console.log(
                //     "🚀🚀🚀 / SupportedConstraints",
                //     navigator.mediaDevices.getSupportedConstraints()
                // );

                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                });

                const video = document.querySelector("#userVideo");

                // srcObject 属性设定或返回一个对象，这个对象提供了一个与HTMLMediaElement关联的媒体源，这个对象通常是 MediaStream ，
                // 但根据规范可以是 MediaSource， Blob 或者 File。
                video.srcObject = stream;
            } catch {
                console.log(
                    "Error: 获取摄像头/音频流信息失败!, 请检查是否授予页面摄像头/音频使用权限"
                );
            }
        },

        // 拍照
        takePhoto() {
            // HTMLVideoElement 接口提供了用于操作视频对象的特殊属性和方法。它同时还继承了HTMLMediaElement 和 HTMLElement 的属性与方法。
            const videoEL = document.querySelector("#localVideo");

            if (!videoEL.srcObject) {
                console.log("Warning 请先分享视频");
                return;
            }

            console.log("视频元素", videoEL.srcObject);
            const canvas = document.createElement("canvas");
            // HTMLVideoElement 支持获取 videoWidth 和 videoHeight 属性
            canvas.width = videoEL.videoWidth;
            canvas.height = videoEL.videoHeight;
            var ctx = canvas.getContext("2d");
            // 绘制图片
            ctx.drawImage(videoEL, 0, 0, canvas.width, canvas.height);

            // 直接推入图片循环列表 src 会被识别为数字 不会展示图片
            this.imgList.push(canvas.toDataURL("image/png"));

            // 改到第二种方法创建元素推入
            const img = document.createElement("img");
            img.className = "page__list_item";
            img.src = canvas.toDataURL("image/png");
            document.querySelector("#imgarea").appendChild(img);
        },

        // 拍摄的时候我们也可以切换摄像头，这里我们通过调用 navigator.mediaDevices.enumerateDevices 方法，获取到所有的设备
        async getDevices() {
            const devices = await navigator.mediaDevices.enumerateDevices();
            // kind 为 videoinput 的为摄像头 每个设备都有一个 deviceId，
            console.log("🚀🚀🚀 / devices", devices);

            // 可以通过这个 id 来切换设备 获取媒体流
            // const stream = await navigator.mediaDevices.getUserMedia({
            //     audio: false,
            //     video: {
            //         // 指定设备Id
            //         deviceId: { exact: deviceId }
            //     }
            // });
        },

        // 媒体记录
        getSupportMimeTypes() {
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

            this.supported = supported;
            this.mediaOptions.mimeType = this.supported[0];
            console.log("支持的视屏类型", this.supported);
        },

        // 录制媒体流
        startRecord(type) {
            let stream = "";
            if (type == 1) {
                stream = document.querySelector("#userVideo").srcObject || null;
            } else {
                stream =
                    document.querySelector("#localVideo").srcObject || null;
            }

            if (!stream) {
                console.log(`未获取到${type == 1 ? "用户" : "屏幕"}相关流数据`);
                return;
            }

            /**
             *
             *  const kps = 1024;
             *  const Mbps = kps * kps;
             *
             *  流数据可以是来自于使用 navigator.mediaDevices.getUserMedia() 创建的流或者来自于
             *   <audio>, <video> 以及 <canvas> DOM 元素。
             */

            this.mediaRecorder = new MediaRecorder(stream, this.mediaOptions);

            if (this.recordType == "all") {
                // 开始录制 state 变为 recording
                this.setRecorder();
                this.mediaRecorder.start();
            } else {
                // 间隔获取 需要传入timeslice
                // this.setInterval();
                // this.mediaRecorder.start(this.timecell);

                this.setRecorder();
                this.mediaRecorder.start();
                this.timer = setInterval(() => {
                    this.mediaRecorder.stop();
                    this.mediaRecorder.start();
                }, this.timecell);
            }

            console.log("mediaRecorder实例", this.mediaRecorder);
        },

        // 间隔获取录制数据
        setInterval() {
            // 清空
            this.blobList = [];
            this.mediaRecorder.ondataavailable = e => {
                if (e.data.size > 1024 * 1024) {
                    // let tempData = new Blob([e.data], { type: "video/webm" });
                    console.log("存入数据", e.data);
                    this.blobList.push(e.data);
                }
            };
        },

        // 一次性获取录制数据
        setRecorder() {
            /**
             *  媒体流结束时，所有尚未传递到ondataavailable处理程序的媒体数据都将在单个Blob中传递。
             *  当调用MediaRecorder.stop() (en-US)时，自记录开始或dataavailable事件最后一次发生
             *  以来已捕获的所有媒体数据都将传递到Blob}中；此后，捕获结束。也可以使用 requestData，
             *  调用MediaRecorder.requestData() (en-US) dataavailable时，将传递自记录开始或事件
             *  最后一次发生以来捕获的所有媒体数据；然后Blob创建一个新文件，并将媒体捕获继续到该 blob 中。
             */
            this.mediaRecorder.ondataavailable = e => {
                // 将录制的数据合并成一个 Blob 对象
                // const blob = new Blob([e.data], { type: e.data.type })
                // console.log("data", e.data);

                // 🌸重点是这个地方，我们不要把获取到的 e.data.type设置成 blob 的 type，而是直接改成 mp4

                if (this.recordType == "all") {
                    this.blobData = new Blob([e.data], { type: "video/webm" });
                } else {
                    let tempData = new Blob([e.data], { type: "video/webm" });
                    this.downloadNow(tempData);
                }
            };
        },

        // 停止录制
        stopRecord() {
            // 如果是分开切换
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }

            // 录制的状态：inactive（未开始或停止）,recording(正在录制)，paused（暂停）
            if (this.mediaRecorder?.state !== "inactive") {
                // let requestData = this.mediaRecorder.requestData();
                // console.log("requestData", requestData);
                this.mediaRecorder.stop();
            }
        },

        // 下载
        downloadVideo() {
            if (this.recordType == "all") {
                this.downloadBlob();
            } else {
                // this.timesliceDownload();
            }
        },

        downloadNow(data) {
            // 将 Blob 对象转换成一个 URL 地址
            const url = URL.createObjectURL(data);
            const a = document.createElement("a");
            // 设置 a 标签的 href 属性为刚刚生成的 URL 地址
            a.href = url;
            // 设置 a 标签的 download 属性为文件名
            a.download = `${new Date().getTime()}.webm`;
            // 模拟点击 a 标签
            a.click();
            // 释放 URL 地址
            URL.revokeObjectURL(url);
        },

        // 将每段时间和在一起进行下载
        intervalDownload() {
            console.log("blobList", this.blobList);
            // MediaRecorder使用start()方法，这个方法可以设置时间，比如start(1000)相当于把每隔个1000毫秒把媒体流存放到一个数组中，比如你需要200M,你可以去计算每隔1000毫秒添加进去的blob大小去计算，当blob的总的大小为200M就把这个视频上传，我之前是按这种方式去做的，但是后面发现有问题，这个分割出来的视频只有第一个视频能播放，后面的视频不能播放（无效视频），当时没发现啥问题，这个问题困扰了我一天，后来才发现原来是元数据的问题,元数据好比描述文件结构，那么可以理解一个文件里面需要元数据和实际的数据，在datavailable事件中data中获得的内容只是生成的整个文件的一部分. 第一个通常包含元数据和一些其他数据,但下一部分不包含元数据，这个就是问题所在，所以为什么只能播放第一个视频，后面的播放不了，因为后面的数据不包含元数据，所以这种方法果断放弃了!

            // 将 Blob 对象转换成一个 URL 地址
            let blob = new Blob(this.blobList, {
                type: "video/webm"
            });
            let url = window.URL.createObjectURL(blob);
            console.log("临时路由", url);
            let videoItem = document.createElement("video");
            videoItem.className = "page__area_video";
            videoItem.src = url;
            videoItem.controls = "controls";
            document.querySelector(".page__area").appendChild(videoItem);
            let a = document.createElement("a");
            a.style.display = "none";
            // 设置 a 标签的 href 属性为刚刚生成的 URL 地址
            a.href = url;
            a.download = `list${i}.webm`;
            document.body.appendChild(a);
            // 设置 a 标签的 download 属性为文件名
            // 模拟点击 a 标签
            a.click();
            setTimeout(() => {
                // 释放 URL 地址
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 100);
        },

        // 一次性 下载 Blob
        downloadBlob() {
            if (!this.blobData?.type) {
                console.log("未录制视频");
                return;
            }

            // 将 Blob 对象转换成一个 URL 地址
            const url = URL.createObjectURL(this.blobData);
            const a = document.createElement("a");
            // 设置 a 标签的 href 属性为刚刚生成的 URL 地址
            a.href = url;
            // 设置 a 标签的 download 属性为文件名
            a.download = `${new Date().getTime()}.${
                this.blobData.type.split("/")[1]
            }`;
            // 模拟点击 a 标签
            a.click();
            // 释放 URL 地址
            URL.revokeObjectURL(url);
        }
    },

    beforeDestroy() {
        clearInterval(this.timer);
        this.timer;
    }
};
</script>

<style lang="less">
.page {
    &__area {
        width: 100%;
        min-height: 300px;
        margin: 0 0 20px 0;
        background: @colorebecec;
        .flex(stretch, flex-start, wrap, row);
        &_video {
            height: 300px;
            flex: 1;
        }
    }

    &__list {
        width: 100%;
        margin: 0 0 20px 0;
        background: @colorebecec;
        .flex(stretch, flex-start, row, wrap);

        &_item {
            margin: 0 10px 10px 0;
            width: 200px;
            height: 200px;
        }

        &_item img {
            max-width: 200px;
            max-height: 200px;
            object-fit: contain;
        }
    }

    &__operate {
        &_button {
            margin: 0 10px 10px 0;
        }
    }
}
</style>
