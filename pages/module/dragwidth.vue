<template>
    <div class="change">
        <Contents
            >1.鼠标移动下方淡蓝色矩形右边框，会出现移动手标，按住并拖动右边框可以改矩形宽度</Contents
        >
        <div class="test-area" @dragend="handleEnd">
            <!-- 实际矩形 -->
            <div
                class="test-area-left"
                :style="{ width: leftInfo.width + 'px' }"
            >
                实现原理：通过 drag 方法。首先赋予拖动元素可拖动属性， 即
                draggable = 'true', 其次在可拖动属性上添加 drag、dragover 事件
                (html文件中为 ondrag、ondragover)，再可拖动元素的父级添加
                dragend 事件，讲拖动距离变化表现在矩形宽度上。
            </div>

            <!-- 建造div标签 模拟矩形的右边框 -->
            <div
                class="test-area-line"
                draggable="true"
                @dragstart="handleStart"
                @drag="handleING"
                @dragover="handleOver"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "改变元素宽度",
            meta: "",
            script: []
        };
    },
    data() {
        return {
            leftInfo: {
                width: 360
            }
        };
    },
    mounted() {
        // 在拖放的过程中会触发以下事件：
        // 在拖动目标上触发事件 (源元素):
        // ondragstart - 用户开始拖动元素时触发
        // ondrag - 元素正在拖动时触发
        // ondragend - 用户完成元素拖动后触发
        // 释放目标时触发的事件:
        // ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
        // ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
        // ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
        // ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
    },
    methods: {
        handleStart(e) {
            // console.log(e, "拖动开始");
        },
        // 释放时触发
        handleOver(e) {
            // console.log(e, "拖动over");
        },
        handleEnd(e) {
            // console.log(e, "拖动结束");
            this.leftInfo.width = e.clientX;
        },
        handleING(e) {
            // console.log(e, "拖动进行");
            this.leftInfo.width = e.clientX;
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.change {
    padding: 12px;
}
.test-area {
    .flex(stretch, flex-start);
    height: 600px;
    &-left {
        background: #e2e9f3;
        padding: 12px;
        overflow-y: auto;
    }
    &-line {
        width: 5px;
        margin-left: -2px;
        height: 100%;
        // background: #b9c8d6;
        .pointer(col-resize);
    }
}
</style>
