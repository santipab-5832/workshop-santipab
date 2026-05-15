<template>
  <v-container>
    <h1>รายการ Order</h1>

    <v-alert v-if="error" type="error" dismissible>
      {{ error }}
    </v-alert>

    <v-alert v-if="success" type="success" dismissible>
      {{ success }}
    </v-alert>

    <v-simple-table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>User ID</th>
          <th>จำนวน</th>
          <th>สถานะ</th>
          <th>วันที่สั่งซื้อ</th>
          <th>จัดการ</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.productId }}</td>
          <td>{{ order.userId }}</td>
          <td>{{ order.quantity }}</td>

          <td>
            <v-select
              v-model="order.status"
              :items="statusOptions"
              dense
              outlined
              hide-details
              @change="updateStatus(order)"
            ></v-select>
          </td>

          <td>{{ formatDate(order.createdAt) }}</td>

          <td>
            <v-btn small color="error" @click="deleteOrder(order._id)">
              ลบ
            </v-btn>
          </td>
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
      loading: false,
      error: "",
      success: "",

      statusOptions: ["pending", "success", "cancel"],
    };
  },

  created() {
    this.fetchOrders();
  },

  methods: {
    async fetchOrders() {
      try {
        this.loading = true;
        this.error = "";

        const response = await orderService.getAll();
        this.orders = response.data.data;
      } catch (error) {
        this.error = "โหลด Order ไม่สำเร็จ กรุณา Login ก่อน";
      } finally {
        this.loading = false;
      }
    },

    async updateStatus(item) {
      try {
        this.error = "";
        this.success = "";

        await orderService.updateStatus(item._id, item.status);

        this.success = "อัปเดตสถานะ Order สำเร็จ";
      } catch (error) {
        this.error = "อัปเดตสถานะ Order ไม่สำเร็จ ต้องใช้บัญชี Admin";
        this.fetchOrders();
      }
    },

    async deleteOrder(id) {
      const confirmDelete = confirm("ต้องการลบ Order นี้ใช่ไหม?");

      if (!confirmDelete) {
        return;
      }

      try {
        this.error = "";
        this.success = "";

        await orderService.remove(id);

        this.success = "ลบ Order สำเร็จ";
        this.fetchOrders();
      } catch (error) {
        this.error = "ลบ Order ไม่สำเร็จ ต้องใช้บัญชี Admin";
      }
    },

    formatDate(date) {
      if (!date) {
        return "-";
      }

      return new Date(date).toLocaleString("th-TH");
    },
  },
};
</script>
