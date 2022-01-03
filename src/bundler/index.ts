import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: esbuild.Service;

// doesn't bundle or join modules. only transpiles given code input from user
const bundle = async (rawCode: string) => {
  if (!service) {
    // if service is not defined (or first time this func has run)
    // async fetches the public esbuild compiled binary file
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  // plugins handle lines that require async fetch of package imports
  const result = await service.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)], // order matters. left -> right
    //   wherever 'process.env.NODE_ENV' is found, replace it with "production"
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
  });

  return result.outputFiles[0].text;
};

export default bundle;
