<template>
    <div class="footer">
        <!-- <Date /> -->
        <em>There is only some support available，now</em>
    </div>
</template>

<script>
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
    mounted() {}
};
</script>

<style lang="less" scoped>
@import "~assets/less/index";
.footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    .ellipsis(1);
}
</style>
