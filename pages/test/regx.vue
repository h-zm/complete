<template>
    <!-- 新建文件的模板 -->
    <div class="example">regx</div>
</template>

<script>
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
            textData:
                "热门素材快速选择\n12\n企微销服管家菜单及页面展示（示例）\n3.2 智能化侧边栏",
        };
    },
    mounted() {
        setTimeout(() => {
            this.init();
        }, 1000);
    },
    methods: {
        init() {
            // const temp = this.textData.replace(/\n[0-9]+\n/g, "");
            // const temp = this.textData.replace(/\n(\d+)\n/g, "");
            const temp = this.textData.replace(/\n(\d)+\n/g, "");
            console.log("temp", JSON.stringify(temp));
        },
    },
};
</script>

<style lang="less">
.example {
}
</style>
