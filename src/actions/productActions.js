import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT_BY_ORIGIN,
  ADD_USER,
  FETCH_USER,
  FETCH_CATEGORY,
  FETCH_PRODUCT_BY_CATEGORY
} from "./types";
import ClientService from "../services/clientService";

export const fetchProducts = () => (dispatch) => {
  ClientService.products()
    .then((products) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCatgeories = () => (dispatch) => {
  ClientService.category()
    .then((category) => {
      dispatch({
        type: FETCH_CATEGORY,
        payload: category.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addUser = () => (dispatch) => {
  ClientService.hasAuth()
    .then((data) => {
      let user = data.data.data;

      dispatch({
        type: ADD_USER,
        payload: user,
      });
    })
    .catch((err) => {});
};

export const fetchUser = () => (dispatch) => {
  dispatch({
    type: FETCH_USER,
  });
};

export const updateProduct = (id) => (dispatch) => {
  ClientService.productsByOrigin(id)
    .then((products) => {
      dispatch({
        type: FETCH_PRODUCT_BY_ORIGIN,
        payload: products.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//This updates meals by category
export const updateCategory = (id) => (dispatch) => {
  ClientService.getMealByCategoryId(id)
    .then((products) => {
      dispatch({
        type: FETCH_PRODUCT_BY_CATEGORY,
        payload: products.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
