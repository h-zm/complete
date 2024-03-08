<template>
    <div
        class="del"
        :style="{
            top: dialogShow ? 0 : dialogLabeling.pageY + 'px',
            left: dialogShow ? 0 : dialogLabeling.pageX + 'px'
        }"
        :class="{ del__hide: !dialogShow }"
    >
        <div class="del__mark">
            <div class="del__main">
                <div class="del__title"></div>
                <div class="del__content">{{ dialogText }}</div>
                <div class="del__footer">
                    <el-button
                        class="del__button del__button_cancel"
                        :loading="loading"
                        @click="handlModal('cancel')"
                        >取消</el-button
                    >
                    <el-button
                        class="del__button"
                        type="primary"
                        :loading="loading"
                        @click="handlModal('sure')"
                        >确认</el-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        dialogText: {
            type: String,
            default: "确认要删除模型吗?"
        }
    },
    data() {
        return {
            dialogShow: false,
            // 存储鼠标点击位置
            dialogLabeling: {
                pageX: 0,
                pageY: 0
            }
        };
    },
    watch: {
        value(newV) {
            setTimeout(() => {
                this.dialogShow = newV;
            }, 150);
        }
    },
    mounted() {
        document.addEventListener("click", this.handleLabeling);
    },
    methods: {
        // 获取鼠标点击位置相对于整个页面的坐标
        handleLabeling(e) {
            if (!this.dialogShow) {
                this.dialogLabeling.pageX = e.pageX;
                this.dialogLabeling.pageY = e.pageY;
            }
        },

        handlModal(data) {
            this.$emit("handleModal", data);
        }
    },
    destoryed() {
        document.addEventListener("click", this.handleLabeling);
    }
};
</script>

<style lang="less" scoped>
.del {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3000;
    transition: 0.3s ease all;
    overflow: hidden;

    &__mark {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        .flex(center, center);
    }

    &__main {
        padding: 24px;
        min-width: 320px;
        background: #f4f6f9;
        border-radius: 8px;
    }

    &__title {
        font-size: 16px;
    }

    &__content {
        margin: 0 0 40px 0;
        line-height: 20px;
        color: #080304;
        font-size: 16px;
        font-weight: 500;
    }

    &__footer {
        .flex(center, center);
    }

    &__button {
        min-width: 80px;
        border-radius: 4px;

        &_cancel {
            margin: 0 20px 0 0;
        }
    }

    &__hide {
        margin: 0;
        padding: 0;
        width: 0;
        height: 0;
        line-height: 0;
        border: none;
        overflow: hidden;
        z-index: 0;
        user-select: none;
    }
}
</style>
