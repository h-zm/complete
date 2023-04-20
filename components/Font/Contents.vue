<template>
    <!-- 新建文件的模板 -->
    <div class="tip-area" :style="[defineStyle]">
        <!-- :variable="variable" 方式将组件变量内容挂载到调用页面 -->
        <!-- 页面通过 template + slot-scope 组合形成作用域使用
                <template slot-scope="scope">
                    {{ scope.description }}
                </template>
         -->
        <slot :description="description"></slot>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "内容样式组件",
            meta: "",
            description: "",
            script: []
        };
    },
    props: {
        // 自定义的样式组件
        defineStyle: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            description: "内容提示"
        };
    },
    mounted() {},
    methods: {}
};
</script>

<style lang="less">
.tip-area {
    background: @color28292a;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    border-radius: 6px;
    overflow-x: auto;
    padding: 6px 8px;
    margin-bottom: 12px;
}
</style>
