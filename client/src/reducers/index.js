import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import loadingReducer from "./loadingReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  items: itemReducer,
  loading: loadingReducer,
  error: errorReducer,
  auth: authReducer
});
