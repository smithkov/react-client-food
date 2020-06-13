import http from "../http-common";

class ClientService {
  products() {
    return http.get("/products");
  }

  productsByOrigin(id) {
    return http.get("/product/origin/" + id);
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

  socialTypes() {
    return http.get(`/socialTypes`);
  }

  login(data) {
    return http.post("/user/login", data);
  }

  register(data) {
    return http.post("/user/register", data);
  }

  createShop(data) {
    return http.post("/shop", data);
  }

  category(userId) {
    return http.get(`/categoriesByShop/${userId}`);
  }

  createProduct(data) {
    return http.post("/product", data);
  }

  createHomeAddress(data) {
    return http.post("/homeAddress", data);
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
  findShopByUser(id) {
    return http.get(`/shops/byUser/${id}`);
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
