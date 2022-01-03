import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import CodeEditor from "./components/code-editor";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const serviceRef = useRef<any>(null);
  const iframe = useRef<any>(null);
  // input is the user input that we need to bundle in order to know what to load in for the code output
  const [input, setInput] = useState("");

  const startService = async () => {
    // async fetches the public esbuild compiled binary file
    // when startService is called, the Promise result is assigned to the
    // ref and can be accessed anywhere from within the component
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClickHandler = async () => {
    if (!serviceRef.current) {
      // does nothing if startService fetch has not completed
      return;
    }

    // ensures before each code output display, refresh html code just in case
    iframe.current.srcdoc = html;

    // doesn't bundle or join modules. only transpiles given code
    const result = await serviceRef.current.build({
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

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html lang="en">
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector("#root");
              root.innerHTML = '<div style="color: red;"}}><h4>Runtime Error</h4>' + err + '</div>'
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button
          className="button button-format is-primary is-small"
          onClick={onClickHandler}
        >
          Submit
        </button>
      </div>
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
