<template>
  <div class="header">
    <var>header of complete</var>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~assets/less/index";
.header {
  width: 100%;
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #f4f4f4;
  border-radius: 0 0 4px 4px;
  background: #fff;
  box-shadow: 0 0 12px 2px #f2f2f2;
  position: fixed;
  top: 0;
  left: 0;
  z-index: @zIndex;
  text-align: center;
}
</style>
