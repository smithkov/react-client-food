import http from "../http-common";

class ClientService {
  products() {
    return http.get("/products");
  }

  productUpdate(id, data) {
    return http.patch(`/product/${id}`,data);
  }

  productsByOrigin(id) {
    return http.get("/product/origin/" + id);
  }

  productById(id) {
    return http.get("/product/" + id);
  }

  productsByShopId(id) {
    return http.get("/products/byShopId/" + id);
  }

  origins() {
    return http.get(`/origins`);
  }

  cities() {
    return http.get(`/cities`);
  }

  durations() {
    return http.get(`/shop/duration`);
  }

  socialTypes() {
    return http.get(`/socialTypes`);
  }

  social(data) {
    return http.post(`/social`, data);
  }

  findSocialById(userId) {
    return http.get(`/social/${userId}`);
  }

  login(data) {
    return http.post("/user/login", data);
  }

  register(data) {
    return http.post("/user/register", data);
  }

  socialAccess(data) {
    return http.post("/user/socialRegister", data);
  }

  createShop(data) {
    return http.post("/shop", data);
  }

  category() {
    return http.get(`/categories`);
  }

  getMealByCategoryId(id) {
    return http.get(`/product/category/${id}`);
  }

  hasAuth() {
    return http.get(`/user/isLogin`);
  }

  cart(data) {
    return http.post(`/cart`, data);
  }
  transaction(data) {
    return http.post(`/transaction`, data);
  }

  transactionByUser(data) {
    return http.post(`/user/transaction`, data);
  }

  /* This route updates order message if there is one, and takes a user to payment. 
   If there is no order associated with tempId and ShopId, it returns 404  */
  orderMessage(data) {
    return http.post(`/order/messageUpdate`, data);
  }

  getCartByTempId(data) {
    return http.post(`/retriveCartByTempId`, data);
  }

  getCartByShopId(shopId) {
    return http.get(`/retriveCartByShopId/${shopId}`);
  }

  createProduct(data) {
    return http.post("/product", data);
  }

  createHomeAddress(data) {
    return http.post("/homeAddress", data);
  }

  createReview(data) {
    return http.post("/rating", data);
  }

  createProductReview(data) {
    return http.post("/productRating", data);
  }

  shopTypes() {
    return http.get(`/shopTypes`);
  }
  unitTypes() {
    return http.get(`/units`);
  }
  userUpdate(id, data) {
    return http.patch(`/user/${id}`, data);
  }

  settings(id, data) {
    return http.patch(`/settings/${id}`, data);
  }

  findShopByUser(id) {
    return http.get(`/shops/byUser/${id}`);
  }

  findReviewByShop(data) {
    return http.post(`/rating/shop`, data);
  }

  findReviewByProduct(data) {
    return http.post(`/productRating/product`, data);
  }

  findShopByName(data) {
    return http.post(`/shopByName`, data);
  }

  findShopByUrl(data) {
    return http.post(`/shopByUrl`, data);
  }

  findShopById(id) {
    return http.get(`/shop/${id}`);
  }
  productsByUser(data) {
    return http.post(`/product/byUser`, data);
  }

  updateUserAddress(data) {
    return http.post(`/userAddress/update`, data);
  }
  findUserById(id) {
    return http.get(`/user/${id}`);
  }
}

export default new ClientService();
