import axios from "axios";

import { ADD_ITEM, GET_ITEMS, REMOVE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authCreator";

export const getItems = () => {
  return async dispatch => {
    const { data } = await axios.get(`/api/items`);
    return dispatch({ type: GET_ITEMS, payload: data });
  };
};

export const addItem = payload => {
  return async (dispatch, getState) => {
    const { data } = await axios.post(
      `/api/items`,
      { name: payload.name },
      tokenConfig(getState)
    );
    dispatch(getItems());
    return dispatch({
      type: ADD_ITEM,
      payload: data
    });
  };
};

export const removeItem = payload => {
  return async (dispatch, getState) => {
    const {
      data: { id }
    } = await axios.delete(`/api/items/${payload}`, tokenConfig(getState));
    return dispatch({
      type: REMOVE_ITEM,
      payload: id
    });
  };
};

export const setItemsLoading = () => ({
  type: ITEMS_LOADING
});
