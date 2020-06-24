import http from "../http-common";

class ClientService {
  products() {
    return http.get("/products");
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
    return http.post(`/social`,data);
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

  category(userId) {
    return http.get(`/categoriesByShop/${userId}`);
  }

  hasAuth() {
    return http.get(`/user/isLogin`);
  }

  cart(data) {
    return http.post(`/cart`,data);
  }

  getCart(shopId) {
    return http.get(`/getCart/${shopId}`);
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

  settings(id, data) {
    return http.patch(`/settings/${id}`, data);
  }

  findShopByUser(id) {
    return http.get(`/shops/byUser/${id}`);
  }

  findReviewByShop(data) {
    return http.post(`/rating/shop`,data);
  }

  findReviewByProduct(data) {
    return http.post(`/productRating/product`,data);
  }

  findShopByName(data) {
    return http.post(`/shopByName`,data);
  }

  findShopByUrl(data) {
    return http.post(`/shopByUrl`,data);
  }

  findShopById(id) {
    return http.get(`/shop/${id}`);
  }
  productsByUser(data) {
    return http.post(`/product/byUser`, data);
  }

  findUserById(id) {
    return http.get(`/user/${id}`);
  }


}

export default new ClientService();
