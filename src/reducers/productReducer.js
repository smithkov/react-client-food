import { FETCH_POSTS, FETCH_PRODUCT_BY_ORIGIN, FETCH_PRODUCTS } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        items: action.payload
      };
    case FETCH_PRODUCT_BY_ORIGIN:
     
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}