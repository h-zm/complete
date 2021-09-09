<template>
    <!-- 新建文件的模板 -->
    <div class="example">
        模板
        <Asyncimg
            v-for="(src, index) in imgList"
            :key="index"
            :src="src"
        ></Asyncimg>
    </div>
</template>

<script>
import Asyncimg from "~/components/Asyncimg";
export default {
    head() {
        return {
            title: "vue文件模板",
            meta: "",
            description: "可用复制来快速创建文件",
            name: "模板",
            script: []
        };
    },
    components: {
        Asyncimg
    },
    data() {
        return {
            imgList: [
                "http://video.qknode.com/rest/img/50/4615392312572023850.png",
                "https://static1.qknode.com/rest/img/53/3474117304839640053.jpeg"
                // "https://static1.qknode.com/rest/img/54/431867467740047854.png",
                // "https://static1.qknode.com/rest/img/45/5182001616707148945.png",
                // "https://static1.qknode.com/rest/img/49/3981041048376684249.png"
            ]
        };
    },
    mounted() {},
    methods: {}
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.example {
}
</style>
