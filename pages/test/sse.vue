<template>
    <!-- 新建文件的模板 -->
    <div class="sse">
        <h4>sse请求</h4>
        <div class="sse__main" v-html="dataCLoud"></div>
        <el-button type="primary" size="small" @click="getData">请求</el-button>
    </div>
</template>

<script>
import { strJson } from "@/plugins/util";
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
            dataCLoud: "",
        };
    },
    mounted() {},
    methods: {
        async getData() {
            this.dataCLoud = "";
            const response = await fetch("/localServer/api/eventsource", {});
            if (!response.body) {
                throw new Error("ReadableStream not supported in this browser");
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                console.log("buffer", buffer);
                // 处理完整的消息
                let boundary;
                let index = 0;
                while ((boundary = buffer.indexOf("\n\n")) !== -1) {
                    const chunk = buffer.slice(0, boundary); // 截取一条完整的没有\n\n消息
                    buffer = buffer.slice(boundary + 2); // 剩下的内容
                    let tempData = "";
                    // console.log('tempData', tempData, typeof tempData);
                    if (chunk.trim()?.startsWith("data:")) {
                        tempData = strJson(chunk.trim().split("data:")[1]);
                    } else {
                        tempData = strJson(chunk.trim());
                    }
                    this.dataCLoud += tempData?.content || "";
                    index++;
                }
            }
        },
    },
};
</script>

<style lang="less">
.sse {
    &__main {
        margin: 20px;
        padding: 16px;
        border: 1px solid #f5f5f5;
    }
}
</style>
