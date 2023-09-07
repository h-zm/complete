<template>
    <div class="main">
        <!-- <Tagview></Tagview> -->
        <Header />

        <keep-alive :include="cachedViews">
            <router-view class="main-content" :key="$route.path" />
        </keep-alive>

        <!-- <nuxt-child class="main-content" /> -->
        <Footer />
    </div>
</template>
<script>
import Tagview from "./components/tagview.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
    components: {
        Header,
        Footer,
        Tagview
    },
    computed: {
        cachedViews() {
            console.log("缓存记录", this.$store.state?.tagviews?.cachedViews);
            return this.$store.state?.tagviews?.cachedViews || [];
        }
    }
};
</script>
<style lang="less">
@import "~assets/css/common.less";
@import "~assets/css/transition.css";
html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}

.main {
    position: relative;
    width: 100%;
    min-height: 100vh;
    // overflow: auto;
}

.main-content {
    // 使用margin-top 或者 margin-bottom 会改变.main的高度
    padding: 50px 12px 38px 12px;
    // width: 100%;
    // min-height: calc(100vh - 160px); // footer header 高度都为80px
    // background: #f6f6f6;
    // overflow: auto;
}
</style>
