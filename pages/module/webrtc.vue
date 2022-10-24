<template>
    <!-- 新建文件的模板 -->
    <div class="page">
        <Contents>webrtc</Contents>

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
            <div
                v-for="(item, index) in imgList.length"
                :key="index"
                class="page__list_item"
            >
                <img :src="item" alt="" />
            </div>
        </div>

        <div class="page__operate">
            <el-button type="primary" @click="join">加入</el-button>
            <el-button type="primary" @click="leave">离开</el-button>
            <el-button type="primary" @click="takePhoto">拍照</el-button>
            <el-button type="primary" @click="sharScreen">分享屏幕</el-button>
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
            ]
        };
    },
    mounted() {
        // this.getDevices();
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
        }
    },

    beforeDestroy() {}
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.page {
    &__area {
        width: 100%;
        min-height: 300px;
        margin: 0 0 20px 0;
        background: @colorebecec;
        .flex(stretch, flex-start, row, wrap);
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
}
</style>
