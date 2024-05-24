<template>
    <!-- 新建文件的模板 -->
    <div class="example">异步函数 yield</div>
</template>

<script>
export default {
    head() {
        return {
            script: [],
        };
    },
    data() {
        return {};
    },
    mounted() {
        this.handleRes();
        this.handlePromise();
    },
    methods: {
        *demoGener() {
            console.log(2);
            const back = yield 523;
            console.log("back", back);
        },

        handleRes() {
            console.time();
            console.log(1);
            const res = this.demoGener().next();
            console.log("4", res.value);
            console.timeEnd();
        },

        demoPromise() {
            // Promise.resolve('foo') == new Promise(resolve => resolve('foo'))
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(123);
                }, 2000);
            });
        },

        async handlePromise() {
            const back = await this.demoPromise();
            console.log("res", back);
            // this.demoPromise().then((res) => {
            //     console.log("res", res);
            // });
        },
    },
};
</script>

<style lang="less">
.example {
}
</style>
