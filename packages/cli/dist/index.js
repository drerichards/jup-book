#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// handles cli commands typed in terminal to serve a file of saved code editor cells on user's sys
const commander_1 = require("commander");
const serve_1 = require("./commands/serve");
commander_1.program.addCommand(serve_1.serveCommand);
commander_1.program.parse(process.argv); // takes terminal args from user input
