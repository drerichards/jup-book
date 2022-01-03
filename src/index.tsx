import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState } from "react";
import ReactDOM from "react-dom";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import bundle from "./bundler";

const App = () => {
  // input is the user input that we need to bundle in order to know what to load in for the code output
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClickHandler = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <>
      <CodeEditor
        initialValue={`const a = 1;\nconsole.log(a);`}
        onChange={(value) => setInput(value)}
      />
      <div>
        <button
          className="button button-format is-primary is-small"
          onClick={onClickHandler}
        >
          Submit
        </button>
      </div>
      <Preview code={code} />
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
