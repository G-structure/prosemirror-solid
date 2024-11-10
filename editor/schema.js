import { Schema } from "prosemirror-model";

const schema = new Schema({
  nodes: {
    doc: { content: "headline block+" },
    headline: {
      content: "text*",
      marks: "",
      attrs: {
        ans: { default: { basic: "" } }
      },
      toDOM(node) {
        return ["h1", 0];
      },
      parseDOM: [{ tag: "h1" }]
    },
    paragraph: {
      content: "text*",
      group: "block",
      toDOM(node) {
        return ["p", 0];
      }
    },
    image: {
      atom: true,
      draggable: true,
      selectable: true,
      group: "block",
      toDOM(node) {
        return ["img", { src: node.attrs.src }];
      },
      parseDOM: [
        {
          tag: "img",
          getAttrs: (dom) => {
            let src = dom.getAttribute("src");
            return { src };
          }
        }
      ],
      attrs: {
        src: {
          default:
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        }
      }
    },
    text: {}
  },
  marks: {
    strong: {
      toDOM() {
        return ["strong", 0];
      },
      parseDOM: [{ tag: "strong" }, { tag: "b" }, { style: "font-weight=bold" }]
    },
    em: {
      toDOM() {
        return ["em", 0];
      },
      parseDOM: [{ tag: "em" }, { tag: "i" }, { style: "font-style=italic" }]
    }
  }
});

export default schema;
