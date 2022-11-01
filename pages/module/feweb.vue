<template>
    <!-- 新建文件的模板 -->
    <div class="plug">
        <div class="plug__video">
            <div>
                live：
                <video
                    id="live"
                    class="plug__video_item"
                    muted
                    src=""
                    autoplay
                ></video>
            </div>
            <div>
                down:
                <video
                    id="preview"
                    class="plug__video_item"
                    controls="controls"
                    muted
                    src=""
                    autoplay
                ></video>
            </div>
        </div>
    </div>
</template>

<script>
import {
    init,
    startRecord,
    stopRecord,
    download,
    clearCount
} from "~/plugins/po.js";
export default {
    head() {
        return {
            title: "fe-webrtc",
            meta: "",
            description: "fe-webrtc插件使用",
            name: "模板",
            script: []
        };
    },
    data() {
        return {};
    },
    mounted() {
        init();
    },
    methods: {
        handleButton(type) {
            if (type == "start") {
                startRecord();
            } else if (type == "stop") {
                stopRecord();
            } else {
                download();
            }
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.plug {
    &__video {
        &_item {
            margin: 20px 0 0 0;
            width: 320px;
            height: 180px;
        }
    }
}
</style>
