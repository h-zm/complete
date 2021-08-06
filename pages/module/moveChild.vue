<template>
    <!-- 拖拽功能 -->
    <div class="example">
        <Contents>
            通过拖拽 <Colors>drag</Colors> 事件 实现元素间位置交换。 <br />
            1. 给可拖动元素都添加 <Colors>draggable</Colors> 属性并设置为true。
            <br />2. 通过<Colors>dragstart</Colors>事件得到拖动元素信息。<br />
            3.使用<Colors>dragover</Colors>拖动移入事件获取等待交换的元素内容。<br />
            4.drop停止时事件交换起始拖动元素与等待交换元素的节点内容，完成交换。
        </Contents>
        <div class="moving-area" @dragleave="dragLeave">
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
    </div>
</template>

<script>
import Colors from "../../components/Font/Colors.vue";
export default {
    components: { Colors },
    head() {
        return {
            title: "移动元素"
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
                { name: "testF", id: 6, choose: false }
            ],
            dargElement: null
        };
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
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
            this.dargElement = item;
            // console.log(e.y, e.x, `拖拉元素${item.name}y,x的坐标变化`);
            console.log(`移入`, target.id);
        },

        // 移出
        dragLeave(e) {
            e.preventDefault();
            let target = e.target;
            let { nodeName } = target; // 节点
            console.log(`移出`, target.id);
        },

        // 移动项目 结束移动触发 输出拖动元素结束时的位置
        dragEnd(item, index, e) {
            e.preventDefault();
            console.log(`放置项目索引值是${index},内容是%o`, e);
        },

        //移动完毕 放置的位置
        handleDrop(e) {
            e.preventDefault();
            console.log(`移动完毕`, e);
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
            // toElement.innerHTML =  this.dargElement.name
            fromElement.innerHTML = toElement.innerHTML;
            toElement.innerHTML = temp;

            console.log(this.dataList, "数据结构有变化吗?");

            // console.log(toElement, "结束时的对象");
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.example {
    .moving-area {
        padding: 10px;
        margin: 10px;
        border: 1px dashed #b1aeae;
        border-radius: 6px;
        position: relative;

        .moving-fix {
            width: 100%;
            height: 100%;
            position: fixed;
            background: rgba(0, 0, 0, 0.02);
            top: 0;
            left: 0;
            z-index: @zIndex;
        }

        .moving-block {
            width: 0;
            height: 0;
            position: fixed;
            background: rgba(130, 157, 238, 0.1);
            top: 0;
            left: 0;
            z-index: @zIndex + 2;
        }

        .begin-point {
            width: 4px;
            height: 4px;
            position: fixed;
            background: rgba(9, 60, 212, 1);
            top: 0;
            left: 0;
            z-index: @zIndex + 3;
        }

        .moving-point {
            width: 4px;
            height: 4px;
            position: fixed;
            background: rgb(236, 13, 13);
            top: 0;
            left: 0;
            z-index: @zIndex + 4;
        }

        &-item {
            width: 80px;
            height: 32px;
            line-height: 32px;
            background: #fff;
            border-radius: 6px;
            border: 1px solid #b1aeae;
            text-align: center;
            margin: 10px;
            .pointer(move);
        }

        .choose-style {
            color: #fff;
            background: #4090f7;
        }
    }
}
</style>
