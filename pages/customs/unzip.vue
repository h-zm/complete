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
        <pre>{{ resultList }}</pre>
    </div>
</template>

<script>
import JSZip from "jszip";
import Pako from "pako";
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
            resultList: "",
        };
    },
    mounted() {},
    methods: {
        async unzip(file) {
            let obj = await JSZip.loadAsync(file);
            const tempFiles = obj.files;
            console.log("文件读取结果", tempFiles);
            this.resultList = [];
            for (let i in tempFiles) {
                // compressedContent 是已经被压缩过的 unit8Array数据 不能通过
                // new TextDecoder().decode(Uint8ArrayTemp) 直接处理
                if (tempFiles[i].name.endsWith(".txt")) {
                    const compressedContent =
                        tempFiles[i]._data.compressedContent;
                    try {
                        // 也可以直接使用 inflateRaw, 以 raw stream 形式解压 得到
                        // 减压的 unit8Array 数据
                        let result = Pako.inflate(compressedContent, {
                            raw: true,
                        });
                        // 通过 TextDecoder().decode() 将 unit8Array 转化为 文本数据
                        result = new TextDecoder().decode(result);
                        this.resultList.push({
                            name: tempFiles[i].name,
                            content: result,
                        });
                        // console.log(`${tempFiles[i].name}`, result);
                    } catch (err) {
                        console.log("err", err);
                    }
                }
            }
        },

        // 将文件转化为 文件流数据（二进制）
        turnBuffer(file) {
            // 创建一个 FileReader 对象
            var reader = new FileReader();

            // 监听 FileReader 加载完成事件
            reader.onload = function (e) {
                var fileStream = e.target.result; // 文件流

                // 可以在这里对文件流进行处理，比如上传到服务器等操作
                console.log(fileStream);
            };

            // 以二进制方式读取文件内容
            reader.readAsArrayBuffer(file);
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
