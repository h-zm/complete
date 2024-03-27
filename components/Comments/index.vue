<template>
    <div class="cmt">
        <div class="cmt__head">
            <div class="cmt__title" title="刷新" @click="getComments('reset')">
                {{ commentTitle }}
            </div>
            <slot name="extra">
                <div class="cmt__extra">
                    <div
                        :class="{ cmt__active: likeFlag === 1 }"
                        class="cmt__block"
                        @click="handleLike(1)"
                    >
                        <img
                            v-if="likeFlag === 1"
                            class="cmt__block_img"
                            :src="upActiveImg"
                            alt=""
                        />
                        <img
                            v-else
                            class="cmt__block_img"
                            :src="upImg"
                            alt=""
                        />
                        <span>
                            力挺 <span v-if="likeCount">{{ likeCount }}</span>
                        </span>
                    </div>
                    <div
                        :class="{ cmt__active: likeFlag === -1 }"
                        class="cmt__block"
                        @click="handleLike(-1)"
                    >
                        <img
                            v-if="likeFlag === -1"
                            class="cmt__block_img"
                            :src="downActiveImg"
                            alt=""
                        />
                        <img
                            v-else
                            class="cmt__block_img"
                            :src="downImg"
                            alt=""
                        />
                    </div>
                </div>
            </slot>
        </div>

        <!-- 文章评论框 -->
        <CmtInput
            v-model:value="inputText"
            :loading="inputLoading"
            key="articleInput"
            @handleBack="handleInput"
        ></CmtInput>

        <!-- 评论及回复区域 -->
        <template v-for="(item, index) in commentList.list">
            <CmtItem
                :cmtInfo="item"
                @replyNumChange="replyNumChange"
                @parentHandleDel="handleDel"
            ></CmtItem>
        </template>

        <div class="cmt__footer">
            <a-spin v-if="searchLoading"></a-spin>
            <div
                v-else-if="couldMore && pageInfo.haveMore"
                @click="getComments()"
            >
                点击查看更多评论
            </div>
            <div
                v-else-if="
                    !pageInfo.haveMore && !searchLoading && pageInfo.pageNum > 1
                "
                @click="getComments()"
            >
                数据已到底～
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import upActiveImg from "@/assets/comment/up-active.png";
import upImg from "@/assets/comment/up.png";
import downActiveImg from "@/assets/comment/down-active.png";
import downImg from "@/assets/comment/down.png";
import CmtItem from "./CmtItem.vue";
import CmtInput from "./CmtInput.vue";
import { _debounce } from "@/plugins/util";
// import { getArticleRelyList, replyArticle, likeArticle } from '@/apis/comment'
import { zh_CN } from "./messages";

const props = defineProps({
    commentTitle: {
        type: String,
        default: "讨论",
    },
    // 文章信息
    articleInfo: {
        type: Object,
        default: () => ({
            articleId: "",
            userId: "",
            likeCount: 0,
            // 1 点赞 0临界(取消操作) -1 踩
            likeFlag: 0,
        }),
    },

    scrollEleName: {
        type: String,
        default: "main-content",
    },
});

const emits = defineEmits(["answer"]);

const pageInfo = reactive({
    pageNum: 1,
    pageSize: 10,
    haveMore: false,
});

// 帖子评论列表
const commentList = reactive({
    total: 0,
    list: [],
});

const couldMore = ref(false);

const likeFlag = ref(0);

const likeCount = ref(0);

const authorId = ref("");

const inputText = ref("");

const inputLoading = ref(false);

const searchLoading = ref(false);

// 提供作者Id
provide("authorId", authorId);

watch(
    () => props.articleInfo,
    (newV) => {
        console.log("sadf", newV);
        likeFlag.value = newV.likeFlag;
        likeCount.value = newV.likeCount;
        if (newV.userId && authorId.value != newV.userId) {
            setTimeout(() => {
                // 判断是否需要定位到评论位置
                if (route.query?.jumpCmt) {
                    let target = document.querySelector(`.cmt__head`);
                    target.scrollIntoView({ behavior: "smooth" });
                    router.replace(
                        `/modelDetail?modelId=${route.query.modelId}`
                    );
                }
            }, 200);
        }
        authorId.value = newV.userId;
    },
    {
        immediate: true,
        deep: true,
    }
);

onMounted(() => {
    console.log("234");
    commentStore.SET_REPLYID("");
    getComments("reset");
    let container = document.querySelector(`.${props.scrollEleName}`);
    container?.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    const container = document.querySelector(`.${props.scrollEleName}`);
    container?.removeEventListener("scroll", handleScroll);
});

function judgeScroll() {
    const container = document.querySelector(`.${props.scrollEleName}`);
    const { scrollHeight, clientHeight } = container;
    // 当没有出现滚动条时
    if (scrollHeight === clientHeight) {
        couldMore.value = true;
    }
}

// 滚动加载
const handleScroll = () => {
    if (couldMore.value) {
        couldMore.value = false;
    }
    const container = document.querySelector(`.${props.scrollEleName}`);
    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight + 20 >= scrollHeight && pageInfo.haveMore) {
        getComments();
    }
};

