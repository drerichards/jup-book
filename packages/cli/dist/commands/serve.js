"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("@jscode-note/local-api");
const isProduction = process.env.NODE_ENV === "production";
// construct "serve" command and resulting action
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]") // [] = optional arg, <> = required
    .description("Open a file for editing") // descrip for root command
    .option("-p, --port <number>", "Port to run server on", "4005") // third arg is default value
    .action((filename = "notebook.js", options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename)); // cwd gets current working dir of the filename arg
        yield (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir, !isProduction); // basename passes only the file even if inside a folder
        console.log(`Opened ${filename}. Please navigate to http://localhost:${options.port} to edit the file.`);
    }
    catch (error) {
        console.log(error);
        process.exit(1); // exits program
    }
}));
