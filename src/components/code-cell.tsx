import { useState } from "react";
import CodeEditor from "./code-editor";
import PreviewFrame from "./preview-frame";
import ResizableFrame from "./resizable-frame";
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
    <ResizableFrame direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <CodeEditor
          initialValue={`const a = 1;\nconsole.log(a);`}
          onChange={(value) => setInput(value)}
        />
        <PreviewFrame code={code} />
      </div>
    </ResizableFrame>
  );
};

export default CodeCell;
