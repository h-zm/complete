<template>
    <div class="container">
        <div>
            <logo />
            <h1 class="title">
                complete
            </h1>
            <h2 class="subtitle">
                &#39;芜湖~&#39;
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
    components: {
        Logo,
        Loading
    },
    // asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

    // },
    data() {
        return {
            context: "", // 上下文对象
            rootInfo: "", // 根实例
            menuRoute: [] // 目录数据
        };
    },
    asyncData({ $axios, query, param, store }) {
        // console.log("上下文对象:%o", ctx);
        return {
            // rootInfo: router
        };
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

        async initRoute() {
            // 获取整个项目目录
            this.rootInfo = this.$router.options.routes;
            let tempList = Array.from(this.rootInfo); // .slice(0, 3)
            tempList.filter(root => {
                let chilrenList = root.name.split("-");
                root.index = chilrenList.length; // 根据-含有个数确定层级
                root.indexInfo = root.name;
                this._resetFunc(root, root.index, {});
            });
            console.log(this.menuRoute, "处理结果");
        },

        async _resetFunc(route, index = 0, parentInfo = {}) {
            // 根据 - 个数判断目录等级 1个就是1级目录 俩个是二级目录 以此类推
            console.log(route, index, parentInfo, "传进来的route信息");

            // 第一层级
            if (index == 1) {
                // 有子级的
                console.log(route, "第一层级的数据");
                let findIndex = this.menuRoute.findIndex(
                    root => root.name == route.name
                );
                // 检验为不存在再推入数组中
                if (route?.path && findIndex == -1) {
                    this.menuRoute.push({
                        index: index,
                        name: route.name,
                        type: "document",
                        list: [
                            {
                                id: route.name,
                                path: route.path,
                                index: index + 1
                            }
                        ]
                    });
                } else if (findIndex == -1) {
                    console.log(this.menuRoute, route.parentId, "菜单路由");
                    this.menuRoute.push({
                        index: index,
                        name: route.name,
                        type: "folder",
                        list: []
                    });
                }
            } else if (route?.parentId) {
                // 存在父级的
                console.log(route, "存在父级信息的详情");
                let findIndex = this.menuRoute.findIndex(
                    root => root.name == route.parentId
                );
                if (findIndex > -1) {
                    this.menuRoute[findIndex].list.push({
                        ...route
                    });
                }
            } else if (route?.indexInfo) {
                // 其他层级
                console.log("一级以上层级传进来的信息:%o", route);
                let childrenList = route.indexInfo.split("-");
                for (let i = 0; i < childrenList.length; i++) {
                    console.log(childrenList[i], "遍历");
                    let currentInfo = {
                        name: childrenList[i],
                        index: i + 1
                    };
                    if (i > 0) {
                        currentInfo.parentId = childrenList[i - 1];
                        currentInfo.indexName = childrenList
                            .slice(0, i + 1)
                            .join("-");
                    }

                    if (i == childrenList.length - 1) {
                        currentInfo.path = route.path;
                    }

                    this._resetFunc(currentInfo, i + 1, {});
                }

                // let findIndex = this.menuRoute.findIndex(
                //     root => root.id == route.name
                // );
            }

            // 是二三级目录的
            // if (chilrenList.length > 1) {
            //     for (let i = 0; i < chilrenList.length; i++) {
            //         let currentRoute,
            //             parentRoute = {};
            //         if (i > 0) {
            //             // currentRoute = route;
            //             parentRoute = {
            //                 index: index,
            //                 id: chilrenList.slice(0, i).join("-")
            //             };
            //         }
            //         currentRoute = {
            //             name: chilrenList[i]
            //         };
            //         // console.log(parentRoute, "currentRoute整理");
            //         this._resetFunc(currentRoute, i, parentRoute);
            //     }
            // }
            // //  else if (chilrenList.length == 1) {
            // //     this.menuRoute.push({
            // //         index: index,
            // //         ...route,
            // //         list: []
            // //     });
            // // }

            // let findIndex = this.menuRoute.findIndex(
            //     root => root.name == parentInfo.id
            // );

            // if (findIndex > -1) {
            //     this.menuRoute[findIndex].list.push({
            //         ...route,
            //         type: 2,
            //         index: index
            //     });
            // } else if (!chilrenList.length) {
            //     this.menuRoute.push({
            //         index: 0,
            //         type: 1,
            //         name: route.name,
            //         list: [{ name: route.name, path: route.path, index: index }]
            //     });
            // }
        }
    }
};
</script>

<style>
/* lang="less" scoped
  使用以上属性需要引入依赖
*/
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
</style>
