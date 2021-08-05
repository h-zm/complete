<template>
    <div class="header">
        <var>header of complete</var>
        <i class="el-icon-s-home" @click="backHome()" title="到首页"></i>
        <!--
        <em>React</em>
        <strong>React</strong>
        <dfn>React</dfn>
        <code>
          React <var>react</var>
        </code>
        <tt>React Org</tt>
        <i>React</i>
        <samp>React</samp>
        <cite>React</cite>
        <p>
          love <sub>React</sub> <sup>Org</sup>
          <strike>今天会不一样</strike>
          <small>哪里不一样</small>
          <ins>都不一样</ins>
        </p>
     -->
    </div>
</template>

<script>
export default {
    methods: {
        // 返回首页
        backHome() {
            location.href = "/";
        }
    }
};
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

    .el-icon-s-home {
        .pointer();
    }
}
</style>
