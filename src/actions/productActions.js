import { FETCH_PRODUCTS, FETCH_PRODUCT_BY_ORIGIN } from "./types";
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

export const updateProduct = (id) => (dispatch) => {
 
    ClientService.productsByOrigin(id)
    .then((products) => {
      console.log(products.data.data)
      dispatch({
        type: FETCH_PRODUCT_BY_ORIGIN,
        payload: products.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
