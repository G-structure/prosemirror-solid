import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

import ImageView from "./nodes/image";
import menu from "./menu";
import schema from "./schema";
import doc from "./doc";

import "./index.css";

export default function Editor() {
  const el = document.createElement("div");
  let state = EditorState.create({
    schema,
    doc,
    plugins: [
      history(),
      keymap({ "Mod-z": undo, "Mod-y": redo }),
      keymap(baseKeymap),
      menu
    ]
  });
  let view = new EditorView(el, {
    state,
    nodeViews: {
      image(node, view, getPos) {
        return new ImageView(node, view, getPos);
      }
    }
  });

  return el;
}
