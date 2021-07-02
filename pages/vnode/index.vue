<template>
  <div>
    {{ returnTree() }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataObj: {
        name: "xiaohuang",
        age: 20,
        next: {
          a: "123"
        },
        list: [
          { name: "xiaohong", like: "iop" },
          { name: "xiaolv", like: "iop", from: "qwer" }
        ]
      }
    };
  },
  methods: {
    returnTree() {
      let data = this.dataObj;
      return data;
    }
  }
};
</script>

<style></style>
