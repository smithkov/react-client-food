import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT_BY_ORIGIN,
  ADD_USER,
  FETCH_USER,
  FETCH_CATEGORY,
  FETCH_PRODUCT_BY_CATEGORY,
  FETCH_PRODUCTS_CLOSE,
  FETCH_PRODUCT_CLOSE_BY_CATEGORY,
  FETCH_PRODUCT_CLOSE_BY_ORIGIN,
} from "./types";
import ClientService from "../services/clientService";

export const fetchProducts = (search) => (dispatch) => {
  ClientService.products({ search })
    .then((products) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products.data.open,
      });

      dispatch({
        type: FETCH_PRODUCTS_CLOSE,
        payload: products.data.close,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const fetchCloseProducts = (search) => (dispatch) => {
//   ClientService.productsClose({search})
//     .then((products) => {

//       dispatch({
//         type: FETCH_PRODUCTS_CLOSE,
//         payload: products.data.data,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const fetchCatgeories = () => (dispatch) => {
  ClientService.category()
    .then((category) => {
      dispatch({
        type: FETCH_CATEGORY,
        payload: category.data.open,
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
        payload: products.data.open,
      });
      dispatch({
        type: FETCH_PRODUCT_CLOSE_BY_ORIGIN,
        payload: products.data.close,
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
        payload: products.data.open,
      });
      dispatch({
        type: FETCH_PRODUCT_CLOSE_BY_CATEGORY,
        payload: products.data.close,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
