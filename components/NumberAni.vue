<template>
    <!-- 数字滚动组件 -->
    <div class="napro">
        <div v-if="showData">{{ numData }}</div>
        <div class="napro-area" :style="{ 'justify-content': textAlign }">
            <div
                class="napro-item"
                :class="{ 'hide-style': !item.show }"
                v-for="(item, index) in transList"
                :style="{
                    zIndex: transList.length - 1
                }"
                :key="index"
            >
                <div
                    class="napro-item_grid"
                    :style="{
                        transition: item.transition,
                        transform: 'translateY(' + item.transformDis + 'px)'
                    }"
                >
                    <!-- 特殊处理字符展示 -->
                    <div v-if="isNaN(item.lastValue)" class="napro-item_num">
                        {{ item.lastValue }}
                    </div>
                    <div
                        v-else
                        class="napro-item_num"
                        v-for="(item, index) in 10"
                        :key="index"
                    >
                        {{ item - 1 }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { _debounce, _throttle } from "~/plugins/util.js";
import { getElementInfo } from "~/plugins/util.js";
export default {
    props: {
        // 传入的要展示数字
        numData: {
            type: Number,
            default: "***"
        },

        // 数字数字对齐方式 左 'flex-start', 右 'flex-end'
        textAlign: {
            type: String,
            default: "flex-start"
        },

        //是否展示传入数值
        showData: {
            type: Boolean,
            default: false
        },

        // 额外的参数设置
        setting: {
            type: Object,
            default: () => {
                return {
                    // 速度
                    speed: 1000
                };
            }
        },

        // 设置样式
        diyStyle: {
            default: () => {
                // return {
                //     height: 84,
                //     width: 56,
                //     fontSize: 60
                // };
            }
        },

        // 千位分隔符号
        divStr: {
            type: String,
            default: ","
        }
    },
    data() {
        return {
            transList: [
                {
                    show: true,
                    // 随便设置一个随意值
                    lastValue: 0,
                    // 具体的过渡距离
                    transformDis: 0,
                    // 过渡效果
                    transition: ".3s all ease-out"
                }
            ],

            numStyle: {
                height: 32
            }
        };
    },
    watch: {
        numData(value) {
            this.handleNumber(value);
        }
    },
    created() {
        // // 加载字体
        // uni.loadFontFace({
        //     global: false, // 先只本页加载
        //     family: "AlibabaPuHuiTiH",
        //     source:
        //         "https://file.turingtopia.com/h5/applet/v114/drink/Alibaba-PuHuiTi-Bold.ttf",
        //     complete: e => {
        //         // console.log('字体记载结果', e);
        //     }
        // });
    },
    mounted() {},
    methods: {
        // 获取样式
        async getStyle(value) {
            await getElementInfo(".napro-item").then(res => {
                console.log("返回的样式数据", res.style);
            });
        },

        // 处理方法
        handleNumber(value) {
            // 转换为字符格式
            let tempValue = JSON.stringify(value);

            // console.log("value", value);

            // 增加位列
            if (tempValue.length > this.transList.length) {
                let i,
                    h = tempValue.length - this.transList.length;

                for (let m = 0; m < h; m++) {
                    // 先推入 利用索引差和过渡样式延迟 打开 show
                    this.transList.push(this.resetItem());

                    //利用差值判断是否添加分割符号
                    // if ((h - m - 1) % 3 == 0) {
                    //     console.log(`${m}索引位置需要添加分割符号`);
                    // }

                    setTimeout(() => {
                        let index = this.transList.length - 1 - m;
                        this.transList[index].show = true;
                    }, 150 + 50 * m);
                }
            } else {
                // 当前数值过多 需要减少位列
                let i = this.transList.length - tempValue.length;
                for (let m = i; m > 0; m--) {
                    // show 先关闭利用索引差和过渡样式 再移除
                    this.transList[this.transList.length - i].show = false;
                    setTimeout(() => {
                        this.transList.splice(this.transList.length - i, 1);
                    }, 150 + 50 * (this.transList.length - i));
                }
            }

            // 处理滚动那个距离
            for (let i = 0; i < tempValue.length; i++) {
                setTimeout(() => {
                    // 相应的trans项
                    let tempObj = this.transList[i];

                    // 根据差值计算具体的过渡距离
                    let transDis = "";

                    /**
                     *  根据差值计算具体的过渡时间
                     * 1.2 -  Math.abs(Number(tempValue[i]) - tempObj.lastValue) / 10;
                     */

                    // 或者根据 传入的速度计算过渡时间
                    let transTim = this.setting.speed / 1000;

                    tempObj.transition = `${transTim}s all ease-in-out`;

                    if (isNaN(tempValue[i])) {
                        // 不是数字的先直接赋值就好 如小数点
                        tempObj.lastValue = tempValue[i];
                        tempObj.transformDis = 0;
                    } else {
                        if (Number(tempValue[i]) > tempObj.lastValue) {
                            transDis =
                                tempObj.transformDis -
                                (Number(tempValue[i]) - tempObj.lastValue) *
                                    this.numStyle.height;
                        } else {
                            transDis =
                                tempObj.transformDis +
                                (tempObj.lastValue - Number(tempValue[i])) *
                                    this.numStyle.height;
                        }

                        tempObj.lastValue = Number(tempValue[i]);
                        tempObj.transformDis = transDis;
                    }

                    // console.log(
                    //     '比较数据',
                    //     Number(tempValue[i]),
                    //     tempObj.lastValue,
                    //     transTim,
                    //     transDis
                    // );
                }, 150 * (i + 1));
            }

            // console.log("计算的过渡结果", this.transList);
        },

        // 随机生成一个子项
        resetItem() {
            let tempRandom = parseInt(Math.random() * 9);
            return {
                /**
                 *  控制当前是否展示 过渡效果
                 *  写在css中了，没有
                 */
                show: false,
                // 随便设置一个随意值
                lastValue: tempRandom,
                // 具体的过渡距离
                transformDis: -tempRandom * this.numStyle.height,
                // 过渡效果
                transition: ".3s all ease-out"
            };
        }
    }
};
</script>

<style lang="less" scoped>
.napro {
    text-align: left;

    &-area {
        font-size: 32px;
        font-family: "AlibabaPuHuiTiH";
        .flex(stretch, flex-start, row, wrap);
    }

    &-item {
        color: #28292a;
        box-sizing: border-box;
        width: 22px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        transition: 0.2s width ease;
        overflow: hidden;
        position: relative;

        &_num {
            height: 32px;
            line-height: 32px;
        }
    }
}
.hide-style {
    width: 0;
    border: none;
    overflow: hidden;
}
</style>
