<template>
    <!-- 新建文件的模板 -->
    <div class="example">postMessage</div>
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
        return {};
    },
    mounted() {
        setTimeout(() => {
            this.postInit();
        }, 1000);
    },
    methods: {
        postInit() {
            console.log("window child", window.parent);
            // 向上
            window.parent.postMessage(
                {
                    from: "/koko",
                    refresh: false,
                },
                "*"
            );
        },
    },
};
</script>

<style lang="less">
.example {
}
</style>
