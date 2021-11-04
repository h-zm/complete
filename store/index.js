export const state = () => ({
    age: 20,
    name: "hzm",
    love: "快乐",
    todos: [
        { id: 1, text: "--职位1--", done: true },
        { id: 2, text: "--职位2--", done: true },
        { id: 3, text: "--职位3--", done: false },
        { id: 4, text: "--职位4--", done: true },
        { id: 5, text: "--职位5--", done: false }
    ]
});

export const getters = {
    doneTodos: state => {
        // 返回了dome都是true的数据项
        return state.todos.filter(todo => todo.done);
    },
    noTodos: state => {
        // 返回了dome都是true的数据项
        return state.todos.filter(todo => false);
    }
};

export const mutations = {
    /**
     * @param  {} state 上方定义的状态 newData赋予的新值
     */
    setName(state, newData) {
        state.name = newData;
    },
    setAge(state, newData) {
        state.age = newData;
    },

    ["SET_LOVE"](state, newData) {
        state.love = newData;
    }
};

export const actions = {
    // 状态树中指定了 nuxtServerInit 方法，Nuxt.js 调用它的时候会将页面的上下文对象作为第 2 个参数传给它（服务端调用时才会酱紫哟）。当我们想将服务端的一些数据传到客户端时，这个方法是灰常好用的,可以使用通过context中的app使用axios,app.$axios,
    // plugin和nuxtServerInit仅在首次刷新页面时会执行，后续点击页面内跳转不会再执行plugin和nuxtServerInit中的方法。如果打开新页面会再次触发plugin和nuxtServerInit方法。如果 nuxt generate 运行， nuxtServerInit 将为每个生成的动态路由执行
    nuxtServerInit({ commit }, { req, app, params, route, query }) {
        // if (req.session.user) {
        //     commit("user", req.session.user);
        // }
        console.log("当前路径参数信息:", params);
    },
    userInfo(commit) {
        // 添加拦截 设置一些参数
        // 其他页面调用时 this.$store.commit(methodName,data)
        commit("setName", newData);
    }
};

// export const mapState({
//   userInfo: state, // 用户信息
// });
