<template>
    <div class="header">
        <el-popover
            v-model="showMenu"
            placement="bottom-start"
            trigger="hover"
            :close-delay="1000"
        >
            <div class="menu-area">
                <div
                    class="menu-area_item"
                    :class="{
                        'menu-area_havechild': menu.list && menu.list.length,
                        'menu-area_hide': menu.show == false
                    }"
                    :style="{
                        'padding-left': 22 * (menu.rank - 1) + 'px'
                    }"
                    v-for="(menu, index) in menuTree"
                    :key="index"
                    @click="clickMenu(menu)"
                    @mouseenter="bindMouseEnter(menu)"
                >
                    <i
                        v-if="menu.list && menu.list.length"
                        class="el-icon-arrow-down"
                    ></i>
                    <span>{{ menu.name }}</span>
                </div>
            </div>

            <div class="header-menu" slot="reference">
                <i class="el-icon-menu" slot="reference" title="菜单"></i>
                menu
            </div>
        </el-popover>

        <var>header of complete</var>
        <i class="el-icon-s-home" @click="backHome()" title="到首页"></i>
        <!--
        <em>React</em>
        <strong>React</strong>
        <dfn>React</dfn>
        <code>
          React <var>react</var>
        </code>
        <tt>React Org</tt>
        <i>React</i>
        <samp>React</samp>
        <cite>React</cite>
        <p>
          love <sub>React</sub> <sup>Org</sup>
          <strike>今天会不一样</strike>
          <small>哪里不一样</small>
          <ins>都不一样</ins>
        </p>
     -->
    </div>
</template>

<script>
import { initRoute } from "~/plugins/handleroute";
export default {
    data() {
        return {
            showMenu: false, // 菜单展示控件
            menuTree: [] // 处理好的路由树
        };
    },
    mounted() {
        this.getRoutes();
    },
    methods: {
        // 返回首页
        backHome() {
            location.href = "/";
        },

        // 获取 routes 数据
        async getRoutes() {
            // 通过this实例获取整个项目可跳转的目录信息
            let options = this.$router.options;
            this.menuTree = await initRoute(options, 2);
        },

        // 路由点击事件
        clickMenu(item) {
            // console.log(item, "点击的路径信息");
            if (item.list && item.list.length) {
                console.log("点击父级不跳转");
                return;
            }
            this.showMenu = false;
            this.$router.push(item.path);
        },

        // 鼠标移入
        bindMouseEnter(menu) {
            this.menuTree.forEach(treeItem => {
                // 子级 父id 等于鼠标移入项的 显示
                // 鼠标移入项目包含遍历数据indexName的也显示
                if (
                    treeItem.parentId == menu.name ||
                    (treeItem.indexName &&
                        menu.indexName &&
                        menu.indexName.includes(treeItem.indexName))
                ) {
                    treeItem.show = true;
                } else if (treeItem.rank > 1) {
                    // 其余除了一级菜单都隐藏
                    treeItem.show = false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "~assets/less/index";
.header {
    width: 100%;
    height: 80px;
    // line-height: 80px;
    border-bottom: 1px solid #f4f4f4;
    border-radius: 0 0 4px 4px;
    background: #fff;
    box-shadow: 0 0 12px 2px #f2f2f2;
    position: fixed;
    top: 0;
    left: 0;
    z-index: @zIndex;
    text-align: center;
    .flex(center, center);

    .el-icon-s-home {
        .pointer();
    }

    &-menu {
        position: absolute;
        left: 10px;
        margin: auto;
        top: 50%;
        transform: translateY(-50%);
        z-index: inherit;
        background: #fff;
        padding: 0 30px;
        .pointer();
    }

    .el-icon-menu {
        transform: scale(1.4);
    }

    .el-icon-s-home {
        padding: 0 2px;
    }
}

.menu-area {
    font-size: 16px;
    &_item {
        padding: 6px 0;
        transition: 0.3s padding ease-in-out;
        .pointer();
    }
    &_item:hover {
        .hover-style(#00c58e, #fff);
    }

    &_havechild {
        color: #35495e !important;
    }

    &_hide {
        padding: 0;
        margin: 0;
        height: 0;
        overflow: hidden;
    }
}
</style>
