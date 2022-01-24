// send back index.html or index.js for React app
// find and send back list of cells stored in filename arg
// take list of cells and store into the file
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  app.use(
    createProxyMiddleware({
      target: "http://localhost:3000",
      ws: true, // enable CRA to use websockets to communicate that one of its files has changed
      logLevel: "silent", // no logs of each proxy req in terminal
    })
  );
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
