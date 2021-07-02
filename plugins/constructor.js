class people {
  constructor(userInfo) {
    // this指向当前构造函数下的主体 需要声明的属性或变量都要通过this.
    let example = {
      name: "huang ***",
      year: 20,
      like: "chinese math",
      guid: "12q23dqwe1239213e"
    };
    this.infos = userInfo || example;
  }
  // 方法等写在constructor之外,其内部可以访问constructor内声明属性等, 页面调用通过this.$store.searchInfo() or this.$store.searchInfo('attrName')
  searchInfo(name) {
    // console.log(name, this.infos, "inxi");
    if (name) {
      if (this.infos[name]) {
        return this.infos[name];
      } else {
        return "";
      }
    } else {
      return this.infos;
    }
  }
}

// nuxt框架可以通过inject讲方法或实例挂载到this全局对象上
export default function(context, inject) {
  let { app } = context;
  // console.log("store信息", app);
  inject("info", new people({ name: "huang zm", id: "213qwer123s" }));
}
