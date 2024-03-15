<template>
    <!-- 新建文件的模板 -->
    <div class="listnode">
        <h4>单链</h4>
        <el-form>
            <el-form-item label="入值">
                <el-input v-model="singlePoint"></el-input>
            </el-form-item>
            <el-form-item label="操作">
                <el-button @click="initSingle" size="mini">初始化</el-button>
                <el-button @click="addHead" size="mini">头部添加节点</el-button>
                <el-button @click="delFirst" size="mini"
                    >删除头部节点</el-button
                >
                <el-button @click="appendSingle" size="mini"
                    >添加末节点</el-button
                >
                <el-button @click="delTail" size="mini">删除末节点</el-button>
                <el-button @click="repeat" size="mini">去重复</el-button>
                <el-button @click="delValue" size="mini"
                    >按值删除某节点</el-button
                >
                <el-button @click="printSingle" size="mini">更新</el-button>
            </el-form-item>
            <el-form-item label="链表值域">
                {{ this.singleLinkContent }}
            </el-form-item>
        </el-form>
        <h4>双链</h4>
        <el-form>
            <el-form-item label="入值">
                <el-input v-model="doublePoint"></el-input>
            </el-form-item>
            <el-form-item label="操作">
                <el-button @click="initDouble" size="mini">初始化</el-button>
                <el-button @click="appendDouble" size="mini"
                    >追加节点</el-button
                >
            </el-form-item>
            <el-form-item label="链表值域">
                {{ doubleLinkContent }}
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { signleLink, doubleLink } from "../../plugins/listnode";
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
            singlePoint: "",
            singleLink: null,
            singleLinkContent: "",
            doublePoint: "",
            doubleLink: null,
            doubleLinkContent: ""
        };
    },
    mounted() {
        this.initSingle();
        this.initDouble();
    },
    methods: {
        initSingle() {
            this.singlePoint = 0;
            this.singleLink = new signleLink(this.singlePoint);
            this.printSingle();
        },

        addHead() {
            this.singleLink.addHead(this.singlePoint);
            this.printSingle();
        },

        appendSingle() {
            this.singleLink.append(this.singlePoint);
            this.printSingle();
        },

        delFirst() {
            this.singleLink.delHead();
            this.printSingle();
        },

        delTail() {
            this.singleLink.delTail();
            this.printSingle();
        },

        repeat() {
            this.singleLink.pastRepeat();
            this.printSingle();
        },

        delValue() {
            this.singleLink.delValue(this.singlePoint);
            this.printSingle();
        },

        delsingleLink() {},

        printSingle() {
            if (this.singleLink) {
                this.singleLinkContent = this.singleLink.print();
            }
        },

        initDouble() {
            this.doublePoint = 0;
            this.doubleLink = new doubleLink(this.doublePoint);
            this.printDouble();
        },

        appendDouble() {
            this.doubleLink.append(this.doublePoint);
            this.printDouble();
        },

        printDouble() {
            if (this.doubleLink) {
                this.doubleLinkContent = this.doubleLink.print();
            }
        }
    }
};
</script>

<style lang="less">
// @import "~assets/less/index.less";
</style>
