<template>
    <!-- 新建文件的模板 -->
    <div class="income">
        <div class="income__head">
            <div class="income__row">
                <div class="income__row_label">年份:</div>
                <el-date-picker
                    class="income__row_content"
                    v-model="query.year"
                    type="year"
                    placeholder="选择年"
                    @change="changeYear"
                >
                </el-date-picker>
            </div>
            <el-button type="primary" @click="getList()"
                >查 询</el-button
            >
        </div>
        <div class="income__main">
            <el-table :data="dataList" style="width: 100%">
                <el-table-column prop="id" label="序号"> </el-table-column>
                <el-table-column prop="name" label="工资日期">
                </el-table-column>
                <el-table-column prop="company" label="发资公司">
                </el-table-column>
                <el-table-column prop="pretax" label="税前"> </el-table-column>
                <el-table-column prop="aftertax" label="税后">
                </el-table-column>
                <el-table-column prop="备注" label="descrip"> </el-table-column>
            </el-table>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="pagenationInfo.total"
            :page-size="pagenationInfo.pageSize"
            :current-page="pagenationInfo.pageNum"
            @current-change="handleChange"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: [],
            pagenationInfo: {
                pageSize: 10,
                pageNum: 1,
                total: 0
            },
            query: {
                year: ""
            }
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList(type = "reset") {
            if (type === 'reset') {
                this.pagenationInfo.pageNum = 1
            }
            this.$axios
                .post("http://localhost:5678/getSalarys", {
                    year: this.query.year ? new Date(this.query.year).getFullYear() : '',
                    pageNum: this.pagenationInfo.pageNum,
                    pageSize: this.pagenationInfo.pageSize
                })
                .then(res => {
                    if (res.code === 1000) {
                        this.dataList = res.data.list;
                        this.pagenationInfo.total = res.data.total
                    } else {
                        this.dataList = [];
                        this.pagenationInfo.total = 0
                    }
                });
        },

        // 年份筛选器变化
        changeYear(data) {
            console.log('所选年份',data)
        },

        // 页码变化
        handleChange(item) {
            this.pagenationInfo.pageNum = item;
            this.getList('load')
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.income {
    &__head {
        margin: 0 0 10px 0;
        .flex(center, flex-end);
    }

    &__row {
        margin: 0 20px 0 0;
        &_label {
            margin: 0 8px 0 0;
            padding: 2px;
            min-width: 50px;
            width: fit-content;
        }
        .flex(center);
    }

    &__main {
        margin: 0 0 12px 0;
    }
}
</style>
