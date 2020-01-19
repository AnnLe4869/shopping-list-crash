import { ADD_ITEM, GET_ITEMS, REMOVE_ITEM } from "./types";

export const getItems = () => {
  return {
    type: GET_ITEMS
  };
};

export const addItem = payload => {
  return {
    type: ADD_ITEM,
    payload
  };
};

export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    id
  };
};
