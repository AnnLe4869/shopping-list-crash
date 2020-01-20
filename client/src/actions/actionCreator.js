import { ADD_ITEM, GET_ITEMS, REMOVE_ITEM } from "./types";
import axios from "axios";

export const getItems = () => {
  return async dispatch => {
    const { data } = await axios.get(`/api/items`);
    return dispatch({ type: GET_ITEMS, payload: data });
  };
};

export const addItem = payload => {
  return async dispatch => {
    const { data } = await axios.post(`/api/items`, { name: payload.name });
    return dispatch({
      type: ADD_ITEM,
      payload: data
    });
  };
};

export const removeItem = payload => {
  return async dispatch => {
    const { data: id } = await axios.delete(`/api/items/${payload}`);
    console.log(id);
    return dispatch({
      type: REMOVE_ITEM,
      payload: id
    });
  };
};
