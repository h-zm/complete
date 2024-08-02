<template>
    <!-- 新建文件的模板 -->
    <div class="example">
        <canvas id="myCanvas" width="800" height="800"></canvas>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "vue文件模板",
            meta: "",
            description: "可用复制来快速创建文件",
            name: "模板",
            script: [],
        };
    },
    data() {
        return {
            nodes: [],
            connections: [],
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            this.nodes = [
                { id: 1, text: "Start", x: 400, y: 50 },
                { id: 2, text: "Process1", x: 200, y: 200 },
                { id: 3, text: "Process2", x: 600, y: 240 },
                { id: 4, text: "Decision2", x: 600, y: 400 },
                { id: 5, text: "End", x: 400, y: 600 },
            ];

            this.connections = [
                { from: 1, to: 2 },
                { from: 1, to: 3 },
                { from: 3, to: 4 },
                { from: 2, to: 5 },
                { from: 4, to: 5 },
            ];

            this.drawFlowchart();
        },

        drawNode(node, ctx) {
            ctx.beginPath();
            // 绘制矩形范围
            ctx.rect(node.x - 50, node.y - 30, 100, 60);
            ctx.fillStyle = "#fff";
            // 填充颜色
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000";
            // 描边
            ctx.stroke();
            ctx.closePath();

            ctx.fillStyle = "#000";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.text, node.x, node.y);
        },

        drawConnection(from, to, ctx) {
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            // 连线
            // ctx.lineTo(to.x, to.y);
            // 被筛儿
            ctx.bezierCurveTo(
                from.x,
                from.y,
                (from.x + to.x) * 0.4,
                (from.y + to.y) * 0.6,
                to.x,
                to.y
            );
            ctx.lineWidth = 2;
            // ctx.lineDashOffset = 2;
            ctx.strokeStyle = "#000";
            // 填充
            ctx.stroke();
            // ctx.closePath();
        },

        getNodeById(id) {
            return this.nodes.find((node) => node.id === id);
        },

        drawFlowchart() {
            const canvas = document.getElementById("myCanvas");
            const ctx = canvas.getContext("2d");

            canvas.onclick = (e) => {
                console.log("e", e);
            };
            // clear
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.connections.forEach((connection) => {
                const fromNode = this.getNodeById(connection.from);
                const toNode = this.getNodeById(connection.to);
                this.drawConnection(fromNode, toNode, ctx);
            });
            this.nodes.forEach((node) => {
                this.drawNode(node, ctx);
            });
        },
    },
};
</script>

<style lang="less">
.example {
    border: 1px solid #000;
}
</style>
