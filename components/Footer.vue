<template>
    <div class="footer" id="complete-footer"></div>
</template>

<script>
import { init } from "echarts";
import Date from "./Date";
export default {
    components: {
        Date
    },
    provide: {
        name: "huang zm",
        doOne: function() {
            console.log("--provide中使用函数--");
        }
    },
    data() {
        return {
            footerText: "There is only some support available，now",
            tagList: [
                "code",
                "font",
                "strong",
                "samp",
                "em",
                "dfn",
                "tt",
                "i",
                "cite",
                "sub",
                "sup",
                "strike",
                "ins",
                "small"
            ],
            tagIndex: 0
        };
    },
    methods: {
        init() {
            this.tagIndex = Math.floor(Math.random() * this.tagList.length);
            const footerTag = document.createElement(
                this.tagList[this.tagIndex]
            );
            footerTag.innerHTML = this.footerText;
            footerTag.title = `by ${this.tagList[this.tagIndex]}`;
            document.getElementById("complete-footer").appendChild(footerTag);
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="less" scoped>
@import "~assets/less/index";
.footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 0 12px 2px #f2f2f2;
    font-size: small;
    text-align: center;
    .ellipsis(1);
}
</style>
