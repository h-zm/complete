<template>
    <div class="upload">
        <el-upload
            class="upload-demo"
            action="#"
            :before-upload="handleBefore"
            :before-remove="beforeRemove"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
                上传
            </div>
        </el-upload>
    </div>
</template>

<script>
// import { Archive } from "libarchive.js/dist/main.js";
// Archive.init({
//     workerUrl: "libarchive.js/dist/worker-bundle.js"
// });
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
            fileList: []
        };
    },
    mounted() {},
    methods: {
        async handleBefore(file) {
            console.log("上传前", file);
            const archive = await Archive.open(file);
            let obj = await archive.extractFiles();
            console.log(obj);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
};
</script>

<style lang="less">
.upload {
}
</style>
