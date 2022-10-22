<template>
  <div class="loading-page">
    <!-- 加载蒙层 -->
    <div class="loading-mantle" @click="[sendBackStyle]"></div>

    <!-- 加载内容 -->
    <div class="loading-content" :style="{ sendDataStyle }">
      <!-- <div class="rotate-circular"></div> -->
      <!-- <div class="rotate-circular-second"></div> -->
      <div class="turing-area"></div>
      <!-- {{ loadingText }} -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 加载组件开关
    value: {
      type: Boolean,
      default: true
    },
    // 加载组件文案
    loadingText: {
      type: String,
      default: "正在加载"
    },
    // 传入的蒙层样式
    sendBackStyle: {
      type: Object, // type可以用数组表示可接收多种类型
      default: () => {
        return {};
      }
    },
    // 传入的内容样式
    sendDataStyle: {
      type: Object, // type可以用数组表示可接收多种类型
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    clickMantle() {
      console.log("点击蒙层");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~assets/less/index";
.loading-page {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: @zIndex + 1;
  overflow: hidden;
}
.loading-mantle {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.loading-content {
  // padding: 32px 24px;
  // background: #fff;
  position: fixed;
  z-index: @zIndex + 2;
  border-radius: 16px;
  color: #fff;
  text-align: center;
  // 垂直居中1 最好能确定内容宽高时使用
  // top: 0;
  // bottom: 0;
  // right: 0;
  // left: 0;
  // margin: auto;

  // 垂直居中2
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);

  // 垂直居中3
  // flex属性

  // 旋转的4分支3圆
  .rotate-circular {
    width: 48px;
    height: 48px;
    margin: 12px auto;
    border-radius: 50%; // border-radius为宽高的一半以达到圆圈的效果
    border: solid #fff;
    border-left-color: transparent;
    border-width: 1px 2px 3px 4px;
    animation: loading 1s linear infinite;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  // 旋转颜色变化的border圆
  .rotate-circular-second {
    width: 48px;
    height: 48px;
    margin: 12px auto;
    border-radius: 50%; // border-radius为宽高的一半以达到圆圈的效果
    border: 2px solid transparent;
    animation: reduce 1s linear infinite;
  }
  
  @keyframes reduce {
    0% {
      border-top-color: #fff;
      border-left-color: #fff;
      transform: rotate(0deg);
    }

    25% {
      border-top-color: #fff;
      border-left-color: #fff;
      border-bottom-color: #fff;
    }

    50% {
      border-top-color: #fff;
      border-left-color: #fff;
    }

    75% {
      border-bottom-color: #fff;
    }

    100% {
      border-top-color: #fff;
      border-left-color: #fff;
      transform: rotate(360deg);
    }
  }

  //
  .turing-area {
    margin: 12px auto;
    width: 24px;
    height: 24px;
    background: #38d638;
    box-shadow: 0px 0px 2px 12px #daffe2;
    border-radius: 50%;
    // animation: clic 2s linear infinite;
  }
  @keyframes clic {
    25% {
      width: 8px;
      height: 8px;
      background: red;
    }

    50% {
      width: 16px;
      height: 16px;
      background: rgb(67, 201, 78);
    }

    75% {
      width: 24px;
      height: 24px;
      background: red;
    }

    100% {
      width: 24px;
      height: 24px;
      background: red;
      box-shadow: 2px 2px 2px 2px white;
    }
  }
}
</style>
