<template>
  <div></div>
</template>
<script lang="ts">
export default {
  mounted() {
    // window或是document作监听对象都可
    window.addEventListener("visibilitychange", this.listenVisible, true);
  },
  destroyed() {
    // 移除监听事件
    window.removeEventListener("visibilitychange", this.listenVisible);
  },
  methods: {
    listenVisible() {
      if (document.hidden) {
        document.title = "页面收起";
      } else {
        document.title = "展示中";
      }
      console.log("页面标题", document.title);
    }
  }
};
</script>
