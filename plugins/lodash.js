import { debounce, throttle } from "lodash";

const debounceOptions = {
    // 指定在延迟开始前调用。
    leading: false,
    // 设置 func 允许被延迟的最大值。
    maxWait: 1000,
    // 指定在延迟结束后调用。
    trailing: true,
};

const throttleOptions = {
    // 指定在延迟开始前调用。
    leading: true,
    // 指定在延迟结束后调用。
    trailing: true,
};

/**
 *
 * @param {*} func  要防抖动的函数。
 * @param {*} wait  需要延迟的毫秒数。
 * @param {*} options  选项对象。
 * @returns
 */
export function useDebounce(func, wait = 1000, options = debounceOptions) {
    return debounce(func, wait, options);
}

/**
 *
 * @param {*} func  要节流的函数。
 * @param {*} wait  需要节流的毫秒。
 * @param {*} options  选项对象。
 * @returns
 */
export function useThrottle(func, wait = 1000, options = throttleOptions) {
    return throttle(func, wait, options);
}
