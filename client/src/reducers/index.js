import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({ items: itemReducer, loading: loadingReducer });
