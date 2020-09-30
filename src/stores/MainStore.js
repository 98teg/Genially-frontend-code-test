import { types } from "mobx-state-tree";
import BoxModel from "./models/Box";

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel)
  })
  .views(self => ({
    getBox(id) {
      return self.boxes.find(box => box.id === id)
    },
    getSelectedBoxes() {
      return self.boxes.filter(box => box.selected)
    },
    getSelectedArea(box_id) {
      let lowest_left = this.getSelectedBoxes().sort( (box_a, box_b) => {return box_a.left - box_b.left})[0].left
      let lowest_top = this.getSelectedBoxes().sort( (box_a, box_b) => {return box_a.top - box_b.top})[0].top

      let highest_right = this.getSelectedBoxes().sort( (box_a, box_b) => {return box_b.left - box_a.left})[0]
      highest_right = highest_right.left + highest_right.width
      let highest_bottom = this.getSelectedBoxes().sort( (box_a, box_b) => {return box_b.top - box_a.top})[0]
      highest_bottom = highest_bottom.top + highest_bottom.height

      let reference_box = this.getBox(box_id)
      return {
        left: reference_box.left - lowest_left,
        top: reference_box.top - lowest_top,
        right: highest_right - (reference_box.left + reference_box.width),
        bottom: highest_bottom - (reference_box.top + reference_box.height)
      }
    }
  }))
  .actions(self => {
    return {
      addBox(box) {
        self.boxes.push(box);
      }
    };
  });

const store = MainStore.create();

export default store;
