<template>
    <div class="container">
        <div>
            <logo />
            <h1 class="title">
                complete
            </h1>
            <h2 class="subtitle">
                &#39;芜湖~&#39;
            </h2>
            <div class="links">
                <a
                    href="https://nuxtjs.org/"
                    target="_blank"
                    class="button--green"
                >
                    Documentation
                </a>
                <a
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                    class="button--grey"
                >
                    GitHub
                </a>
            </div>
        </div>

        <!-- <Loading></Loading> -->
    </div>
</template>

<script>
// import path from "path";
import Logo from "~/components/Logo.vue";
import Loading from "~/components/Loading"; // 加载组件
export default {
    components: {
        Logo,
        Loading
    },
    // asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

    // },
    data() {
        return {
            context: "", // 上下文对象
            rootInfo: "", // 根实例
            menuRoute: [] // 目录数据
        };
    },
    asyncData({ app: { router } }) {
        // console.log("上下文对象:%o", ctx);
        return {
            rootInfo: router
        };
    },
    mounted() {
        this.initRoute(); // 处理目录数据
        // inject $ 挂载查询
        // console.log(this.$info.searchInfo("name"), "信息");
    },
    methods: {
        /**
         *
         */
        doSome(type) {},

        async initRoute() {
            // 获取整个项目目录
            // this.rootInfo = this.context.app.router.options.routes;
            console.log("项目目录", this.rootInfo);
            let tempList = Array.isArray(this.rootInfo.options.routes);
            let _resetFunc = (route, index = 0, parent = {}) => {
                let hasTimes = route.split("/").length; // 根据 / 判断目录所在的等级
                if (hasTimes > 1) {
                    // 二三级目录
                } else {
                    // 一级目录
                }
            };
        }
    }
};
</script>

<style>
/* lang="less" scoped
  使用以上属性需要引入依赖
*/
.container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
