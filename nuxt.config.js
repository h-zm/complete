import { fanyiUrl, baseUrl, youdaoUrl } from "./config/index";
import path from "path";
import fs from "fs";
export default {
  // 在 nuxt.config.js 中配置你想引用的资源文件
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["element-ui/lib/theme-chalk/index.css", "assets/css/transition.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/element-ui",
    "@/plugins/axios",
    "@/plugins/cookies",
    "@/plugins/copy",
    "@/plugins/constructor",
    { src: "@/plugins/notification", mode: "client" }
    /**
     * ssr 不支持 ssr 的系统，插件只在浏览器里使用，这种情况下下，你可以用 ssr: false ，使得插件只会在客户端运行
     * 由于Nuxt.js 2.4，模式已被引入作为插件的选项来指定插件类型，可能的值是：client 或 server, ssr:false 在下一个主要版本中弃用,将过渡为 mode: 'client'。 client 客户端 server 浏览器
     */
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    proxy: true
  },

  proxy: {
    "/api": {
      target: fanyiUrl,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/"
      }
    },
    /**
     * // pathRewrite中"^/api"对应的值是"/"或''效果是一样 不会重写写/api指向
     * "^/api": "/"  中的^是正则符表示从头开始匹配第一个出现的
     * eg:
     *    配置时为 "^/api": "/sac"
     *      请求的地址是 /api/same ,proxy就会转化为 fanyiUrl/sac/same 类似与一个替换效果
     *    配置时为 "^/api": "/"
     *      请求的地址是 /api/same ,proxy就会转化为 fanyiUrl/same
     *    配置时为 "^/": "/other" 替换首个/
     *      请求的地址是 /api/same ,proxy就会转化为 fanyiUrl/other/api/same
     *    配置时为 "^/api/test": "/" 替换首个/
     *      请求的地址是 /api/test/same ,proxy就会转化为 fanyiUrl/same
     *    配置时为 "^/api/old": "/new"
     *      请求的地址是 /api/old/same ,proxy就会转化为 fanyiUrl/new/same
     * 参考地址 https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/pathRewrite.md#rewrite-paths
     */
    "/turing": {
      target: baseUrl,
      changeOrigin: true,
      pathRewrite: {
        //如果pathRewrite中有多个替换逻辑，会从上到下的顺序遇到符合的匹配规则执行且不再往执行后面的匹配规则
        //这里先写的/turing/test再写的/turing，是因为/turing也可以匹配到/turing/test导致匹配失败 ，所以放在末尾
        "^/turing/test": "/tllbManagement",
        "^/turing": "/"
      }
    },
    // ws: true websocket
    "/youdao": {
      target: youdaoUrl,
      changeOrigin: true,
      pathRewrite: {
        "^/youdao": "/"
      }
    }
  },
  /**
   * 注册模块时可以使用顶级选项更方便，这允许我们组合多个选项源
   *
    modules: [['@nuxtjs/axios', { anotherOption: true }]],
    axios: {
      option1,
      option2
    }
   */

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/], // 如果插件位于node_modules并导出模块，需要将其添加到transpile构建选项：
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  router: {
    /**
     * 每一个中间件应放置在 middleware/ 目录。文件名的名称将成为中间件名称 (middleware/auth.js将成为 auth 中间件)。
     */
    middleware: "auth"
  },
  server: {
    port: "6638",
    host: "0.0.0.0", // localhost时无法通过ip地址访问，0.0.0.0则任务ip都能访问 包括localhost
    timing: {
      total: true
    }
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, "ca.key")), // 密钥
    //   cert: fs.readFileSync(path.resolve(__dirname, "ca.crt")) // 证书
    // }
  },
  render: {
    http2: {
      push: true
      // pushAssets: (req, res, publicPath, preloadFiles) => {
      // let data = {
      //   request: req,
      //   response: res,
      //   path: publicPath,
      //   file: preloadFiles
      // };
      // console.log(data, "pushAssets配置");
      // preloadFiles
      //   .filter(f => f.asType === "script" && f.file === "runtime.js")
      //   .map(f => `<${publicPath}${f.file}>;rel=preload;as=${f.asType}`);
      // }
    }
  }
};
