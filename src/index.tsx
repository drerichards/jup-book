import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const ref = useRef<any>(null);
  const iframe = useRef<any>(null);
  // input is the user input that we need to bundle in order to know what to load in for the code output
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    // async fetches the public esbuild compiled binary file
    // when startService is called, the Promise result is assigned to the
    // ref and can be accessed anywhere from within the component
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClickHandler = async () => {
    if (!ref.current) {
      // does nothing if startService fetch has not completed
      return;
    }
    // doesn't bundle or join modules. only transpiles given code
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)], // order matters. left -> right
      //   wherever 'process.env.NODE_ENV' is found, replace it with "production"
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html lang="en">
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
            eval(event.data);
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClickHandler}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe
        ref={iframe}
        title="User-generated code output window"
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
