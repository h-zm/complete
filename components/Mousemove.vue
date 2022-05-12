<template>
    <!-- 使用 mouse(鼠标事件) 模拟拖拽 -->
    <div class="dragui" @mousemove="handleMove" @mouseup="handleStop">
        <div class="dragui-dynamic">
            <div class="dragui-content" :style="{ width: turningValue + 'px' }">
                <slot></slot>
            </div>
            <div
                class="dragui-movingrod"
                :style="{ left: turningValue + 'px' }"
                @mousedown="handleDown"
            >
                .
                <br />
                .
                <br />
                .
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showPoint: {
            type: Boolean,
            default: false
        },
        styleDiy: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            // 移动信息
            dragInfo: {},

            // 左边菜单栏的信息
            slidebarInfo: {},

            // 宽度变化值
            turningValue: 200,

            // 存放默认宽度
            historyWidth: 0,

            timer: null,

            // 鼠标按下
            hasDown: false,

            // 储存初时宽度
            originCilentX: 0,

            pointClientX: 0
        };
    },

    mounted() {},

    methods: {
        // 鼠标按下
        handleDown(e) {
            console.log("鼠标按下", e);
            this.pointClientX = e.clientX - this.turningValue;
            console.log("点击点相对于触发元素 mod 的位置:", this.pointClientX);
            this.hasDown = true;
        },

        // 鼠标移动
        handleMove(e) {
            if (this.hasDown) {
                console.log("鼠标移动", e.clientX, e);
                this.turningValue = e.clientX - this.pointClientX;
            }
        },

        // 鼠标松开
        handleStop(e) {
            this.hasDown = false;
            console.log("鼠标松开或移出", e);
        }
    }
};
</script>

<style lang="less" scoped>
@import "~assets/less/index";
.dragui {
    // padding: 20px;
    width: 100%;
    height: 200px;
    background: #f5f5f5;
    &-dynamic {
        position: relative;
        .flex(stretch, flex-start);
    }

    &-content {
        // padding: 20px;
        width: 200px;
        background: #fff;
        border: 1px solid #ebebeb;
        border-radius: 6px;
    }

    &-pointer {
        .pointer(col-resize);
    }

    &-movingrod {
        position: absolute;
        top: 0px;
        width: 16px;
        height: inherit;
        color: #fff;
        background: rgba(0, 204, 191, 0.4);
        user-select: none;
        .flex(center, center);
        .pointer(col-resize);
    }
}
</style>
