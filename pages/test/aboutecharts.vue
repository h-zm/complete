<template>
    <!-- 新建文件的模板 -->
    <div class="chart">
        <div id="chart_1" class="chart__main"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    head() {
        return {
            title: "测试关于this指向",
            meta: "",
            script: []
        };
    },
    data() {
        return {
            data: [150, 230, 224, 218, 135, 147, 260]
        };
    },
    mounted() {
        setTimeout(() => {
            this.chartInit("chart_1");
        }, 0);
    },
    methods: {
        chartInit(id) {
            var chartDom = document.getElementById(id);
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: this.data,
                        type: "line"
                    }
                ]
            };

            option && myChart.setOption(option);

            setTimeout(() => {
                console.log("234", myChart.getOption());
                console.log("234", myChart.getOption().yAxis[0].max);
                this.hanldeYaxis();
            }, 100);
        },

        // 计算Y值合理范围
        hanldeYaxis(maxSplit = 10) {
            let split = 5;
            let Min = Math.min(...this.data);
            // let min = Math.min.apply(null, this.data);
            let Max = Math.max(...this.data);
            let reduceGap = Math.abs(Min - Max);
            console.log("差值", reduceGap);
            let YMax = 0,
                YMin = 0;
            let MaxLength = String(Max).split("")?.length || 0;
            let MinLength = String(Min).split("")?.length || 0;
            // 获得最大值
            YMax =
                Math.ceil(Max / Math.pow(10, MaxLength - 1)) *
                Math.pow(10, MaxLength - 1);
            YMin =
                Math.floor(Min / Math.pow(10, MinLength - 1)) *
                Math.pow(10, MinLength - 1);
            console.log("YMax", YMax);
            console.log("YMin", YMin);
        }
    }
};
</script>

<style lang="less">
.chart {
    &__main {
        width: 600px;
        height: 400px;
    }
}
</style>
