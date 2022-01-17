import "./code-cell.css";
import { useEffect, FC } from "react";
import CodeEditor from "./code-editor";
import PreviewFrame from "./preview-frame";
import ResizableFrame from "./resizable-frame";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector"; // pulls state out of store

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    if (state.cells) {
      const { data, order } = state.cells;
      const orderedCells = order.map((id: string | number) => data[id]);

      const cumulativeCode = [];
      for (let c of orderedCells) {
        if (c.type === "code") cumulativeCode.push(c.content);
        if (c.id === cell.id) break; // stops when it gets to cell id thats passed via props
      }
      return cumulativeCode;
    }
  });

  console.log(cumulativeCode);

  useEffect(() => {
    const runBundler = (id: string, content: string | undefined): void => {
      if (content) {
        createBundle(id, content);
      }
    };

    if (!bundle) {
      // exec bundle creation on first load
      runBundler(cell.id, cumulativeCode?.join("\n"));
      return;
    }

    const timer = setTimeout(async () => {
      // bundles the typed code after 1.2 sec at a time
      runBundler(cell.id, cumulativeCode?.join("\n"));
    }, 1200);

    return () => clearTimeout(timer);
    // bundle dep would create inf loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, createBundle]);

  return (
    <ResizableFrame direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ResizableFrame direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </ResizableFrame>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <PreviewFrame code={bundle.code} errorMessage={bundle.error} />
          )}
        </div>
      </div>
    </ResizableFrame>
  );
};

export default CodeCell;
