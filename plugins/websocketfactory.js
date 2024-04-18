const { clear } = require("echarts/types/src/util/throttle.js");
const { values } = require("lodash");
const { reset } = require("nodemon");

// 实例
var webSocket = null;
// url ws普通协议 wss具有http加密协议
var webSocketUrl = null;
// 是否已连接
var isConnect = false;
// 回调函数
var callback = null;
// 重连次数
var reconnectNum = 0;

// 心跳设置
var heartCheck = {
    // 心跳包
    heartbeatData: {
        // 设备ID
        deviceId: {
            value: "",
        },
        devHeart: {
            value: 1,
        },
    },
    // 心跳间隔
    timeout: 60 * 1000,
    heartbeat: null, // 延时发送消息对象（启动心跳新建，收到消息重置）
    start: function () {
        this.heartbeat = setInterval(() => {
            if (isConnect) {
                webSocketSend(this.heartbeatData);
            } else {
                this.clear();
            }
        }, this.timeout);
    },
    reset: function () {
        clearInterval(this.heartbeat);
        this.start();
    },
    clear: function () {
        clearInterval(this.heartbeat);
    },
};

// 初始化
function initWebSocket(callback) {
    if (callback) {
        if (typeof callback == "function") {
            callback = callback;
        } else {
            throw new Error("callback is not a function");
        }
    }

    if ("webSocket" in window) {
        // window 对象有 webSocket 属性
        webSocket = new WebSocket(webSocketUrl);
    } else {
        // window 对象没有 webSocket 属性
        console.log("WebSocket is not supported.");
        return;
    }

    // 打开
    webSocket.open = function () {
        webSocketOpen();
    };
    // 接收
    webSocket.onmessage = function (e) {
        webSocketOnMessage(e);
    };
    // 关闭
    webSocket.onclose = function (e) {
        webSocketOnClose(e);
    };
    // 报错处理
    webSocket.onerror = function (e) {
        webSocketOnError(e);
    };
}

// 完成连接时触发
function webSocketOpen() {
    console.log("websocket: 连接成功");

    // 首次握手
    webSocketSend(heartCheck.heartbeatData);
    isConnect = true;
    heartCheck.start();
    reconnectNum = 0;
}

// 处理接收数据 传递blob、字节或者字符串信息，如果是对象可能需要JSON处理
function webSocketOnMessage(e) {
    console.log("websocket message: ", e.data);
    const data = JSON.parse(e.data); // 支持类型扩展
    callback && callback(data);
}

// 关闭时触发
function webSocketOnClose(e) {
    heartCheck.clear();
    isConnect = false;
    console.log("websocket: 连接关闭");
    // 被动断开 进行重新连接
    if (e.code === 1006) {
        if (reconnectNum < 3) {
            initWebSocket();
            ++reconnectNum;
        } else {
            console.log("websocket: 连接不上 请刷新页面或联系开发");
        }
    }
}

// 处理连接错误
function webSocketOnError(e) {
    heartCheck.clear();
    isConnect = false;
    console.log("websocket: 连接错误", e);
}

// 发送数据
function webSocketSend(data) {
    webSocket.send(JSON.stringify(data)); // 支持类型扩展
}

// 主动关闭
function closeWebSocket(e) {
    webSocket.close();
    heartCheck.clear();
    isConnect = false;
    reconnectNum = 0;
}

// 可以在其他页面更换回调
function getSock(e) {
    callback = e;
}

// 可以在其他页面调用 发送数据
function sendSock(agentData) {
    switch (webSocket.readyState) {
        case 0:
            //  webSocket.CONNECTING 正在连接中
            setTimeout(function () {
                sendSock(agentData, callback);
            }, 1000);
            break;
        case 1:
            // 连接成功 webSocket.open
            webSocketSend(agentData);
        case 2:
            // 连接关闭中 webSocket.CLOSING
            setTimeout(function () {
                sendSock(agentData, callback);
            }, 1000);
        case 3:
            // 连接已关闭 webSocket.CLOSED
            break;
        default:
            break;
    }
}

export default {
    initWebSocket,
    closeWebSocket,
    sendSock,
    getSock,
};
