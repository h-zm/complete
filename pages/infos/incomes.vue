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
            <el-button type="primary" @click="handleItem('add')"
                >新 增</el-button
            >
            <el-button type="primary" @click="getList()">查 询</el-button>
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
                <el-table-column prop="操作" label="descrip">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            @click="handleItem('update', scope)"
                            >修改</el-button
                        >
                        <el-button
                            type="danger"
                            @click="handleItem('del', scope)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="发资年月">
                    <el-date-picker
                        v-model="formData.name"
                        type="month"
                        placeholder="选择月"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="发资公司">
                    <el-input v-model="formData.company"></el-input>
                </el-form-item>
                <el-form-item label="税前">
                    <el-input v-model="formData.pretax"></el-input>
                </el-form-item>
                <el-form-item label="税后">
                    <el-input v-model="formData.aftertax"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="formData.descrip"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
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
            formData: {
                name: "",
                company: "北京东方国信",
                pretax: "",
                aftertax: "",
                descrip: ""
            },
            dialogVisible: false,
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
            if (type === "reset") {
                this.pagenationInfo.pageNum = 1;
            }
            this.$axios
                .post("http://localhost:5678/getSalarys", {
                    year: this.query.year
                        ? new Date(this.query.year).getFullYear()
                        : "",
                    pageNum: this.pagenationInfo.pageNum,
                    pageSize: this.pagenationInfo.pageSize
                })
                .then(res => {
                    if (res.code === 1000) {
                        this.dataList = res.data.list;
                        this.pagenationInfo.total = res.data.total;
                    } else {
                        this.dataList = [];
                        this.pagenationInfo.total = 0;
                    }
                });
        },

        // 年份筛选器变化
        changeYear(data) {
            console.log("所选年份", data);
        },

        // 页码变化
        handleChange(item) {
            this.pagenationInfo.pageNum = item;
            this.getList("load");
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
