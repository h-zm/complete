<template>
    <div class="container">
        <div>
            <logo />
            <h1 class="title">
                complete
            </h1>
            <h2 class="subtitle">
                <!-- &#39; -->
                -- start --
                <!-- &#39; -->
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
                <a
                    href="https://author2468.github.io/complete/"
                    target="_blank"
                    class="button--grey"
                >
                    静态页
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
import config from "~/config";
export default {
    head() {
        return {
            title: "首页"
        };
    },
    components: {
        Logo,
        Loading
    },
    data() {
        return {
            context: "", // 上下文对象
            rootInfo: "", // 根实例
            menuRoute: [], // 目录数据
            menuTree: [] // 数组件
        };
    },
    asyncData({ $axios, query, param, store }) {
        return {};
    },
    mounted() {
        // inject $ 挂载查询
        // console.log(this.$info.searchInfo("name"), "信息");
        console.log("全局api", config.baseUrl);

        this.$notify({
            group: "foo",
            title: "Important message",
            text: "Hello user! This is a notification!"
        });
    },
    methods: {
        /**
         *
         */
        doSome(type) {}
    }
};
</script>

<style lang="less" scoped>
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
/*
.button--grey {
} */
</style>
