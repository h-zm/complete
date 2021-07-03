<template>
  <!-- 模拟拖拽 -->
  <div class="example">
    <!-- 设置draggable属性为true 使得元素可以拖拉-->
    <div class="doing-area">
      <div class="drag-el">
        <div draggable="true" id="dragElement" class="drag-element"></div>
      </div>

      <div id="drogElement" class="drog-element"></div>
    </div>
  </div>
</template>

<script>
export default {
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
  methods: {
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
    &::before {
      content: "请拖拽到此处";
      display: block;
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
