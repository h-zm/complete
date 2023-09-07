<template>
    <!-- 新建文件的模板 -->
    <div class="tagview">
        <div
            class="tagview__item"
            v-for="(item, index) in visitedViews"
            :key="item.path"
            @click="changeView(item)"
        >
            {{ item.name }}
        </div>
    </div>
</template>

<script>
import { mapState, state } from "vuex";
export default {
    head() {
        return {};
    },
    data() {
        return {
            visitedPage: []
        };
    },
    computed: {
        visitedViews() {
            return this.$store.state?.tagviews?.visitedViews || [];
        }
    },
    watch: {
        $route: {
            handler(newV) {
                this.handleRoute(newV);
            },
            immediate: true
        }
    },
    mounted() {},
    methods: {
        handleRoute(route) {
            this.$store.dispatch("tagviews/addView", route);
        },
        changeView(item) {
            // location.href = item.path;
            this.$router.push(item.path);
        }
    }
};
</script>

<style lang="less">
.tagview {
    position: fixed;
    bottom: 60px;
    left: 0;
    z-index: 2000;
    width: 100%;
    height: 60px;
    background: #fff;
    border: 1px solid #f6f6f6;
    color: #28292a;
    .flex(center);

    &__item {
        padding: 2px;
        width: fit-content;
        border: 1px solid #28292a;
        border-radius: 2px;
        cursor: pointer;
    }

    &__item:not(:last-child) {
        margin: 0 10px 0 0;
    }
}
</style>
