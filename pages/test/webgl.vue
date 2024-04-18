<template>
    <!-- 新建文件的模板 -->
    <div class="webgl">
        <h2>测试 webgl</h2>
        <canvas id="canvasDemo"></canvas>
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
        return {};
    },
    mounted() {
        this.initGL();
    },
    methods: {
        initGL() {
            const targetEle = document.getElementById("canvasDemo");
            const webgl = targetEle.getContext("webgl");
            webgl.drawArrays(webgl.POINTS, 0, 1);
            console.log("webgl", webgl);
        },
    },
};
</script>

<style lang="less">
.webgl {
}
</style>
