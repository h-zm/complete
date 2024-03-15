<template>
    <div>
        <el-upload
            class="upload-demo"
            drag
            action="#"
            :http-request="detailUpload"
            :show-file-list="showFile"
            :multiple="multiple"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
                * 建议上传9:16 / 16:9 的图片或视频
            </div>
        </el-upload>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "nuxt-property-decorator";
let config = require("~/config/index");
@Component({})
export default class Xhm extends Vue {
    // 上传路径
    @Prop({
        type: String,
        default: `${config.upImgUrl}/material/convert`
    })
    postUrl?: string;

    // 是否展示文件列表
    @Prop({
        type: Boolean,
        default: false
    })
    showFile?: boolean;

    // 是否可多选
    @Prop({
        type: Boolean,
        default: true
    })
    multiple?: boolean;

    // 上传方式 1 单文件  2 压缩包
    @Prop({
        type: String,
        default: "1"
    })
    radio?: string;

    // 上传框大小
    @Prop({
        type: String,
        default: "size"
    })
    size?: string;

    // 上传框大小 1数字 2百分
    @Prop({
        type: Number,
        default: 1
    })
    progressType?: number;

    // 是否全部取消上传
    @Prop({
        type: Boolean,
        default: false
    })
    cancelUpload?: boolean;
    @Watch("cancelUpload", { deep: true })
    getCancel(data: any) {
        if (data) {
            // 挨个终止上传
            this.fileList.forEach((file: any) => {
                file.xhrObj.abort();
            });

            this.fileList = [];
        }
    }

    // 单个的取消上传
    @Prop({
        required: false,
        default: ""
    })
    cancelOner?: "";

    @Watch("cancelOner", { deep: true })
    getCancelOber(uidData: any) {
        if (uidData) {
            // 根据对应的findIndex取消再踢除
            let findIndex = this.fileList.findIndex(
                (file: any) => file.xhrUid == uidData
            );
            this.fileList[findIndex].xhrObj.abort();
            this.fileList.splice(findIndex, 1);
        }
        // console.log(this.fileList, '取消上传后的列表');
    }

    fileList: any = []; // 上传列表

    // 上传方法
    public detailUpload(content: any) {
        // 重新上传时 重置单个取消上传的值
        this.$emit("updateCancel", "");
        let { guid, token } = this.$store.state.user;
        // console.log(content, '请求信息');
        let formData = {
            file: content.file,
            type: this.radio,
            guid,
            token
        };
        // console.log(content.file.uid, '调用上传');
        this.xhrRequest(this.postUrl, "POST", formData);
    }

    // 获取剪贴板中的数据
    public getClipboard() {
        if (window?.navigator) {
            // 获取非文本内容如 类型等
            navigator.clipboard
                .read()
                .then(clipboardItems => {
                    console.log("复制的原始数据", clipboardItems);
                    for (const clipboardItem of clipboardItems) {
                        if (
                            !JSON.stringify(clipboardItem.types).includes(
                                "image/"
                            )
                        ) {
                            this.$message({
                                type: "error",
                                message: "获取失败，当前剪贴板数据类型不是图片",
                                showClose: true
                            });
                            continue;
                        }

                        let tempItem = {
                            name: ""
                        };

                        for (const type of clipboardItem.types) {
                            // 可能是名字等文本信息
                            if (type.includes("text/")) {
                                // text/plain 只是文本信息 text/html 返回的是带样式标签的html
                                clipboardItem.getType(type).then(textItem => {
                                    textItem.text().then(resStr => {
                                        // console.log('文本数据', resStr);
                                        if (type == "text/plain") {
                                            tempItem.name = resStr;
                                        } else {
                                            /**
                                             * 复制的图片可能来源于页面 是 <img src="" />
                                             *
                                             * 也可能来自微信截图工具 不带有text信息
                                             *
                                             * 也可能来自其他网页其他格式 如base64
                                             *
                                             * 先暂时以时间戳命名
                                             *  */
                                            tempItem.name =
                                                "文件" + new Date().valueOf();
                                        }
                                    });
                                });
                            } else if (type.includes("image/")) {
                                // 图片内容
                                clipboardItem.getType(type).then(imageItem => {
                                    // console.log('图片数据', imageItem);
                                    let timeNum = new Date().valueOf();
                                    let fileName =
                                        timeNum +
                                        "." +
                                        imageItem.type.split("/")[1];
                                    let file = new File([imageItem], fileName, {
                                        type: imageItem.type,
                                        lastModified: timeNum
                                    });
                                    // console.log('文件参数', file);
                                    // 将操作类型更新为图片类型 便于后续展示
                                    this.nowType = "image";
                                    this.submitUpload(file);
                                });
                            }
                            // we can now use blob here
                        }
                    }
                })
                .catch(err => {
                    console.log("获取剪贴板数据失败", err);
                    /**
                     *  通过在文件系统里拷贝的好像读取不了
                     */
                    this.$message({
                        type: "error",
                        message: "当前操作类型不支持或者剪贴板数据为空",
                        showClose: true
                    });
                    return;
                });
        }
    }

