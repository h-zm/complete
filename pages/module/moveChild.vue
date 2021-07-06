<template>
  <!-- 新建文件的模板 -->
  <div class="example">
    <div class="moving-area" @dragleave="dragLeave">
      <div class="moving-fix" id="moving">
        <div
          class="moving-block"
          :style="{
            left: beginPosition.x + 'px',
            top: beginPosition.y + 'px',
            width: movingAttribute.width + 'px',
            height: movingAttribute.height + 'px',
            marginTop: movingMagin.top + 'px',
            marginLeft: movingMagin.left + 'px'
          }"
        ></div>
      </div>
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
      dargElement: null,
      beginMouse: false, // 开始鼠标监听

      // 起始位置
      beginPosition: {
        x: 0,
        y: 0
      },
      // 移动中宽度与高度的变化
      movingAttribute: {
        width: 0,
        height: 0
      },
      // 当移动的是负值是起作用
      movingMagin: {
        top: 0,
        left: 0
      }
    };
  },
  mounted() {
    // let targeElement = document.getElementsByClassName("moving-area")[0];
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
    // 鼠标按下
    document
      .getElementById("moving")
      .addEventListener("mousedown", this.mousemoveDown);
    //添加鼠标移动监听
    document
      .getElementById("moving")
      .addEventListener("mousemove", this.mousemoveFunc);
    // 鼠标松开
    document
      .getElementById("moving")
      .addEventListener("mouseup", this.mousemoveUp);

    // 鼠标移出
    document
      .getElementById("moving")
      .addEventListener("mouseleave", this.mousemoveLeave);
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
    },

    mousemoveDown(e) {
      // '鼠标按下事件'
      this.beginMouse = true;
      console.log(e, "按下点的数据");
      // 根据起始点 更新位置
      this.beginPosition = {
        x: e.offsetX,
        y: e.offsetY
      };
      console.log(this.beginPosition, "按下鼠标");
    },
    mousemoveFunc(e) {
      // '鼠标移动事件'
      if (this.beginMouse) {
        console.log(e, "移动点位");
        // 通过起始位置 与 移动点位置判断当前框选
        // 如果是往上，往左及是向坐标的负方向需要通过margin来更新

        // 一开始往左移动
        if (this.beginPosition.x > e.offsetX) {
          this.movingMagin.left += e.movementX;
        }
        // 一开始往上移动
        if (this.beginPosition.y > e.offsetY) {
          this.movingMagin.top += e.movementY;
        }

        // 存在移动中向反方向移动的情况
        // 所以在这里判断当前的宽度是否有
        // 大于0 直接复制 不存在的通过绝对值赋值
        if (this.movingMagin.left == 0) {
          this.movingAttribute.width += e.movementX;
        } else {
          this.movingAttribute.width += Math.abs(e.movementX);
        }

        // 同上
        if (this.movingMagin.top == 0) {
          this.movingAttribute.height += e.movementY;
        } else {
          this.movingAttribute.height += Math.abs(e.movementY);
        }
      }
    },
    mousemoveUp(e) {
      // '鼠标松开事件'
      if (this.beginMouse) {
        this.resetMoving();
        console.log(e, this.beginMouse, "moveUp松开鼠标");
      }
    },

    mousemoveLeave(e) {
      // '鼠标移出事件'
      if (this.beginMouse) {
        this.resetMoving();
        console.log(e, this.beginMouse, "moveOut松开鼠标");
      }
    },

    // 重置移动数据
    resetMoving() {
      this.beginMouse = false;
      // 起始位置
      this.beginPosition = {
        x: 0,
        y: 0
      };
      // 移动中宽度与高度的变化
      this.movingAttribute = {
        width: 0,
        height: 0
      };

      // 重置margin
      this.movingMagin = {
        top: 0,
        left: 0
      };
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
      position: absolute;
      background: rgba(0, 0, 0, 0.02);
      top: 0;
      left: 0;
      z-index: @zIndex;
    }

    .moving-block {
      width: 0;
      height: 0;
      position: absolute;
      background: rgba(130, 157, 238, 0.1);
      top: 0;
      left: 0;
      z-index: @zIndex + 2;
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
  }
}
</style>
