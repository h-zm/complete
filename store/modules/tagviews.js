import { state } from "..";

function capitalizeFirstLetter(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default {
    // 命名隔离，避免不用模块之间的冲突
    namespaced: true,
    state: () => ({
        MAXCOUNT: 16,
        visitedViews: [],
        cachedViews: []
    }),
    mutations: {
        // commit 触发
        ADD_VIEW(state, data) {
            let isExist = state.visitedViews.find(
                item => item.path === data.path
            );
            if (!isExist) {
                state.visitedViews.push(data);
            }
        },
        ADD_CACHED(state, path) {
            let isExist = state.cachedViews.find(item => item === path);
            if (!isExist) {
                state.cachedViews.push(path);
            }
        }
    },
    actions: {
        // dispatch 触发
        addView(context, data) {
            const { path, fullPath, name, meta } = data.matched[0];
            context.commit("ADD_VIEW", {
                path,
                name: capitalizeFirstLetter(name),
                meta
            });
            context.commit("ADD_CACHED", path);
        },
        delView({ commit }, data) {}
    },
    getters: {}
};
