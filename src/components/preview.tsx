import { useEffect, useRef } from "react";
interface PreviewProps {
  code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>(null);
  useEffect(() => {
    // ensures before each code output display, refresh html code just in case user deletes
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      ref={iframe}
      title="User-generated code output window"
      srcDoc={html}
      sandbox="allow-scripts"
    />
  );
};

export default Preview;
