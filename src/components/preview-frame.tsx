import { useEffect, useRef } from "react";
interface PreviewFrameProps {
  code: string;
}

// default startup code for code editor
const html = `
    <html lang="en">
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector("#root");
              root.innerHTML = '<div style="color: red;"}}><h4>Runtime Error</h4>' + err + '</div>'
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const PreviewFrame: React.FC<PreviewFrameProps> = ({ code }) => {
  const iframe = useRef<any>(null);
  useEffect(() => {
    // ensures before each code output display, refresh html code just in case user deletes
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        style={{ backgroundColor: "#fff" }}
        ref={iframe}
        title="User-generated code output window"
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default PreviewFrame;
