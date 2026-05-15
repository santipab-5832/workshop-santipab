<template>
  <v-container>
    <h1>รายการ Order</h1>

    <v-simple-table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>User ID</th>
          <th>จำนวน</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.productId }}</td>
          <td>{{ order.userId }}</td>
          <td>{{ order.quantity }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import orderService from "../services/orderService";

export default {
  data() {
    return {
      orders: [],
    };
  },

  created() {
    this.fetchOrders();
  },

  methods: {
    async fetchOrders() {
      const response = await orderService.getAll();
      this.orders = response.data.data;
    },
  },
};
</script>