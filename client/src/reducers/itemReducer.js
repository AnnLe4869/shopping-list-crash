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

export default produce((draft, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return draft;
    case ADD_ITEM:
      draft.items.push(action.payload);
      return draft;
    case REMOVE_ITEM:
      const index = draft.items.findIndex(item => item.id === action.id);
      if (index > -1) {
        draft.items.splice(index, 1);
      }
      return draft;
    default:
      return draft;
  }
}, initialState);
