import { ResizableBox, ResizableBoxProps } from "react-resizable";
import React, { useEffect, useState } from "react";
import "./resizable-frame.css";

interface ResizableFrameProps {
  direction: "horizontal" | "vertical"; // must provide either & only one of these
}

const ResizableFrame: React.FC<ResizableFrameProps> = ({
  direction,
  children,
}) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
      }, 100);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  let resizableProps: ResizableBoxProps = {
    // vertical case
    height: 300,
    width: Infinity,
    minConstraints: [Infinity, 48],
    maxConstraints: [Infinity, innerHeight * 0.95], // 95% of window ht
    resizeHandles: ["s"],
  };

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width: innerWidth * 0.75,
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default ResizableFrame;
