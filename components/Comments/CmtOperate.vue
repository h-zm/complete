<template>
    <div class="oprt">
        <div class="oprt__main">
            <slot name="comment-text"></slot>
            <div class="oprt__area">
                <!-- 回复区域 -->
                <div class="oprt__it" @click.stop="handleReply">
                    <template v-if="commentStore.replyId !== cmtInfo.id">
                        <img class="oprt__it_img" :src="replyImg" alt="" />
                        <span>回复</span>
                    </template>
                    <template v-else>
                        <img class="oprt__it_img" :src="replying" alt="" />
                        <span class="oprt__pimary">取消</span>
                    </template>
                </div>
                <!-- 点赞区域 -->
                <div class="oprt__it" @click.stop="handleLike">
                    <img
                        v-if="replyLikeFlag"
                        class="oprt__it_img"
                        :src="likeImg"
                        alt=""
                    />
                    <img v-else class="oprt__it_img" :src="nolikeImg" alt="" />
                    <span :class="{ oprt__pimary: replyLikeFlag }">
                        {{ replyLikeCount ? replyLikeCount : "点赞" }}
                    </span>
                </div>
                <!-- 其他操作 -->
                <a-dropdown
                    v-if="user?.userId == cmtInfo.userId"
                    :disabled="dropLoading"
                    placement="bottomRight"
                >
                    <div class="oprt__it" @click.prevent>
                        <img class="oprt__it_img" :src="moreImg" alt="" />
                    </div>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="0" @click="judgeDel">
                                删除
                            </a-menu-item>
                            <!-- <a-menu-item  key="1"> 举报 </a-menu-item> -->
                        </a-menu>
                    </template>
                </a-dropdown>
                <div v-else class="oprt__it_img"></div>
            </div>
        </div>

        <!-- 删除提示框 -->
        <DelDialog
            v-model:value="dialogValue"
            dialogText="确认删除该评论吗?"
            :loading="dropLoading"
            @handlModal="handlModal"
        ></DelDialog>

        <CmtInput
            v-if="commentStore.replyId == cmtInfo.id"
            :loading="replyLoading"
            key="replyInput"
            :autoFocus="true"
            @handleBack="inputBack"
        ></CmtInput>
    </div>
</template>

<script setup>
import { ref } from "vue";
import replyImg from "@/assets/comment/reply.png";
import replying from "@/assets/comment/replying.svg";
import likeImg from "@/assets/comment/like.png";
import nolikeImg from "@/assets/comment/nolike.png";
import moreImg from "@/assets/comment/more.png";
// import useCommentStore from "@/stores/comment";
import CmtInput from "./CmtInput.vue";
// import DelDialog from "../DelDialog/index.vue";
// import { createReply, likeReply, delelteReply } from "@/apis/comment";
import { _debounce } from "@/plugins/util";
import { zh_CN } from "./messages";

const emits = defineEmits(["handleInput", "handleDel"]);

const props = defineProps({
    cmtInfo: {
        type: Object,
        default: () => {},
    },
    parentId: {
        type: Number,
        default: 0,
    },
});

const replyLikeFlag = ref(0);

const replyLikeCount = ref(0);

watch(
    () => props.cmtInfo,
    (newV) => {
        // console.log('dsaf', newV)
        replyLikeFlag.value = newV.likeFlag;
        replyLikeCount.value = newV.likeCount;
    },
    {
        immediate: true,
        deep: true,
    }
);

const replyLoading = ref(false);

const dropLoading = ref(false);

const dialogValue = ref(false);

// const mockItem = {
//   id: Math.random() * 10000,
//   articleId: 11,
//   userId: 1,
//   userName: '用户' + Math.random() * 10000,
//   replyId: '1234',
//   replyUserId: 2,
//   replyUserName: '用户1',
//   deleteState: null,
//   createTime: '2024-02-21T07:59:08.185+00:00',
//   updateTime: '2024-02-21T07:59:08.185+00:00',
//   content: '324',
//   userHeadUrl: 'http',
//   visitCount: null,
//   replyCount: 1,
//   likeCount: 1,
//   markCount: null,
//   replyState: null,
//   likeFlag: 0
// }

// 回复开关
function handleReply() {
    if (!isLogin.value) {
        createMessage.warn(zh_CN.INPUT_NONE);
        return;
    }
    if (commentStore.replyId === props.cmtInfo.id) {
        commentStore.SET_REPLYID("");
    } else {
        commentStore.SET_REPLYID(props.cmtInfo.id);
    }
}

// 回复评论
async function inputBack(data) {
    // console.log(`回复${props.cmtInfo.id}`, data)
    replyLoading.value = true;
    const backData = await createReply({
        articleId: props.cmtInfo.articleId,
        replyId: props.parentId ? props.parentId : props.cmtInfo.id,
        replyUserId: props.cmtInfo.userId,
        replyUserName: props.cmtInfo.userName,
        content: data,
        userHeadUrl: "",
    });
    if (backData.success) {
        createMessage.success(zh_CN.REPLY_REPLY);
        emits("handleInput", backData.data);
        commentStore.SET_REPLYID("");
    }
    replyLoading.value = false;
}

const handleLike = _debounce(async () => {
    if (!isLogin.value) {
        createMessage.warn(zh_CN.INPUT_NONE);
        return;
    }
    // 帖子评论现只要赞(1)与不赞(0)俩种状态
    let temp = replyLikeFlag.value === 1 ? 0 : 1;
    const backData = await likeReply({
        articleId: props.cmtInfo.articleId,
        replyId: props.cmtInfo.id,
        likeFlag: temp,
    });
    if (backData.success) {
        replyLikeFlag.value = temp;
        replyLikeCount.value = backData.data.likeCount;
        if (temp) {
            createMessage.success(zh_CN.REPLY_LIKE);
        } else {
            createMessage.success(zh_CN.REPLY_REVOKE);
        }
    }
}, 500);

function judgeDel() {
    if (!isLogin.value) {
        createMessage.warn(zh_CN.INPUT_NONE);
        return;
    }

    dialogValue.value = true;
}

async function handleDel() {
    if (dropLoading.value) {
        return;
    }

    dropLoading.value = true;

    // emits('handleDel', props.cmtInfo.id)
    // dropLoading.value = false

    const backData = await delelteReply({
        replyId: props.cmtInfo.id,
    });
    dropLoading.value = false;
    if (backData.success) {
        createMessage.success(zh_CN.REPLY_DEL);
        emits("handleDel", props.cmtInfo.id);
        dialogValue.value = false;
    }
}

function handlModal(data) {
    if (data == "sure") {
        handleDel();
    } else {
        dialogValue.value = false;
    }
}
</script>

<style lang="less" scoped>
.oprt {
    margin: 0 0 20px 0;

    &__main {
        .flex(flex-start,space-between);
    }

    &__area {
        margin: 0 0 0 20px;
        flex-shrink: 0;
        .flex(flex-start);
    }

    &__pimary {
        color: #217fff;
    }

    &__it {
        height: 20px;
        line-height: 20px;
        color: #797c80;
        cursor: pointer;
        font-weight: 500;
        .flex(center);

        &_img {
            margin: 0 5px 0 0;
            width: 14px;
            height: 14px;
        }
    }

    &__it:not(:last-child) {
        margin: 0 20px 0 0;
    }
}
:deep(.ant-dropdown-menu-item) {
    width: 100px;
    height: 40px;
    text-align: center;
    font-size: 14px;
    color: #080304;
}
</style>
