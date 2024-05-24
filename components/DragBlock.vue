<template>
    <!-- 拉伸移动组件 -->
    <div
        id="drag__block"
        class="db"
        :style="{
            left: `${upperLeftX}px`,
            top: `${upperLeftY}px`,
            width: `${blockWidth}px`,
            height: `${blockHeight}px`,
        }"
    >
        <!-- 移动位置  -->
        <template>
            <div
                class="db__move_upLeft"
                @mousedown="handleDown"
                @mouseup="handleUp"
                title="按下鼠标移动浮窗位置"
            ></div>
            <div
                class="db__move_upRight"
                @mousedown="handleDown"
                @mouseup="handleUp"
                title="按下鼠标移动浮窗位置"
            ></div>
            <div
                class="db__move_lowRight"
                @mousedown="handleDown"
                @mouseup="handleUp"
                title="按下鼠标移动浮窗位置"
            ></div>
            <div
                class="db__move_lowLeft"
                @mousedown="handleDown"
                @mouseup="handleUp"
                title="按下鼠标移动浮窗位置"
            ></div>
        </template>

        <!-- 拉伸宽高  -->

        <template>
            <div
                title="按下鼠标拉伸浮窗宽度"
                class="db__resize_colLeft"
                @mousedown="handleSizeDown"
            ></div>
            <div
                title="按下鼠标拉伸浮窗宽度"
                class="db__resize_colRight"
                @mousedown="handleSizeDown"
            ></div>
            <div
                title="按下鼠标拉伸浮窗高度"
                class="db__resize_rowTop"
                @mousedown="($event) => handleSizeDown($event, 'row')"
            ></div>
            <div
                title="按下鼠标拉伸浮窗高度"
                class="db__resize_rowBottom"
                @mousedown="($event) => handleSizeDown($event, 'row')"
            ></div>
        </template>

        <template v-if="auxiliary">
            <div class="db__auxil_upper">
                ({{ upperLeftX }},{{ upperLeftY }})
            </div>
            <div class="db__auxil_lower">
                ({{ lowerRightX }},{{ lowerRightY }})
            </div>
            <div class="db__auxil_size">
                宽度：{{ blockWidth }}, 高度：{{ blockHeight }}
            </div>
        </template>

        <div class="db__main">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {};
    },
    props: {
        // 展示辅助信息
        auxiliary: {
            type: Boolean,
            default: false,
        },

        // 指定宽度
        width: {
            type: Number,
            default: 500,
        },

        // 指定高度
        height: {
            type: Number,
            default: 300,
        },

        // 回调
        callback: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        return {
            // css padding 缩进
            paddingValue: 16,

            // 左上点坐标
            upperLeftX: 50,
            upperLeftY: 50,

            // 移动位置
            isMoving: false,
            clickPointXDiff: 0,
            clickPointYDiff: 0,

            // 拉伸大小
            isDrawing: false,

            blockWidth: 0,
            blockHeight: 0,

            turningX: 0,
            turningY: 0,
            turningType: "left", // left right top bottom

            // 右下点坐标
            // 初始宽度 加上 起点的 upperLeftY
            lowerRightX: 0, // (props?.width || 400) + 50
            lowerRightY: 0,
        };
    },
    mounted() {
        this.isDrawing = false;
        this.isMoving = false;

        // 基于 heigt 渲染特性 时赋值
        if (!this.height || isNaN(this.height)) {
            setTimeout(() => {
                let realHeight =
                    document.getElementById("drag__block")?.offsetHeight ||
                    document.getElementById("drag__block")?.clientHeight;
                realHeight = realHeight > 400 ? realHeight : 400;
                this.blockWidth = this.width || 400;
                this.lowerRightX = (this?.width || 400) + this.upperLeftX;
                this.blockHeight = realHeight;
                this.lowerRightY = realHeight + this.upperLeftY;
            }, 100);
        } else {
            this.blockWidth = this.width || 400;
            this.lowerRightX = (this.width || 400) + this.upperLeftX;
            this.blockHeight = this.height;
            this.lowerRightY = this.height + this.upperLeftY;
        }

        window.addEventListener("mousemove", this.handleMove);
        window.addEventListener("mouseup", this.handleSizeUp);
    },

    destroyed() {
        window.removeEventListener("mousemove", this.handleMove);
        window.removeEventListener("mouseup", this.handleSizeUp);
    },

    methods: {
        // 鼠标移动
        handleMove(e) {
            if (this.isMoving) {
                e.preventDefault();
                this.upperLeftX = e.clientX - this.clickPointXDiff;
                this.lowerRightX =
                    e.clientX - this.clickPointXDiff + this.blockWidth;
                this.upperLeftY = e.clientY - this.clickPointYDiff;
                this.lowerRightY =
                    e.clientY - this.clickPointYDiff + this.blockHeight;
            }

            if (this.isDrawing) {
                // console.log("鼠标x变化", this.turningType);
                e.preventDefault();
                if (
                    e.clientX < 0 ||
                    e.clientX >= window.innerWidth ||
                    e.clientY < 0 ||
                    e.clientY >= window.innerHeight
                ) {
                    // 限制在有效窗口内
                    return;
                }
                if (this.turningType == "left") {
                    let temp = Math.abs(e.clientX - this.turningX);
                    this.upperLeftX = temp;
                    this.blockWidth = this.lowerRightX - temp;
                } else if (this.turningType == "right") {
                    let temp = e.clientX + this.turningX;
                    this.lowerRightX = temp;
                    this.blockWidth = temp - this.upperLeftX;
                } else if (this.turningType == "top") {
                    let temp = Math.abs(e.clientY - this.turningY);
                    this.upperLeftY = temp;
                    this.blockHeight = this.lowerRightY - temp;
                } else if (this.turningType == "bottom") {
                    let temp = e.clientY + this.turningY;
                    this.lowerRightY = temp;
                    this.blockHeight = temp - this.upperLeftY;
                }
            }
        },

        // 鼠标按下
        handleDown(e) {
            e.stopPropagation();
            // console.log(
            // 	"鼠标按下的坐标位置相对于元素左上角的X差:",
            // 	e.clientX - this.clientX
            // );
            this.isMoving = true;
            this.clickPointXDiff = e.clientX - this.upperLeftX;
            this.clickPointYDiff = e.clientY - this.upperLeftY;
        },

        // 鼠标松开
        handleUp(e) {
            if (this.isMoving) {
                e.stopPropagation();
                this.isMoving = false;
                const { callback } = this;
                callback &&
                    callback({
                        type: "upper",
                        upperLeftX: this.upperLeftX,
                        upperLeftY: this.upperLeftY,
                    });
            }
        },

        // 开始拖拉
        handleSizeDown(e, type = "column") {
            e.stopPropagation();
            let turningX,
                turningY = 0;
            let turningType = "left";

            // 柱
            if (type == "column") {
                if (Math.abs(e.clientX - this.upperLeftX) > this.paddingValue) {
                    turningType = "right";
                    turningX = this.lowerRightX - e.clientX;
                } else {
                    turningX = e.clientX - this.upperLeftX;
                }
            } else {
                if (Math.abs(e.clientY - this.upperLeftY) > this.paddingValue) {
                    turningType = "bottom";
                    turningY = this.lowerRightY - e.clientY;
                } else {
                    turningType = "top";
                    turningY = e.clientY - this.upperLeftY;
                }
            }

            // console.log("turningType", turningType, e.clientY, turningY);
            this.isDrawing = true;
            this.turningX = turningX;
            this.turningType = turningType;
            this.turningY = turningY;
        },

        // 结束拖拉
        handleSizeUp(e) {
            if (this.isDrawing) {
                const { callback } = this;
                this.isDrawing = false;
                callback &&
                    callback({
                        type: "size",
                        width: this.blockWidth,
                        height: this.blockHeight,
                    });
            }
        },
    },
};
</script>

