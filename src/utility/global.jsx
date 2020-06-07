export const SERVER_URL = "http://localhost:8000/api";
export const IMAGE_URL = "http://localhost:8000/uploads/category/";
export const CRED = "cred";
export const ERROR_MSG = "Your request could not be saved at the moment, please kindly contact us to resolve it.";
export const MISSING_USER_MSG = "Current user details can't be resolved, kindly relogin and retry.";
export const getUserProfile = function () {
  return JSON.parse(localStorage.getItem(CRED));
};
export const setUserProfile = function (value) {
  JSON.stringify(localStorage.setItem(CRED, value));
};
