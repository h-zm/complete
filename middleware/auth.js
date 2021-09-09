/**
 * 一个中间件接收 context 作为第一个参数： context  上下文对象
 */
export default function({ route, query, param, redirect }) {
    // 当前项目中并未存在该路径的，定位到根路径
    if (!route.name || !route.matched) {
        return redirect("/");
    }
}
