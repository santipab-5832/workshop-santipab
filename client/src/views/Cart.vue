<template>
  <v-container>
    <h1 class="mb-4">ตะกร้าสินค้า</h1>

    <v-alert v-if="cart.length === 0" type="info">
      ยังไม่มีสินค้าในตะกร้า
    </v-alert>

    <v-card v-for="item in cart" :key="item._id" class="mb-3 pa-3">
      <v-card-title>{{ item.name }}</v-card-title>

      <v-card-text>
        <p>ราคา: {{ item.price }} บาท</p>
        <p>จำนวน: {{ item.quantity }}</p>
        <p>รวม: {{ item.price * item.quantity }} บาท</p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="success" @click="increase(item)">+</v-btn>
        <v-btn color="warning" @click="decrease(item)">-</v-btn>
        <v-btn color="error" @click="removeItem(item._id)">ลบ</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="cart.length > 0" class="pa-4 mt-4">
      <h2>ราคารวมทั้งหมด: {{ totalPrice }} บาท</h2>

      <v-btn color="primary" block class="mt-3" @click="checkout">
        ยืนยันการสั่งซื้อ
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import orderService from "../services/orderService";

export default {
  data() {
    return {
      cart: [],
    };
  },

  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
    },
  },

  created() {
    this.loadCart();
  },

  methods: {
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },

    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    increase(item) {
      item.quantity += 1;
      this.saveCart();
    },

    decrease(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
      this.saveCart();
    },

    removeItem(id) {
      this.cart = this.cart.filter((item) => item._id !== id);
      this.saveCart();
    },

    async checkout() {
      try {
        for (const item of this.cart) {
          await orderService.create(item._id, item.quantity);
        }

        localStorage.removeItem("cart");
        this.cart = [];
        alert("สั่งซื้อสำเร็จ");
      } catch (error) {
        alert("สั่งซื้อไม่สำเร็จ กรุณา Login หรือเช็คจำนวนสินค้า");
      }
    },
  },
};
</script>