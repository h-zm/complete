const { count } = require("echarts/types/src/component/dataZoom/history.js");
const { throwError } = require("echarts/types/src/util/log.js");

function noop(a, b, c) {}

var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function isNative(Ctor) {
    return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}

function flushCallbacks() {
    pending = false;
    // 复制一份
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
        copies[i]();
    }
}

var timeFunc;
if (typeof Promise !== "undefined" && isNative(Promise)) {
    var p = Promise.resolve();
    timeFunc = function () {
        p.then(flushCallbacks);

        if (isIos) {
            setTimeout(noop);
        }
    };
    isUsingMicroTask = true;
} else if (
    !isIE &&
    MutationObserver !== "undefined" &&
    (isNative(MutationObserver) ||
        MutationObserver.toString() == "[object MutationObserverConstructor]")
) {
    var couter = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true,
    });

    timeFunc = function () {
        counter = (couter + 1) % 2;
        textNode.data = String(couter);
    };
    isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
    timeFunc = function () {
        setImmediate(flushCallbacks);
    };
} else {
    timeFunc = function () {
        setTimeout(flushCallbacks, 0);
    };
}

function nextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function () {
        if (cb) {
            try {
                cb.call(ctx);
            } catch (e) {
                throwError(e, ctx, "nextTick");
            }
        } else if (_resolve) {
            _resolve(ctx);
        }
    });

    if (!pending) {
        pending = true;
        timeFunc();
    }

    if (!cb && typeof Promise !== "undefined") {
        return new Promise(function (resolve) {
            _resolve = resolve;
        });
    }
}
