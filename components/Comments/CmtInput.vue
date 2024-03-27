<template>
    <div class="cmlpy">
        <el-input
            :maxlength="200"
            ref="inputRef"
            class="cmlpy__input"
            v-model:value="inputText"
            placeholder="在这里输入评论内容"
            @pressEnter="submit"
        ></el-input>
        <el-button
            class="cmlpy__btn"
            :class="{ cmlpy__could: inputText }"
            :loading="loading"
            @click="submit"
            >发布</el-button
        >
    </div>
</template>

<script>
import { zh_CN } from "./messages";
export default {
    name: "CmtInput",
    data() {
        return {
            inputRef: null,
            inputText: "",
        };
    },
    props: {
        value: {
            type: String,
            default: "",
        },

        loading: {
            type: Boolean,
            default: false,
        },

        // 是否需要获取焦点
        autoFocus: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        if (this.props.autoFocus) {
            inputRef.value.focus();
        }
    },
    watch: {
        "props.value"(newV) {
            this.inputText = newV;
        },
        inputText(newV, oldV) {
            this.$emit("update:value", newV);
        },
    },
    methods: {
        submit() {
            if (this.props.loading) {
                return;
            }
            if (this.inputText) {
                this.$emit("handleBack", this.inputText);
            } else {
                this.$message.warning(zh_CN.INPUT_NONE);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.cmlpy {
    &__input {
        margin: 12px 0;
        height: 52px;
        line-height: 52px;
        background: #f4f6f9;
        border: none;
        border-radius: 8px;
    }

    &__btn {
        // width: 70px;
        height: 32px;
        border-color: transparent;
        background: rgba(33, 127, 255, 0.3);
        color: #fff;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        border-radius: 6px;
        cursor: pointer;
        user-select: none;
        float: right;

        &:hover {
            background: rgba(33, 127, 255, 1);
            color: #fff;
        }
    }

    &__could {
        background: rgba(33, 127, 255, 1);
    }
}
</style>
