<template>
    <!--  虚线框区域 -->
    <div class="block" :style="{ borderStyle: blockLine }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    head() {
        return {};
    },
    props: {
        blockLine: {
            type: String,
            // 俩种 default 声明方式都可以
            // default: "red"
            default: () => {
                return "dashed";
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
.block {
    position: relative;
    padding: 10px;
    margin: 10px;
    border: 1px dashed @dashColor;
    border-radius: 6px;
}
</style>
