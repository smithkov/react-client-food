export const SERVER_URL = "http://localhost:8000/api";
export const IMAGE_URL = "http://localhost:8000/uploads/category/";
export const DEFAULT_LOGO =
  "https://react.semantic-ui.com/images/wireframe/image.png";
export const DEFAULT_BANNER = "/images/default-banner.jpg";
export const DEFAULT_USER = "/images/user.jpg";
export const CRED = "cred";
export const IMG_MAX_SIZE = 5;
export const ERROR_MSG =
  "Your request could not be saved at the moment, please kindly contact us to resolve it.";
export const MISSING_USER_MSG =
  "Current user details can't be resolved, kindly relogin and retry.";
export const getUserProfile = function () {
  return JSON.parse(localStorage.getItem(CRED));
};
export const setUserProfile = function (value) {
  JSON.stringify(localStorage.setItem(CRED, value));
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
  return `£${parseInt(price).toFixed(2)}`;
};
