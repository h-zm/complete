module.exports = {
    // 开发环境
    development: {
        NODE_ENV: "development",
        BASE_API: "dev"
    },
    // 测试环境
    test: {
        NODE_ENV: "test",
        BASE_API: "test"
    },
    // 生产环境
    produtiob: {
        NODE_ENV: "production",
        BASE_API: "pro" // 正式服务器地址
    }
};
