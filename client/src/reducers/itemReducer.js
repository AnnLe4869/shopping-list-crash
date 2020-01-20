import { ADD_ITEM, GET_ITEMS, REMOVE_ITEM } from "../actions/types";
import { produce } from "immer";

export default produce((draft = [], action) => {
  switch (action.type) {
    case GET_ITEMS:
      draft = action.payload;
      return draft;
    case ADD_ITEM:
      draft.push(action.payload);
      return draft;
    case REMOVE_ITEM:
      const index = draft.findIndex(item => {
        return item.id === action.payload;
      });
      if (index > -1) {
        draft.splice(index, 1);
      }
      return draft;
    default:
      return draft;
  }
});
