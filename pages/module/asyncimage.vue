<template>
    <!-- 测试图片懒加载 -->
    <div class="image-page">
        <contents>
            懒加载： <br />1. 通过 <codes>getAttribute</codes> 或者
            <codes>attributes</codes> 检查 <codes>img</codes> 标签是否添加
            <codes>lazyload</codes> 属性 。 如果没有添加则返回
            <codes>null</codes> ,反之返回设置内容或者空字符。 <br />
            ps: &lt;img src="" id="sdfsaff" lazyLoad alt="" / &gt;
        </contents>

        <!-- <img src="" id="sdfsaff" lazyLoad alt="" /> -->

        <div class="image-page_loop">
            <div
                v-for="(src, index) in dataList"
                :key="index"
                class="image-page_item"
            >
                <div>{{ index + 1 }}</div>
                <!-- <Comimage
                    :elementId="'async' + index"
                    :lazy="true"
                    :src="src"
                    @callback="callback"
                ></Comimage> -->
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
    mounted() {},
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
