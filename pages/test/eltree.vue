<template>
    <!-- 新建文件的模板 -->
    <div class="example">
        <!--  :default-expand-all="true" -->
        <el-tree
            show-checkbox
            node-key="id"
            ref="tree"
            :key="treeKey"
            highlight-current
            :data="data"
            :props="defaultProps"
            :default-expanded-keys="expanddedKeys"
            @node-click="nodeClick"
            @node-expand="nodeExpand"
            @node-collapse="nodeCollapse"
        >
        </el-tree>

        <div class="buttons">
            <el-button @click="handlleExpand">{{
                !expanddedKeys.length ? "一键展开" : "一键折叠"
            }}</el-button>
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
            <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <el-button @click="setCheckedKeys">通过 key 设置</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    id: 1,
                    label: "一级 1",
                    children: [
                        {
                            id: 4,
                            label: "二级 1-1",
                            children: [
                                {
                                    id: 9,
                                    label: "三级 1-1-1",
                                },
                                {
                                    id: 10,
                                    label: "三级 1-1-2",
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    label: "一级 2",
                    children: [
                        {
                            id: 5,
                            label: "二级 2-1",
                        },
                        {
                            id: 6,
                            label: "二级 2-2",
                        },
                    ],
                },
                {
                    id: 3,
                    label: "一级 3",
                    children: [
                        {
                            id: 7,
                            label: "二级 3-1",
                        },
                        {
                            id: 8,
                            label: "二级 3-2",
                        },
                    ],
                },
            ],
            defaultProps: {
                children: "children",
                label: "label",
            },
            expanddedAll: true,
            expanddedKeys: [],
            treeKey: 1,
        };
    },
    methods: {
        handlleExpand() {
            // 1.通过更改 expanddedKeys 刷新，借助treeKey更新强制刷新组件树
            if (this.expanddedKeys?.length) {
                this.expanddedKeys = [];
            } else {
                this.expanddedKeys = [1, 2, 3];
            }
            this.treeKey++;
            this.expanddedAll = !this.expanddedAll;

            // 2.通过设置refs的 item 的 expanded 更新，不过需要先借助 :default-expand-all="true" 渲染出所有
            // 的子节点内容,
            // if (this.expanddedAll) {
            //     this.$refs.tree?.treeItems.forEach((item) => {
            //         item.__vue__.expanded = false;
            //     });
            // } else {
            //     this.$refs.tree?.treeItems.forEach((item) => {
            //         item.__vue__.expanded = true;
            //     });
            // }
            // this.expanddedAll = !this.expanddedAll;
        },

        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },
        setCheckedNodes() {
            this.$refs.tree.setCheckedNodes([
                {
                    id: 5,
                    label: "二级 2-1",
                },
                {
                    id: 9,
                    label: "三级 1-1-1",
                },
            ]);
        },
        setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3]);
        },
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        },

        nodeClick(data, node, self) {
            console.log("node-click", data);
            console.log("node-click", node);
            console.log("node-click", self);
        },

        judgeAll() {
            let expandAll = 0;
            this.$refs.tree?.treeItems.forEach((it) => {
                if (it.__vue__.expanded) {
                    expandAll += 1;
                }
            });
            console.log("expandAll", expandAll);
            // if (expandAll !== this.expanddedAll) {
            //     this.handlleExpand();
            // }
        },

        nodeExpand(data, node, self) {
            console.log("node-expand", data);
            console.log("node-expand", node);
            console.log("node-expand", self);
            // console.log("this.$refs", this.$refs.tree);
            this.judgeAll();
        },
        nodeCollapse(data, node, self) {
            console.log("node-collapse", data);
            console.log("node-collapse", node);
            console.log("node-collapse", self);
            // console.log("this.$refs", this.$refs.tree);
            this.judgeAll();
        },
    },
};
</script>

<style lang="less">
.buttons {
    margin: 10px 0;
    padding: 10px 0;
    border-top: 1px solid #f5f5f5;
}
</style>
