<template>
    <!-- 测试 qrcode  -->
    <div class="qrpage">
        测试qrcode二维码
        <div class="qrpage-main">
            <img id="image" />
        </div>
    </div>
</template>

<script>
import QRCode from "qrcode";
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
        return {};
    },
    mounted() {
        let opts = {
            errorCorrectionLevel: "H",
            type: "image/jpeg",
            quality: 0.3,
            margin: 2,
            color: {
                // 二维码主体色
                dark: "#000",
                // 背景色
                light: "#fff"
            }
        };

        QRCode.toDataURL("https://www.npmjs.com/package/qrcode", opts, function(
            err,
            url
        ) {
            if (err) throw err;
            let imgTarget = document.getElementById("image");
            imgTarget.src = url;
        });
    },
    methods: {}
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.qrpage {
    &-main {
        border: 1px solid #000;
        border-radius: 6px;
        padding: 12px;
    }
}
</style>
