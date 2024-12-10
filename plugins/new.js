// 模拟 new 关键字
function fakeNew(func, ...args) {
    // 1.创建一个新对象
    let obj = {};
    // 2.将新对象的原型指向到 func
    obj.__proto__ = func.__proto__;
    // 3.将传入的函数赋予新对象使用，也可以理解为将当前函数this指向新对象
    let result = Func.apply(obj, ...args);
    // 4.返回
    return result instanceof Object ? result : obj;
}
