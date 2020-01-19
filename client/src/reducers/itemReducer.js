import uuid from "uuid/v1";
import { ADD_ITEM, GET_ITEMS, REMOVE_ITEM } from "../actions/types";
import { produce } from "immer";

const initialState = {
  items: [
    { id: uuid(), name: "Eggs" },
    { id: uuid(), name: "Milk" },
    { id: uuid(), name: "Steak" },
    { id: uuid(), name: "Water" }
  ]
};

export default produce((draft = initialState.items, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return draft;
    case ADD_ITEM:
      draft.push(action.payload);
      return draft;
    case REMOVE_ITEM:
      const index = draft.findIndex(item => item.id === action.id);
      if (index > -1) {
        draft.splice(index, 1);
      }
      return draft;
    default:
      return draft;
  }
});
