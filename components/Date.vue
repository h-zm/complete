<template>
  <div class="date">
    组件2
    <other></other>
  </div>
</template>

<script>
import Other from "./Other";
export default {
  components: {
    Other
  },
  inject: ["doOne"],
  provide: {
    other: "组组件"
  },
  mounted() {
    this.doOne();
  }
};
</script>

<style lang="less" scoped></style>
