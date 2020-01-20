import { ADD_ITEM, GET_ITEMS, REMOVE_ITEM } from "./types";
import axios from "axios";

export const getItems = () => {
  return async dispatch => {
    const { items } = await axios.get(`/api/items`);
    return dispatch({ type: GET_ITEMS, payload: items });
  };
};

export const addItem = payload => {
  return async dispatch => {
    const { item } = await axios.post(`/api/items`, { name: payload.name });
    return dispatch({
      type: ADD_ITEM,
      payload: item
    });
  };
};

export const removeItem = payload => {
  return async dispatch => {
    const { id } = await axios.delete(`/api/items/${payload}`);
    return dispatch({
      type: REMOVE_ITEM,
      id
    });
  };
};
