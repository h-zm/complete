<template>
    <div class="example">
        <h4>
            测试 preventDefault 属性
        </h4>
        <Contents>
            1.链接的默认事件：使用 <Colors>preventDefault</Colors> 属性 或者
            <Colors>return false</Colors> 组织 a 标签跳转地址
        </Contents>
        <a href="http://www.baidu.com" @click="handleA">跳转百度</a>
        <Contents>
            2. 表单提交的默认事件：在
            {{ label.form }} 中，当用户点击提交按钮（如
            {{ label.input }}
            ）时，默认行为是将表单数据提交到服务器进行处理。 <br />
            3. 输入框的默认事件： 对于
            {{ label.textarea }}
            等输入元素，按下回车键（Enter）会触发默认行为，通常是提交表单或换行。<br />
            4.右键菜单的默认事件：
            在浏览器中，右键单击页面上的元素会弹出上下文菜单。这个默认行为可以包括复制、粘贴、打印等选项。
            <br />
            5. 拖放操作的默认事件：
            当用户拖动元素时，浏览器会默认启用拖放功能，例如在拖动图像时，会触发默认行为将图像复制到其他位置或容器中。
        </Contents>
    </div>
</template>

<script>
export default {
    head() {
        return {};
    },
    data() {
        return {
            label: {
                form: "<form>",
                input: "<input type='submit'>",
                textarea: "<input> <textarea>"
            }
        };
    },
    mounted() {},
    methods: {
        handleA(e) {
            e.preventDefault();
        }
    }
};
</script>

<style lang="less">
// @import "~assets/less/index.less";
.example {
}
</style>
