import React from "react";
import { observer } from "mobx-react";
import BoxDraggable from "./BoxDraggable";
import BoxOverlay from "./BoxOverlay";

function Box(props) {
  return (
    <BoxDraggable {...props}>
      {props.selected ?
        <BoxOverlay {...props}>
          <div>Box</div>
        </BoxOverlay> :
        <div>Box</div>}
    </BoxDraggable>
  );
}

export default observer(Box);
