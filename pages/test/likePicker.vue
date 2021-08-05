<template>
    <!-- 模仿 toustart touchend touchmove -->
    <div class="like-page">
        <div
            class="move-area"
            :style="{
                top: startPosition.offsetTop + 'px',
                left: startPosition.offsetLeft + 'px'
            }"
        ></div>
        <div
            class="picker-box"
            @touchstart="touchFunc($event)"
            @touchmove="touchFunc($event)"
            @touchend="touchFunc($event)"
        >
            <div class="choose-picker">{{ choosePicker.name }}</div>
            <!-- :style="{ 'margin-top': returnMargin() + 'px' }" -->
            <div class="pickers" :style="{ 'margin-top': marginValue + 'px' }">
                <div class="picker-column" v-for="i in rangeList" :key="i.id">
                    {{ i.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rangeList: [
                { name: "A", id: 1 },
                { name: "B", id: 12 },
                { name: "C", id: 13 },
                { name: "D", id: 14 },
                { name: "E", id: 15 },
                { name: "F", id: 16 },
                { name: "G", id: 17 }
            ],
            startPosition: {}, // 滑动起始位置
            endPosition: {}, // 滑动停止位置
            moveingPosition: {}, // 滑动中的距离
            choosePicker: {},
            styleInfo: {}, // 选中框信息
            marginValue: {}, // 当前margin值
            limitRange: {
                up: 0,
                down: 0
            } // 极限值
        };
    },
    mounted() {
        this.choosePicker = this.rangeList[0];
        this.getStyleInfo(".choose-picker");
    },
    methods: {
        getStyleInfo(styleName) {
            let result = document.querySelectorAll(styleName);
            this.styleInfo = result[0];
            console.log(result, "样式结果");
            // 最大的向上移动值
            if (!this.rangeList.length) {
                return;
            }
            this.limitRange.up =
                (this.rangeList.length - 1) * this.styleInfo.offsetHeight;
            console.log(this.limitRange, "界限信息");
        },
        touchFunc($event, i) {
            let { type, targetTouches, target } = $event; // type是当前执行的类型，target是目标过程中一直不会变 targetTouches是滑动中的数据变动 和 toucher 大致相同
            // console.info($event, "sad123");
            if (type == "touchstart") {
                this.startPosition = targetTouches;
                console.info(this.startPosition[0].pageY, "touchstart操作类型");
            } else if (type == "touchmove") {
                this.moveingPosition = targetTouches;
                // console.info(this.moveingPosition[0].pageY, "touchmove操作类型");
            } else if (type == "touchend") {
                this.endPosition = targetTouches;
                // console.info(this.endPosition, "touchend操作类型");

                this.returnMargin();
            }
        },

        // 返回margin 距离
        returnMargin() {
            if (!this.moveingPosition[0]?.pageY) {
                this.marginValue = 0;
            }

            // 向下移动
            if (this.moveingPosition[0].pageY > this.startPosition[0].pageY) {
                if (
                    this.moveingPosition[0].pageY -
                        this.startPosition[0].pageY >
                    this.limitRange.up
                ) {
                    // 超过向下滑的最大值
                    console.log(
                        this.moveingPosition[0].pageY -
                            this.startPosition[0].pageY,
                        "超过最大值"
                    );
                    this.marginValue = this.limitRange.down;
                } else {
                    console.log(
                        this.moveingPosition[0].pageY -
                            this.startPosition[0].pageY,
                        "没有超过最大值"
                    );
                    this.marginValue =
                        this.moveingPosition[0].pageY -
                        this.startPosition[0].pageY;
                }
            }

            // 向上移动 Math.abs() 绝对值方法
            if (this.moveingPosition[0].pageY <= this.startPosition[0].pageY) {
                if (
                    this.moveingPosition[0].pageY -
                        this.startPosition[0].pageY <
                    0 - this.limitRange.up
                ) {
                    // 超过向上滑的最大值
                    this.marginValue = -this.limitRange.up;
                } else {
                    this.marginValue =
                        this.moveingPosition[0].pageY -
                        this.startPosition[0].pageY;
                }
            }
        }
    }
};
</script>

<style lang="less">
.like-page {
    position: relative;
}
.picker-box {
    padding: 20px;
    height: 120px;
    overflow-y: hidden;
    background: #f5f5f5;
    border-radius: 6px;
    border: 1px solid #f7f7f7;
    position: relative;

    .choose-picker {
        height: 24px;
        width: calc(100% - 40px);
        border: 1px solid;
        position: fixed;
        z-index: 901;
    }

    .pickers {
        // overflow: scroll;
    }

    .picker-column {
        font-size: 16px;
        font-size: 500;
        height: 24px;
        line-height: 24px;
    }
}
.move-area {
    border: 1px solid #f5f5f5;
    border-radius: 50%;
    height: 12px;
    width: 12px;
    background: rgb(236, 236, 128);
    z-index: 800;
    position: absolute;
}
</style>
