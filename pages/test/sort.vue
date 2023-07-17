<template>
    <!-- 新建文件的模板 -->
    <div class="hover">
        <div v-for="(it, index) in originList" :key="index">
            <div>
                {{ index + 1 }}、{{ formatterDate(it.pushTime) }}， 工号：{{
                    it.workOrderCode
                }}
            </div>
            <div>{{ it.content }}</div>
        </div>
    </div>
</template>

<script>
import { handleSort } from "~/plugins/util.js";
export default {
    head() {
        return {
            title: "vue文件模板",
            meta: "",
            description: "可用复制来快速创建文件",
            name: "模板",
            script: []
        };
    },
    data() {
        return {
            newWorkOrderCode: "1679770364799926272",
            originList: [
                {
                    id: "1679771363257020418",
                    workOrderId: 1679770364797329409,
                    workOrderCode: "1679770364799926272",
                    content: "j经理11<br>",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 1,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 1,
                    sendWithApp: null,
                    ext1: '{"mtype":"text","type":"text","url":""}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323676300,
                    createTime: "2023-07-14 08:34:36",
                    updateTime: "2023-07-14 08:34:36",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679771344185520130",
                    workOrderId: 1679770364797329409,
                    workOrderCode: "1679768696960106496",
                    content: "j经理10",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 1,
                    sendWithApp: null,
                    ext1: '{"mtype":"text","type":"text","url":""}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323671753,
                    createTime: "2023-07-14 08:34:32",
                    updateTime: "2023-07-14 08:34:32",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679771282848018433",
                    workOrderId: 1679770364797329409,
                    workOrderCode: "1679770364799926272",
                    content: "潘瑜714----第3个工单011",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 2,
                    sendWithApp: null,
                    ext1:
                        '{"mtype":"text","type":"user","url":"https://client.10010.com/onlinechatnew-web/upload/images/"}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323531276,
                    createTime: "2023-07-14 08:34:17",
                    updateTime: "2023-07-14 08:34:17",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679771236630982657",
                    workOrderId: 1679770364797329409,
                    workOrderCode: "1679768696960106496",
                    content: "潘瑜714----第3个工单010",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 2,
                    sendWithApp: null,
                    ext1:
                        '{"mtype":"text","type":"user","url":"https://client.10010.com/onlinechatnew-web/upload/images/"}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323520270,
                    createTime: "2023-07-14 08:34:06",
                    updateTime: "2023-07-14 08:34:06",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679770638598729729",
                    workOrderId: 1679770364797329409,
                    workOrderCode: "1679768696960106496",
                    content: "潘瑜714----第3个工单09",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 2,
                    sendWithApp: null,
                    ext1:
                        '{"mtype":"text","type":"user","url":"https://client.10010.com/onlinechatnew-web/upload/images/"}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323492220,
                    createTime: "2023-07-14 08:31:44",
                    updateTime: "2023-07-14 08:31:43",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679770591127597057",
                    workOrderId: 1679770364797329409,
                    workOrderCode: "1679770364799926272",
                    content: "j经理09<br>",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 1,
                    sendWithApp: null,
                    ext1: '{"mtype":"text","type":"text","url":""}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323492210,
                    createTime: "2023-07-14 08:31:32",
                    updateTime: "2023-07-14 08:31:32",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679770574719479809",
                    workOrderId: 1679770364797329409,
                    workOrderCode: "1679770364799926272",
                    content: "j经理08",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 1,
                    sendWithApp: null,
                    ext1: '{"mtype":"text","type":"text","url":""}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323488298,
                    createTime: "2023-07-14 08:31:28",
                    updateTime: "2023-07-14 08:31:28",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679770364169613313",
                    workOrderId: 1679770364797329409,
                    workOrderCode: "1679770364799926272",
                    content: "潘瑜714----第3个工单08",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 2,
                    sendWithApp: null,
                    ext1:
                        '{"mtype":"text","type":"user","url":"https://client.10010.com/onlinechatnew-web/upload/images/"}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323318172,
                    createTime: "2023-07-14 08:30:38",
                    updateTime: "2023-07-14 08:30:38",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679769915647520769",
                    workOrderId: 1679768696965898241,
                    workOrderCode: "1679768696960106496",
                    content: "潘瑜714----第2个工单07",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 2,
                    sendWithApp: null,
                    ext1:
                        '{"mtype":"text","type":"user","url":"https://client.10010.com/onlinechatnew-web/upload/images/"}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323318162,
                    createTime: "2023-07-14 08:28:51",
                    updateTime: "2023-07-14 08:28:51",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679769861096402946",
                    workOrderId: 1679768696965898241,
                    workOrderCode: "1679768696960106496",
                    content: "j经理06<br>",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 1,
                    sendWithApp: null,
                    ext1: '{"mtype":"text","type":"text","url":""}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323318157,
                    createTime: "2023-07-14 08:28:38",
                    updateTime: "2023-07-14 08:28:38",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679769841261539329",
                    workOrderId: 1679768696965898241,
                    workOrderCode: "1679768696960106496",
                    content: "j经理05",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 1,
                    sendWithApp: null,
                    ext1: '{"mtype":"text","type":"text","url":""}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323313428,
                    createTime: "2023-07-14 08:28:33",
                    updateTime: "2023-07-14 08:28:33",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679769824400437249",
                    workOrderId: 1679768696965898241,
                    workOrderCode: "1679768696960106496",
                    content: "j经理04",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 1,
                    sendWithApp: null,
                    ext1: '{"mtype":"text","type":"text","url":""}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689323309408,
                    createTime: "2023-07-14 08:28:29",
                    updateTime: "2023-07-14 08:28:29",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679768813355069442",
                    workOrderId: 1679768696965898241,
                    workOrderCode: "1679768696960106496",
                    content: "潘瑜714----第2个工单06",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 2,
                    sendWithApp: null,
                    ext1:
                        '{"mtype":"text","type":"user","url":"https://client.10010.com/onlinechatnew-web/upload/images/"}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689322967298,
                    createTime: "2023-07-14 08:24:28",
                    updateTime: "2023-07-14 08:24:28",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679768696002637826",
                    workOrderId: 1679768696965898241,
                    workOrderCode: "1679768696960106496",
                    content: "潘瑜714----第2个工单05",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 2,
                    sendWithApp: null,
                    ext1:
                        '{"mtype":"text","type":"user","url":"https://client.10010.com/onlinechatnew-web/upload/images/"}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689322967290,
                    createTime: "2023-07-14 08:24:00",
                    updateTime: "2023-07-14 08:24:00",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679768427403603969",
                    workOrderId: 1679767714697650178,
                    workOrderCode: "1679767714557640704",
                    content: "潘瑜714----第1个工单04",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 2,
                    sendWithApp: null,
                    ext1:
                        '{"mtype":"text","type":"user","url":"https://client.10010.com/onlinechatnew-web/upload/images/"}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689322967286,
                    createTime: "2023-07-14 08:22:56",
                    updateTime: "2023-07-14 08:22:56",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679768389407404033",
                    workOrderId: 1679767714697650178,
                    workOrderCode: "1679767714557640704",
                    content: "j经理03<br>",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 1,
                    sendWithApp: null,
                    ext1: '{"mtype":"text","type":"text","url":""}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689322967279,
                    createTime: "2023-07-14 08:22:47",
                    updateTime: "2023-07-14 08:22:47",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679768371279622145",
                    workOrderId: 1679767714697650178,
                    workOrderCode: "1679767714557640704",
                    content: "j经理02",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 1,
                    sendWithApp: null,
                    ext1: '{"mtype":"text","type":"text","url":""}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689322962957,
                    createTime: "2023-07-14 08:22:43",
                    updateTime: "2023-07-14 08:22:43",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679767900875845634",
                    workOrderId: 1679767714697650178,
                    workOrderCode: "1679767714557640704",
                    content: "潘瑜714----第1个工单03",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 2,
                    sendWithApp: null,
                    ext1:
                        '{"mtype":"text","type":"user","url":"https://client.10010.com/onlinechatnew-web/upload/images/"}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689322839466,
                    createTime: "2023-07-14 08:20:51",
                    updateTime: "2023-07-14 08:20:51",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679767853304049665",
                    workOrderId: 1679767714697650178,
                    workOrderCode: "1679767714557640704",
                    content: "j经理01",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 1,
                    sendWithApp: null,
                    ext1: '{"mtype":"text","type":"text","url":""}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689322839462,
                    createTime: "2023-07-14 08:20:39",
                    updateTime: "2023-07-14 08:20:39",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                },
                {
                    id: "1679767812883542018",
                    workOrderId: 1679767714697650178,
                    workOrderCode: "1679767714557640704",
                    content: "潘瑜714----第1个工单02",
                    handlerId: "lina_nx",
                    customerManagerId: "1656106062703583234",
                    customerManagerMobile: null,
                    originManagerId: "1656106062703583234",
                    userId: "潘瑜",
                    userMobile: "18595086000",
                    contentType: 1,
                    isFirst: 0,
                    isInnerChat: 0,
                    isRead: 1,
                    sendType: 2,
                    sendWithApp: null,
                    ext1:
                        '{"mtype":"text","type":"user","url":"https://client.10010.com/onlinechatnew-web/upload/images/"}',
                    ext2: null,
                    ext3: null,
                    pushTime: 1689322703981,
                    createTime: "2023-07-14 08:20:30",
                    updateTime: "2023-07-14 08:20:30",
                    provinceId: "88",
                    provinceName: "宁夏",
                    cityId: "",
                    cityName: "",
                    isEvaluate: null
                }
            ],
            dataList: []
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        // 格式化时间
        formatterDate(data) {
            if (!data) {
                return null;
            }

            return new Date(data).toLocaleTimeString();
        },

        initData() {
            let elements = new Set(
                this.originList.map(item => item.workOrderCode)
            );

            console.log(`共有${elements.size}种workorderCode类型`);

            // *法一
            // 如果工号是逐级递增的 先按照工单号升序排，相同工单号再按照时间升序排
            // this.originList.sort((a, b) => {
            //     console.log(a.id);
            //     if (a.workOrderCode === b.workOrderCode) {
            //         return a.pushTime - b.pushTime;
            //     } else {
            //         return a.workOrderCode - b.workOrderCode;
            //     }
            // });
            console.log("originList", this.originList);

            // *法二
            // 理解sort函数原理
            let tempList1 = [1, 2, 3, 9, 8, 6, 3, 5];

            // 降序
            handleSort(tempList1, (a, b) => b - a);
            console.log("tempList1", tempList1);

            // 升序
            handleSort(this.originList, (a, b) => {
                if (a.workOrderCode === b.workOrderCode) {
                    return a.pushTime - b.pushTime;
                } else {
                    return a.workOrderCode - b.workOrderCode;
                }
            });
            console.log("originList", this.originList);
        }
    }
};
</script>

<style lang="less">
.hover {
    &__main {
        padding: 10px;
        width: fit-content;
        background: #f5f5f5;

        &_block {
            display: none;
        }
    }

    &__main:hover {
        &_block {
            display: block !important;
        }
    }
}
</style>
