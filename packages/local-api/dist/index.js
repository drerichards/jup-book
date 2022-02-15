"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
// send back index.html or index.js for React app
// find and send back list of cells stored in filename arg
// take list of cells and store into the file
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const cells_1 = require("./routes/cells");
const serve = (port, filename, dir, useProxy) => {
    const app = (0, express_1.default)();
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    if (useProxy) {
        // allows proxy or copy of port 3000 (CRA) to intercept requests to 4005
        // when app is installed on users cpu, there will be no CRA server.
        // local-api loads the built files from local-client and injects the saved cells from user if available
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: "http://localhost:3000",
            ws: true,
            logLevel: "silent", // no logs of each proxy req in terminal
        }));
    }
    else {
        const pkgPath = require.resolve("@notecellbook/local-client/build/index.html");
        app.use(express_1.default.static(path_1.default.dirname(pkgPath)));
    }
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
