import mitt from "mitt";

const emitter = mitt();

/** eventKey 为自定的事件名
 *  emitter.emit 注册事件 eg: emitter.emit('eventKey',data)
 *  emitter.on 监听事件  eg: emitter.on('eventKey',(data) => {});
 *      页面多次调用 emitter.on 不会替换上一次的事件，相反会生成多个同名的事件， 当 emitter.emit 触发时会执行emitter.on多次（注册了几个就执行几次），所以当页面注销时请调用 emitter.off 注销监听事件，具体可查看 scrollNumber 页面演示
 *  emitter.off 注销监听事件 emitter.off('eventKey')
 *  emitter.once 只触发一次
 */

export default emitter;
