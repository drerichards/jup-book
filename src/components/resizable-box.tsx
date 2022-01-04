import { ResizableBox } from "react-resizable";
import "./resizable-box.css";

interface ResizableProps {
  direction: "horizontal" | "vertical"; // must provide either & only one of these
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={300} width={300} resizeHandles={["s", "e"]}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
