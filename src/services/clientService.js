import http from "axios";

import { SERVER_URL, asyncLocalStorage } from "../utility/global";
const TOKEN = "tk";
function header(token) {
  if (token) {
    return {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ` + token,
      },
    };
    // return {
    //   "Content-type": "application/json",
    //   Authorization: `Bearer ` + token,
    // };
  } else {
    return {
      headers: {
        "Content-type": "application/json",
      },
    };
  }
}
class ClientService {
  products = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/products`, data, header(token));
  };

  contactUs(data) {
    return http.post(`${SERVER_URL}/contactUs`, data);
  }
  productUpdate = async (id, data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.patch(`${SERVER_URL}/product/${id}`, data, header(token));
  };

  shopByOrigin = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/shopByOrigin`, data, header(token));
  };
  productByCategory = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/shop/productByCategory`, data, header(token));
  };
  
  storeVerification(code) {
    return http.get(`${SERVER_URL}/shop/activateByLink/` + code);
  }

  productById = async (id) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.get(`${SERVER_URL}/product/` + id, header(token));
  };

  storeListing = async () => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/storeListing`, header());
  };

  storeListingClose = async () => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/storeListingClose`, header());
  };

  storeFrontPage = async () => {
    return http.post(`${SERVER_URL}/storeFrontPage`, header());
  };

  listingSearch = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/listingSearch`, data, header());
  };

  productsByShopId = async (id) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.get(`${SERVER_URL}/products/byShopId/` + id, header(token));
  };

  origins() {
    return http.get(`${SERVER_URL}/origins`);
  }

  cities() {
    return http.get(`${SERVER_URL}/cities`);
  }

  durations() {
    return http.get(`${SERVER_URL}/shop/duration`);
  }

  socialTypes() {
    return http.get(`${SERVER_URL}/socialTypes`);
  }

  social(data) {
    return http.post(`${SERVER_URL}/social`, data);
  }

  findSocialById(userId) {
    return http.get(`${SERVER_URL}/social/${userId}`);
  }

  login(data) {
    return http.post(`${SERVER_URL}/user/login`, data, header());
  }

  register(data) {
    return http.post(`${SERVER_URL}/user/register`, data);
  }

  socialAccess = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/user/socialRegister`, data, header(token));
  };

  createShop = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/create-shop`, data, header(token));
  };

  updateShop = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/shop`, data, header(token));
  };

  hasExpiredLinkForSellerReg(id) {
    return http.get(`${SERVER_URL}/hasUserExpired/${id}`);
  }

  category() {
    return http.get(`${SERVER_URL}/categories`);
  }

  logout() {
    return http.post(`${SERVER_URL}/logout`);
  }

  getMealByCategoryId(id) {
    return http.get(`${SERVER_URL}/product/category/${id}`);
  }

  hasAuth = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.get(`${SERVER_URL}/user/isLogin`, header(token));
  };

  cart(data) {
    return http.post(`${SERVER_URL}/cart`, data);
  }
  transaction = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/transaction`, data, header(token));
  };

  transactionByUser = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/user/transaction`, data, header(token));
  };

  transactionByShop = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/shop/transaction`, data, header(token));
  };

  stripePay = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/stripePay`, data, header(token));
  };

  transactionById = async (id) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.get(`${SERVER_URL}/shop/transaction/${id}`, header(token));
  };

  /* This route updates order message if there is one, and takes a user to payment. 
   If there is no order associated with tempId and ShopId, it returns 404  */
  orderMessage = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/order/messageUpdate`, data, header(token));
  };

  getCartByTempId(data) {
    return http.post(`${SERVER_URL}/retriveCartByTempId`, data);
  }

  getCartByShopId = async (shopId) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.get(
      `${SERVER_URL}/retriveCartByShopId/${shopId}`,
      header(token)
    );
  };

  createProduct = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/product`, data, header(token));
  };

  createHomeAddress = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/homeAddress`, data, header(token));
  };

  createReviewResponse = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(
      `${SERVER_URL}/productRatingResponse`,
      data,
      header(token)
    );
  };

  createShopReviewResponse = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/ratingResponse`, data, header(token));
  };
  createReview = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/rating`, data, header(token));
  };

  findOpeningDaysByShop = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/openingDaysByShop`, data, header(token));
  };
  createOpeningDay = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/openingDay`, data, header(token));
  };

  createProductReview = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/productRating`, data, header(token));
  };

  shopTypes = async () => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.get(`${SERVER_URL}/shopTypes`, header(token));
  };
  unitTypes = async () => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.get(`${SERVER_URL}/units`, header(token));
  };
  userUpdate = async (id, data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.patch(`${SERVER_URL}/user/${id}`, data, header(token));
  };

  settings = async (id, data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.patch(`${SERVER_URL}/settings/${id}`, data, header(token));
  };

  bankDetail = async (id, data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.patch(`${SERVER_URL}/bankDetail/${id}`, data, header(token));
  };

  fetchShopPreOrder = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/fetchShopPreOrder`, data, header(token));
  };
  updatePreOrder = async (id, data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.patch(`${SERVER_URL}/preOrder/${id}`, data, header(token));
  };

  findShopByUser = async (id) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.get(`${SERVER_URL}/shops/byUser/${id}`, header(token));
  };

  findReviewByShop = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/rating/shop`, data, header(token));
  };

  findReviewByProduct = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(
      `${SERVER_URL}/productRating/product`,
      data,
      header(token)
    );
  };
  createProductRatingResponse = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(
      `${SERVER_URL}/productRatingResponse`,
      data,
      header(token)
    );
  };
  findPostCodesByShop = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/postCodesByShop`, data, header(token));
  };

  createPostCode = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/postCode`, data, header(token));
  };

  deletePostCode = async (id) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.delete(`${SERVER_URL}/postCode/${id}`, header(token));
  };

  resendVerifyEmail = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(
      `${SERVER_URL}/resendEmailVerification`,
      data,
      header(token)
    );
  };

  findProductReviewByShop = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/productRating/shop`, data, header(token));
  };
  findShopByName = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/shopByName`, data, header(token));
  };

  findShopByUrl = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/shopByUrl`, data, header(token));
  };

  findEmail = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/findEmail`, data, header(token));
  };

  findShopById = async (id) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.get(`${SERVER_URL}/shop/${id}`, header(token));
  };
  productsByUser = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/product/byUser`, data, header(token));
  };

  updateUserAddress = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.post(`${SERVER_URL}/userAddress/update`, data, header(token));
  };
  findUserById = async (id) => {
    const token = await asyncLocalStorage.getItem(TOKEN);
    return http.get(`${SERVER_URL}/user/${id}`, header(token));
  };
}

export default new ClientService();
