import { render } from "solid-js/web";

import Editor from "./editor";

import "./index.css";

const App = () => {
  let editorRef;
  return (
    <div>
      <nav>
        <div className="title">Solid Editor Test</div>
      </nav>
      <Editor ref={editorRef} />
    </div>
  );
};

render(App, document.getElementById("app"));
