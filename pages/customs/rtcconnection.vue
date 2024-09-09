<template>
    <!-- peer to peer -->
    <div class="rtc">
        <contents>
            <codes>RTCCONNECTION</codes> <br />
            1.通过 <codes>getUserMedia</codes> 访问 摄像头/麦克风
            信息，可以拿到媒体流数据。<br />
            2.通过点通信方法
            <codes>RTCPeerConnection</codes> 声明俩实例，一个作为本地端（offer
            提供数据），一个作为远端（answer，接受数据后响应处理）
            <br />
            3.本地端通过
            <codes> createOffer </codes>
            方法生成描述信息，用作offer端的本地描述(<codes>setLocalDescription</codes>)、answer端的获取描述
            (<codes>setRemoteDescription</codes>)。远端通过
            <codes> createAnswer </codes>
            生成描述信息，用作answer端的本地描述、offer端的获取描述。设置俩端描述后，俩端将成为ice候选者同时触发自身iceCandidate事件，在该函数内通过
            自身<codes>addIceCandidate</codes>
            将对方添加到自己 PeerConnection
            中，从而达到俩端链接，打通通信通道。注意写代码时的执行顺序！
            <br />
            4. 现在，本地端通过 <codes>addTrack</codes>
            将现有的媒体流轨道数据发送到信令通道，远端通过<codes>ontrack</codes>监听拿到数据
        </contents>

        <div class="rtc__area">
            <div class="rtc__left">
                <div>local:</div>
                <div class="rtc__left_block">
                    <video id="local" autoplay playsinline></video>
                </div>
            </div>
            <div class="rtc__right">
                <div>remote:</div>
                <div class="rtc__right_block">
                    <video id="remote" autoplay playsinline></video>
                </div>
            </div>
        </div>

        <div>
            <el-button v-if="!localStream" @click="handleStart"
                >获取摄像头</el-button
            >
            <el-button v-else @click="handleEnd">停止</el-button>
            <el-button v-if="!rtc1" @click="handleJoin">加入通信</el-button>
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
            rtc1: null,
            rtc2: null,
            singaling: null,
            configs: {},
            local: null,
            remote: null,
            localStream: null,
            remoteSream: null,
            sendData: null,
            receiveData: null,
            tracks: null
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            console.log("init");
            this.local = document.getElementById("local");
            this.remote = document.getElementById("remote");

            // // 创建的频道数据
            // this.singaling = new BroadcastChannel("test-webrtc");
        },
        getName(target) {
            return target === "rtc1" ? "rtc1" : "rtc2";
        },

        getOtherPc(target) {
            return target === "rtc1" ? this.rtc2 : this.rtc1;
        },

        clearRtcPeer() {
            if (this.rtc1) {
                this.rtc1.close();
            }
            this.rtc1 = null;
            if (this.rtc2) {
                this.rtc2.close();
            }
            this.rtc2 = null;
        },

        handleTrack(e) {
            console.log("接受到数据", e);
        },

        async handleStart() {
            // 获取本地流数据 推入到rtc中
            try {
                // getUserMedia 媒体信息
                // getDisplayMedia 屏幕信息，用户自主选择要分享的内容（浏览器窗口、屏幕）
                this.localStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                });

                // 播放本地视频流 video标签需要设置 autoplay
                this.local.srcObject = this.localStream;
            } catch {
                this.$message.error(
                    "获取本机摄像头失败!，请检查是否授予页面摄像头/音频使用权限"
                );
            }
        },

        handleEnd() {
            // 关闭每一个轨道
            this.localStream.getTracks().forEach(track => {
                track.stop();
            });
            this.localStream = null;
            this.local.srcObject = null;
            this.remote.srcObject = null;
            this.clearRtcPeer();
        },

        async handleJoin() {
            try {
                // 声明点对点通信连接的核心实例
                const videoTracks = this.localStream.getVideoTracks();
                const audioTracks = this.localStream.getAudioTracks();
                if (videoTracks.length > 0) {
                    console.log(`Using video device: ${videoTracks[0].label}`);
                }
                if (audioTracks.length > 0) {
                    console.log(`Using audio device: ${audioTracks[0].label}`);
                }
                this.rtc1 = new RTCPeerConnection(this.configs);
                this.rtc2 = new RTCPeerConnection(this.configs);
                //
                this.rtc1.onicecandidate = e => {
                    this.handleIcecanddidate("rtc1", e);
                };
                this.rtc2.onicecandidate = e => {
                    this.handleIcecanddidate("rtc2", e);
                };

                // 不会触发
                // this.rtc1.ontrack = e => {
                //     console.log("本端接受到数据", e);
                // };

                this.rtc2.ontrack = e => {
                    console.log("远端接受到数据", e);
                    if (this.remote.srcObject !== e.streams[0]) {
                        this.remote.srcObject = e.streams[0];
                    }
                };

                // 将本地媒体流添加到 RTCPeerConnection 中
                this.localStream.getTracks().forEach(track => {
                    this.rtc1.addTrack(track, this.localStream);
                });

                this.handleCreate();
            } catch {
                this.$message.error("视频轨道添加到通信实例失败");
                this.clearRtcPeer();
            }
        },

        async handleIcecanddidate(target, event) {
            try {
                // 将候选者target添加到本地 PeerConnection 中
                await this.getOtherPc(target).addIceCandidate(event.candidate);
            } catch (e) {
                this.$message(
                    `为${this.getName(target)}添加addIceCandidate失败`
                );
                this.clearRtcPeer();
            }
        },

        async handleCreate() {
            console.log("createOffer start");
            // 创建数据发送到rtc2
            try {
                const offer = await this.rtc1.createOffer({
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                });
                this.handleDescription(offer);
            } catch {
                this.$message.error("创建通信数据失败");
                this.clearRtcPeer();
            }
        },

        async handleDescription(data) {
            console.log("localDescription start");

            function callBack(res) {
                console.log("回调函数", res);
            }
            function errorBack(err) {
                console.log("失败回调", err);
            }

            try {
                // 设置本端的描述 用于双方需要交换会话描述协议
                await this.rtc1.setLocalDescription(data, callBack, errorBack);
            } catch {
                this.$message.error("设置本地通信数据失败");
                this.clearRtcPeer();
            }

            try {
                // 将设置本端的数据，等待远端获取
                await this.rtc2.setRemoteDescription(data);
            } catch (e) {
                this.$message.error("设置远程通信数据失败");
                this.clearRtcPeer();
            }

            // 顺序很重要 需要等到本地端设置好本地与远端描述
            this.handleAnswer();
        },

        async handleAnswer() {
            console.log("answer start");
            // 创建接受者
            try {
                const answer = await this.rtc2.createAnswer();
                console.log(("answer", answer));
                this.handleAnswerInfo(answer);
            } catch {
                this.$message.error("创建数据接受者失败");
                this.clearRtcPeer();
            }
        },
        async handleAnswerInfo(data) {
            console.log("remoteDescrip start");

            function callBack(res) {
                console.log("回调函数", res);
            }
            function errorBack(err) {
                console.log("失败回调", err);
            }

            // console.log(`Answer from pc2:\n${data.sdp}`);

            try {
                // 设置本端的描述 用于双方需要交换会话描述协议
                await this.rtc2.setLocalDescription(data, callBack, errorBack);
            } catch {
                this.$message.error("设置本地通信数据失败");
                this.clearRtcPeer();
            }

            try {
                // 将设置本端的数据，等待远端获取
                await this.rtc1.setRemoteDescription(data);
            } catch (e) {
                this.$message.error("设置远程通信数据失败");
                this.clearRtcPeer();
            }
        }
    }
};
</script>

<style lang="less">
// @import "~assets/less/index.less";
.rtc {
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
