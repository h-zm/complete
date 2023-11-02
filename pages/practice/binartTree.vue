<template>
    <!-- 新建文件的模板 -->
    <div class="binary">
        <h4>二叉树</h4>
        <el-form>
            <el-form-item label="入值">
                {{ templateData }}
            </el-form-item>
            <el-form-item label="操作">
                <el-button @click="preNode" size="mini">前序打印</el-button>
                <el-button @click="inNode" size="mini">中序打印</el-button>
                <el-button @click="postNode" size="mini">后序打印</el-button>
                <!-- <el-button @click="append" size="mini">添加</el-button> -->
            </el-form-item>
            <el-form-item label="值域"> </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { binaryTree } from "../../plugins/binaryTree";
export default {
    head() {
        return {};
    },
    data() {
        return {
            templateData: {
                value: 3,
                left: {
                    value: 88,
                    right: {
                        value: 221
                    }
                },
                right: {
                    value: 11,
                    left: {
                        value: 9,
                        left: {
                            value: 222
                        },
                        right: {
                            value: 223,
                            left: {
                                value: 44,
                                left: {
                                    value: 224
                                }
                            },
                            right: {
                                value: 225
                            }
                        }
                    },
                    right: {
                        value: 13,
                        left: {
                            value: 226
                        },
                        right: {
                            value: 227
                        }
                    }
                }
            },
            binary: null
        };
    },
    mounted() {
        this.init(4);
    },
    methods: {
        init(value) {
            this.binary = new binaryTree(value);
        },
        preNode() {
            this.binary.traversePre(this.templateData);
        },
        inNode() {
            this.binary.traverseIn(this.templateData);
        },
        postNode() {
            this.binary.traversePost(this.templateData);
        }
    }
};
</script>

<style lang="less">
// @import "~assets/less/index.less";
</style>
