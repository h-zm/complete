<template>
    <!-- 新建文件的模板 -->
    <div class="example">
        <Comments :articleInfo="articleInfo"></Comments>
    </div>
</template>

<script>
import Comments from "@/components/Comments";
export default {
    head() {
        return {
            title: "vue文件模板",
            meta: "",
            description: "可用复制来快速创建文件",
            name: "模板",
            script: [],
        };
    },
    components: {
        Comments,
    },
    data() {
        return {
            articleInfo: {
                articleId: 1,
                userId: "hzm",
                likeCount: 12,
                likeFlag: 0,
            },
        };
    },
    mounted() {},
    methods: {},
};
</script>

<style lang="less">
.example {
}
</style>
