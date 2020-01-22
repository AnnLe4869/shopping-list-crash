import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import loadingReducer from "./loadingReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  items: itemReducer,
  error: errorReducer,
  auth: authReducer
});
