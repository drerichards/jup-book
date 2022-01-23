"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const commander_1 = require("commander");
const local_api_1 = require("local-api");
// construct "serve" command and resulting action
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]") // [] = optional arg, <> = required
    .description("Open a file for editing") // descrip for root command
    .option("-p, --port <number>", "Port to run server on", "4005") // third arg is default value
    .action((filename = "notebook.js", options) => {
    (0, local_api_1.serve)(parseInt(options.port), filename, "/");
});
