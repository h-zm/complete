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
                height: lockStyle.parentHeight + 'px',
            }"
        >
            <div
                class="virtual__lock_blank"
                :style="{
                    height: lockStyle.itemHeight * dataList.length + 'px',
                }"
            >
                <div
                    class="virtual__lock_item"
                    v-for="(item, index) in tempList"
                    :key="item.value"
                    :style="{
                        top: (item - 1) * lockStyle.itemHeight + 'px',
                        height: lockStyle.itemHeight + 'px',
                        'line-height': lockStyle.itemHeight + 'px',
                    }"
                >
                    {{ item }}： top: {{ index * lockStyle.itemHeight }}px
                </div>
            </div>
        </div>
        <h5>
            2. 子元素高度不固定, 父级滚动距离{{ autoStyle.scrollTop }},
            索引区间：{{ autoStyle.indexRange }}
        </h5>

        <div
            class="virtual__auto"
            id="virtualAuto"
            :style="{
                height: autoStyle.parentHeight + 'px',
            }"
        >
            <div
                class="virtual__auto_blank"
                :style="{
                    height: judgeHeight() + 'px',
                }"
            >
                <div
                    v-for="(item, index) in autoList"
                    :key="item.value"
                    class="virtual__auto_item"
                    :class="{
                        virtual__auto_odd: item.value % 2 ? true : false,
                    }"
                    :style="{
                        top: item.top + 'px',
                    }"
                >
                    {{ item.originIndex }}
                    ： currentTop: {{ item.top }}px, correct:
                    {{ judgeTop(item.value) }}px, height:{{
                        item.clientHeight
                    }}px
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
                scrollTop: 0,
            },
            autoList1: [],
            autoList: [],
            autoStyle: {
                parentHeight: 240,
                itemHeight: "",
                Num: 8,
                startIndex: 0,
                scrollTop: 0,
                indexRange: "",
            },
        };
    },
    created() {
        this.dataList = Array(40)
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
                // 子元素固定
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
                this.autoList1 = this.dataList.map((it) => ({
                    value: it,
                    originIndex: it - 1,
                    clientHeight: 0,
                    top: 0,
                    dsf: null,
                }));

                // 初步渲染
                this.autoList = this.autoList1.slice(0, this.autoStyle.Num);
                // 二次渲染赋予 top、client 属性
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

        judgeTop(value) {
            let result = 0;
            while (value--) {
                if (value % 2) {
                    // 奇数
                    result += 58;
                } else if (value) {
                    // 排除 value 为 0 情况
                    result += 38;
                }
            }
            return result;
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
            console.log("virtualAuto startIndex:", this.autoStyle.startIndex);

            this.renderAutoChild();
        },

        judgeHeight() {
            let showEndIndex = this.autoList.slice(-1)?.[0];
            let result = 0;

            // 渲染到最后一个元素时 取所有元素的 clientHeight
            if (showEndIndex?.originIndex === this.autoList1.length - 1) {
                result = this.autoList1.reduce((a, b) => a + b.clientHeight, 0);
            } else {
                // 没有获取到最后一个元素 取已经渲染的 height 进行平均
                let existList = this.autoList.map((it) => it.clientHeight);
                let averageHeight =
                    existList.reduce((a, b) => a + b, 0) / existList.length;
                result = averageHeight * this.autoList1.length;
            }
            return result || 400;
        },

        renderAutoChild() {
            let finalStartIndex = Math.max(this.autoStyle.startIndex - 2, 0);

            let endIndex = Math.min(
                this.autoStyle.startIndex + this.autoStyle.Num,
                this.autoList1.length
            );
            this.autoStyle.indexRange = [finalStartIndex, endIndex];

            let childList =
                document.getElementById("virtualAuto").childNodes[0]
                    .childNodes || [];

            console.log("childList", childList);

            let temp = [];
            for (let i = finalStartIndex; i < endIndex; i++) {
                // 新加元素记录一下top值
                if (!this.autoList1[i].top || !this.autoList1[i].clientHeight) {
                    // top 应该是前一元素的top值加上前一元素的clientHeight(元素高度)
                    // 但索引为0时，需要特殊处理
                    if (i === 0) {
                        this.autoList1[i].top = 0;
                    } else {
                        // eg: 若 i = 2，finalStartIndex 为 0，取前一元素高度，应该是索引1的高度。
                        // 如果使用 2 - 0，就会取到自身，应该是 2 - 1； startIndex
                        // 当 finalStartIndex 不为0时， 比如 startIndex 为 8 ，finalStartIndex 为 6， i为8时进入判断， 可以取用 i - finalStartIndex；
                        let tempStartIndex = Math.max(finalStartIndex, 1);
                        this.autoList1[i].top =
                            this.autoList1[i - 1].top +
                                childList[i - tempStartIndex]?.clientHeight ||
                            0;
                    }

                    // 获取自身高度
                    // 当 startIndex 为 0，即 finalStartIndex 为 0 时，autoList1 与 childList 的索引是能够直接对应不用特殊处理的；
                    // 当 startIndex 为 3，finalStartIndex 则为 1，finalStartIndex 已经不从0开始循环，而childList所指代的真实节点还是索引为0的起点；
                    // i为10（autoStyle.num 为 8，首次进入页面刷新10在区间1，11之内）进入判断时，获取当前真实元素元素高度，应该是childList中第7个元素，但是10 - 1 = 9，
                    // autoList1 i 与
                    // 如果不添加 tempBase dsf 绑定到的是 i 为 8 的元素
                    let tempBase = Math.min(finalStartIndex, 1);
                    this.autoList1[i].dsf =
                        childList[i - finalStartIndex + tempBase];

                    // 根据页面渲染元素获取真实高度记录
                    this.autoList1[i].clientHeight =
                        childList[i - finalStartIndex + tempBase]?.clientHeight;
                }

                // if (
                //     !this.autoList1[i].clientHeight ||
                //     this.autoList1[i].clientHeight !==
                //         childList[i - finalStartIndex]?.clientHeight
                // ) {
                //     // 根据页面渲染元素获取真实高度记录
                //     this.autoList1[i].clientHeight =
                //         childList[i - finalStartIndex]?.clientHeight || 0;
                // }

                temp.push(this.autoList1[i]);
            }

            this.autoList = temp;

            console.log("目标2", this.autoList1);
        },
    },
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
