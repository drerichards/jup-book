// send back index.html or index.js for React app
// find and send back list of cells stored in filename arg
// take list of cells and store into the file
import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cells";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();
  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    // allows proxy or copy of port 3000 (CRA) to intercept requests to 4005
    // when app is installed on users cpu, there will be no CRA server.
    // local-api loads the built files from local-client and injects the saved cells from user if available
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true, // enable CRA to use websockets to communicate that one of its files has changed
        logLevel: "silent", // no logs of each proxy req in terminal
      })
    );
  } else {
    const pkgPath = require.resolve(
      "@jscode-note/local-client/build/index.html"
    );
    app.use(express.static(path.dirname(pkgPath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