// 力挺文章
const handleLike = useDebounce(async (data) => {
    // 判断是否登录
    if (!isLogin.value) {
        createMessage.warn(zh_CN.noLogin);
        return;
    }
    let temp = data;
    // 取消点赞或者取消踩
    if (likeFlag.value === data) {
        temp = 0;
    }
    const backData = await likeArticle({
        articleId: props.articleInfo.articleId,
        likeFlag: temp,
    });
    if (backData.success) {
        if (data == 1) {
            if (temp == 0) {
                createMessage.success(zh_CN.ARTICLE_REVOKE);
            } else {
                createMessage.success(zh_CN.ARTICLE_LIKE);
            }
        }
        likeFlag.value = temp;
        likeCount.value = backData.data.likeCount;
    }
}, 500);

// 评论文章
async function handleInput(data) {
    // console.log(`评论${props.articleInfo.articleId}`, data)
    // 判断是否登录
    if (!isLogin.value) {
        createMessage.warn(zh_CN.noLogin);
        return;
    }
    inputLoading.value = true;
    const backData = await replyArticle({
        articleId: props.articleInfo.articleId,
        replyId: 0,
        content: data,
        userHeadUrl: "",
    });
    if (backData.success) {
        inputText.value = "";
        createMessage.success(zh_CN.ARTICLE_REPLY);
        getComments("reset");
        emits("answer", true);
    }
    inputLoading.value = false;
}

function replyNumChange(data) {
    emits("answer", data);
}

function handleDel(delId) {
    console.log("delId", delId);
    let existIndex = commentList.list.findIndex((item) => item.id == delId);
    if (existIndex > -1) {
        commentList.list.splice(existIndex, 1);
    }
    emits("answer", false);
}

// 获取文章评论列表
async function getComments(type = "load") {
    searchLoading.value = true;
    if (type === "reset") {
        pageInfo.pageNum = 1;
    } else {
        pageInfo.pageNum += 1;
    }
    // 佳数据
    // commentList.total = 12
    // commentList.list = [
    //   {
    //     id: 6,
    //     articleId: 11,
    //     replyUserName: '',
    //     replyUserId: '',
    //     likeCount: 1,
    //     createTime: '2024-02-21T07:59:08.185+00:00',
    //     updateTime: '2024-02-21T07:59:08.185+00:00',
    //     userId: 1,
    //     userName: '用户3',
    //     userHeadUrl: 'http',
    //     content: '评论内容1',
    //     replyCount: 1,
    //     visitCount: null,
    //     markCount: null,
    //     likeFlag: 1,
    //     replyId: null,
    //     replyState: null,
    //     deleteState: null,
    //     replyList: {
    //       total: 1,
    //       list: [
    //         {
    //           id: 7,
    //           articleId: 11,
    //           userId: 1,
    //           userName: '用户2',
    //           replyId: '34',
    //           replyUserId: 2,
    //           replyUserName: '用户1',
    //           deleteState: null,
    //           createTime: '2024-02-21T07:59:08.185+00:00',
    //           updateTime: '2024-02-21T07:59:08.185+00:00',
    //           content: '评论内容',
    //           userHeadUrl: 'http',
    //           visitCount: null,
    //           replyCount: 1,
    //           likeCount: 1,
    //           markCount: null,
    //           replyState: null,
    //           likeFlag: 1
    //         }
    //       ]
    //     }
    //   }
    // ]
    // return
    const { data } = await getArticleRelyList({
        articleId: props.articleInfo.articleId,
        pageNum: pageInfo.pageNum,
        pageSize: pageInfo.pageSize,
    });

    let tempList = data.list || [];

    if (type === "reset") {
        commentList.list = [...tempList];
        setTimeout(() => {
            judgeScroll();
        }, 0);
    } else {
        commentList.list = commentList.list.concat(tempList);
    }

    commentList.total = data.total || 0;

    if (type === "reset" && data.list?.length == pageInfo.pageSize) {
        pageInfo.haveMore = true;
    } else if (data.list?.length < pageInfo.pageSize) {
        pageInfo.haveMore = false;
    }

    searchLoading.value = false;
}
</script>

<style lang="less" scoped>
// @import url('@/assets/less/common.less');
.cmt {
    padding: 24px 0;
    background: #fff;

    &__head {
        margin: 0 0 24px 0;
        .flex(center,space-between);
    }

    &__title {
        font-size: 32px;
        color: #000000;
        font-weight: 600;
        cursor: pointer;
    }

    &__extra {
        display: inline-flex;
    }

    &__block {
        padding: 0 12px;
        width: fit-content;
        height: 36px;
        line-height: 36px;
        background: #f4f8ff;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        color: #217fff;

        .flex(center,center);
        user-select: none;
        cursor: pointer;

        &_img {
            width: 14px;
            height: 14px;
        }
    }

    &__block:first-child {
        margin: 0 8px 0 0;
    }

    &__active {
        background-color: #217fff;
        color: #fff;
    }

    &__footer {
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }
}
</style>
