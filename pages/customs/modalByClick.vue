<template>
    <!-- 新建文件的模板 -->
    <div class="test">
        <Contents>
            弹窗从点击处蹦出
        </Contents>

        <div class="test__block" :style="{ paddingLeft: '16%' }">
            <el-button type="primary" @click="handleModal">点击打开1</el-button>
        </div>
        <div class="test__block" :style="{ paddingLeft: '32%' }">
            <el-button type="primary" @click="handleModal">点击打开2</el-button>
        </div>
        <div class="test__block" :style="{ paddingLeft: '48%' }">
            <el-button type="primary" @click="handleModal">点击打开3</el-button>
        </div>

        <CommonDialog
            :value.sync="dialogValue"
            @handleModal="handleModal"
        ></CommonDialog>
    </div>
</template>

<script>
import CommonDialog from "../../components/CommonDialog.vue";
export default {
    head() {
        return {};
    },
    components: {
        CommonDialog
    },
    data() {
        return {
            dialogValue: false
        };
    },
    mounted() {},
    methods: {
        handleModal(data) {
            this.dialogValue = !this.dialogValue;
        }
    }
};
</script>

<style lang="less">
.test {
    &__block {
        width: 100%;
        margin: 0 0 16% 0;
    }
}
</style>
