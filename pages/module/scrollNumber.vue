<template>
    <!-- 新建文件的模板 -->
    <div class="scroll">
        <div class="scorll-div">
            1.JS 尾部直接链接到头部
            <el-button size="mini" @click="addPx('+')">+</el-button>
            <el-button size="mini" @click="addPx('-')">-</el-button>
            <el-button size="mini" @click="addPx('reset')">reset</el-button>
        </div>

        <div class="scroll-box">
            <!-- :style="{ 'margin-top': marginInfo.top + 'px' }" -->
            <div
                class="scroll-line"
                :style="{ transform: `translated3d(0,${marginInfo.top}px,0)` }"
            >
                <p
                    class="scroll-box-item"
                    :class="{ 'scroll-now': currentNumber == number }"
                    v-for="(number, index) in numberList"
                    :key="index"
                >
                    {{ number }}
                </p>
                <!-- 模糊效果 -->
                <svg width="0" height="0">
                    <filter id="svgblur">
                        <feGaussianBlur
                            in="SourceGraphic"
                            :stdDeviation="`0 ${blur}`"
                        />
                    </filter>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            originList: [0, 1, 2, 3],
            numberList: [0, 1, 2, 3],
            currentNumber: 1,
            marginInfo: {
                top: 0
            },
            boxItemHeight: 36,
            blur: 1,
            timer: null,
            alreadyLoop: true, // 是否完成过循环
            loopType: 1 // 1从尾部返回到头部开始循环 2尾部直接链接到头部
        };
    },
    mounted() {
        // JS控制
        this.timer = setInterval(() => {
            if (
                Math.abs(this.marginInfo.top) ==
                (this.numberList.length - 1) * 36
            ) {
                // let beforeNumber = this.numberList.slice(0, this.numberList.length - 1);
                // console.log(beforeNumber, "之前的数据");
                // this.numberList = [this.numberList, ...this.originList];
                // this.numberList = this.numberList.concat(this.originList);
                // this.marginInfo.top = 0;
                // console.log(this.numberList, "当前循环类型");
                // console.log(this.timer, "发生");
                // clearInterval(this.timer);
                // this.timer = null;
                // this.marginInfo.top = 0;
            } else {
                // this.marginInfo.top += -this.boxItemHeight;
            }
            // this.marginInfo.top += -this.boxItemHeigh;
        }, 800);
        this.timer;
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
    methods: {
        // type 执行类型
        addPx(type) {
            if (type == "+") {
                this.marginInfo.top += this.boxItemHeight;
            } else if (type == "-") {
                this.marginInfo.top += -this.boxItemHeight;
            } else {
                this.marginInfo.top = 0;
            }
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.scroll {
    padding: 12px;
    &-div {
        margin-bottom: 8px;
    }
    &-box {
        margin-top: 100px;
        height: 36px;
        width: 24px;
        text-align: center;
        border-radius: 6px;
        border: 1px solid #28292a;
        transition: 0.3s all linear;
        // overflow: hidden;
        &-item {
            height: 36px;
            line-height: 36px;
            // -webkit-filter: url(#svgblur);
            // filter: url(#svgblur);
        }
    }
    &-line {
        transition: 0.3s all ease-in;
    }
    &-now {
        border-radius: 6px;
        color: red;
        // background: red;
        filter: none;
    }
}
</style>
