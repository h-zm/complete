<template>
  <div class="change">
    <h4>更换宽度</h4>
    <div class="test-area" @dragend="handleEnd">
      <div
        class="test-area-left"
        :style="{ width: leftInfo.width + 'px' }"
      ></div>

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
      title: "改变宽度",
      meta: "",
      script: []
    };
  },
  data() {
    return {
      leftInfo: {
        width: 500
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
  }
  &-line {
    width: 5px;
    height: 100%;
    // background: #b9c8d6;
    .pointer(col-resize);
  }
}
</style>
