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
            <div slot="tip" class="el-upload__tip">上传</div>
        </el-upload>
        <pre>{{ loadText }}</pre>
    </div>
</template>

<script>
import JSZip from "jszip";
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
        return {
            fileList: [],
            loadText: "",
        };
    },
    mounted() {},
    methods: {
        async unzip(file) {
            let obj = await JSZip.loadAsync(file);
            const tempFiles = obj.files;
            console.log("文件读取结果", tempFiles);
            for (let i in tempFiles) {
                // TextDecoder 文本解码器
                let result = new TextDecoder().decode(
                    tempFiles[i]._data.compressedContent
                );
                this.loadText = result;
                console.log(`${tempFiles[i].name}`, result);
                // const reader = new FileReader();
                // reader.onload = function(event) {
                //     console.log("文件数据", event?.target?.result || "");
                // };
                // // reader.readAsArrayBuffer(tempFiles[i]._data.compressedContent);
                // reader.readAsBinaryString(tempFiles[i]._data.compressedContent);
            }
        },
        handleBefore(file) {
            console.log("上传前", file);
            this.unzip(file);
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
        },
    },
};
</script>

<style lang="less">
.upload {
}
</style>
