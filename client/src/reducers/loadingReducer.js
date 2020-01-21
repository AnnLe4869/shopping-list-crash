import { ITEMS_LOADING } from "../actions/types";
import { produce } from "immer";

export default produce((draft = false, action) => {
  switch (action.type) {
    case ITEMS_LOADING:
      draft = true;
      return draft;

    default:
      return draft;
  }
});
