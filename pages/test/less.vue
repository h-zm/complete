<template>
  <!-- 测试less页面中的一些使用方法函数 -->
  <div>
    <div class="box"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.sjx(@_,@color,@size) {
  width: 0;
  height: 0;
  border: @size solid @color;
  border-color: transparent;
}
//左边三角形 制造三角形顺序很重要
.sjx(l,@color,@size) {
  border-left-color: @color;
}
//上边三角形
.sjx(t,@color,@size) {
  border-top-color: @color;
}
//右边三角形
.sjx(r,@color,@size) {
  border-right-color: @color;
}
//左边三角形
.sjx(b,@color,@size) {
  border-bottom-color: @color;
}
//这里匹配调用
.box {
  .sjx(b, red, 20px);
}
</style>
