<template>
    <div class="container">
        <div>
            <logo />
            <h1 class="title">
                complete
            </h1>
            <h2 class="subtitle">
                <!-- &#39; -->
                -- start --
                <!-- &#39; -->
            </h2>
            <div class="links">
                <a
                    href="https://nuxtjs.org/"
                    target="_blank"
                    class="button--green"
                >
                    Documentation
                </a>
                <a
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                    class="button--grey"
                >
                    GitHub
                </a>
                <el-popover placement="bottom-start" trigger="hover">
                    <div class="menu-area">
                        <div
                            class="menu-area_item"
                            :class="{
                                'menu-area_noList':
                                    menu.list && menu.list.length
                            }"
                            :style="{
                                'padding-left': 22 * (menu.rank - 1) + 'px'
                            }"
                            v-for="(menu, index) in menuTree"
                            :key="index"
                            @click="clickMenu(menu)"
                        >
                            <i
                                v-if="menu.list && menu.list.length"
                                class="el-icon-arrow-down"
                            ></i>
                            <span>{{ menu.name }}</span>
                        </div>
                    </div>
                    <div class="button--grey" slot="reference">
                        菜单
                    </div>
                </el-popover>
            </div>
        </div>

        <!-- <Loading></Loading> -->
    </div>
</template>

<script>
// import path from "path";
import Logo from "~/components/Logo.vue";
import Loading from "~/components/Loading"; // 加载组件
export default {
    head() {
        return {
            title: "首页"
        };
    },
    components: {
        Logo,
        Loading
    },
    data() {
        return {
            context: "", // 上下文对象
            rootInfo: "", // 根实例
            menuRoute: [], // 目录数据
            menuTree: [] // 数组件
        };
    },
    asyncData({ $axios, query, param, store }) {
        return {};
    },
    mounted() {
        this.initRoute(); // 处理目录数据
        // console.log("this实例:%o", this);
        // inject $ 挂载查询
        // console.log(this.$info.searchInfo("name"), "信息");
    },
    methods: {
        /**
         *
         */
        doSome(type) {},

        clickMenu(item) {
            // console.log(item, "点击的路径信息");
            if (item.list && item.list.length) {
                console.log("点击父级不跳转");
                return;
            }
            this.$router.push(item.path);
        },

        async initRoute() {
            // 通过this实例获取整个项目可跳转的目录信息
            this.rootInfo = this.$router.options.routes;
            let tempList = Array.from(this.rootInfo); // .slice(0, 3)
            tempList.filter(root => {
                let chilrenList = root.name.split("-");
                root.levelNumber = chilrenList.length; // 根据-含有个数确定层级 作为校正的辅助
                root.levelInfo = root.name; // 新复制一个路径信息作为遍历
                this._resetFunc(root, root.index, {}); // 遍历生成想要的路径数据结构
            });
            // 打印最后结果
            setTimeout(() => {
                // console.log(this.menuRoute, "处理结果");

                // 将结果转化成无限树组件模式
                // 无限只是视觉效果
                this.menuTree = [];
                this._initTree(this.menuRoute);
                // console.log(this.menuTree, "树结构");
            });
        },

        // 单个处理
        async _resetFunc(route, index = 0, parentInfo = {}) {
            // console.log(route, index, parentInfo, "传进来的route信息");
            if (route?.levelInfo) {
                // console.log("一级以上层级传进来的信息:%o", route);
                // 根据 - 个数判断目录等级 1个就是1级目录 俩个是二级目录 以此类推
                let childrenList = route.levelInfo.split("-");
                for (let i = 0; i < childrenList.length; i++) {
                    // 设置基本信息
                    let currentInfo = {
                        name: childrenList[i],
                        rank: i + 1
                    };

                    // 存在多个-的需要额外设置indexName parentId 参数
                    if (i > 0) {
                        currentInfo.parentId = childrenList[i - 1];
                        currentInfo.indexName = childrenList
                            .slice(0, i + 1)
                            .join("-");
                    }

                    // 最后一项赋予路径信息
                    if (i == childrenList.length - 1) {
                        currentInfo.path = route.path;
                    }

                    this._resetFunc(currentInfo, i + 1, {});
                }
            } else {
                // 没有判断信息的检索 menuRoute 是否含有 有的就找到对应数据推入 没有的就先生成
                // 一级路径没有parentId信息 通过本省name判断
                // 二级及以下通过parentId
                // 所以searchValue 对应的是 route.parentId || route.name
                let searchResults = this.getPlaceOfMenu(
                    this.menuRoute,
                    0,
                    route.indexName || route.name
                );

                // console.log("搜寻值", route.indexName || route.name);

                // 没有查到的就推入首级信息
                if (!searchResults) {
                    // 包含路径信息的是一级路径 需要特殊处理
                    if (route?.path) {
                        this.menuRoute.push({
                            rank: 1,
                            name: route.name,
                            list: [
                                {
                                    id: route.name,
                                    path: route.path,
                                    name: route.name,
                                    rank: index + 1
                                }
                            ]
                        });
                    } else {
                        this.menuRoute.push({
                            rank: 1,
                            name: route.name,
                            list: []
                        });
                    }
                } else if (route?.indexName) {
                    // 判断 是否parentId 进行遍历
                    this.setPlaceOfMenu(this.menuRoute, 0, route);
                }
            }
        },

        // 遍历查找信息
        getPlaceOfMenu(
            sourceList = [],
            index = 0,
            searchValue = "",
            searchKey = "name",
            result = false
        ) {
            // filter 遇到 return 不能放出循环 ，所以使用的是for
            for (let i = 0; i < sourceList.length; i++) {
                if (
                    sourceList[i][searchKey] == searchValue ||
                    searchValue.includes(sourceList[i][searchKey])
                ) {
                    result = true;
                }
            }

            return result;
        },

        // 按照上述方法 实现一个找到list并推入的方法
        setPlaceOfMenu(
            sourceList = [],
            index = 0,
            routeObj = "",
            searchKey = "name"
        ) {
            sourceList.filter((source, sort) => {
                // 查找是否有能对等的信息
                if (source[searchKey] == routeObj.parentId) {
                    // console.log(source, routeObj, "找到父级");
                    // 通过path 确定是否是最后一级 是的直接推入 不是的推入合集
                    // 供下条trouteObj使用
                    if (routeObj?.path) {
                        source.list.push({
                            ...routeObj
                        });
                    } else {
                        source.list.push({
                            ...routeObj,
                            list: []
                        });
                    }
                } else if (routeObj.indexName.includes(source[searchKey])) {
                    // 其次通过 indexName 检索 查看是否是上下级关系
                    // 是的话继续遍历
                    this.setPlaceOfMenu(
                        source.list,
                        index + 1,
                        routeObj,
                        searchKey
                    );
                }
            });
        },

        // 将 menuRoute 转化成数组件
        _initTree(list = [], parent = {}) {
            list.forEach(item => {
                let infoItem = item;
                infoItem.show = false;
                if (infoItem.rank == 1) {
                    // 展示全部的
                    infoItem.showAll = false;
                }
                this.menuTree.push({
                    ...infoItem
                });
                if (item?.list?.length) {
                    this._initTree(item.list, item);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
/* lang="less" scoped
  使用以上属性需要引入依赖
*/
@import "~assets/less/index.less";
.container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
/*
.button--grey {
} */

.menu-area {
    font-size: 16px;
    &_item {
        line-height: 32px;
        .pointer();
    }
    &_item:hover {
        .hover-style(#00c58e, #fff);
    }

    &_noList {
        color: #35495e !important;
    }
}
</style>
