<template>
    <!-- 截屏工具 -->
    <div class="sshot">
        <Contents>js-web-screen-shot</Contents>
        <a href="https://www.npmjs.com/package/js-web-screen-shot">说明文档</a>
        <el-button @click="handleShot">开始截屏</el-button>
        <div class="sshot__preview">
            <img :src="previewImg" alt="" />
        </div>
    </div>
</template>

<script>
import ScreenShot from "js-web-screen-shot";
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
            enableWebRtc: false,
            previewImg: null,
            screenShotHandler: null
        };
    },
    mounted() {},
    methods: {
        handleComplete(comple) {
            console.log("comple", comple);
            this.previewImg = comple?.base64 || null;
        },

        handleClose(close) {
            console.log("close", close);
        },

        handleShot() {
            console.log("enableWebRtc", this.enableWebRtc);
            console.log("screenShotHandler", this.screenShotHandler);
            console.log("enableWebRtc", this.enableWebRtc);
            this.screenShotHandler = new ScreenShot({
                enableWebRtc: this.enableWebRtc,
                completeCallback: this.handleComplete,
                closeCallback: this.handleClose
            });
            const canvasDom = this.screenShotHandler.getCanvasController();
        }
    },
    destoryed() {
        this.screenShotHandler.destroyComponents();
    }
};
</script>

<style lang="less">
// @import "~assets/less/index.less";
.sshot {
    position: relative;

    &__preview {
        margin: 20px 0;
        width: 500px;
        height: 500px;
        line-height: 500px;
        border: 1px solid #bab6b6;

        img {
            max-height: 490px;
            max-width: 490px;
            border: 1px solid #afa7a7;
            object-fit: contain;
        }
    }
}

#screenShotContainer {
    z-index: 2000;
}
</style>
