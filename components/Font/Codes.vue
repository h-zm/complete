<template>
    <!--  文字组件 -->
    <code class="code-basic" :style="{ color: fontColor }">
        <slot></slot>
    </code>
</template>

<script>
export default {
    head() {
        return {};
    },
    props: {
        fontColor: {
            type: String,
            // 俩种 default 声明方式都可以
            // default: "red"
            default: () => {
                return "red";
            }
        }
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>

<style lang="less" scoped>
.code-basic {
    border: 1px solid #ddd;
    padding: 0 4px;
    background: @colorebecec;
    border-radius: 3px;
    white-space: normal;
}
</style>
