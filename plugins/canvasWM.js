// 声明水印
export const mountWM = ({
    container = document.body,
    width = "400px",
    height = "250px",
    textAlign = "left",
    textBaseline = "bottom",
    fontFamily = "Microsoft Yahei",
    fontSize = 18,
    fillStyle = "rgba(184, 184, 184, 0.5)",
    content = "水印",
    rotate = -15,
    zIndex = 900,
} = {}) => {
    // html2canvas 插件也可以使用，思路都是通过canvas生成DataURL设置为background-image;
    const args = arguments[0];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    const ctx = canvas.getContext("2d");

    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fillStyle;

    // rotate取值范围是0～1，即rotate只能在0到45度内，所以换到下方的 transform 实现
    // ctx.rotate((rotate * Math.PI) / 180);

    if (Array.isArray(content)) {
        content.forEach((it, index) => {
            ctx.fillText(it, fontSize, (index + 1) * fontSize);
        });
    } else {
        ctx.fillText(content, fontSize, fontSize);
    }

    const base64Url = canvas.toDataURL();
    const __wm = document.querySelector(".__wm");
    const watermarkDiv = __wm || document.createElement("div");

    const styleStr = `
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        width:100%;
        height:100%;
        z-index:${zIndex};
        pointer-events:none;
        background-repeat:repeat;
        transform: rotate(${rotate}deg);
        background-image:url('${base64Url}')`;

    watermarkDiv.setAttribute("style", styleStr);
    watermarkDiv.classList.add("__wm");

    if (!__wm) {
        container.style.position = "relative";
        container.insertBefore(watermarkDiv, container.firstChild);
    }

    // const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    // if (MutationObserver) {
    //   let mo = new MutationObserver(function () {
    //     const __wm = document.querySelector('.__wm');
    //     // 只在__wm元素变动才重新调用 mountWM
    //     if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
    //       // 避免一直触发
    //       mo.disconnect();
    //       mo = null;
    //       mountWM(JSON.parse(JSON.stringify(args)));
    //     }
    //   });

    //   mo.observe(container, {
    //     attributes: true,
    //     subtree: true,
    //     childList: true,
    //   });
    // }
};

// if (typeof module != "undefined" && module.exports) {
// 	//CMD
// 	module.exports = canvasWM;
// } else if (typeof define == "function" && define.amd) {
// 	// AMD
// 	define(function() {
// 		return canvasWM;
// 	});
// } else {
// 	window.canvasWM = canvasWM;
// }

// 清除水印
export const destoryWM = () => {
    const target = document.querySelector(".__wm");
    if (target) {
        document.body.removeChild(target);
    }
};
