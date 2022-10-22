<template>
    <!-- 新建文件的模板 -->
    <div class="about">
        <contents
            >var length = 10; function fn() { console.log('主体1',this);
            alert(this.length); } var obj = { length: 5, callApi: function(fn) {
            fn(); console.log('主体2',this); arguments[0](); } }
        </contents>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "测试关于this指向",
            meta: "",
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
@import "~assets/less/index.less";
.about {
}
</style>
