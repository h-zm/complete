<template>
    <!--  文字颜色 组件 -->
    <span class="font-basic" :style="{ color: fontColor }">
        <slot></slot>
    </span>
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
.font-basic {
    padding: 0 2px;
}
</style>
