import React from "react";

import uuid from "uuid/v4";
import BoxModel from "../stores/models/Box";
import getRandomColor from "../utils/getRandomColor";

class Toolbar extends React.Component {
  constructor () {
    super()
  
    this.addBox = this.addBox.bind(this)
    this.removeBoxes = this.removeBoxes.bind(this)
  }

  addBox () {
    const box = BoxModel.create({
      id: uuid(),
      color: getRandomColor(),
      left: 0,
      top: 0
    });
    
    this.props.store.addBox(box);
  }

  removeBoxes () {
    this.props.store.removeSelectedBoxes();
  }

  render () {
    return (
      <div className="toolbar">
        <button onClick={this.addBox}>Add Box</button>
        <button onClick={this.removeBoxes}>Remove Box</button>
        <input type="color" />
        <span>No boxes selected</span>
      </div>
    );
  }
}

export default Toolbar;
