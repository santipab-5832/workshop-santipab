<template>
  <v-container>
    <h1>จัดการสินค้า</h1>

    <v-card class="pa-4 mb-4">
      <v-text-field label="ชื่อสินค้า" v-model="form.name"></v-text-field>
      <v-text-field
        label="ราคา"
        v-model.number="form.price"
        type="number"
      ></v-text-field>
      <v-text-field
        label="จำนวนสินค้า"
        v-model.number="form.stock"
        type="number"
      ></v-text-field>

      <v-btn color="primary" @click="saveProduct">
        {{ editingId ? "บันทึกการแก้ไข" : "เพิ่มสินค้า" }}
      </v-btn>

      <v-btn color="grey" @click="resetForm"> ล้างฟอร์ม </v-btn>
    </v-card>

    <v-card v-for="product in products" :key="product._id" class="pa-3 mb-3">
      <h3>{{ product.name }}</h3>
      <p>ราคา: {{ product.price }} บาท</p>
      <p>คงเหลือ: {{ product.stock }} ชิ้น</p>

      <v-btn color="warning" @click="editProduct(product)">แก้ไข</v-btn>
      <v-btn color="error" @click="deleteProduct(product._id)">ลบ</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import productService from "../services/productService";

export default {
  data() {
    return {
      products: [],
      editingId: null,
      form: {
        name: "",
        price: 0,
        stock: 0,
      },
    };
  },

  created() {
    this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      const response = await productService.getAll();
      this.products = response.data.data;
    },

    async saveProduct() {
      if (this.editingId) {
        await productService.update(this.editingId, this.form);
      } else {
        await productService.create(this.form);
      }

      this.resetForm();
      this.fetchProducts();
    },

    editProduct(product) {
      this.editingId = product._id;
      this.form = {
        name: product.name,
        price: product.price,
        stock: product.stock,
      };
    },

    async deleteProduct(id) {
      if (confirm("ต้องการลบสินค้านี้ใช่ไหม?")) {
        await productService.remove(id);
        this.fetchProducts();
      }
    },

    resetForm() {
      this.editingId = null;
      this.form = {
        name: "",
        price: 0,
        stock: 0,
      };
    },
  },
};
</script>