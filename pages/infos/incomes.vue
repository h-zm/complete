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
            <el-button type="success" @click="handleItem('add')"
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
                <el-table-column prop="pretax" label="税前" type="number">
                </el-table-column>
                <el-table-column prop="aftertax" label="税后" type="number">
                </el-table-column>
                <el-table-column prop="descrip" label="备注"> </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="handleItem('update', scope.row)"
                            >修改</el-button
                        >
                        <el-button
                            type="danger"
                            size="mini"
                            @click="handleItem('del', scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleDialog"
        >
            <el-form ref="form" label-width="100px">
                <el-form-item label="发资年月">
                    <el-date-picker
                        class="income__input"
                        v-model="formData.name"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        type="month"
                        placeholder="选择月"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="发资公司">
                    <el-input
                        class="income__input"
                        v-model="formData.company"
                    ></el-input>
                </el-form-item>
                <el-form-item label="税前">
                    <el-input
                        class="income__input"
                        v-model="formData.pretax"
                    ></el-input>
                </el-form-item>
                <el-form-item label="税后">
                    <el-input
                        class="income__input"
                        v-model="formData.aftertax"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                        class="income__input"
                        v-model="formData.descrip"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleDialog()">取 消</el-button>
                <el-button type="primary" @click="handleDialog('sure')"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <el-pagination
            background
            layout="total, prev, pager, next"
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
                pageSize: 18,
                pageNum: 1,
                total: 0
            },
            eventType: "add",
            formData: {
                name: "",
                id: "",
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
                .post("http://localhost:7001/salary/list", {
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
        },

        // 重置数据
        resetData() {
            for (let i in this.formData) {
                if (i === "company") {
                    this.formData[i] = "北京东方国信";
                } else {
                    this.formData[i] = "";
                }
            }
        },

        // 删除/新增等
        handleItem(type = "add", item = "") {
            console.log("点击项目", item);
            this.eventType = type;
            switch (type) {
                case "del":
                    this.$confirm(
                        "此操作将永久删除该条信息, 是否继续?",
                        "提示",
                        {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        }
                    )
                        .then(() => {
                            this.$axios
                                .get(
                                    `http://localhost:7001/salary/delete/${item.id}`
                                )
                                .then(res => {
                                    if (res.code === 1000) {
                                        this.$message.success("删除成功~");
                                        this.getList();
                                        this.dialogVisible = false;
                                    } else {
                                        this.$message.error(res.msg);
                                    }
                                });
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消删除"
                            });
                        });
                    break;
                case "update":
                    for (let i in item) {
                        this.formData[i] = item[i];
                    }
                    this.dialogVisible = true;
                    break;
                default:
                    this.resetData();
                    this.dialogVisible = true;
                    break;
            }
        },

        // 弹窗回调
        handleDialog(type = "close") {
            if (type === "sure") {
                console.log("当前表单", this.formData);
                if (this.eventType == "add") {
                    let form = Object.assign(this.formData, {
                        pretax: Number(this.formData.pretax),
                        aftertax: Number(this.formData.aftertax)
                    });
                    this.$axios
                        .post("http://localhost:7001/salary/add", form)
                        .then(res => {
                            if (res.code === 1000) {
                                this.$message.success("新建成功~");
                                this.getList();
                                this.dialogVisible = false;
                            } else {
                                this.$message.error(res.msg);
                            }
                        });
                } else {
                    let form = Object.assign(this.formData, {
                        pretax: Number(this.formData.pretax),
                        aftertax: Number(this.formData.aftertax)
                    });
                    this.$axios
                        .post("http://localhost:7001/salary/update", form)
                        .then(res => {
                            if (res.code === 1000) {
                                this.$message.success("编辑成功~");
                                this.getList("load");
                                this.dialogVisible = false;
                            } else {
                                this.$message.error(res.msg);
                            }
                        });
                }
            } else {
                this.dialogVisible = false;
            }
        }
    }
};
</script>

<style lang="less">
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

    &__input {
        width: 300px;
    }
}
</style>
