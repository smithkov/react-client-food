import http from "../http-common";

class ClientService {
  products() {
    return http.get("/products");
  }

  productsByOrigin(id) {
    return http.get("/product/origin/" + id);
  }

  origins() {
    return http.get(`/origins`);
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

  shopTypes() {
    return http.get(`/shopTypes`);
  }
  unitTypes() {
    return http.get(`/units`);
  }
  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }
  findShopByUser(id) {
    return http.get(`/shops/byUser/${id}`);
  }
  productsByUser(data) {
    return http.post(`/product/byUser`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new ClientService();
