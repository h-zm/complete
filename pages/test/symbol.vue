<template>
    <!-- 新建文件的模板 -->
    <div class="example">
        <div v-for="(value, key) in testObj" :key="key">
            {{ key }}：{{ value }}
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "symbol",
            meta: "",
            name: "symbol",
            script: []
        };
    },
    data() {
        return {
            testObj: {
                fate: "asf1"
            }
        };
    },
    mounted() {
        this.doFunc();
    },
    methods: {
        doFunc() {
            this.testObj.name = "1234";
            this.testObj[Symbol] = "foo";
            this.testObj.SymbolKey = Symbol("hello");
            console.log(this.testObj, "testObj");
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.example {
}
</style>
