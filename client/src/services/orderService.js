import api from "./api";

export default {
  getAll() {
    return api.get("/orders");
  },

  create(productId, quantity) {
    return api.post(`/orders/${productId}`, {
      quantity,
    });
  },
};
