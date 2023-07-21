<template>
    <!-- 新建文件的模板 -->
    <div class="example">
        测试使用iconfont
        <div>
            <div>1.Unicode 引用</div>
            <span class="iconfont">&#xe664;</span>
            <span class="iconfont">&#xe665;</span>
        </div>
        <div>
            <div>2.font-class</div>
            <span class="iconfont icon-add"></span>
            <span class="iconfont icon-gerenxinxi"></span>
        </div>
        <div>
            <div>3.symbol引用</div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-add"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gerenxinxi"></use>
            </svg>
        </div>
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
    mounted() {},
    methods: {}
};
</script>

<style lang="less">
// @import "~assets/less/index.less";
</style>
