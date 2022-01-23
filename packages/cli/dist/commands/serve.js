"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("local-api");
// construct "serve" command and resulting action
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]") // [] = optional arg, <> = required
    .description("Open a file for editing") // descrip for root command
    .option("-p, --port <number>", "Port to run server on", "4005") // third arg is default value
    .action((filename = "notebook.js", options) => {
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename)); // cwd gets current working dir of the filename arg
    (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir); // basename passes only the file even if inside a folder
});
