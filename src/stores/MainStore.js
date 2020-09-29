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
