import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

// construct "serve" command and resulting action
export const serveCommand = new Command()
  .command("serve [filename]") // [] = optional arg, <> = required
  .description("Open a file for editing") // descrip for root command
  .option("-p, --port <number>", "Port to run server on", "4005") // third arg is default value
  .action((filename = "notebook.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename)); // cwd gets current working dir of the filename arg
    serve(parseInt(options.port), path.basename(filename), dir); // basename passes only the file even if inside a folder
  });
