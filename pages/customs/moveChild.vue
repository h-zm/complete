<template>
    <!-- 拖拽功能 -->
    <div class="moving">
        <Contents>
            通过拖拽 <Colors>drag</Colors> 事件 实现元素间位置交换。 <br />
            1. 给可拖动元素都添加 <Colors>draggable</Colors> 属性并设置为true。
            <br />2. 通过<Colors>dragstart</Colors>事件得到拖动元素信息。<br />
            3.使用<Colors>dragover</Colors>拖动移入事件获取等待交换的元素内容。<br />
            4.drop停止时事件交换起始拖动元素与等待交换元素的节点内容，完成交换。<br />
            5.dragLeave是边界,超出即停止 6.实现排序交换可以通过<Colors
                >drop</Colors
            >
            方法实现一步到位， 或者
            <Colors>dragenter</Colors>,实现边拖动边更换顺序，增添一些动效
        </Contents>
        <div class="moving-area">
            <!-- 可以通过 tag attribute 配置哪个元素应该被渲染，默认渲染 <span> -->
            <div>1. 通过 drop 方法实现一步到位，</div>
            <div @dragleave="dragLeave">
                <div
                    class="moving-area-item"
                    :class="{ 'choose-style': item.choose }"
                    :id="item.name"
                    v-for="(item, index) in dataList"
                    :key="index"
                    draggable="true"
                    @dragstart="dragStart(item, index, $event)"
                    @dragover="dragOver(item, index, $event)"
                    @dragend="dragEnd(item, index, $event)"
                    @drop="handleDrop"
                >
                    {{ item.name }}
                </div>
            </div>

            <div>
                2. 通过 dragenter 借助 transition-group 实现平滑过度
                <transition-group tag="div">
                    <div
                        class="moving-area-item"
                        :id="item.name"
                        v-for="(item, index) in handleList"
                        :key="item.id"
                        draggable="true"
                        @dragstart="handleStart(item, index, $event)"
                        @dragover="handleOver(item, index, $event)"
                        @dragenter="handleEnter(item, index, $event)"
                        @dragend="handleEnd(item, index, $event)"
                    >
                        {{ item.name }}
                    </div>
                </transition-group>
            </div>

            <div>
                3. 通过 dragenter 手写 transform 实现平滑过度
                <div @dragleave="transLeave">
                    <div
                        class="moving-area-item moving-area-trans"
                        v-for="(item, index) in transList"
                        :id="item.name"
                        :key="item.id"
                        :style="{
                            transform: 'translateY(' + item.trans + 'px)',
                            zIndex: item.id + 1,
                        }"
                        draggable="true"
                        @dragstart="transStart(item, index, $event)"
                        @dragover="transOver(item, index, $event)"
                        @dragenter="transEnter(item, index, $event)"
                    >
                        {{ item.name }} {{ item.id }} {{ item.index }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Colors from "@/components/Font/Colors.vue";
export default {
    components: { Colors },
    head() {
        return {
            title: "移动元素",
        };
    },
    data() {
        return {
            dataList: [
                { name: "testA", id: 1, choose: false },
                { name: "testB", id: 2, choose: false },
                { name: "testC", id: 3, choose: false },
                { name: "testD", id: 4, choose: false },
                { name: "testE", id: 5, choose: false },
                { name: "testF", id: 6, choose: false },
            ],
            dragElement: null,

            handleList: [
                { name: "A", id: 1, choose: false },
                { name: "B", id: 2, choose: false },
                { name: "C", id: 3, choose: false },
                { name: "D", id: 4, choose: false },
                { name: "E", id: 5, choose: false },
                { name: "F", id: 6, choose: false },
            ],
            handleDrag: null,

            transList: [
                { name: "transA", id: 1, choose: false, index: 0, trans: 0 },
                { name: "transB", id: 2, choose: false, index: 1, trans: 0 },
                { name: "transC", id: 3, choose: false, index: 2, trans: 0 },
                { name: "transD", id: 4, choose: false, index: 3, trans: 0 },
                { name: "transE", id: 5, choose: false, index: 4, trans: 0 },
                { name: "transF", id: 6, choose: false, index: 5, trans: 0 },
            ],
            transElement: null,
        };
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        // 1
        // 移动对象 开始移动触发
        dragStart(item, index, e) {
            // 设置移动对象的id
            e.dataTransfer.setData("text/plain", item.name);
            console.log(`移动项目索引值是${index},内容是%o`, item);
        },

        // 移入 当前输出的还是拖动元素的信息
        dragOver(item, index, e) {
            e.preventDefault();
            let target = e.target;
            let { nodeName } = target; // 节点
            this.dragElement = item;
            // console.log(e.y, e.x, `拖拉元素${item.name}y,x的坐标变化`);
            console.log(`移入`, target.id);
        },

        // 移出
        dragLeave(e) {
            e.preventDefault();
            let target = e.target;
            let { nodeName } = target; // 节点
            // console.log(`移出`, target.id);
        },

        // 移动项目 结束移动触发 输出拖动元素结束时的位置
        dragEnd(item, index, e) {
            e.preventDefault();
            // console.log(`放置项目索引值是${index},内容是%o`, e);
        },

        //移动完毕 放置的位置
        handleDrop(e) {
            e.preventDefault();
            // console.log(`移动完毕`, e);
            // 改变节点的值
            let temp = null;
            // 到达元素
            let toElement = document.getElementById(e.target.id);
            // 起始元素
            // 通过 dataTransfer 拿到脱拽过程中传递的参数
            let fromElement = document.getElementById(
                e.dataTransfer.getData("text/plain")
            );

            // 这里是通过交换节点的内容实现的更换位置
            // 此外 还可以通过节点本省的位置交换实现
            // childNode 的 add,remove等操作
            temp = fromElement.innerHTML;
            console.log(temp, "temp");
            // toElement.innerHTML =  this.dragElement.name
            fromElement.innerHTML = toElement.innerHTML;
            toElement.innerHTML = temp;

            // console.log(this.dataList, "数据结构有变化吗?");

            // console.log(toElement, "结束时的对象");
        },

        // 2
        // 平滑所需使用到的方法
        handleStart(item, index, e) {
            this.handleDrag = {
                ...item,
            };
        },
        handleEnter(item, index, e) {
            e.preventDefault();
            e.dataTransfer.effectAllowed = "move"; //为需要移动的元素设置dragstart事件
            let newList = this.handleList;
            let oldIndex = newList.findIndex(
                (temp) => temp.id == this.handleDrag.id
            );
            let newIndex = index;
            // console.log("旧索引", oldIndex, "新索引", newIndex);
            // 先在旧位置删除一个该移动元素，再将splice返回的删除元素推入到新的位置
            newList.splice(newIndex, 0, ...newList.splice(oldIndex, 1));
            // 最后赋值给 dataList
            this.handleList = newList;
        },
        handleOver(item, index, e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
        },
        handleEnd(item, index, e) {
            this.handleDrag = null;
        },

        // 3
        // 移动对象 开始移动触发
        transStart(item, index, e) {
            // 设置移动对象的id
            e.dataTransfer.setData("text/plain", item.name);
            // console.log(`移动项目索引值是${index},内容是%o`, item);
            this.transElement = item;
        },

        // 移入 当前输出的还是拖动元素的信息
        transOver(item, index, e) {
            e.preventDefault();
            let target = e.target;
            let { nodeName } = target; // 节点
            // console.log(e.y, e.x, `拖拉元素${item.name}y,x的坐标变化`);
            // console.log(`移入`, target.id);
        },

        transEnter(item, index, e) {
            if (this.transElement.id !== item.id) {
                // console.log("交换对象.", this.transElement.id, item.id);
                let tempValue = JSON.parse(
                    JSON.stringify(this.transElement.index)
                );
                // 先移动再赋值 42
                if (this.transElement.index > item.index) {
                    console.log("移入比自己大的");
                    this.transElement.trans += -42;
                    item.trans += 42;
                } else {
                    console.log("移入比自己小的");
                    this.transElement.trans += 42;
                    item.trans += -42;
                }
                this.transElement.index = item.index;
                item.index = tempValue;
            }
        },

        // 移出
        transLeave(e) {
            e.preventDefault();
            let target = e.target;
            let { nodeName } = target; // 节点
            // console.log(`移出`, target.id);
        },

        // 移动项目 结束移动触发 输出拖动元素结束时的位置
        transEnd(item, index, e) {
            e.preventDefault();
            // console.log(`放置项目索引值是${index},内容是%o`, e);
        },
    },
};
</script>

<style lang="less">
.moving {
    &-area {
        padding: 10px;
        margin: 10px;
        border: 1px dashed #b1aeae;
        border-radius: 6px;
        position: relative;

        &-item {
            width: 100px;
            height: 32px;
            line-height: 32px;
            background: #fff;
            border-radius: 6px;
            border: 1px solid #b1aeae;
            text-align: center;
            margin: 10px;
            transition: all linear 0.2s;
            .pointer(move);
        }

        &-trans {
            position: relative;
        }
    }

    .choose-style {
        color: #fff;
        background: #4090f7;
    }
}
</style>
