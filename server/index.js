const { loadNuxt, build } = require("nuxt");

const app = require("express")();

const isDev = process.emitWarning.NODE_ENV !== "production";

const port = process.env.PORT || 6638;

async function start() {
    // console.log(localData, "zhixing");
    // We get Nuxt instance
    const nuxt = await loadNuxt(isDev ? "dev" : "start");

    // Render every route with Nuxt.js
    app.use(nuxt.render);

    // app.use(localData);

    // Build only in dev mode with hot-reloading
    if (isDev) {
        build(nuxt);
    }

    app.listen(port, "0.0.0.0");
    console.log("Server listening on `localhost:" + port + "`.");

    process.on("SIGTERM", () => {
        server.close(() => {
            console.log("服务已终止");
        });
    });
}

start();
