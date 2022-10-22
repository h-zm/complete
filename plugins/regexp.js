// exec() 这个方法只接收一个参数，即要应
// 用模式的字符串。如果找到了匹配项，则返回包含第一个匹配信息的数组；如果没找到匹配项，则返回
// null。返回的数组虽然是 Array 的实例，但包含两个额外的属性：index 和 input。index 是字符串
// 中匹配模式的起始位置，input 是要查找的字符串。

// match() 返回符合检测条件的数组

// 常用标记
//  g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。
//  i：不区分大小写，表示在查找匹配时忽略 pattern 和字符串的大小写。
//  m：多行模式，表示查找到一行文本末尾时会继续查找。
//  y：粘附模式，表示只查找从 lastIndex 开始及之后的字符串。
//  u：Unicode 模式，启用 Unicode 匹配。
//  s：dotAll 模式，表示元字符.匹配任何字符（包括\n 或\r）。

// 每个 RegExp 实例都有下列属性，提供有关模式的各方面信息。
//  global：布尔值，表示是否设置了 g 标记。
//  ignoreCase：布尔值，表示是否设置了 i 标记。
//  unicode：布尔值，表示是否设置了 u 标记。
//  sticky：布尔值，表示是否设置了 y 标记。
//  lastIndex：整数，表示在源字符串中下一次搜索的开始位置，始终从 0 开始。(也可以理解为最后一个元素的索引)
//  multiline：布尔值，表示是否设置了 m 标记。
//  dotAll：布尔值，表示是否设置了 s 标记。
//  source： 正 则 表 达 式 的 字 面 量 字 符 串 （ 不 是 传 给 构 造 函 数 的 模 式 字 符 串 ）， 没 有 开 头 和 结 尾 的
// 斜杠。
//  flags：正则表达式的标记字符串。始终以字面量而非传入构造函数的字符串模式形式返回（没
// 有前后斜杠）。

// 检查是否使用了全局
/**
 * @param {*} regFactor 检验目标元素
 * @param {*} data 源数据
 */
export function globalJudge(regFactor) {
    if (regFactor.global) {
        return true;
    } else {
        return false;
    }
}

// 检验出现次数
/**
 * @param {*} regFactor 检验目标元素
 * @param {*} data 源数据
 * @returns
 */
export const testTimes = (regFactor, data) => {
    let testReg = "/" + regFactor + "/g";
    return data.match(testReg).length;
};

// 全局检验是否出现
/**
 * @param {*} regFactor 检验目标元素
 * @param {*} data 源数据
 */
export function globalJudge(regFactor, data) {
    let testReg = "/" + regFactor + "/g";
}
