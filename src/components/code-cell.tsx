import { useState, useEffect, FC } from "react";
import CodeEditor from "./code-editor";
import PreviewFrame from "./preview-frame";
import ResizableFrame from "./resizable-frame";
import bundle from "../bundler";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  // cell.content is the user input that we need to bundle in order to know what to load in for the code output
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      // bundles the typed code after 1 sec at a time
      const output = await bundle(cell.content);
      setCode(output.code);
      setError(output.error);
    }, 1200);

    return () => clearTimeout(timer);
  }, [cell.content]);

  return (
    <ResizableFrame direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <ResizableFrame direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </ResizableFrame>
        <PreviewFrame code={code} errorMessage={error} />
      </div>
    </ResizableFrame>
  );
};

export default CodeCell;
