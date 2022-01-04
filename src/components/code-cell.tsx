import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable-box";
import bundle from "../bundler";

const CodeCell = () => {
  // input is the user input that we need to bundle in order to know what to load in for the code output
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClickHandler = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
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
    </Resizable>
  );
};

export default CodeCell;
