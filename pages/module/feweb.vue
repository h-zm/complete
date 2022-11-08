<template>
    <!-- 新建文件的模板 -->
    <div class="plug">
        <input type="file" @input="chooseFile($event)" />
        <el-button @click="handleBack">fanhi</el-button>
        <div class="plug__video">
            <div>
                live：
                <video
                    id="live"
                    class="plug__video_item"
                    muted
                    src=""
                    autoplay
                    playbackRate="2"
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
    getBlobData
} from "fe-webrtc";
import http from "axios";
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
        },

        handleBack() {
            getBlobData().then(res => {
                console.log("fewebrtc res", res);
            });
        },

        chooseFile(data) {
            console.log("选择文件", data.srcElement.files[0]);
            this.upload(data.srcElement.files);
        },

        upload(file) {
            http.post(
                "http://140.210.90.177:85/datasience/vbap3/dashboard/transfer/uploadFile",
                {
                    file: formData
                },
                {
                    headers: {
                        guid: "datascience",
                        token:
                            "Vw9DfmP0jaTX3BPOmORpVx6XK0GhMzzQHtptQw1UsFlfgUervZ4dodCJk2F/VQWn8jTz9Tn3HlJfR0HS7Ikr+dJBpUIszowEhif8ShFWUC2owzjbgDfl5lL0BgLWntrPUekHZdgpjzQGOqpdRIvRjJx+X83Sv1djwQz30XmDVzNk2xFxnfd2EB/UoxrIEsstk4eqBciPkHvVR7c9BAT6dw==",
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
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
