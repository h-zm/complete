<template>
    <!-- 新建文件的模板 -->
    <div class="hover">
        <div class="hover__main">
            <div>123</div>
            <div class="hover__main_block">
                <span>dsf</span>
                <span>df1</span>
                <span>yuw</span>
            </div>
        </div>
    </div>
</template>

<script>
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
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.hover {
    &__main {
        padding: 10px;
        width: fit-content;
        background: #f5f5f5;

        &_block {
            display: none;
        }
    }

    &__main:hover {
        &_block {
            display: block !important;
        }
    }
}
</style>
