import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // resolve is called when esbuild is trying to find path to a specific module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        if (args.path.includes("./") || args.path.includes("../")) {
          console.log("args.resolveDir ", args.resolveDir);
          return {
            namespace: "a",
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
              .href,
          };
        }

        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        if (args.path === "index.js") {
          // runs in case the package has not been required in
          return {
            loader: "jsx",
            contents: `
              const message = require('nested-test-pkg');
              console.log(message);
            `,
          };
        }
        const { data, request } = await axios.get(args.path);
        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
      });
    },
  };
};

// 1. esbuild bundles index.js
// 2. unpkgPathPlugin takes the bundle build as args
// 3. onResolve and onLoad are promises
// 4. onLoad checks if the path supplied is index.js. if so, it requires in the message content via esbuild parsing
// 5. then onResolve runs and returns { path: 'medium-test-pkg', importer: "index.js" }. importer = who is trying to import the package
