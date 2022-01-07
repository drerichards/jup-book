import { useEffect, useRef } from "react";
import "./preview-frame.css";

interface PreviewFrameProps {
  code: string;
  errorMessage: string;
}

// default startup code for code editor
const html = `
    <html lang="en">
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector("#root");
            root.innerHTML = '<div style="color: red;"}}><h4>Runtime Error</h4>' + err + '</div>'
            console.error(err);
          };
          window.addEventListener("error", (event) => {
            event.preventDefault();
            handleError(event.error);
          });
          window.addEventListener("message", (event) => {
            try {
              eval(event.data);
            } catch (error) {
              handleError(error);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const PreviewFrame: React.FC<PreviewFrameProps> = ({ code, errorMessage }) => {
  const iframe = useRef<any>(null);
  useEffect(() => {
    // ensures before each code output display, refresh html code just in case user deletes
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="User-generated code output window"
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {errorMessage && (
        <div className="preview-error">
          <div>
            <h4>Runtime Error</h4>
            <br />
            {errorMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewFrame;
