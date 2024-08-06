<template>
    <div>
        <!-- 模拟使用canvas标签 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API -->
        <div>
            <div>1.使用canvas画矩形</div>
            <canvas id="firstCanvas"> 当前不支持canvas渲染 </canvas>
        </div>
        <div>
            <h4>2.使用canvas画路径</h4>
            <canvas id="secondCanvas"></canvas>

            <h3>css 实现三角</h3>
            <div class="like-sanjiao"></div>
        </div>
        <div>
            <h4>3.使用arc,moveTo(x,y)画笑脸</h4>
            <canvas id="thirdCanvas"></canvas>
        </div>
        <div>
            <h4>4.使用贝塞尔曲线</h4>
            <h4>二次贝塞尔</h4>
            <canvas id="fourthCanvas"></canvas>
            <h4>三次贝塞尔</h4>
            <canvas id="fourthTwoCanvas"></canvas>
        </div>
        <div>
            <h4>5.使用path2d</h4>
            <canvas id="fiveCanvas"></canvas>
        </div>
        <div>
            <h4>6.显示文字</h4>
            <canvas id="sixCanvas"> current stock price: $3.15 +0.15 </canvas>
        </div>
        <div>
            <h4>7.显示图片</h4>
            <canvas id="sevenCanvas"> </canvas>
            <h4>7.1 css 实现鼠标移入样式</h4>
            <canvas id="sevenCanvas1" class="sevenCanvas1"> </canvas>
            <h4>7.2 canvas reset重绘实现鼠标移入样式更改</h4>
            <canvas id="sevenCanvas2"> </canvas>
            <h4>7.3 canvas click事件</h4>
            <canvas id="sevenCanvas3"> </canvas>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {
        this.drawCanvas();
        this.drawCanvasSecond();
        this.drawThrid();
        this.drawFourth();
        this.handleSeven();
        this.handleSeven1();
        this.handleSeven2();
        this.handleSeven3();
    },
    methods: {
        drawCanvas() {
            console.log("--执行画图--");
            const canvasA = document.getElementById("firstCanvas"); // 使用getElementById获取HTML<canvas>元素的引用
            // const canvasA = document.createElement("canvas"); // 使用getElementById获取HTML<canvas>元素的引用
            if (!canvasA.getContext) {
                console.log("当前不支持canvas渲染");
                return;
            }
            let ctxA = canvasA.getContext("2d"); // HTMLCanvasElement.getContext() 方法获取这个元素的context——图像稍后将在此被渲染。 canvas会初始化宽度为300像素和高度为150像素
            ctxA.fillStyle = "blue"; // fillStyle属性设置样式 // 也可以使用rgba() #fff的方式
            ctxA.strokeRect(10, 10, 150, 100); // strokeRect()方法将它的左上角放在(10, 10)，把它的大小设置成宽150高100。 矩形的边框
            //
            ctxA.fillRect(30, 30, 150, 100); // fillRect()方法将它的左上角放在(10, 10)，把它的大小设置成宽150高100。 填充的矩形
            //
            // ctxA.clearRect(45, 45, 60, 60); // 清除指定矩形区域，让清除部分完全透明
            console.info(ctxA, "ctxA可调用的Api");
            // document.body.appendChild(canvasA);
        },
        drawCanvasSecond() {
            console.log("--执行第二画图--");
            const canvasB = document.getElementById("secondCanvas");
            let ctxB = canvasB.getContext("2d");
            ctxB.beginPath(); // 新建一条路径
            // closePath() // 闭合路径
            // strokPath() // 线条绘制图形轮廓
            //
            ctxB.moveTo(75, 50); //
            ctxB.lineTo(100, 75); //绘制一条x到y的直线
            ctxB.lineTo(100, 25);
            // 通过填充路径的内容区域生成实心的图形
            // ctxB.fill();
            // 通过描边实现
            ctxB.closePath();
            ctxB.stroke();
        },
        drawThrid() {
            const canvasC = document.getElementById("thirdCanvas");
            let ctxC = canvasC.getContext("2d");
            ctxC.beginPath(); // 新建一条路径
            // closePath() // 闭合路径

            // arcTo(x1, y1, x2, y2, radius) 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

            //arc(x,y,r,sAngle,eAngle,counterclockwise	)
            // x 圆的中心的 x 坐标。
            // y 圆的中心的 y 坐标。
            // r 圆的半径
            // sAngle 起始角，以弧度计 （弧的圆形的三点钟位置是 0 度）
            // eAngle 结束角，以弧度计
            // 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。

            ctxC.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制最外面的园
            ctxC.moveTo(110, 75); // 移动
            ctxC.arc(75, 75, 35, 0, Math.PI, false); // 最后的参数接收布尔值 true为逆时针 false为顺时针
            ctxC.moveTo(65, 65); //隐藏moveTo就会看到来连接的实线
            ctxC.arc(60, 65, 5, 0, Math.PI * 2, true);
            ctxC.moveTo(100, 65);
            ctxC.arc(95, 65, 5, 0, Math.PI * 2, true);
            ctxC.stroke(); // 通过线条来绘制图形轮廓。
        },

        drawFourth() {
            // quadraticCurveTo(cp1x, cp1y, x, y)
            // 绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
            // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
            // 绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。

            const canvasD = document.getElementById("fourthCanvas");
            let ctx = canvasD.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(75, 25);
            ctx.quadraticCurveTo(25, 25, 25, 62.5);
            ctx.quadraticCurveTo(25, 100, 50, 100);
            ctx.quadraticCurveTo(50, 120, 30, 125);
            ctx.quadraticCurveTo(60, 120, 65, 100);
            ctx.quadraticCurveTo(125, 100, 125, 62.5);
            ctx.quadraticCurveTo(125, 25, 75, 25);
            // fill 填充
            // ctx.fill();
            // stroke路径
            ctx.stroke();

            const canvasF = document.getElementById("fourthTwoCanvas");
            let ctxFouth = canvasF.getContext("2d");
            ctxFouth.beginPath();
            ctxFouth.moveTo(75, 40);
            ctxFouth.bezierCurveTo(75, 37, 70, 25, 50, 25);
            ctxFouth.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
            ctxFouth.bezierCurveTo(20, 80, 40, 102, 75, 120);
            ctxFouth.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
            ctxFouth.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
            ctxFouth.bezierCurveTo(85, 25, 75, 37, 75, 40);
            ctxFouth.fill();

            const canvasFive = document.getElementById("fiveCanvas");
            let ctxFive = canvasFive.getContext("2d");

            // 调用Path2d
        },

        handleSeven() {
            const targetCanvas = document.getElementById("sevenCanvas");
            const ctx = targetCanvas.getContext("2d");
            const image = new Image();
            image.onload = () => {
                // drawImage(image, x, y, width, height)
                // x,y 是起始位置 width，height 用来设置是否需要缩放
                ctx.drawImage(image, 0, 0, 300, 150);
                ctx.beginPath();
                ctx.rect(0, 0, 300, 150);
                ctx.stroke();
            };
            image.src = "/gundam.png";
        },

        handleSeven1() {
            const targetCanvas = document.getElementById("sevenCanvas1");
            console.log("targetCanvas", targetCanvas.classList);
            const ctx = targetCanvas.getContext("2d");
            const image = new Image();
            targetCanvas.onmouseenter = () => {
                targetCanvas.classList.add("highlight");
            };
            targetCanvas.onmouseout = () => {
                setTimeout(() => {
                    targetCanvas.classList.remove("highlight");
                }, 1000);
            };
            image.onload = () => {
                ctx.drawImage(image, 0, 0, 300, 150);
                ctx.beginPath();
                ctx.rect(0, 0, 300, 150);
                ctx.stroke();
            };
            image.src = "/gundam.png";
        },
        handleSeven2() {
            const targetCanvas = document.getElementById("sevenCanvas2");
            const ctx = targetCanvas.getContext("2d");
            const image = new Image();
            targetCanvas.onmouseenter = () => {
                ctx.reset();
                ctx.drawImage(image, 0, 0, 300, 150);
                ctx.beginPath();
                ctx.rect(0, 0, 300, 150);
                ctx.strokeStyle = "red";
                ctx.stroke();
                console.log("鼠标移入", ctx);
            };
            targetCanvas.onmouseout = () => {
                ctx.reset();
                ctx.drawImage(image, 0, 0, 300, 150);
                ctx.beginPath();
                ctx.rect(0, 0, 300, 150);
                ctx.stroke();
                console.log("鼠标移移出", ctx);
            };
            // targetCanvas.onclick = () => {
            //     console.log("鼠标点击");
            // };
            // targetCanvas.addEventListener("click", () => {
            //     console.log("dsf");
            // });
            image.onload = () => {
                ctx.drawImage(image, 0, 0, 300, 150);
                ctx.beginPath();
                ctx.rect(0, 0, 300, 150);
                ctx.stroke();
            };
            image.src = "/gundam.png";
        },
        handleSeven3() {
            const targetCanvas = document.getElementById("sevenCanvas3");
            const ctx = targetCanvas.getContext("2d");
            const image = new Image();
            targetCanvas.addEventListener("click", function (e) {
                const rect = targetCanvas.getBoundingClientRect();
                console.log("click", `(${e.x}, ${e.y})`);
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
            });
            image.onload = () => {
                ctx.drawImage(image, 0, 0, 300, 150);
                ctx.beginPath();
                ctx.rect(0, 0, 300, 150);
                ctx.stroke();
            };
            image.src = "/gundam.png";
        },
    },
};
</script>

<style lang="less">
.like-sanjiao {
    width: 0;
    height: 0;
    // background: #f7f7f7;
    border-top: 10px solid #000;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
}

.sevenCanvas1 {
    border: 2px solid black;
}
.highlight {
    border-color: rgb(33, 221, 127); /* 点击后边框颜色变为红色 */
}
</style>
