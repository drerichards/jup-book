import path from "path";
import { Command } from "commander";
import { serve } from "@jscode-note/local-api";

const isProduction = process.env.NODE_ENV === "production";

// construct "serve" command and resulting action
export const serveCommand = new Command()
  .command("serve [filename]") // [] = optional arg, <> = required
  .description("Open a file for editing") // descrip for root command
  .option("-p, --port <number>", "Port to run server on", "4005") // third arg is default value
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename)); // cwd gets current working dir of the filename arg
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      ); // basename passes only the file even if inside a folder
      console.log(
        `Opened ${filename}. Please navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (error) {
      console.log(error);
      process.exit(1); // exits program
    }
  });
