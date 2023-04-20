<template>
    <!-- 测试图片懒加载 -->
    <div class="image-page">
        <contents>测试懒加载</contents>

        <div class="image-page_loop">
            <div
                v-for="(src, index) in dataList"
                :key="index"
                class="image-page_item"
            >
                <div>{{ index + 1 }}</div>
                <comimage
                    :elementId="'async' + index"
                    :lazy="true"
                    :src="src"
                    @callback="callback"
                ></comimage>
            </div>
        </div>
    </div>
</template>

<script>
import Comimage from "~/components/Comimage";
export default {
    head() {
        return {
            title: "图片加载",
            meta: "",
            description: "测试图片展示原理",
            name: "模板",
            script: []
        };
    },
    components: {
        Comimage
    },
    data() {
        return {
            dataList: Array(20).fill(
                "http://video.qknode.com/rest/img/50/4615392312572023850.png"
            )
        };
    },
    mounted() {
        console.log("调用页面对象", this);
    },
    methods: {
        // 加载回调
        callback(data) {
            console.log("回调", data.src);
        }
    }
};
</script>

<style lang="less">
.image-page {
    font-size: 14px;
    color: #555553;
    &_loop {
        .flex(stretch, flex-start, wrap);
    }

    &_item {
        border: 1px solid #d8d8d8;
    }
}
</style>
