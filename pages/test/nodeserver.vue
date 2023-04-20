<template>
    <!-- 新建文件的模板 -->
    <div class="example">
        新建Vue文件模板
    </div>
</template>

<script>
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
        this.getData();
    },
    methods: {
        // 尝试获取数据
        getData() {
            this.$axios.get("http://172.16.75.48:5300/user/James").then(res => {
                console.log("获取结果", res);
            });
        }
    }
};
</script>

<style lang="less">
.example {
}
</style>
