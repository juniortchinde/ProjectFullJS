<script setup lang="ts">
import logo from "@/assets/logo.png"
import Search from "@/components/Search.vue";
</script>

<template>
    <nav class="navbar">
        <div class="logo">
            <img :src=logo>
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