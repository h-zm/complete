<template>
    <!-- 新建文件的模板 -->
    <div class="data">
        <NumberAni textAlign="flex-end" :numData="importTotal"></NumberAni>
        <NumberAni textAlign="flex-end" :numData="importMine"></NumberAni>
        <NumberAni textAlign="flex-end" :numData="exportTotal"></NumberAni>
        <NumberAni textAlign="flex-end" :numData="exportMine"></NumberAni>
        <NumberAni textAlign="flex-end" :numData="deliverTotal"></NumberAni>
        <NumberAni textAlign="flex-end" :numData="keepTotal"></NumberAni>
    </div>
</template>

<script>
import NumberAni from "~/components/NumberAni.vue";
export default {
    head() {},
    components: {
        NumberAni
    },
    data() {
        return {
            // 工资卡数据
            wageList: [
                {
                    // 年份
                    year: 2019,
                    // 收入
                    import: 18435.08,
                    // 支出
                    export: 18382.1
                },
                {
                    year: 2020,
                    import: 86697.54,
                    export: 85508.55
                },
                {
                    year: 2021,
                    import: 176591.64,
                    export: 135051.44
                },
                {
                    year: 2022,
                    import: 139513.15,
                    export: 120063.74
                }
            ],
            // 转交数据
            deliver: [
                {
                    // 转交人
                    name: "任",
                    // 转交金额
                    numbers: [10000]
                },
                {
                    name: "黄",
                    numbers: [10000, 3480]
                },
                {
                    name: "苏",
                    numbers: [13500]
                },
                {
                    name: "贾",
                    numbers: [7200]
                }
            ],
            // 支出总额
            exportTotal: 0,
            // 收入总额
            importTotal: 0,
            // 支出除开转交
            exportMine: 0,
            // 收入除开转交
            importMine: 0,
            // 转交总额
            deliverTotal: 0,
            // 余下
            keepTotal: 0
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        // JS 俩个小数位相加会出现多位小数
        decimalFunc(a, b, type = "add", times = 12) {
            let result = "";

            // 统一扩大 10 的 times 次方
            if (type == "add") {
                // console.log(a, b);
                result =
                    (parseInt(10 ** times * a) + parseInt(10 ** times * b)) /
                    10 ** times;

                // console.log("add", result);
            } else {
                result =
                    (parseInt(10 ** times * a) - parseInt(10 ** times * b)) /
                    10 ** times;

                // console.log("reduce", result);
            }

            return result;
        },

        /**
         * data: 数据源,
         * key: 取值字段名
         * initialValue: 初始的计算值
         */
        reducePakage(data, key = "", initialValue = 0) {
            let result = "";
            if (Array.isArray(data)) {
                result = data.reduce((pre, cur, curIndex, array) => {
                    if (key) {
                        // console.log("key", typeof pre, pre);
                        // 存在取值字段的注意
                        // return Number(pre) + Number(cur[key]);
                        return this.decimalFunc(pre, cur[key]);
                    } else {
                        // console.log("nokey", typeof pre, pre);
                        // return Number(pre) + Number(cur);
                        return this.decimalFunc(pre, cur);
                    }
                }, initialValue);
            } else {
                result = data;
            }

            // console.log("result", result);

            return result;
        },

        // 计算初始值
        initData() {
            // 计算每个的值
            this.deliver = this.deliver.map(element => {
                return {
                    ...element,
                    total: this.reducePakage(element.numbers)
                };
            });

            // console.log("deliver", this.deliver);

            this.deliverTotal = this.reducePakage(this.deliver, "total");

            // console.log("deliverTotal", this.deliverTotal);

            this.importTotal = this.reducePakage(this.wageList, "import");

            this.importMine = this.decimalFunc(
                this.importTotal,
                this.deliverTotal,
                "reduce"
            );

            // console.log("importTotal", this.importTotal);

            this.exportTotal = this.reducePakage(this.wageList, "export");

            this.exportMine = this.decimalFunc(
                this.exportTotal,
                this.deliverTotal,
                "reduce"
            );

            // console.log("exportTotal", this.exportTotal);

            this.keepTotal = this.decimalFunc(
                this.importTotal,
                this.exportTotal,
                "reduce"
            );

            // console.log("keepTotal", this.keepTotal);
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.data {
}
</style>
