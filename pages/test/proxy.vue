<template>
    <!-- 测试proxy代理 -->
    <div>
        <div>
            <h4>proxy中pathRewirte比较</h4>
            <el-input v-model="selectData"></el-input
            ><el-button type="primary" @click="getData"
                >请求/turing/test</el-button
            >
            <el-button type="primary" @click="getData2">请求/turing</el-button>
        </div>
        <fieldset class="text-area">
            <legend>翻译区</legend>

            <div class="left-area">
                <span>在下方输入内容:</span>
                <el-input
                    class="area-style"
                    type="textarea"
                    :autosize="{ minRows: 8 }"
                    v-model="inputData"
                    clearable=""
                ></el-input>
            </div>
            <div class="right-area">
                <span>翻译结果</span>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 8 }"
                    v-model="outData"
                ></el-input>
            </div>
        </fieldset>
        <el-button @click="baidu">百度翻译</el-button>
        <el-button @click="youdao">有道翻译</el-button>
    </div>
</template>

<script>
import { baseUrl, fanyiUrl, youdaoUrl } from "../../config/index";
import nameInfo from "../../plugins/exporttest";
import status from "../../middleware/status";
import { mapState } from "vuex";
export default {
    // 配置单个页面过渡效果
    transition: "test",
    // middleware: status, // 方法1通过路径引入再调用
    middleware: "status", // 方法二直接调用
    scrollToTop: true, // 用于判定渲染页面前是否需要将当前页面滚动至顶部
    data() {
        return {
            selectData: "proxy",
            inputData: "", // 输入内容
            outData: "" // 输出内容
            // info: "" // 信息
        };
    },

    // 通过mapState快速获取信息映射到计算属性 计算属性不用再data return中声明值
    // 1
    // computed: mapState({
    //   info: state => state
    // }),

    //2
    computed: {
        // 可以计算其他类型 也可以使用mapState方法 计算属性里面声明方式都是函数
        // localComputed() {
        //   name: "和速度哈";
        // },
        nameWO() {
            return this.$store.getters.doneTodos;
        },
        ...mapState({
            info: state => state.age
        })
    },
    mounted() {
        console.log("姓名信息", this.info);
        console.log("nameWO", this.nameWO);
        // nameInfo();
        this.selectData = fanyiUrl;
        // doWhat("hzm");
        // console.log(`姓${firstName}名${lastName}`);
        // console.log(`姓${firstName}名${lastName}`);
    },
    methods: {
        setStateName() {
            this.$store.commit("setName");
        },
        getData() {
            // https://www.baidu.com/s?ie=utf-8&mod=1&isbd=1&isid=E65856A95C994648&ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${this.selectData}&fenlei=256&oq=windows%25E8%25BD%25AF%25E4%25BB%25B6path&rsv_pq=8cb75fa00010d808&rsv_t=b026VJvGg%2BmqOmRfKWC1MrUREa%2FYUJQ0AaBJ348SvFqLic7E4474HZNuOOY&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_sug3=8&rsv_sug1=5&rsv_sug7=100&rsv_btype=t&prefixsug=proxy&rsp=3&inputT=68155&rsv_sug4=68155&bs=windows%E8%BD%AF%E4%BB%B6path&rsv_sid=undefined&_ss=1&clist=&hsug=&f4s=1&csor=5&_cr1=37824
            this.$axios
                .get(
                    `/turing/test/feed/getNewInfoByKeyWord?keyWord=5G&type=recommend&pageNo=1&pageSize=20`
                )
                .then(res => {
                    if (res.data.code === 1000) {
                        console.log("请求成功");
                    } else {
                        this.$message.error("请求失败");
                    }
                });
            console.log("请求数据");
        },
        getData2() {
            this.$axios
                .get(
                    `/turing/tllbManagement/feed/getNewInfoByKeyWord?keyWord=5G&type=recommend&pageNo=1&pageSize=20`
                )
                .then(res => {
                    if (res.data.code === 1000) {
                        console.log("请求成功");
                    } else {
                        this.$message.error("请求失败");
                    }
                });
            console.log("请求数据");
        },
        baidu() {
            if (!this.inputData) {
                this.$message.warning("还没有输入内容喔");
                return;
            }
            let config = {
                "Content-Type": "multipart/form-data"
            };
            this.$axios
                .post(`/api?from=en&to=zh`, {
                    from: "en",
                    to: "zh",
                    query: this.inputData,
                    transtype: "realtime",
                    simple_means_flag: 3,
                    sign: 620615.891766,
                    token: "2ee226c7cb92d310dbd9c0f4cc6c1c65",
                    domain: "common"
                })
                .then(res => {
                    if (res.data.code === 1000) {
                        console.log("翻译结果", res.data);
                    } else {
                        this.$message.error("哪里出了问题");
                    }
                });
        },
        youdao() {
            if (!this.inputData) {
                this.$message.warning("还没有输入内容喔");
                return;
            }
            const Dated = Date.parse(new Date()); // 获取秒的时间戳
            // 获取毫秒时间戳 Date.now
            this.$axios
                .post(`/youdao?smartresult=dict&smartresult=rule`, {
                    from: "AUTO",
                    to: "AUTO",
                    i: this.inputData,
                    smartresult: "dict",
                    client: "fanyideskweb",
                    salt: Date.now(),
                    sign: "6e65cc753f107a6c3ce156fbe0fcec26",
                    lts: Date.now(),
                    bv: "4f7ca50d9eda878f3f40fb696cce4d6d",
                    doctype: "json",
                    version: 2.1,
                    keyfrom: "fanyi.web",
                    action: "FY_BY_CLICKBUTTION"
                })
                .then(res => {
                    if (res.data.code === 1000) {
                        console.log("翻译结果", res.data);
                    } else {
                        this.$message.error("哪里出了问题");
                    }
                });
        }
    }
};
</script>

<style lang="less">
.test-enter-active,
.test-leave {
    transition: opacity 0.5s;
}
.test-enter,
.test-leave-active {
    opacity: 0.5;
}
.el-input {
    width: fit-content;
}
.text-area {
    margin: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-area,
    .right-area {
        width: 49%;
    }
}
</style>
