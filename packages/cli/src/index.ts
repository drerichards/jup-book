// handles cli commands typed in terminal to serve a file of saved code editor cells on user's sys
import { program } from "commander";
import { serveCommand } from "./commands/serve";

program.addCommand(serveCommand);
program.parse(process.argv); // takes terminal args from user input
