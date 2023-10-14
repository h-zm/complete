<template>
    <!-- 新建文件的模板 -->
    <div class="listnode">
        <h4>单链</h4>
        <el-form>
            <el-form-item label="入值">
                <el-input v-model="startPoint"></el-input>
            </el-form-item>
            <el-form-item label="操作">
                <el-button @click="initLink" size="mini">初始化</el-button>
                <el-button @click="addHead" size="mini">头部添加节点</el-button>
                <el-button @click="delFirst" size="mini"
                    >删除头部节点</el-button
                >
                <el-button @click="appendLink" size="mini"
                    >添加末节点</el-button
                >
                <el-button @click="delTail" size="mini">删除末节点</el-button>
                <el-button @click="repeat" size="mini">去重复</el-button>
                <el-button @click="delValue" size="mini"
                    >按值删除某节点</el-button
                >
                <el-button @click="printLink" size="mini">更新</el-button>
            </el-form-item>
            <el-form-item label="节点内容">
                {{ this.linkContent }}
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { signleLink } from "../../plugins/listnode";
export default {
    head() {
        return {
            title: "vue文件模板",
            meta: "",
            description: "可用复制来快速创建文件",
            name: "模板",
            script: []
        };
    },
    data() {
        return {
            startPoint: "",
            link: "",
            linkContent: ""
        };
    },
    mounted() {
        this.initLink();
    },
    methods: {
        initLink() {
            this.startPoint = 0;
            this.link = new signleLink(this.startPoint);
            this.printLink();
        },

        addHead() {
            this.link.addHead(this.startPoint);
            this.printLink();
        },

        appendLink() {
            this.link.append(this.startPoint);
            this.printLink();
        },

        delFirst() {
            this.link.delHead();
            this.printLink();
        },

        delTail() {
            this.link.delTail();
            this.printLink();
        },

        repeat() {
            this.link.pastRepeat();
            this.printLink();
        },

        delValue() {
            this.link.delValue(this.startPoint);
            this.printLink();
        },

        delLink() {},

        printLink() {
            if (this.link) {
                this.linkContent = this.link.print();
            }
        }
    }
};
</script>

<style lang="less">
// @import "~assets/less/index.less";
.example {
}
</style>
