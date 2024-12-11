<script setup lang="ts">
import logo from "@/assets/logo.png"
import Search from "@/components/Search.vue";
</script>

<template>
    <nav class="navbar">
        <div class="logo">
          <router-link to="/">
            <img :src=logo>
          </router-link>

        </div>
        <Search></Search>
        <div>

        </div>
    </nav>
</template>

<style scoped>
.navbar {
    display: flex;
    padding: .8rem;
    gap: 2rem;
}
.navbar .logo img {
    width: 14rem;
}
</style>