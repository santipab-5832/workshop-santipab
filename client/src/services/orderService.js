import api from "./api";

export default {
  getAll() {
    return api.get("/orders");
  },

  create(productId, quantity) {
    return api.post(`/orders/${productId}`, { quantity });
  },
  updateStatus(id, status) {
    return api.patch(`/orders/${id}/status`, { status });
  },

  remove(id) {
    return api.delete(`/orders/${id}`);
  },
};
