<template>
    <!-- 图片模板 -->
    <div class="img-case" id="imgcase"></div>
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
    props: {
        // 是否需要懒加载
        lazy: {
            type: Boolean,
            default: false
        },

        // 接收了路径
        src: {
            type: String,
            default: ""
        },

        // 传入样式
        defineStyle: {
            default: ""
        }
    },
    watch: {
        lazy: {
            handler(value) {
                console.log(value, "传过来的数据");
                if (value) {
                } else {
                    // 页面还没生成好 无法创建image对象
                    // this.loadCommon();
                }
            },
            immediate: true
        }
    },
    data() {
        return {};
    },
    beforeMount() {
        // console.log(window, "环境");
        // console.log(this, "执行");
        if (this.lazy) {
        } else {
            this.loadCommon();
        }
    },
    mounted() {},
    methods: {
        loadCommon() {
            let image = new Image();
            console.log("图片对象实例", image);
            image.alt = "图片加载中";
            // 突变加载完毕
            image.onload = () => {};
            // 图片加载失败
            image.onerror = () => {
                image.alt = "图片加载失败";
            };
            image.src = this.src;
            console.log(image, "图片项目");
            document.body.appendChild(image);
            // document.getElementById("imgcase").appendChild(image);
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.example {
}
</style>
