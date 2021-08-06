<template>
    <!-- 模拟拖拽 -->
    <div class="example">
        <!-- 设置draggable属性为true 使得元素可以拖拉-->
        <Contents>
            <p>
                1.给予拖动元素<Colors>draggable</Colors>属性且为true
                使得元素可以拖拉。
            </p>
            <p>
                2.给拖动元素添加 dragstart 事件，通过 dataTransfer
                传递需要用到的信息。
            </p>
            <p>
                3.给接收元素添加 drop 停止事件 通过 dataTransfer
                中传递的元素ID将拖动元素 推入接收下
            </p>
            <p>
                4.通过 dragenter(移入)事件 dragleave(移出) 事件 drop (停止) 事件
                为触发条件，JS控制 接收区域classList的变化 add (增加样式)
                ,remove(移出样式) ，从而更新视觉效果
            </p>
        </Contents>
        <el-button @click="resetFunc()"> reset </el-button>
        <div class="doing-area">
            <div class="drag-el">
                <div
                    draggable="true"
                    id="dragElement"
                    class="drag-element"
                ></div>
            </div>

            <div id="drogElement" class="drog-element"></div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "拖入目标区"
        };
    },
    data() {
        return {
            dataList: [
                { name: "testA", id: 1 },
                { name: "testB", id: 2 },
                { name: "testC", id: 3 },
                { name: "testD", id: 4 },
                { name: "testE", id: 5 },
                { name: "testE", id: 6 }
            ]
        };
    },
    mounted() {
        // 拖拽对象
        const dragElement = document.getElementById("dragElement");
        // 放置对象
        const drogElement = document.getElementById("drogElement");
        // 添加监听函数
        dragElement.addEventListener("dragstart", this.handleDragStart);
        // 监听 拖拽对象移入事件
        drogElement.addEventListener("dragover", this.handleDragOver);
        // 监听 拖拽对象移出事件
        drogElement.addEventListener("dragleave", this.handleDragLeave);
        // 监听 放置事件
        drogElement.addEventListener("drop", this.handleDrop);
    },
    beforeDestroy() {
        // 添加监听函数
        dragElement.removeEventListener("dragstart", this.handleDragStart);
        // 监听 拖拽对象移入事件
        drogElement.removeEventListener("dragover", this.handleDragOver);
        // 监听 拖拽对象移出事件
        drogElement.removeEventListener("dragleave", this.handleDragLeave);
        // 监听 放置事件
        drogElement.removeEventListener("drop", this.handleDrop);
    },
    methods: {
        // 重置
        resetFunc() {
            location.reload();
        },
        // 拖拽事件
        dragFunc(e) {
            console.log(e, "模拟事件");
        },
        handleDragStart(e) {
            // 通过setData 设置属性
            e.dataTransfer.setData("text/plain", e.target.id);
        },
        handleDragOver(e) {
            // 阻止默认事件
            e.preventDefault();
            drogElement.classList.add("drogover");
        },
        handleDragLeave(e) {
            // 阻止默认事件
            e.preventDefault();
            drogElement.classList.remove("drogover");
        },
        handleDrop(e) {
            e.preventDefault();
            // 获取目标id
            const draggedId = e.dataTransfer.getData("text/plain");
            drogElement.appendChild(document.getElementById(draggedId));
            drogElement.classList.add("droped");
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.example {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    // display: grid;
    // grid-template-columns: ;
    // place-items: ;
    .doing-area {
        width: 100%;
        height: 500px;
        .flex(center, center);
    }
    .drag-el {
        width: 180px;
        height: 180px;
        text-align: center;
        margin-right: 100px;
    }
    .drag-element {
        width: 160px;
        height: 160px;
        border-radius: 8px;
        background: #0ae4d9;
    }
    .drog-element {
        width: 240px;
        height: 240px;
        border-radius: 8px;
        border: 2px dashed #646668;
        position: relative;
        .flex(center, center);
        &::before {
            content: "请拖拽到此处";
            height: 20px;
            position: absolute;
            display: block;
            text-align: center;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
            z-index: 1;
        }
    }
    .drogover {
        border: 2px dashed #ffae00;
    }

    .droped {
        border: 2px dashed #48ff00;
    }
}
</style>
