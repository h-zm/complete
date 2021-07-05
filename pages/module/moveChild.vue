<template>
  <!-- 新建文件的模板 -->
  <div class="example">
    <div class="moving-area" @dragleave="dragLeave">
      <div
        class="moving-area-item"
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
export default {
  data() {
    return {
      dataList: [
        { name: "testA", id: 1 },
        { name: "testB", id: 2 },
        { name: "testC", id: 3 },
        { name: "testD", id: 4 },
        { name: "testE", id: 5 },
        { name: "testF", id: 6 }
      ],
      dargElement: null
    };
  },
  mounted() {
    let targeElement = document.getElementsByClassName("moving-area")[0];
    // console.log("子节点名称", targeElement.classList);
    // for (let i = 0; i < targeElement.childNodes.length; i++) {
    //   console.log(`第${i + 1}个子节点`, targeElement.childNodes[i]);
    // }
    // let firstChild = targeElement.childNodes[0];
    // 移出子节点
    // targeElement.removeChild(firstChild);
    // 在末尾插入字节节点
    // targeElement.appendChild(firstChild)；、
    //复制子节点
    // targeElement.cloneNode(firstChild)
    // 插入指定节点
    // targeElement.insertBefore(新的子节点, 作为参考的子节点);
  },
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
      let fromElement = document.getElementById(
        e.dataTransfer.getData("text/plain")
      );

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
  }
}
</style>
