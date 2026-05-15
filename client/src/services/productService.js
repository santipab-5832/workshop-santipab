import api from "./api";

export default {
  getAll() {
    return api.get("/products");
  },

  getById(id) {
    return api.get(`/products/${id}`);
  },

  create(payload) {
    return api.post("/products", payload);
  },

  update(id, payload) {
    return api.put(`/products/${id}`, payload);
  },

  remove(id) {
    return api.delete(`/products/${id}`);
  },
};
