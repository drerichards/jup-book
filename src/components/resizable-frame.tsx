import { ResizableBox } from "react-resizable";
import "./resizable-frame.css";

interface ResizableFrameProps {
  direction: "horizontal" | "vertical"; // must provide either & only one of these
}

const ResizableFrame: React.FC<ResizableFrameProps> = ({
  direction,
  children,
}) => {
  return (
    <ResizableBox height={300} width={Infinity} resizeHandles={["s"]}>
      {children}
    </ResizableBox>
  );
};

export default ResizableFrame;
