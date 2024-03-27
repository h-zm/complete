<template>
    <div class="cmit">
        <!-- 头像 -->
        <div class="cmit__avatar">
            <img v-if="cmtInfo.userHeadUrl" :src="cmtInfo.userHeadUrl" alt="" />
            <img v-else :src="avatarImg" alt="" />
        </div>

        <div class="cmit__info">
            <div class="cmit__info_head">
                <span class="cmit__info_name">{{
                    hidePhoneNumber(cmtInfo.userName)
                }}</span>
                <!-- 作者标识 -->
                <span
                    v-if="authorId && authorId === cmtInfo.userId"
                    class="cmit__info_author"
                    >作者</span
                >
                <span class="cmit__info_timing">{{
                    diffTimeNum(cmtInfo.createTime)
                }}</span>
            </div>

            <!-- 操作区域 -->
            <CmtOperate
                :cmtInfo="cmtInfo"
                :parentId="parentId"
                @handleInput="replyBack"
                @handleDel="delBack"
            >
                <template v-slot:comment-text>
                    <div>
                        <span v-if="cmtInfo.replyId">
                            回复<span class="cmit__info_textUser">{{
                                hidePhoneNumber(cmtInfo.replyUserName)
                            }}</span>
                        </span>
                        {{ cmtInfo.content }}
                    </div>
                </template>
            </CmtOperate>

            <!-- 下一级评论 -->
            <template v-if="cmtInfo?.replyList">
                <CmtItem
                    v-for="(it, index) in itemtList.list"
                    v-bind="$attrs"
                    :cmt-info="it"
                    :key="`${cmtInfo.id}-${index}`"
                    @replayFather="replyBack"
                    @delFather="delBack"
                    :parentId="cmtInfo.id"
                ></CmtItem>
                <div
                    v-if="itemPage.haveMore"
                    class="cmit__more"
                    @click="getReplyList()"
                >
                    共{{ itemtList.total }}条回复，点击查看
                    <a-spin v-if="moreLoading" class="cmit__more_spin"></a-spin>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import avatarImg from "@/assets/comment/avatar.png";
import CmtOperate from "./CmtOperate.vue";
// import { getReplyAnswerList } from "@/apis/comment";
import { hidePhoneNumber } from "@/plugins/util";

// interface cmtField {
//   id: string | number
//   articleId: string | number
//   userId: string | number
//   userName: string | number
//   userHeadUrl: string
//   replyId: string | number
//   replyUserId: string | number
//   replyUserName: string | number
//   createTime: string
//   updateTime: string
//   content: string
//   visitCount: number
//   replyCount: number
//   likeCount: number
//   markCount: number
//   deleteState: any
//   replyState: any
//   likeFlag: any
//   replyList?: any
// }

const emits = defineEmits([
    "replyNumChange",
    "replayFather",
    "delFather",
    "parentHandleDel",
]);

const authorId = inject("authorId");

const props = defineProps({
    cmtInfo: {
        type: Object,
        default: () => {},
    },

    // 二级回复需要用到，现在后端做不到树级
    parentId: {
        type: Number,
        default: 0,
    },
});

const itemPage = reactive({
    pageNum: 0,
    pageSize: 10,
    haveMore: false,
});

// 子列表
const itemtList = reactive({
    total: 0,
    list: [],
});

const replyIdList = ref([]);

const moreLoading = ref(false);

watch(
    () => props.cmtInfo,
    (newV) => {
        // 根据入参赋值
        if (Reflect.has(newV, "replyList")) {
            itemtList.list = newV?.replyList?.list || [];
            itemtList.total = newV?.replyList?.total || 0;
            if (itemtList.total > itemtList.list.length) {
                itemPage.haveMore = true;
            }
        }
    },
    {
        immediate: true,
    }
);

onMounted(() => {});

