var version = "1.0.11";
let baseUrl = "";
let processInfo = process;
// process 不一定能打印出来 但是可以通过判定进行设置
if (process.env.NODE_ENV == "development") {
    baseUrl = "devApi";
} else if (process.env.NODE_ENV == "test") {
    baseUrl = "testApi";
} else if (process.env.NODE_ENV == "production") {
    baseUrl = "productionApi";
} else {
    baseUrl = "devApi";
}
module.exports = {
    version,
    processInfo,
    baseUrl,
    turingUrl: "https://api.turingtopia.com",
    fanyiUrl: "https://fanyi.baidu.com/v2transapi", // 百度翻译用的http2协议的
    youdaoUrl: "http://fanyi.youdao.com/translate_o"
};
