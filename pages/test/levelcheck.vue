<template>
    <!-- 新建文件的模板 -->
    <div class="lechk">
        <div class="lechk__left"></div>
        <div class="lechk__right"></div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "levelcheck",
            meta: "",
        };
    },
    data() {
        return {
            dataList: [
                {
                    name: "全部地区",
                    allChoose: false,
                    id: "",
                    children: [
                        {
                            id: -1,
                            name: "全部",
                        },
                        {
                            id: 1,
                            name: "北京",
                        },
                        {
                            id: 2,
                            name: "上海",
                        },
                        {
                            id: 3,
                            name: "四川",
                        },
                    ],
                },
                {
                    name: "全部类型",
                    allChoose: false,
                    id: "",
                    children: [
                        {
                            id: -1,
                            name: "全部",
                        },
                        {
                            id: 26,
                            name: "民办",
                        },
                        {
                            id: 27,
                            name: "公办",
                        },
                    ],
                },
                {
                    name: "学校类型",
                    allChoose: false,
                    id: "",
                    children: [
                        {
                            id: -1,
                            name: "全部",
                        },
                        {
                            id: 1,
                            name: "985",
                        },
                        {
                            id: 2,
                            name: "211",
                        },
                        {
                            id: 3,
                            name: "本科",
                        },
                        {
                            id: 4,
                            name: "专科",
                        },
                    ],
                },
                {
                    name: "全部专业",
                    allChoose: false,
                    id: "",
                    children: [
                        {
                            id: -1,
                            name: "全部",
                        },
                        {
                            id: 1,
                            name: "计算机",
                            children: [
                                {
                                    id: 11,
                                    name: "前端",
                                    children: [
                                        {
                                            id: 111,
                                            name: "react",
                                        },
                                        {
                                            id: 112,
                                            name: "vue",
                                        },
                                        {
                                            id: 112,
                                            name: "jQuery",
                                        },
                                    ],
                                },
                                {
                                    id: 12,
                                    name: "后端",
                                    children: [
                                        {
                                            id: 121,
                                            name: "java",
                                        },
                                        {
                                            id: 122,
                                            name: "node",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: 3,
                            name: "土木工程",
                            children: [
                                {
                                    id: 31,
                                    name: "测绘",
                                    children: [
                                        {
                                            id: 311,
                                            name: "测绘工程",
                                        },
                                        {
                                            id: 312,
                                            name: "监理",
                                        },
                                    ],
                                },
                                {
                                    id: 32,
                                    name: "造价",
                                    children: [
                                        {
                                            id: 321,
                                            name: "住宅地造价",
                                        },
                                        {
                                            id: 322,
                                            name: "室内造价",
                                        },
                                        {
                                            id: 322,
                                            name: "桥梁",
                                        },
                                    ],
                                },
                                {
                                    id: 33,
                                    name: "地址",
                                    children: [
                                        {
                                            id: 331,
                                            name: "地址勘测",
                                        },
                                        {
                                            id: 332,
                                            name: "考古",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    mounted() {
        this.initData(this.dataList);
        console.log("dataList", this.dataList);
    },
    methods: {
        initData(data, rank = 0, parentId = []) {
            // 添加选中属性
            for (let i in data) {
                if (`${data[i].id}`) {
                    data[i].choose = false;
                    data[i].rank = rank;
                    data[i].parentId = parentId;
                }
                if (data[i]?.children) {
                    this.initData(data[i].children, rank + 1, [
                        ...parentId,
                        `${data[i].name}_${data[i].id}`,
                    ]);
                }
            }
        },
    },
};
</script>

<style lang="less">
.lechk {
}
</style>
