<template>
    <div class="main">
        <Header />
        <nuxt class="main-content" />
        <Footer />
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
    components: {
        Header,
        Footer
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
    padding: 80px 0 0 0;
    overflow: auto;
    width: 100%;
    height: 100%;
}

.main-content {
    width: 100%;
    min-height: calc(100vh - 160px); // footer header 高度都为80px
    padding: 12px;
    overflow: auto;
}
</style>
