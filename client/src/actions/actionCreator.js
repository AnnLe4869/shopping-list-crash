import { ADD_ITEM, GET_ITEMS, REMOVE_ITEM } from "./types";

export const getItems = () => ({
  type: GET_ITEMS
});

export const addItem = payload => ({
  type: ADD_ITEM,
  payload
});

export const removeItem = id => ({
  type: REMOVE_ITEM,
  id
});
