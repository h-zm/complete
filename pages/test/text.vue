<template>
    <div class="test-page">
        <h1 class="page-title">测试</h1>
        <div id="textArea" class="text-style">{{ totalNumber }}</div>
        <div id="textArea2" class="text-style2" @click="returnO">
            dasdasdhasdi
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            totalNumber: 2089,
            exampleData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        };
    },
    mounted() {
        // this.testOne();
        // setInterval(() => {
        //   this.testOne();
        // }, 1000);
    },
    destroyed() {
        clearInterval();
    },
    methods: {
        testOne() {
            // this.totalNumber--;
            // console.log(JSON.stringify(this.totalNumber).length, "长度");
            for (let i in JSON.stringify(this.totalNumber)) {
                console.log(i, "数值");
            }
            //   document.querySelector("#textArea").style.cssText =
            //     "transiton: 1s all ease-in;font-size:20px";
        },
        returnO(e) {
            this.$copyFunc("测试", e);
            // this.$createElment会生效
            //   this.$confirm(
            //     this.$createElement("div", null, [
            //       this.$createElement("h4", null, "确定删除已选id吗?")
            //       // h(
            //       //     "div",
            //       //     {
            //       //         style:
            //       //             "color:teal;white-space:nowrap;text-overflow:eliipsis;overflow:hidden"
            //       //     },
            //       //     delString
            //       // )
            //     ]),
            //     "提示",
            //     {
            //       confirmButtonText: "是的",
            //       cancelButtonText: "取消"
            //     }
            //   );
        }
    }
};
</script>

<style lang="less" scoped>
.page-title {
    transition: 0ms;
}
.text-style {
    font-size: 36px;
    font-weight: 500;
}
</style>
