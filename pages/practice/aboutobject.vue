<template>
    <!-- 新建文件的模板 -->
    <div class="about">
        <contents>
            对象 curObject
        </contents>
        <div>只读属性:</div>
        <contents> </contents>
        <div>可写属性:</div>
        <contents> </contents>
        <div>Object.keys获取自定义属性:</div>
        <contents>
            {{ Object.keys(curObject) }}
        </contents>
        <div>
            Reflect.getPrototypeOf获取原始属性:
        </div>
        <contents>
            {{ handlePrototype() }}
        </contents>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "测试关于this指向",
            meta: "",
            script: []
        };
    },
    data() {
        return {
            curObject: {}
        };
    },
    mounted() {
        this.curObject = {
            name: "hliuliu",
            age: 24,
            // 私有属性命名约定：通过将私有属性的名称前缀或前缀下划线来表示它是私有的
            _money: 234
        };
        // 设置原型属性  Reflect.setPrototypeOf/Object.setPrototypeOf
        Reflect.setPrototypeOf(this.curObject, {
            _type: "object"
        });
        console.log("curObject1:", this.curObject);
        console.log("_money延迟打印1", this.curObject._money);
        setTimeout(() => {
            console.log("_money延迟打印2", this.curObject._money);
        });
    },
    methods: {
        handlePrototype() {
            let temp = Reflect.getPrototypeOf(this.curObject);
            if (temp) {
                return JSON.stringify(temp);
            } else {
                return "null";
            }
        }
    }
};
</script>

<style lang="less">
.about {
}
</style>