<style lang="less">
.db {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1002;
    padding: 16px;
    width: fit-content;
    height: auto;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 2px 22px 2px rgba(40, 40, 40, 0.2);

    // padding 很重要
    &__move {
        &_upLeft {
            position: absolute;
            left: 0;
            top: 0;
            width: 16px;
            height: 16px;
            z-index: 100;
            cursor: move;
        }
        &_upRight {
            position: absolute;
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            z-index: 100;
            cursor: move;
        }
        &_lowRight {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 16px;
            height: 16px;
            z-index: 100;
            cursor: move;
        }
        &_lowLeft {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 16px;
            height: 16px;
            z-index: 100;
            cursor: move;
        }
    }

    &__resize {
        &_colLeft {
            position: absolute;
            top: 16px;
            left: 0;
            bottom: 16px;
            width: 16px;
            // background: red;
            cursor: col-resize;
        }
        &_colRight {
            position: absolute;
            top: 16px;
            right: 0;
            bottom: 16px;
            width: 16px;
            // background: red;
            cursor: col-resize;
        }
        &_rowTop {
            position: absolute;
            top: 0;
            left: 16px;
            right: 16px;
            height: 16px;
            // background: blue;
            cursor: row-resize;
        }
        &_rowBottom {
            position: absolute;
            left: 16px;
            right: 16px;
            bottom: 0;
            height: 16px;
            // background: blue;
            cursor: row-resize;
        }
    }

    &__auxil {
        &_upper {
            position: absolute;
            left: -20px;
            top: -20px;
            color: red;
            font-weight: bold;
        }

        &_lower {
            position: absolute;
            right: -20px;
            bottom: -20px;
            color: red;
            font-weight: bold;
        }

        &_size {
            position: absolute;
            top: -20px;
            left: 50px;
            color: #fff;
            background: blue;
        }
    }

    &__main {
        position: relative;
        // z-index: 101;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>
