import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import PreviewFrame from "./preview-frame";
import ResizableFrame from "./resizable-frame";
import bundle from "../bundler";

const CodeCell = () => {
  // input is the user input that we need to bundle in order to know what to load in for the code output
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      // bundles the typed code after 1 sec at a time
      const output = await bundle(input);
      setCode(output.code);
      setError(output.error);
    }, 1200);

    return () => clearTimeout(timer);
  }, [input]);

  console.log({ error });

  return (
    <ResizableFrame direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <ResizableFrame direction="horizontal">
          <CodeEditor
            initialValue={`const a = 1;\nconsole.log(a);`}
            onChange={(value) => setInput(value)}
          />
        </ResizableFrame>
        <PreviewFrame code={code} errorMessage={error} />
      </div>
    </ResizableFrame>
  );
};

export default CodeCell;
