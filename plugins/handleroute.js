// 处理 this.$router.options.routes 数据
// 将其转成路由分级列表 或者 转化成无限树结果供使用
let menuList = []; // 路由分级列表 exportType 1
let menuTree = []; // 无限树结构结果供使用 exportType 2
export const initRoute = (options = {}, exportType = 1) => {
    return new Promise((resolve, reject) => {
        // 执行前重置数据值
        menuList = [];
        menuTree = [];

        if (!options?.routes) {
            console.log("当前数据不支持路由处理,请检查您的数据");
            reject(menuTree); // 输出空数组
        }

        let tempList = Array.from(options.routes); // .slice(0, 3)
        tempList.filter(temp => {
            let chilrenList = temp.name.split("-");
            temp.levelNumber = chilrenList.length; // 根据-含有个数确定层级 作为校正的辅助
            temp.levelInfo = temp.name; // 新复制一个路径信息作为遍历
            inversionList(temp, temp.index, {}); // 遍历生成想要的路径数据结构
        });

        // 为 1 时 输出路由列表
        if (exportType == 1) {
            resolve(menuList);
        } else if (exportType == 2) {
            // 为 2 时 继续出来输出路由树结构
            inversionTree(menuList);
            resolve(menuTree);
        }
    });
};

function inversionList(route, index = 0, parentInfo = {}) {
    if (route?.levelInfo) {
        // 根据 - 个数判断进行依次遍历
        let childrenList = route.levelInfo.split("-");
        for (let i = 0; i < childrenList.length; i++) {
            // 设置基本信息
            let currentInfo = {
                name: childrenList[i],
                rank: i + 1
            };

            // 存在多个-的需要额外设置indexName parentId 参数
            if (i > 0) {
                currentInfo.parentId = childrenList[i - 1]; // 父Id
                currentInfo.indexName = childrenList.slice(0, i).join("-"); // 从开始到本级前的路径
                currentInfo.elders = [];
            }

            // 最后一项赋予路径信息
            if (i == childrenList.length - 1) {
                currentInfo.path = route.path;
            }

            inversionList(currentInfo, i + 1, {});
        }
    } else {
        // 没有判断信息的检索 menuList 是否含有 有的就找到对应数据推入 没有的就先生成
        // 一级路径没有 parentId 信息 通过自身 name 判断
        // 二级及以下通过 parentId
        // 所以 searchValue 对应的是 route.parentId || route.name
        let searchResults = getPlaceOfMenu(
            menuList,
            0,
            route.indexName || route.name
        );

        // 下面的判断应该可以和setPlaceOfMenu 方法再精简些 后续更新

        // 没有查到的就推入首级信息
        if (!searchResults) {
            // 包含路径信息的是一级路径 需要特殊处理
            if (route?.path) {
                menuList.push({
                    rank: 1,
                    name: route.name,
                    list: [
                        {
                            id: route.name,
                            path: route.path,
                            name: route.name,
                            parentId: route.name,
                            rank: 2
                        }
                    ]
                });
            } else {
                menuList.push({
                    rank: 1,
                    name: route.name,
                    list: []
                });
            }
        } else if (route?.indexName) {
            // 判断 是否parentId 进行遍历
            setPlaceOfMenu(menuList, 0, route);
        }
    }
}

// 遍历查找信息
function getPlaceOfMenu(
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
}

// 按照上述方法 实现一个找到list并推入的方法
function setPlaceOfMenu(
    sourceList = [],
    index = 0,
    routeObj = "",
    searchKey = "name"
) {
    sourceList.filter((source, sort) => {
        // 查找是否有能对等的信息
        if (source[searchKey] == routeObj.parentId) {
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
            setPlaceOfMenu(source.list, index + 1, routeObj, searchKey);
        }
    });
}

// 将 menuList 转化成数组件
function inversionTree(list = [], parent = {}) {
    list.forEach(item => {
        // 新复制一个变量进行操作
        let infoItem = item;
        // 为第一层级的路由添加一个该级的总开关
        if (infoItem.rank == 1) {
            infoItem.showAll = false;
        } else {
            // 为非1级添加show开关
            infoItem.show = false;
        }
        // 有子级的添加子级开关
        if (infoItem?.list?.length) {
            infoItem.showChild = false;
        }
        // 将赋值结果输入menuTree中
        menuTree.push({
            ...infoItem
        });
        // 有子级的继续遍历子级
        if (infoItem?.list?.length) {
            inversionTree(item.list, item);
        }
    });
}
