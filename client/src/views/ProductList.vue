<template>
  <v-container>
    <h1 class="mb-4">รายการสินค้า</h1>

    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>

    <v-row>
      <v-col
        v-for="product in products"
        :key="product._id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="pa-3" elevation="3">
          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-text>
            <p>ราคา: {{ product.price }} บาท</p>
            <p>คงเหลือ: {{ product.stock }} ชิ้น</p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              block
              :disabled="product.stock <= 0"
              @click="addToCart(product)"
            >
              เพิ่มลงตะกร้า
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import productService from "../services/productService";

export default {
  data() {
    return {
      products: [],
      error: "",
    };
  },

  created() {
    this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      try {
        const response = await productService.getAll();
        this.products = response.data.data;
      } catch (error) {
        this.error = "กรุณา Login ก่อนดูรายการสินค้า";
      }
    },

    addToCart(product) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const found = cart.find((item) => item._id === product._id);

      if (found) {
        found.quantity += 1;
      } else {
        cart.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("เพิ่มสินค้าลงตะกร้าแล้ว");
    },
  },
};
</script>