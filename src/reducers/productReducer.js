import {
  ADD_USER,
  FETCH_PRODUCT_BY_ORIGIN,
  FETCH_PRODUCT_CLOSE_BY_ORIGIN,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_CLOSE,
  FETCH_USER,
  FETCH_PRODUCT_BY_CATEGORY,
  FETCH_PRODUCT_CLOSE_BY_CATEGORY,
  FETCH_CATEGORY,
} from "../actions/types";

const initialState = {
  items: [],
  closeItems: [],
  item: {},
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_PRODUCTS_CLOSE:
      return {
        ...state,
        closeItems: action.payload,
      };
    case FETCH_PRODUCT_BY_ORIGIN:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_PRODUCT_CLOSE_BY_ORIGIN:
      return {
        ...state,
        closeItems: action.payload,
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_PRODUCT_CLOSE_BY_CATEGORY:
      return {
        ...state,
        closeItems: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_USER:
    default:
      return state;
  }
}
