// 中间件添加到page/test页面
/**
 * route, isStatic俩个参数是来自 context 中的
 * 此处是进行了对象赋值
 * @param { route, isStatic } param0
 */
export default function({ route, isStatic }) {
  // console.log("单页面调用", route);
  console.log("单页面调用isStatic", isStatic);
}
