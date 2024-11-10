import { Plugin } from "prosemirror-state";
import { toggleMark } from "prosemirror-commands";
import schema from "../schema";
import { createRoot } from "solid-js";

import Menu from "./menu";

class MenuView {
  constructor(items, editorView) {
    this.items = items;
    this.editorView = editorView;
    this.update();

    const onCommand = (e, command) => {
      e.preventDefault();
      editorView.focus();
      command(editorView.state, editorView.dispatch, editorView);
    };
    this.dom = createRoot(() => <Menu items={items} onCommand={onCommand} />);
  }

  update() {
    // this.items.forEach(({ command, dom }) => {
    //   let active = command(this.editorView.state, null, this.editorView);
    //   dom.style.display = active ? "" : "none";
    // });
  }

  destroy() {
    this.dom.remove();
  }
}

function menuPlugin(items) {
  return new Plugin({
    view(editorView) {
      let menuView = new MenuView(items, editorView);
      editorView.dom.parentNode.insertBefore(menuView.dom, editorView.dom);
      return menuView;
    }
  });
}

let menu = menuPlugin([
  { command: toggleMark(schema.marks.strong), text: "B", name: "strong" },
  { command: toggleMark(schema.marks.em), text: "i", name: "em" }
  // {
  //   command: setBlockType(schema.nodes.paragraph),
  //   dom: icon("p", "paragraph")
  // },
]);

export default menu;
