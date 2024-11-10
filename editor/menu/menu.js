import { For } from "solid-js";

import "./menu.css";

function Icon(props) {
  return (
    <span className={`menuicon-${props.name}`} title={props.name}>
      {props.text}
    </span>
  );
}

export default function Menu(props) {
  return (
    <div className="menubar">
      <For each={props.items}>
        {(item) => (
          <button onClick={(e) => props.onCommand(e, item.command)}>
            <Icon {...item} />
          </button>
        )}
      </For>
    </div>
  );
}
