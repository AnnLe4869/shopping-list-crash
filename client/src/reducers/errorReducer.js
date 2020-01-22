import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";
import { produce } from "immer";

const initialState = {
  message: {},
  status: null,
  id: null
};

export default produce((draft = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      draft.message = action.payload.message;
      draft.status = action.payload.status;
      draft.id = action.payload.id;
      return draft;
    case CLEAR_ERRORS:
      draft.message = {};
      draft.status = null;
      draft.id = null;
      return draft;
    default:
      return draft;
  }
});
