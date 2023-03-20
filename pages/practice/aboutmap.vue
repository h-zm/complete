<template>
    <!-- 新建文件的模板 -->
    <div class="about"></div>
</template>

<script>
export default {
    head() {
        return {
            title: "测试关于Map",
            meta: "",
            script: []
        };
    },
    data() {
        return {
            list: [
                { id: 1, name: "电脑", pid: 0 },
                { id: 2, name: "mac", pid: 1 },
                { id: 8, name: "win 笔记本", pid: 7 },
                { id: 3, name: "mac 笔记本", pid: 2 },
                { id: 4, name: "mac 台式机", pid: 2 },
                { id: 5, name: "mac air", pid: 3 },
                { id: 6, name: "mac pro", pid: 3 },
                { id: 7, name: "win", pid: 1 }
            ],
            result: []
        };
    },
    watch: {
        // 监听result指向是不是一直更新
        result: {
            handler(newV) {
                console.log("新值", newV);
            },
            deep: true
        }
    },
    mounted() {
        this._initData();
    },
    methods: {
        _initData() {
            const map = new Map();

            // 生成一个id作为key的原始数组
            this.list.forEach(item => {
                map.set(item.id, { ...item, children: [] });
            });

            console.log("map", map);

            // 循环map数组
            map.forEach(item => {
                // 有找到父级的存入子集
                if (map.has(item.pid)) {
                    const parentNode = map.get(item.pid);
                    parentNode.children.push(item);
                } else {
                    // 没有的存入结果中
                    console.log("item.id", item.name);
                    this.result.push(map.get(item.id));
                }
                console.log("item.id", item.name);
            });

            console.log("result", this.result);
        }
    }
};
</script>

<style lang="less">
@import "~assets/less/index.less";
.about {
}
</style>
