<template>
    <!-- peer to peer -->
    <div class="ptp">
        <contents> <codes>Peer to Peer </codes> <br /> </contents>

        <div class="ptp__area">
            <div class="ptp__left">
                <div
                    class="ptp__others"
                    v-for="(item, index) in memebers"
                    :key="`${this.channelId}_${index + 1}`"
                >
                    <video
                        :id="`${this.channelId}_${index + 1}`"
                        autoplay
                        playsinline
                    ></video>
                </div>
            </div>
            <div class="ptp__right">
                <div class="ptp__myself">
                    <video id="local" autoplay playsinline></video>
                </div>
                <div class="ptp__chatlist"></div>
                <div class="ptp__text"></div>
                <div class="ptp__btns">
                    <el-button
                        v-if="localInfo.cameraState !== 1"
                        @click="handleJoin"
                        >加入</el-button
                    >
                    <el-button
                        v-if="localInfo.cameraState === 1"
                        @click="handleStop"
                        >停止</el-button
                    >
                    <el-button @click="handlePost">发言</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { init } from "echarts";

export default {
    head() {
        return {
            title: "vue文件模板",
            meta: "",
            description: "可用复制来快速创建文件",
            name: "模板",
            script: []
        };
    },
    data() {
        return {
            roomId: "complete-signalling",
            channelId: "complete-signalling",
            memebers: [],
            signalling: null,
            allData: [],
            errorList: [],
            // 本页状态
            localInfo: {
                cameraState: 0
            },
            userMediaConfig: {
                audio: true,
                video: true
            }
        };
    },

    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 在当前域下初始化一个信令频道
            this.signalling = new BroadcastChannel(this.channelId);
            // 根据信令添加监听分类处理事件
            this.signalling.onmessage = e => {
                console.log("收到内容", e);
                this.allData.push({
                    time: new Date().toLocaleTimeString(),
                    content: e
                });
            };

            this.signalling.onmessageerror = e => {
                console.log(`${new Date()}`, e);
                this.errorList.push({
                    time: new Date().toLocaleTimeString(),
                    content: e
                });
            };
        },

        // 开启摄像头
        async handleCamera() {
            //
            if (this.localInfo.cameraState === 1) {
                console.log("相机状态以开启");
            }

            try {
                const localStream = await navigator.mediaDevices.getUserMedia(
                    this.userMediaConfig
                );
                this.localInfo.cameraState = 1;
            } catch {
                this.$message.error("获取本地媒体流信息失败");
                this.localInfo.cameraState = -1;
            }
        }
    },

    destoryed() {
        this.signalling?.close();
    }
};
</script>

<style lang="less">
// @import "~assets/less/index.less";
.ptp {
    &__area {
        padding: 10px;
        .flex(center, space-between);
    }

    &__left,
    &__right {
        width: 48%;
    }

    &__left_block {
        height: 400px;
        border: 1px solid #bcb6b6;
        border-radius: 5px;

        video {
            width: 100%;
            height: 100%;
        }
    }
    &__right_block {
        height: 400px;
        border: 1px solid #bcb6b6;
        border-radius: 5px;

        video {
            width: 100%;
            height: 100%;
            transform: scaleX(-1);
        }
    }
}
</style>
