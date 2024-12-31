<template>
    <!-- 新建文件的模板 -->
    <div class="example">
        postMessage
        <div>{{ JSON.stringify(messageData) }}</div>
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
            script: [],
        };
    },
    data() {
        return {
            messageData: "",
        };
    },
    mounted() {
        // 得用窗口属性监听
        window.addEventListener("message", (data) => {
            // console.log("接收到", data.data.refresh);
            console.log("接收到", data);
            this.messageData = data.data;
            // window.location.reload();
        });
        // setTimeout(() => {
        //     this.postInit();
        // }, 1000);
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
