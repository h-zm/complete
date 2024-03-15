<template>
    <div class="virtual">
        <h4>虚拟列表</h4>
        <h5>
            1. 子元素固定高度的, 页面可呈现子元素个数{{
                lockStyle.Num
            }}，滑动距离{{ lockStyle.scrollTop }}
        </h5>
        <div
            class="virtual__lock"
            id="virtualLock"
            :style="{
                height: lockStyle.parentHeight + 'px'
            }"
        >
            <div
                class="virtual__lock_blank"
                :style="{
                    height: lockStyle.itemHeight * dataList.length + 'px'
                }"
            >
                <div
                    class="virtual__lock_item"
                    v-for="(item, index) in tempList"
                    :key="index"
                    :style="{
                        top: (item - 1) * lockStyle.itemHeight + 'px',
                        height: lockStyle.itemHeight + 'px',
                        'line-height': lockStyle.itemHeight + 'px'
                    }"
                >
                    {{ item }}： top: {{ index * lockStyle.itemHeight }}px
                </div>
            </div>
        </div>
        <h5>2. 子元素高度不固定, 父级滚动距离{{ autoStyle.scrollTop }}</h5>

        <div
            class="virtual__auto"
            id="virtualAuto"
            :style="{
                height: autoStyle.parentHeight + 'px'
            }"
        >
            <div
                class="virtual__auto_blank"
                :style="{
                    height: judgeHeight() + 'px'
                }"
            >
                <div
                    v-for="(item, index) in autoList"
                    :key="index"
                    class="virtual__auto_item"
                    :class="{ virtual__auto_odd: item.value % 2 }"
                    :style="{
                        top: item.top + 'px'
                    }"
                >
                    {{ item.value }}： realTop: {{ item.top }}px, height:
                    {{ item.clientHeight }}px
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {};
    },
    data() {
        return {
            dataList: [],
            tempList: [],
            lockStyle: {
                parentHeight: 240,
                itemHeight: 30,
                Num: 6,
                scrollTop: 0
            },
            autoList1: [],
            autoList: [],
            autoStyle: {
                parentHeight: 240,
                itemHeight: "",
                Num: 7,
                startIndex: 0,
                scrollTop: 0
            }
        };
    },
    created() {
        this.dataList = Array(30)
            .fill(0)
            .map((it, index) => index + 1);
    },
    mounted() {
        this.handleListenning();
    },
    methods: {
        handleListenning() {
            let target = document.getElementById("virtualLock");
            let autoTarget = document.getElementById("virtualAuto");
            if (target) {
                target.addEventListener("scroll", this.handleScroll, false);
                this.lockStyle.Num = Math.ceil(
                    this.lockStyle.parentHeight / this.lockStyle.itemHeight
                );
                this.renderChild();

                // 子元素不固定
                autoTarget.addEventListener(
                    "scroll",
                    this.handleAutoScroll,
                    false
                );

                // 初始化赋予数值
                this.autoList1 = this.dataList.map(it => ({
                    value: it,
                    originIndex: it - 1,
                    clientHeight: 0,
                    top: 0
                }));

                setTimeout(() => {
                    this.renderAutoChild();
                }, 500);
            } else {
                setTimeout(() => {
                    this.handleListenning;
                }, 500);
            }
        },

        handleScroll(e) {
            console.log("virtualLock滚动距离:", e.target.scrollTop);
            this.lockStyle.scrollTop = e.target.scrollTop || 0;
            this.renderChild();
        },

        renderChild() {
            let startIndex = Math.floor(
                this.lockStyle.scrollTop / this.lockStyle.itemHeight
            );
            let finalStartIndex = Math.max(startIndex - 2, 0);
            let endIndex = Math.min(
                startIndex + this.lockStyle.Num,
                this.dataList.length
            );
            this.tempList = this.dataList.slice(finalStartIndex, endIndex);
        },

        handleAutoScroll(e) {
            // console.log("virtualAuto滚动距离:", e.target.scrollTop);
            this.autoStyle.scrollTop = e.target.scrollTop || 0;

            // 通过滚动距离与每个记录好的子元素top值对比 判断起始索引
            this.autoStyle.startIndex = this.autoList1.findIndex(
                (it, index) => {
                    if (
                        this.autoStyle.scrollTop >= it.top &&
                        this.autoStyle.scrollTop <
                            this.autoList1[index + 1]?.top
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }
            );
            // console.log("virtualAuto startIndex:", this.autoStyle.startIndex);
            this.renderAutoChild();
        },

        judgeHeight() {
            let showEndIndex = this.autoList.slice(-1)?.[0];
            let result = 0;

            if (showEndIndex?.originIndex === this.autoList1.length - 1) {
                result = this.autoList1.reduce((a, b) => a + b.clientHeight, 0);
            } else {
                let existList = this.autoList.map(it => it.clientHeight);
                let averageHeight =
                    existList.reduce((a, b) => a + b, 0) / existList.length;
                result = averageHeight * this.autoList1.length;
            }
            return result || 400;
        },

        renderAutoChild() {
            let childList = Array.from(
                document.getElementById("virtualAuto").childNodes[0]
                    .childNodes || []
            );

            let finalStartIndex = Math.max(this.autoStyle.startIndex - 2, 0);

            let endIndex = Math.min(
                this.autoStyle.startIndex + this.autoStyle.Num,
                this.autoList1.length
            );

            console.log("索引区间", finalStartIndex, endIndex);

            // console.log("childList", childList);

            let temp = [];
            for (let i = finalStartIndex; i < endIndex; i++) {
                // 新加元素记录一下top值
                if (!this.autoList1[i].top || this.autoList1[i].top == 0) {
                    if (i === 0) {
                        this.autoList1[i].top = 0;
                    } else {
                        // 特殊处理 finalStartIndex 从 0 开始，
                        // eg: 若 i = 2，finalStartIndex 为 0，取前一元素高度，应该是1的高度。如果使用 2 - 0，就会
                        // 取到自身，当 finalStartIndex 不为0时可以取用 i - finalStartIndex
                        // 是 finalStartIndex 若为 0 时
                        let targetIndex = Math.max(finalStartIndex, 1);
                        this.autoList1[i].top =
                            this.autoList1[i - 1].top +
                                childList[i - targetIndex]?.clientHeight || 0;
                    }

                    this.autoList1[i].clientHeight =
                        childList[i - finalStartIndex]?.clientHeight || 0;
                }
                temp.push(this.autoList1[i]);
            }

            this.autoList = temp;

            // console.log("目标2", this.autoList);
        },

        // 失败方法
        failHandle() {
            // this.autoList = [...this.dataList]
            //     .slice(finalStartIndex, endIndex)
            //     .map((it, index) => ({
            //         value: it,
            //         originIndex: finalStartIndex + index,
            //         // top: childList
            //         //     ?.slice(0, index)
            //         //     ?.reduce(
            //         //         (a, b) => a + b.clientHeight || b.offsetHeight,
            //         //         0
            //         //     )
            //         // top: (() => {
            //         //     if (index !== 0) {
            //         //         result += childList
            //         //             ?.slice(finalStartIndex, index)
            //         //             ?.reduce(
            //         //                 (a, b) =>
            //         //                     a + b.clientHeight || b.offsetHeight,
            //         //                 0
            //         //             );
            //         //     }
            //         //     return result;
            //         // })()
            //     }));
        }
    }
};
</script>

<style lang="less">
.virtual {
    &__lock {
        margin: 0 0 30px 0;
        width: 100%;
        border: 1px solid #f5f5f5;
        border-radius: 4px;
        overflow-y: auto;

        &_blank {
            position: relative;
        }

        &_item {
            position: absolute;
            left: 0;
            z-index: 1;
            padding: 0 16px;
            width: 100%;

            &:nth-child(2n + 1) {
                background-color: #f5f5f5;
            }
        }
    }

    &__auto {
        margin: 0 0 30px 0;
        width: 100%;
        border: 1px solid #f5f5f5;
        border-radius: 4px;
        overflow-y: auto;

        &_blank {
            position: relative;
        }

        &_item {
            position: absolute;
            left: 0;
            z-index: 1;
            padding: 10px 16px;
            line-height: 18px;
            width: 100%;
        }
        &_odd {
            padding: 20px 16px;
            background-color: #f5f5f5;
        }
    }
}
</style>
