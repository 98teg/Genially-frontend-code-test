import React from "react";

import { observer } from "mobx-react";
import interact from "interactjs";
import Box from "../components/Box";

class Canvas extends React.Component {
  constructor () {
    super();

    this.state = {selectedArea: {}};

    this.getRestriction = this.getRestriction.bind(this);
    this.toggleBox = this.toggleBox.bind(this);
    this.startMovingBoxes = this.startMovingBoxes.bind(this);
    this.moveBoxes = this.moveBoxes.bind(this);

    interact('.box')
      .on("tap", this.toggleBox)
      .draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: this.getRestriction
          })
        ],
    
        listeners: {
          start: this.startMovingBoxes,
          move: this.moveBoxes
        }
      });
  }

  getRestriction () {
    let canvas = document.getElementById("canvas").getBoundingClientRect();
  
    let { x, y, width, height } = canvas;

    x += this.state.selectedArea.left;
    y += this.state.selectedArea.top;
    width -= (this.state.selectedArea.right + this.state.selectedArea.left);
    height -= (this.state.selectedArea.bottom + this.state.selectedArea.top);
  
    return {x: x, y: y, width: width, height: height};
  }

  toggleBox (event) {
    this.props.store.getBox(event.currentTarget.id).toggle();
  }

  startMovingBoxes (event) {
    if (this.props.store.getBox(event.currentTarget.id).selected === false) this.toggleBox(event);

    let selected_area = this.props.store.getSelectedArea(event.currentTarget.id);

    if (this.state.selectedArea !== selected_area) {
      this.setState({selectedArea: selected_area});
    }
  }

  moveBoxes (event) {
    this.props.store.getSelectedBoxes().forEach((box) => {
      box.setLeft(box.left + event.dx);
      box.setTop(box.top + event.dy);
    });
  }

  render () {
    return (
      <div id="canvas" className="canvas">
        {this.props.store.boxes.map((box, index) => (
          <Box
            {...box}
            key = {index}
            box = {box}
          />
        ))}
      </div>
    );
  }
}

export default observer(Canvas);
