<template>
    <!-- 数字滚动测试 -->
    <div class="scroll">
        <div class="scroll__section">
            1. 数字无限滚动

            <div class="scroll__section_item">
                <NumberAni :numData="varietyNum"></NumberAni>
            </div>
        </div>

        <div class="scroll__section">
            2. 操作数字增减
            <div class="scroll__section_item">
                <el-button size="mini" @click="addValue('+')">+</el-button>
                <el-button size="mini" @click="addValue('-')">-</el-button>
                <el-button size="mini" @click="addValue('reset')"
                    >reset</el-button
                >
            </div>
            <div class="scroll__section_item">
                <NumberAni :numData="operateNum"></NumberAni>
            </div>
        </div>
    </div>
</template>

<script>
import NumberAni from "~/components/NumberAni.vue";
export default {
    components: {
        NumberAni
    },
    data() {
        return {
            // 一直滚动的数字
            varietyNum: 0,

            // 操作的数字
            operateNum: 998
        };
    },
    mounted() {
        this.initData();
        this.operateNum = 109;
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
    methods: {
        // 初始化数值
        initData() {
            this.varietyNum = 9999;
            this.timer = setInterval(() => {
                this.varietyNum = parseInt(Math.random() * 10000000000);
            }, 3000);
        },

        addValue(type) {
            switch (type) {
                case "+":
                    this.operateNum += 1;
                    break;
                case "-":
                    this.operateNum -= 1;
                    break;
                default:
                    this.operateNum = 109;
                    break;
            }
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.scroll {
    &__section {
        margin: 0 0 20px 0;

        &_item {
            padding: 16px;
        }
    }
}
</style>
