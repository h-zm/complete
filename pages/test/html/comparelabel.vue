<template>
    <!-- 标签比较 -->
    <div class="label">
        不同标签展示字符

        <contents>
            <colors> em </colors>：<em>{{ showStr }}</em>
        </contents>

        <contents>
            <colors> strong </colors>：<strong>{{ showStr }}</strong>
        </contents>
        <contents>
            <colors> dfn </colors>：<dfn>{{ showStr }}</dfn>
        </contents>
        <contents>
            <colors> code </colors>：<code>{{ showStr }}</code>
        </contents>
        <contents>
            <colors> var </colors>：<var>{{ showStr }}</var>
        </contents>
        <contents>
            <colors> tt </colors>：<tt>{{ showStr }}</tt>
        </contents>
        <contents>
            <colors> i </colors>：<i>{{ showStr }}</i>
        </contents>
        <contents>
            <colors> samp </colors>：<samp>{{ showStr }}</samp>
        </contents>
        <contents>
            <colors> cite </colors>：<cite>{{ showStr }}</cite>
        </contents>
        <contents>
            <colors> sub </colors>：<sub>{{ showStr }}</sub>
        </contents>
        <contents>
            <colors> strike </colors>：<strike>{{ showStr }}</strike>
        </contents>
        <contents>
            <colors> small </colors>：<small>{{ showStr }}</small>
        </contents>
        <contents>
            <colors> ins </colors>：<ins>{{ showStr }}</ins>
        </contents>
    </div>
</template>

<script>
import Colors from "../../../components/Font/Colors.vue";
export default {
    components: { Colors },
    head() {
        return {};
    },
    data() {
        return {
            showStr: "complete网页",
            labelList: [{}]
        };
    },
    mounted() {},
    methods: {}
};
</script>

<style lang="less">
.label {
}
</style>
