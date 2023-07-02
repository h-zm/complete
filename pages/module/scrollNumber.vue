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

        <div class="scroll__section">
            3. 数字千位符
            {{ diviNumber }}
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
            operateNum: 998,

            diviNumber: 1000000000
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

            this.handleSeparator(this.diviNumber);
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
        },

        handleSeparator(data = 0, speara = ",") {
            if (isNaN(data)) {
                return "";
            }

            let tempList = String(data)
                .split("")
                .reverse();

            let resultList = [];

            let startIndex = 3;

            while (startIndex < tempList.length) {
                resultList.push(startIndex);
                startIndex += 3;
            }

            // 要往后推入一位所以是3开始
            resultList.forEach((it, index) => {
                tempList.splice(it + index, 0, speara);
            });

            console.log("resultList", resultList);
            this.diviNumber = tempList.reverse().join("");
        }
    }
};
</script>

<style lang="less">
.scroll {
    &__section {
        margin: 0 0 20px 0;

        &_item {
            padding: 16px;
        }
    }
}
</style>
