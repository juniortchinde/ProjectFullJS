<script setup lang="ts">
import Home from "@/pages/Home.vue";
import Basket from "@/pages/ShoppingCart.vue";
import Login from "@/pages/Login.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue"


</script>

<template>
  <Header></Header>
  <main>
        <router-view></router-view>
  </main>
  <Footer></Footer>
</template>

<style scoped>
main {

  padding: 2rem;
}
</style>
