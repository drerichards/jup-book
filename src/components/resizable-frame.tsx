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
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          // window will remain above 75% so that it doesnt disappear when resizing
        }
      }, 100);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

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
      width,
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
      onResizeStop: (e, data) => {
        // event when user stops dragging window
        setWidth(data.size.width);
      },
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default ResizableFrame;
