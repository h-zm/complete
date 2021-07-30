<template>
  <div>
    测试
    <div id="targetA"></div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      labelName: "2",
      testHtml: "3"
    };
  },
  mounted() {
    this.creatElement();
  },

  methods: {
    creatElement() {
      // vue 中类似JSX写法
      var comPilea = Vue.extend({
        render: (h, params) => {
          console.log(params, h, "params信息");
          return h(
            "div",
            {
              domProps: { innerHTML: this.testHtml, className: "doigsad" },
              class: { "new-style": true }, // style中设置scoped会使class中对应的样式不生效
              style: { color: "red" }
            },
            this.labelName + this.returnName()
          );
        }
      });
      new comPilea().$mount("#targetA");
    },
    returnName() {
      return "hzm";
    }
  }
};
</script>

<style lang="less">
.new-style {
  font-size: 32px;
  margin-left: 20px;
}
</style>
