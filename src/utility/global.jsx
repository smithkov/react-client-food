import clientService from "../services/clientService";
import { toast } from "react-toastify";
export const SERVER_URL = "http://localhost:8000/api";
export const IMAGE_URL = "http://localhost:8000/uploads/category/";
export const MEAL_CREATE = "/meal/food_reg";
export const MEAL_LIST = "/meal/food_list";
export const MEAL_UPDATE = "/meal/update/:id";
export const SHOP_CREATE = "/seller_reg";
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const LISTING_URL = "/listing";
export const MY_ACCOUNT = "/myAccount";
export const DASHBOARD_URL = "/dashboard";
export const SHOP_SETTING_URL = "/shop/settings";
export const PRIVACY_URL = "/user-seller/privacy";
export const SHOP_SOCIAL_URL = "/shop/social";
export const USER_ORDER_URL = "/user/order";
export const SHOP_SIGNUP = "/business-signup";
export const DELIVERY_DETAIL_URL = "/delivery/detail/:by/:sel";
export const PAYMENT_URL = "/payment/:by/:sel";
export const PRODUCT_DETAIL_URL = "/item_meal_detail/product/:id";
export const PAY_STATUS_URL = "/payment/status";
export const SHOP_PAGE_URL = "/:shopUrl";
export const ORDER_DETAIL_URL = "/user/order/:id";
export const VENDOR_APPLY_SUCCESS = "/food_vendor/application-success/:id";

export const DEFAULT_LOGO =
  "https://react.semantic-ui.com/images/wireframe/image.png";
export const DEFAULT_BANNER = "/images/default-banner.jpg";
export const DEFAULT_USER = "/images/user.jpg";
export const CRED = "_fb_yiumi";
export const TEMP_ID = "temp_id";

export const IMG_MAX_SIZE = 5;
export const ERROR_MSG =
  "Your request could not be saved at the moment, please kindly Foodengo.";
export const MISSING_USER_MSG =
  "Current user details can't be resolved, kindly relogin and retry.";
export const getUserProfile = function () {
  return clientService.hasAuth().then((result) => {
    return result.data.data;
  });
  //return JSON.parse(localStorage.getItem(CRED));
};
export const setUserProfile = function (value) {
  localStorage.setItem(CRED, JSON.stringify(value));
};

export const getTempId = function () {
  const tempId = localStorage.getItem(TEMP_ID);
  if (tempId) return tempId;
  else {
    const randNum = Math.floor(Math.random() * 102233455555555 + 1);
    localStorage.setItem(TEMP_ID, randNum);
    return randNum;
  }
};
export const totalRating = (totalRating) => {
  let ratingLength = totalRating.length;
  return ratingLength > 1
    ? `${ratingLength} reviews`
    : `${ratingLength} review`;
};
export const displayRating = (productRatings) => {
  let ratingCount = 0;
  for (let rating of productRatings) {
    ratingCount += parseInt(rating.rating);
  }
  return ratingCount / productRatings.length;
};

export const formatPrice = (price) => {
  return `£${parseFloat(price).toFixed(2)}`;
};
export const toastOptions =(hasError=false)=> {
  return  {autoClose: 5000,
  position: toast.POSITION.TOP_CENTER,
  type: hasError?toast.TYPE.ERROR: toast.TYPE.INFO,
  hideProgressBar: false,}
};


