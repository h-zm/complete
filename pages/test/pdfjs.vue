<template>
    <!-- 新建文件的模板 -->
    <div class="example">pdfjs</div>
</template>

<script>
import PDFViewer from "pdf-preview-highlight";
export default {
    head() {
        return {
            title: "vue文件模板",
            meta: "",
            description: "可用复制来快速创建文件",
            name: "模板",
            script: [],
        };
    },
    data() {
        return {};
    },
    mounted() {
        new PDFViewer({
            url: "/中国电信企业微信平台业务规范和技术规范/pdf",
        });
    },
    methods: {},
};
</script>

<style lang="less">
.example {
}
</style>
