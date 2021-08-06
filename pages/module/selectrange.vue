<template>
    <!-- 框选功能 -->
    <div class="example">
        <contents>范围筛选功能</contents>
        <div class="moving-area">
            <div
                class="select-area"
                :class="{ 'out-screen': showSelect }"
                id="selecting"
            >
                <div
                    class="select-moving"
                    :style="{
                        left: beginPosition.x + 'px',
                        top: beginPosition.y + 'px',
                        width: movingAttribute.width + 'px',
                        height: movingAttribute.height + 'px',
                        marginTop: movingMagrin.top + 'px',
                        marginLeft: movingMagrin.left + 'px'
                    }"
                ></div>
                <!-- <div
          class="begin-point"
          :style="{ left: beginPosition.x + 'px', top: beginPosition.y + 'px' }"
        >
          ({{ beginPosition.x }},{{ beginPosition.y }})
        </div>
        <div
          class="moving-point"
          :style="{ left: movingPoint.x + 'px', top: movingPoint.y + 'px' }"
        >
          ({{ movingPoint.x }},{{ movingPoint.y }})
        </div> -->
            </div>

            <!-- border-collapse:collapse 合并单元格边框 只保留一个 -->
            <!-- rowspan(横框列) 还是 colspan(横框行) 都是 <td> 标签的属性 且为number 用来合并单元格 -->
            <!-- 要被合并的单元格项 不能出现， -->
            <!-- 合并行的时候，比如rowspan="2"，它的下一行tr会少一列；合并列的时候 colspan="2"，此行的列会少一列 不然 会照常渲染 -->
            <table
                class="table"
                border=""
                cellpadding="4"
                style="border-collapse:collapse"
                summary="scheduleTime Table"
            >
                <template v-for="(column, sort) in timeList">
                    <thead
                        v-if="sort == 0"
                        class="table-head"
                        :key="`head-${sort}`"
                    >
                        <tr>
                            <th rowspan="2" align="center" width="100px">
                                星期/日期
                            </th>
                            <!-- colspan 合并后24项 且不用渲染 -->
                            <th align="center" colspan="24">
                                00:00-12:00
                            </th>
                            <th align="center" colspan="24">
                                13:00-24:00
                            </th>
                        </tr>
                        <tr>
                            <!-- <th align="center" width="100px">星期/日期</th> -->
                            <td
                                class="table-thead-td"
                                colspan="2"
                                align="center"
                                v-for="(time, index) in hourList"
                                :key="index"
                            >
                                {{ time }}
                            </td>
                        </tr>
                    </thead>
                    <tbody class="table-tbody" :key="`body-${sort}`">
                        <tr class="table-tbody-tr">
                            <td align="center">
                                {{ column.dayName }}
                            </td>

                            <td
                                class="table-tbody-td"
                                align="center"
                                :class="{ choosed: time.check }"
                                v-for="(time, index) in column.children"
                                :key="index"
                            >
                                <el-popover
                                    placement="top"
                                    v-model="time.hover"
                                    :open-delay="800"
                                    trigger="hover"
                                    :content="
                                        column.dayName + '：' + time.label
                                    "
                                >
                                    <div
                                        class="table-tbody-span"
                                        slot="reference"
                                        @mousedown.stop="
                                            mouseDownItem(
                                                time,
                                                sort,
                                                index,
                                                $event
                                            )
                                        "
                                        @mouseup.stop="
                                            mouseUpItem(time, sort, index)
                                        "
                                    ></div>
                                </el-popover>
                                <!-- {{ time.value }} -->
                            </td>
                        </tr>
                    </tbody>
                </template>
            </table>

            <div @click="clearTime()" class="func-area">
                清空
            </div>
            <div
                class="descrip-area"
                v-for="(time, index) in timeList"
                :key="index"
            >
                <div class="descrip-area-item">
                    <div class="descrip-area-label">
                        {{ time.dayName }}
                    </div>
                    <div class="descrip-area-tagarea">
                        <span
                            class="descrip-area-tag"
                            v-for="(choose, sort) in time.resultList"
                            :key="sort"
                            >{{ choose.key }}</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    weekInfo,
    exampleTime,
    aWeekSchedule,
    hourList
} from "~/plugins/selectData";
import Contents from "../../components/Font/Contents.vue";
export default {
    components: { Contents },
    head() {
        return {
            title: "时间范围筛选"
        };
    },
    data() {
        return {
            timeList: aWeekSchedule,
            hourList: hourList,
            clickInfo: {},
            useSelecting: false,
            showSelect: false,
            beginMouse: false, // 开始鼠标监听
            // 起始位置
            beginPosition: {
                x: 0,
                y: 0
            },
            // 移动中宽度与高度的变化
            movingAttribute: {
                width: 0,
                height: 0
            },
            // 当移动的是负值是起作用
            movingMagrin: {
                top: 0,
                left: 0
            },
            // 移动点
            movingPoint: {
                x: 0,
                y: 0
            },
            childNodeList: [], // 子节点样式信息
            parentObj: {} //父节点信息
        };
    },
    mounted() {
        // console.log(this.timeList, "时间信息");
        // 获取区域子节点信息
        this.getParentInfo();
        // 为框选区添加监听
        this.addListenerFunc("selecting", "mousedown", this.mousemoveDown);
        this.addListenerFunc("selecting", "mousemove", this.mousemoveFunc);
        this.addListenerFunc("selecting", "mouseup", this.mousemoveUp);
        this.addListenerFunc("selecting", "mouseleave", this.mousemoveLeave);
    },
    watch: {
        "beginPosition.x": {
            handler(value) {
                // console.log(value, "起始点的横坐标有变化吗?");
            }
        }
    },
    beforeDestroy() {
        // 为框选区添加监听
        if (this.useSelecting) {
            this.removeListenerFunc(
                "selecting",
                "mousedown",
                this.mousemoveDown
            );
            this.removeListenerFunc(
                "selecting",
                "mousemove",
                this.mousemoveFunc
            );
            this.removeListenerFunc("selecting", "mouseup", this.mousemoveUp);
            this.removeListenerFunc(
                "selecting",
                "mouseleave",
                this.mousemoveLeave
            );
        }
    },
    methods: {
        getParentInfo() {
            // 注意元素在屏幕上的关系 根据使用情况进行调整
            setTimeout(() => {
                let parentNode = Array.from(
                    document.getElementsByClassName("table")
                );
                let backParent = parentNode[0].offsetParent; // 到dialog-table-time层级
                this.parentObj = {
                    top: backParent.offsetTop, // 左外框距离窗口顶侧距离
                    left: parentNode[0].offsetLeft + backParent.offsetLeft // 左外框距离窗口左侧距离
                };
                // console.log(parentNode, "父级信息");
                // console.log(this.parentObj, "父级信息");
                // 设置可以框选的子节点信息
                let childrenList = document.getElementsByClassName(
                    "table-tbody-span"
                );
                // console.log(childrenList, "子级列表信息");
                for (let i in Array.from(childrenList)) {
                    this.childNodeList[i] = {
                        index: i,
                        hover: false, // 用于悬浮的样式判断 父级 td.table-tbody-td
                        top:
                            childrenList[i].offsetTop +
                            childrenList[i].offsetParent.offsetTop +
                            this.parentObj.top,
                        left:
                            childrenList[i].offsetLeft +
                            childrenList[i].offsetParent.offsetLeft,
                        width: childrenList[i].offsetWidth,
                        height: childrenList[i].offsetHeight
                    };
                }
                // console.log(this.childNodeList.slice(0, 10), "parentNode");
            }, 300);
        },

        // 添加事件监听
        /**
         * 描述
         * @param {any} element:any 监听元素的id
         * @param {any} funcType:any='mousedown' 监听事件的类型
         * @param {any} callback:any 监听的回调函数
         */
        addListenerFunc(element, funcType = "mousedown", callback) {
            let target = document.getElementById(`${element}`);
            // attachEvent 监听事件
            // if (window.attachEvent) {
            // }
            target.addEventListener(`${funcType}`, callback);
        },

        // 移出鼠标监听事件 参数同上
        removeListenerFunc(element, funcType = "mousedown", callback) {
            let target = document.getElementById(`${element}`) || "";

            if (target) {
                target.removeEventListener(`${funcType}`, callback);
            }
        },

        // 监听时间筛选区域是否有鼠标按下
        mousemoveDown(e) {
            // '鼠标按下事件'
            this.beginMouse = true;
            // 根据起始点 更新位置
            // console.log('鼠标按下');
            this.beginPosition = {
                x: e.pageX,
                y: e.pageY
            };
            // console.log(this.beginPosition, '起始');
        },

        // 监听时间筛选区域是否有鼠标滑动
        mousemoveFunc(e) {
            // '鼠标移动事件'
            // console.log('鼠标移动');
            if (this.beginMouse) {
                // 通过起始位置 与 移动点位置判断当前框选
                // 如果是往上，往左及是向坐标的负方向需要通过margin来更新
                // offsetX 有时会为1，2数值，改到使用pageX
                this.movingPoint = {
                    x: e.pageX,
                    y: e.pageX
                };
                this.movingAttribute.width = Math.abs(
                    this.beginPosition.x - e.pageX
                );
                this.movingAttribute.height = Math.abs(
                    this.beginPosition.y - e.pageY
                );
                if (this.beginPosition.x > e.pageX) {
                    this.movingMagrin.left = e.pageX - this.beginPosition.x;
                } else {
                    this.movingMagrin.left = 0;
                }
                if (this.beginPosition.y > e.pageY) {
                    this.movingMagrin.top = e.pageY - this.beginPosition.y;
                } else {
                    this.movingMagrin.top = 0;
                }
            }
        },

        // 监听时间筛选区域是否有鼠标松开
        mousemoveUp(e) {
            // '鼠标松开事件'
            if (this.beginMouse) {
                this.resetMoving();
                // console.log(e, this.beginMouse, 'moveUp松开鼠标');
            }
        },

        // 监听时间筛选区域是否有鼠标移出
        mousemoveLeave(e) {
            // '鼠标移出事件'
            if (this.beginMouse) {
                this.resetMoving();
                // console.log(e, this.beginMouse, 'moveleave鼠标移出');
            }
        },

        // 判断是否选择
        judgeChoose() {
            // console.log('判断');
            let selectRange = {
                x: [
                    this.movingMagrin.left + this.beginPosition.x,
                    this.movingMagrin.left +
                        this.beginPosition.x +
                        this.movingAttribute.width
                ],
                y: [
                    this.movingMagrin.top + this.beginPosition.y,
                    this.movingMagrin.top +
                        this.beginPosition.y +
                        this.movingAttribute.height
                ]
            };
            // console.log("当前框选范围", selectRange);
            for (let i in this.childNodeList) {
                // console.log(i, this.childNodeList[i], "遍历项");
                // i 是从 0~335 供336
                // 已经选中的往下进行
                // 1天有48个选项
                let quotient = 0; // 商 timeList第一个是24个时间点数 所以都从索引1开始
                let remainder = ""; // 余数
                if (Number(i) > 47) {
                    let temp = Number(i) / 48;
                    quotient += parseInt(temp);
                    remainder = Number(i) % 48;
                } else {
                    remainder = Number(i);
                }

                // 已经选择的不再进行选中遍历测试
                if (this.timeList[quotient].children[remainder].check) {
                    continue;
                }

                let choice = {
                    x: false,
                    y: false
                };

                //通过横坐标的包含关系判断是否选中
                for (let m = 0; m < this.childNodeList[i].width; m++) {
                    let temp = this.childNodeList[i].left + m;
                    if (temp >= selectRange.x[0] && temp <= selectRange.x[1]) {
                        choice.x = true;
                        // 跳出最近的循环
                        continue;
                    }
                }

                //通过纵坐标的包含关系判断是否选中
                for (let m = 0; m < this.childNodeList[i].height; m++) {
                    let temp = this.childNodeList[i].top + m;
                    if (temp >= selectRange.y[0] && temp <= selectRange.y[1]) {
                        choice.y = true;
                        // 跳出最近的循环
                        continue;
                    }
                }

                if (choice.x && choice.y) {
                    // 更新选中
                    // console.log(quotient, remainder, "执行");
                    // console.log(quotient, remainder, '选中的');
                    // console.log(this.childNodeList, '子列表');
                    this.checkTime(
                        this.timeList[quotient].children[remainder],
                        quotient,
                        remainder
                    );
                    continue;
                }
            }
        },

        // 重置框选使用的数据
        resetMoving() {
            // 校验是否隐藏了框选底页面
            // console.log('关闭框选底页');
            // 判断有没有选中test
            this.showSelect = false;
            this.useSelecting = true;
            this.beginMouse = false;

            this.judgeChoose();
            // 起始位置
            this.beginPosition = {
                x: 0,
                y: 0
            };
            // 移动中宽度与高度的变化
            this.movingAttribute = {
                width: 0,
                height: 0
            };

            // 重置margin
            this.movingMagrin = {
                top: 0,
                left: 0
            };

            this.movingPoint = {
                x: 0,
                y: 0
            };
        },

        // 点击某个时段
        clickItem() {
            // console.log('点击时段');
        },

        // 按下某个时段
        mouseDownItem(data, sort, index, e) {
            // 操作未选中的时段 才提供框选
            if (!data.check) {
                // 记录按下时段的信息
                this.clickInfo = `${sort}-${index}`;
                this.showSelect = true;
                // 起始点信息
                this.beginMouse = true;
                this.beginPosition = {
                    x: e.pageX,
                    y: e.pageY
                };
                // 会在selecting mouseup 触发 一次 judgeChoose
                // 所以不再写 避免多次
            } else {
                // console.log(sort, index, "点击");
                this.checkTime(data, sort, index);
            }
            // console.log('按下');
        },

        // 松开某个时段
        mouseUpItem(data, sort, index) {
            // `${sort}-${index}`, '松开时段');
            // 如果按下与松开的是统一个信息 就不触发框选了，改到选中单独一项
            if (this.clickInfo == `${sort}-${index}`) {
                this.showSelect = false;
            }
        },

        // 更新时段样式
        // 中文展示栏的时间区域的高度是写死的，因为现在点击后添加的描述
        // 会调整文档的高度，还有就是调整窗口大小也会可能更改左、顶部的
        // 位置关系 所以写死了有时间的话 可以加个onsize监听等的优化
        checkTime(data, sort, index) {
            data.check = !data.check; // 更新是否选择状态
            // console.log(data, sort, index, "选中类型");
            if (data.check) {
                // 加入时段
                if (data.value > this.timeList[sort].maxIndex) {
                    // 加入的为最大值则更新maxIndex
                    this.timeList[sort].maxIndex = data.value;
                }

                this.timeList[sort].indexList.push(data.value);
                this.timeList[sort].indexList.sort((a, b) => a - b); // 对index值进行排序
            } else {
                // indexList去除已选择的
                this.timeList[sort].indexList.splice(
                    this.timeList[sort].indexList.indexOf(data.value),
                    1
                );

                // 重新确定maxIndex
                if (this.timeList[sort].indexList.length) {
                    this.timeList[sort].maxIndex = Math.max(
                        ...this.timeList[sort].indexList
                    );
                } else {
                    this.timeList[sort].maxIndex = -1;
                }
            }

            this.returnTime(this.timeList[sort]); // 更新所在星期大类的数据
        },

        returnTime(dayObj) {
            // console.log(dayObj, "indexList");
            let lengthNumber = dayObj.indexList.length;
            let currentIndex = 0; // 当前索引值
            let thanOneList = []; // 存放间隔值超过1的索引值

            for (let i = 0; i < lengthNumber; i++) {
                if (dayObj.indexList[i + 1] - dayObj.indexList[i] > 0.5) {
                    currentIndex = i;
                    thanOneList.push(currentIndex);
                    // console.log(currentIndex, '大于1的索引值');
                }
            }
            // console.log(thanOneList, 'dayObj.indexList中与下一项差大于1的索引值列表');

            dayObj.resultList = []; // 清空结果列表
            let indexNumber = ""; // 存放上一次操作的索引值
            let valueList = ""; // 存放连续的索引值
            let otherDescrip = ""; // 存放valueList其对应的中文时间段描述
            if (thanOneList.length == 0 && dayObj.indexList.length > 0) {
                // 该星期有选中的字段 是连续的时间 没有间隔
                valueList = dayObj.indexList.slice(0); // 直接取整个dayObj.indexList
                otherDescrip =
                    this.judgeBig(valueList[0] - 0.5) +
                    "~" +
                    this.judgeBig(valueList[valueList.length - 1]); // 返回中文描述
                dayObj.resultList.push({ key: otherDescrip, value: valueList });
            } else if (thanOneList.length) {
                // 有间隔差
                thanOneList.filter((value, index) => {
                    if (index == 0) {
                        // 刚开始 择取0到本次
                        valueList = dayObj.indexList.slice(0, value + 1);
                        // dayObj.resultList.push(dayObj.indexList.slice(0, value + 1));
                    } else {
                        // 不为第一项 择取上一次的indexNumber到本次
                        valueList = dayObj.indexList.slice(
                            indexNumber,
                            value + 1
                        );
                        // dayObj.resultList.push(dayObj.indexList.slice(indexNumber, value + 1));
                    }
                    otherDescrip =
                        this.judgeBig(valueList[0] - 0.5) +
                        "~" +
                        this.judgeBig(valueList[valueList.length - 1]); // 获取中文描述
                    dayObj.resultList.push({
                        key: otherDescrip,
                        value: valueList
                    }); // 推入结果列表
                    indexNumber = value + 1; // 更新上一次操作的索引值

                    // 最后一项 另外择取一次
                    if (index == thanOneList.length - 1) {
                        let finalList = dayObj.indexList.slice(value + 1);
                        let finalDescrip =
                            this.judgeBig(finalList[0] - 0.5) +
                            "~" +
                            this.judgeBig(finalList[finalList.length - 1]);
                        // dayObj.resultList.push(dayObj.indexList.slice(value + 1));
                        dayObj.resultList.push({
                            key: finalDescrip,
                            value: finalList
                        });
                    }
                });
            }
            // console.log(dayObj.resultList, '分值列表');
        },

        // 返回中文描述
        judgeBig(data) {
            let otherData = "";
            let havePoint = false;
            if (data.toString().includes(".")) {
                // 含有小数点
                otherData = parseInt(data);
                havePoint = true;
            } else {
                // 不含小数点
                otherData = data;
            }
            // 小于10的 添加'0'前缀
            if (otherData < 10) {
                otherData = "0" + otherData;
            }

            return `${otherData}:${havePoint ? "30" : "00"}`;
        },

        // 清空选择
        clearTime() {
            this.timeList.filter((item, index) => {
                item.maxIndex = -1;
                item.minIndex = -1;
                item.resultList = [];
                item.indexList = [];
                item.children.filter(it => {
                    it.check = false;
                });
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "~assets/less/index.less";
.example {
    .moving-area {
        padding: 20px;
        border: 1px dashed #b1aeae;
        border-radius: 6px;
        position: relative;

        .select-area {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: -200%;
            z-index: @maxZIndex;
            background: rgba(0, 0, 0, 0.01);

            .select-moving {
                width: 0;
                height: 0;
                position: fixed;
                background: rgba(67, 147, 252, 0.2);
                top: 0;
                left: 0;
                z-index: @maxZIndex + 2;
            }
        }

        .out-screen {
            left: 0;
        }

        .begin-point {
            width: 4px;
            height: 4px;
            position: fixed;
            background: rgba(9, 60, 212, 1);
            top: 0;
            left: 0;
            z-index: @zIndex + 3;
        }

        .moving-point {
            width: 4px;
            height: 4px;
            position: fixed;
            background: rgb(236, 13, 13);
            top: 0;
            left: 0;
            z-index: @zIndex + 4;
        }

        &-item {
            width: 80px;
            height: 32px;
            line-height: 32px;
            background: #fff;
            border-radius: 6px;
            border: 1px solid #b1aeae;
            text-align: center;
            margin: 10px;
            .pointer(move);
        }

        &-item:hover {
            color: #fff;
            background: @color4090f7;
        }

        .choose-style {
            color: #fff;
            background: @color4090f7;
        }
    }
}
.table {
    .table-tbody {
        .td {
            height: 32px;
        }
    }
    .table-tbody-tr {
        height: 32px;
    }
    .table-thead-td {
        width: 18px;
        // height: 28px;
    }

    .table-tbody-td {
        width: 18px;
        position: relative;
    }

    .table-tbody-span {
        width: 18px;
        height: 32px;
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        // background: transparent;
        .pointer();
    }

    .choosed {
        border: 1px solid #d0d0d0;
        background: @color4090f7;
    }
}
.descrip-area {
    margin: 20px 0;

    &-label {
        margin-right: 12px;
        font-weight: 600;
        flex-shrink: 0;
    }

    &-item {
        .flex(flex-start);
        margin-bottom: 12px;
    }

    &-tagarea {
        .flex(flex-start, flex-start, wrap);
    }

    &-tag {
        padding: 0 10px 6px 0;
    }
}
.func-area {
    // text-align: right;
    margin: 20px 0;
    color: @color4090f7;
}
</style>
