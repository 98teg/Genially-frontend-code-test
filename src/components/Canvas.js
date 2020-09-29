import React from "react";

import { observer } from "mobx-react";
import interact from "interactjs";
import Box from "../components/Box";

class Canvas extends React.Component {
  constructor () {
    super()

    this.toggleBoxSelection = this.toggleBoxSelection.bind(this)
    this.moveBoxes = this.moveBoxes.bind(this)

    interact('.box')
      .on(
        "tap",
        this.toggleBoxSelection
      )
      .draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent'
          })
        ],
    
        listeners: {
          move: this.moveBoxes
        }
      })
  }

  toggleBoxSelection (event) {
    this.props.store.getBox(event.target.id).toggleSelection()
  }

  moveBoxes (event) {
    this.props.store.getBox(event.target.id).select();
  
    this.props.store.getSelectedBoxes().forEach((box) => {
      box.setLeft(box.left + event.dx);
      box.setTop(box.top + event.dy);
    })
  }

  render () {
    return (
      <div className="canva">
        {this.props.store.boxes.map((box, index) => (
          <Box
            id={box.id}
            key={index}
            color={box.color}
            left={box.left}
            top={box.top}
            width={box.width}
            height={box.height}
            selected={box.selected}
            box={box}
          />
        ))}
      </div>
    );
  }
}

export default observer(Canvas);
