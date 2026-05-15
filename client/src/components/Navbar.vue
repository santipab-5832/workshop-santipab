<template>
  <div>
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">
        <!-- โลโก้ -->
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <!-- My Profile -->
        <span class="text-h6 font-weight-bold hidden-sm-and-down">
          My Profile
        </span>
      </div>

      <v-spacer></v-spacer>

      <!-- Github -->
      <v-btn href="https://github.com/santipab-5832" target="_blank" text>
        <span class="mr-2">Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