    // xhm实例
    public xhrRequest(
        url: any = "",
        method: any = "GET",
        bodyData: any = {},
        isAsync: any = true,
        setReqObj: any = {}
    ) {
        const xhr = new XMLHttpRequest();

        // 初始化请求
        // 如果multipart属性为true则isAsync属性必须为true，否则将引发异常。
        xhr.open(method, url, isAsync);

        // 设置超时时间 会提示失败
        // if (isAsync) {
        //     xhr.timeout = 15000;
        // }

        // 设置请求头信息
        if (Object.keys(setReqObj)?.length) {
            for (let i of Object.keys(setReqObj)) {
                xhr.setRequestHeader(i, setReqObj[i]);
            }
        } else {
            // 默认
            xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
        }

        // 请求开始
        xhr.onloadstart = start => {
            // console.log('请求开始', start);
            this.$emit("uploadBack", {
                type: "progress",
                data: Object.assign(
                    {},
                    {
                        percentNum: this.progressType == 1 ? 0 : "0%",
                        uid: bodyData.file.uid,
                        name: bodyData.file.name
                    }
                )
            });
        };

        xhr.onload = load => {
            let response: any = JSON.parse(xhr.response);
            // console.log(response, '打印结果 ');
            // 添加时长参数
            if (!response.data[0].duration) {
                response.data[0].duration = 0;
            }
            this.$emit("uploadBack", {
                type: "success",
                data: Object.assign({}, response, {
                    percentNum: this.progressType == 1 ? 100 : "100%",
                    uid: bodyData.file.uid,
                    name: bodyData.file.name
                })
            });
        };

        // 请求结束
        xhr.onloadend = end => {
            // console.log('请求结束', end);
        };

        xhr.onabort = abort => {
            console.log(`被停止的信息：${JSON.stringify(abort)}`);
        };

        // 请求报错
        xhr.onerror = error => {
            // console.log('失败：', error);
            // Promise.reject
            this.$emit("uploadBack", {
                type: "error",
                data: Object.assign({}, error, {
                    uid: bodyData.file.uid,
                    name: bodyData.file.name
                })
            });
        };

        // 监听状态变化
        xhr.onreadystatechange = ready => {
            // console.log(ready, `状态变化${bodyData.file.uid}`);
        };

        // 会在请求接收到数据的时候被周期性触发。
        xhr.onprogress = progress => {
            // console.log(progress, `数据接收到${bodyData.file.uid}`);
        };

        // 获取上传进度
        xhr.upload.onprogress = progress => {
            // console.log('进度', progress);

            // // 在上传进度里主动取消所有上传
            // if (this.cancelUpload) {
            //     xhr.abort();
            //     return;
            // }

            // // 在上传进度里取消单个上传
            // // console.log(this.cancelOner, bodyData.file.uid, 'sadf1');
            // if (this.cancelOner == bodyData.file.uid) {
            //     xhr.abort();
            //     // console.log(this.cancelOner, '匹配要取消的上传');
            //     return this.$emit('updateCancel', '');
            // }

            // 进度百分比 progress.loaded / progress.total

            // percentNum 是上传进度 达到100不一定接口返回了 所以设置最大值 99
            // 等待接口有数据返回了 再变化到100
            let percentNum: any = "";
            if ((progress.loaded / progress.total) * 100 >= 99) {
                percentNum = 99;
            } else {
                percentNum = Number(
                    ((progress.loaded / progress.total) * 100).toFixed(1)
                );
                // percentNum = Math.floor((progress.loaded / progress.total) * 100);
            }

            if (this.progressType == 2) {
                percentNum += "%";
            }

            this.$emit("uploadBack", {
                type: "progress",
                data: Object.assign(
                    {},
                    {
                        percentNum: percentNum,
                        uid: bodyData.file.uid,
                        name: bodyData.file.name
                    }
                )
            });
        };

        // 超时
        xhr.ontimeout = () => {
            this.$message.warning("Timeout!!");
        };

        let formData = new FormData();

        for (let i of Object.keys(bodyData)) {
            formData.append(i, bodyData[i]);
        }

        // 发送请求
        // console.log('开始上传', bodyData.file.uid);
        this.fileList.push({
            xhrObj: xhr,
            xhrUid: bodyData.file.uid
        });
        xhr.send(formData);
    }
}
</script>

<style lang="less">
@import "~assets/less/index.less";
</style>
