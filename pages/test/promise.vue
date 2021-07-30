<template>
  <div>
    <div v-for="(value, key) in dataInfo" :key="value">
      <p>{{ key }}: {{ value }}</p>
    </div>
    <el-button @click="testPromise">点击执行Promise</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // dataInfo: {}
    };
  },
  computed: mapState({
    dataInfo: state => state
  }),

  mounted() {
    console.log(this.$store, "vuex实例");
    setTimeout(() => {
      // this.$store.commit("SET_LOVE", "开心");
      this.newLove("愉悦");
    }, 3000);
  },
  methods: {
    ...mapMutations(["setage", "setname"]),
    ...mapMutations({
      newLove: "SET_LOVE" // 将this.newLove(value)映射到this.$store.commit("SET_LOVE",value)
    }),
    testPromise() {
      let prom = new Promise((resolve, reject) => {
        let hadn = Math.random() * 2;
        if (hadn < 1) {
          console.log("hadn当前值小于1", hadn);
          resolve(hadn);
        } else {
          console.log("hadn");
          reject(hadn);
        }
      });
      // Promise对象 可以通过.then 或者 async/await 解开
      prom
        .then(res => {
          console.log(res);
          this.$message.success("小于2");
        })
        .catch(err => {
          console.log(err);
          this.$message.error("sad");
        });
    }
  }
};
</script>

<style></style>
