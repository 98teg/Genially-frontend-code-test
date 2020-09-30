import React from "react";
import { observer } from "mobx-react";

function BoxDraggable(props) {
  let border_width = 2;

  return (
    <div
      className={"overlay"}
      style={{
        width: props.width,
        height: props.height,
        borderStyle: "dashed",
        borderColor: "black",
        borderWidth: border_width
      }}
    >
      {props.children}
    </div>
  );
}

export default observer(BoxDraggable);
