<template>
    <!-- 数字滚动组件 -->
    <div class="lx">
        <h4>{{ curValue }}</h4>
        <el-button @click="clickFunc">增 加</el-button>
    </div>
</template>

<script>
import { _debounce, _throttle } from "~/plugins/util.js";
export default {
    data() {
        return {
            curValue: 0
        };
    },
    created() {},
    mounted() {},
    methods: {
        handleADD() {
            this.curValue += 1;
            console.log("执行赋值", this.curValue);
        },

        // 使用防抖
        clickFunc: _debounce(function() {
            this.curValue += 1;
            console.log("执行赋值", this.curValue);
        }, 1000)
    }
};
</script>

<style lang="less" scoped></style>
