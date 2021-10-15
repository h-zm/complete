<template>
    <!-- 图片模板 -->
    <div :id="elementId" class="comp-async">
        <div class="comp-async_tip">{{ imageObj.tip }}</div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "图片",
            meta: "",
            description: "测试图片展示原理",
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

        // 传入id
        elementId: {
            type: String,
            default: "async"
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
        dataList: {
            handler(value) {
                console.log(value, "新列表");
            }
        }
    },
    data() {
        return {
            imageObj: {
                tip: "图片加载中",
                isLoad: false
            },
            dataList: [],
            timer: null
        };
    },
    mounted() {
        if (this.lazy) {
            window.addEventListener("scroll", this.scrollFunc, true);
            // this.lazyLoad().then(res => {
            //     setTimeout(() => {
            //         this.imageObj.tip = res.msg;
            //         if (res.status == 1) {
            //             this.addUrl(res.data);
            //         }
            //     }, 1200);
            // });
            setTimeout(() => {
                this.lazyLoad().then(res => {
                    this.imageObj.tip = res.msg;
                    if (res.status == 1) {
                        this.addUrl(res.data);
                    }
                });
            }, 1200);
        } else {
            this.commonLoad();
        }
    },
    methods: {
        // 普通加载
        commonLoad() {
            // console.time("common");
            let image = new Image();
            image.alt = "图片加载中…";
            // 突变加载完毕
            image.onload = () => {};
            // 图片加载失败
            image.onerror = () => {
                image.alt = "图片加载失败";
            };
            image.src = this.src;
            image.className = "comp-async_img";
            // 推入文档末尾
            // document.body.appendChild(image);

            // 推入指定的elementId
            document.getElementById(this.elementId).appendChild(image);
            // console.timeEnd("common");
        },

        // 页面滚动
        scrollFunc(event) {
            // console.log("滚动信息", event);
            // scrollHeight 整个高度滚动栏 scrollTop 当前滚动距离
            console.log("距离", event.target.scrollingElement.scrollTop);
        },

        // 利用promise实现懒加载
        lazyLoad() {
            return new Promise((resolve, reject) => {
                // console.time("async");
                let image = new Image();
                this.imageObj.tip = "图片加载中…";

                // 图片加载完毕
                image.onload = () => {
                    this.isLoad = true;
                    resolve({
                        status: 1,
                        msg: "图片加载成功",
                        data: image
                    });
                };

                // 图片加载失败
                image.onerror = () => {
                    this.isLoad = false;
                    reject({
                        status: -1,
                        msg: "图片加载失败",
                        data: {}
                    });
                };

                image.src = this.src;

                image.className = "comp-async_img";

                // console.timeEnd("async");
            });
        },

        addUrl(element) {
            // console.log("接收元素:%o", element);
            // fatherEl = document.querySelector(`.${this.elementId}`)
            // 当前元素
            let fatherEl = this.$el;

            // 推入指定的elementId
            console.log("子元素距离顶部距离:%o", fatherEl.offsetTop);

            // 屏幕可用宽度
            let availHeight = window.screen.availHeight;

            // 子集
            let childNodesList = fatherEl.childNodes;

            if (availHeight >= fatherEl.offsetTop) {
                // 移除文字描述
                fatherEl.removeChild(childNodesList[0]);

                // 推入图片
                fatherEl.appendChild(element);
            }
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.comp-async {
    padding: 8px;
    width: 248px;
    height: 248px;
    color: #28292a;
    font-size: 14px;
    .flex(center, center);
    &_tip {
    }
    &_img {
        max-width: 240px !important;
        max-height: 240px !important;
        object-fit: contain;
    }
}
</style>
