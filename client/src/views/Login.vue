<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5">
        <v-card class="pa-5" elevation="4">
          <v-card-title class="justify-center"> Login </v-card-title>

          <v-card-text>
            <v-text-field
              label="Username"
              v-model="username"
              prepend-icon="mdi-account"
            ></v-text-field>

            <v-text-field
              label="Password"
              v-model="password"
              prepend-icon="mdi-lock"
              type="password"
              @keyup.enter="login"
            ></v-text-field>

            <v-alert v-if="errorMessage" type="error" dense>
              {{ errorMessage }}
            </v-alert>

            <v-alert v-if="successMessage" type="success" dense>
              {{ successMessage }}
            </v-alert>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" block @click="login"> Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      successMessage: "",
    };
  },

  methods: {
    async login() {
      this.errorMessage = "";
      this.successMessage = "";

      if (!this.username || !this.password) {
        this.errorMessage = "กรุณากรอก username และ password";
        return;
      }

      try {
        const response = await api.post("/login", {
          username: this.username,
          password: this.password,
        });

        const token = response.data.data;

        localStorage.setItem("token", token);

        this.successMessage = "Login สำเร็จ";

        this.$router.push("/products");
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message || "Login ไม่สำเร็จ";
        } else {
          this.errorMessage = "ไม่สามารถเชื่อมต่อ Server ได้";
        }
      }
    },
  },
};
</script>