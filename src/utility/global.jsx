import clientService from "../services/clientService";
import { toast } from "react-toastify";
import moment from "moment";
import React from "react";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const LATER_TODAY = "later_today";
export const OPEN = "open";
export const NOT_OPEN = "not_open";

export const DAYS = daysOfWeek;
export const SERVER_URL = "http://localhost:8000/api";
export const IMAGE_URL = "http://localhost:8000/uploads/category/";
// export const SERVER_URL = "https://foodengo.herokuapp.com/api";
// export const IMAGE_URL = "https://foodengo.herokuapp.com/uploads/category/";
export const MEAL_CREATE = "/meal/food_reg";
export const MEAL_LIST = "/meal/food_list";
export const MEAL_UPDATE = "/meal/update/:id";
export const SHOP_CREATE = "/seller_reg";
export const LOGIN_URL = "/login";
export const ACCOUNT_VERIFICATION = "/account_verification/:code";
export const REGISTER_URL = "/register";
export const LISTING_URL = "/listing";
export const MY_ACCOUNT = "/myAccount";
export const DASHBOARD_URL = "/dashboard_admin";
export const DASHBOARD_USER_URL = "/dashboard_user";
export const TERMS_AND_CONDITION = "/terms_and_conditions";
export const SHOP_SETTING_URL = "/shop/settings";
export const PRIVACY_URL = "/user-seller/privacy";
export const DISCLAIMER = "/user/disclaimer";
export const CONTACT_US = "/contact_us";
export const SHOP_SOCIAL_URL = "/shop/social";
export const AVAILABILITY_URL = "/shop/opening-hours";
export const USER_ORDER_URL = "/user/order";
export const SHOP_SIGNUP = "/business-signup";
export const SHOP_REVIEW = "/mystore-review";
export const DELIVERY_DETAIL_URL = "/delivery/detail/:by/:sel";
export const PAYMENT_URL = "/payment/:by/:sel";
export const PRODUCT_DETAIL_URL = "/item_meal/:id";
export const PAYMENT_SUCCESS_URL = "/payment/success/:by/:sel";
export const PAYMENT_ERROR_URL = "/payment/error/:by/:sel";
export const SHOP_PAGE_URL = "/:shopUrl";
export const ORDER_DETAIL_URL = "/user/order/:id";
export const BANK_DETAIL_URL = "/seller/bank_details";
export const POST_CODES_URL = "/delivery/post_codes";
export const VENDOR_APPLY_SUCCESS = "/food_vendor/application-success/:id";
export const days = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

export const formatCurrentDay = (day) => {
  const currentDay = daysOfWeek[new Date().getDay()];
  if (currentDay == day) {
    return <strong>{day}</strong>;
  } else {
    return day;
  }
};

export const formatClose = (day) => {
  const closed = "Closed";
  const currentDay = daysOfWeek[new Date().getDay()];
  if (currentDay == day) {
    return <strong>{closed}</strong>;
  } else {
    return closed;
  }
};
export const formatCurrentTime = (day, oTime, cTime) => {
  const currentDay = daysOfWeek[new Date().getDay()];

  if (currentDay == day) {
    const getcurTime = moment(new Date()).format("HH:mm");
    const getClosingTime = moment(cTime).format("HH:mm");
    const getOpeningTime = moment(oTime).format("HH:mm");

    if (getcurTime > getClosingTime) {
      return <strong style={{ color: "red" }}>Closed</strong>;
    } else if (getOpeningTime > getcurTime && getClosingTime > getcurTime) {
      return <strong>{`Opens ${moment(oTime).format("LT")}`}</strong>;
    } else return <strong>{`Closes ${moment(cTime).format("LT")}`}</strong>;
  } else {
    return `${moment(oTime).format("LT")} - ${moment(cTime).format("LT")}`;
  }
};
export const SERVER_ERROR =
  "Your request can't be completed at the moment. Please try again later.";

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

export const getUserToken = () => {
  return localStorage.getItem("tk");
};

export const logout = () => {
  return localStorage.removeItem("tk");
};

export const asyncLocalStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },
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
export const purgeTemp = function () {
  return localStorage.removeItem(TEMP_ID);
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
export const toastOptions = (hasError = false) => {
  return {
    autoClose: 3000,
    position: toast.POSITION.TOP_CENTER,
    type: hasError ? toast.TYPE.ERROR : toast.TYPE.INFO,
    hideProgressBar: true,
  };
};

export const isShopOpen = (shopTime) => {
  const convertedTime = moment(new Date()).format("HH:mm");
  if (shopTime.oTime > convertedTime && shopTime.cTime > convertedTime) {
    return LATER_TODAY;
  } else return NOT_OPEN;
};
export const titleCase = (str) => {
  str = str.toLowerCase();
  str = str.split(" ");

  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }

  return str.join(" ");
};
export const nextOpening = (shopTime, shopTimes) => {
  const arrayLength = shopTimes.length;
  let currentIndex = shopTimes.indexOf(shopTime);
  let nextIndex;
  if (currentIndex + 1 === arrayLength) {
    nextIndex = 0;
  } else {
    nextIndex = ++currentIndex;
  }

  return shopTimes[nextIndex];
};
