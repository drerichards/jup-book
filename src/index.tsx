import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const ref = useRef<any>(null);
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    // async fetches the public esbuild compiled binary file
    // when startService is called, the Promise result is assigned to the
    // ref and can be accessed anywhere from within the component
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
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
      plugins: [unpkgPathPlugin()],
    });

    setCode(result.outputFiles[0].text);
    // console.log(result);
  };

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
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
