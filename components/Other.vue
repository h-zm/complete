<template>
  <div>
    <em><code>组件3</code></em>
  </div>
</template>

<script>
export default {
  inject: ["name"],

  mounted() {
    console.log(this.name, "父组件传值");
  }
};
</script>

<style lang="less" scoped></style>
