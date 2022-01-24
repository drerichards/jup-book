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
const http_proxy_middleware_1 = require("http-proxy-middleware");
const serve = (port, filename, dir) => {
    const app = (0, express_1.default)();
    app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
        target: "http://localhost:3000",
        ws: true,
        logLevel: "silent", // no logs of each proxy req in terminal
    }));
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
