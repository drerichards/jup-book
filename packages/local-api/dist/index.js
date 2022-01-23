"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
// send back index.html or index.js for React app
// find and send back list of cells stored in filename arg
// take list of cells and store into the file
const serve = (port, filename, dir) => {
    console.log("file", filename);
    console.log("port", port);
    console.log("dir", dir);
};
exports.serve = serve;