function diffTimeNum(data) {
    const curDateNum = new Date().valueOf();
    let diffNum = curDateNum - new Date(data).valueOf();
    let result = "";
    if (diffNum) {
        // 是否大于5分钟
        if (parseInt(diffNum / 60000, 10) >= 5) {
            //是否大于1小时
            if (parseInt(diffNum / 3600000, 10) >= 1) {
                // 是否大于1天
                if (parseInt(diffNum / 3600000 / 24, 10) >= 1) {
                    // 是否大于10天
                    if (parseInt(diffNum / 3600000 / 24 / 10, 10)) {
                        result = new Date(data).toLocaleDateString();
                    } else {
                        result = parseInt(diffNum / 3600000 / 24, 10) + "天前";
                    }
                } else {
                    result = parseInt(diffNum / 3600000, 10) + "小时前";
                }
            } else {
                result = parseInt(diffNum / 60000, 10) + "分钟前";
            }
        } else {
            result = "刚刚";
        }
    } else {
        result = "刚刚";
    }
    return result;
}

function delBack(data) {
    // 子级向上一级级传递
    if (props.parentId) {
        emits("delFather", data);
        return;
    }

    let existIndex = itemtList?.list?.findIndex((item) => item.id == data);
    // 上一级可以处理
    if (existIndex > -1) {
        itemtList.list.splice(existIndex, 1);
        emits("replyNumChange", false);
    } else {
        // 需要冒到最上级处理删除
        emits("parentHandleDel", data);
    }
}

function replyBack(data) {
    // 最上级处理推入, 使用props.parentId是因为后端getReplyAnswerList返回的子项里含有replyList字段，不利于判断
    if (props.parentId) {
        emits("replayFather", data);
        return;
    }

    if (Reflect.has(props.cmtInfo, "replyList")) {
        itemtList.list.push(data);
        // 记录手动回复的id
        replyIdList.value.push(data.id);
        emits("replyNumChange", true);
    }
}

// 查看帖子评论的回复列表
async function getReplyList() {
    if (moreLoading.value) {
        return;
    }
    moreLoading.value = true;
    let type = "load";
    // 首次加载
    if (itemPage.pageNum === 0) {
        replyIdList.value = [];
        type = "reset";
    }
    itemPage.pageNum += 1;

    const { data } = await getReplyAnswerList({
        articleId: props.cmtInfo.articleId,
        replyId: props.cmtInfo.id,
        pageNum: itemPage.pageNum,
        pageSize: itemPage.pageSize,
    });

    if (type === "reset") {
        itemtList.list = data.list || [];
    } else {
        // 根据记录的回复id去重
        let temp =
            data?.list?.filter((it) => !replyIdList.value.includes(it.id)) ||
            [];
        itemtList.list = itemtList.list.concat(temp);
    }

    itemtList.total = data.total || 0;

    if (data.list?.length < itemPage.pageSize) {
        itemPage.haveMore = false;
    }

    moreLoading.value = false;
}
</script>

<style lang="less" scoped>
.cmit {
    width: 100%;

    .flex(flex-start);

    &__avatar {
        margin: 0 16px 0 0;
        width: 24px;
        height: 24px;
        // background: #b9b9b9;
        border-radius: 50%;
        flex-shrink: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
        }
    }

    &__info {
        flex: 1;

        &_head {
            margin: 2px 0 8px 0;
            line-height: 16px;
        }

        &_name {
            margin: 0 14px 0 0;
            color: #080304;
            font-size: 14px;
            font-weight: 500;
        }

        &_author {
            margin: 0 12px 0 0;
            padding: 2px 4px;
            background: linear-gradient(321deg, #4094f7 0%, #00dac0 100%);
            border-radius: 4px;
            color: #fff;
        }

        &_timing {
            color: #797c80;
            font-size: 12px;
            font-weight: 500;
        }

        &_textUser {
            color: #217fff;
        }
    }

    &__more {
        margin: -8px 0 20px 0;
        font-size: 12px;
        color: #666565;
        cursor: pointer;

        &_spin {
            transform: scale(0.6);
        }
    }
}
</style>
