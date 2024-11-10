<script setup lang="ts">
    import {ref} from "vue";
    import { ChSearch } from '@kalimahapps/vue-icons';

    const search = ref('')
    const handleSearch = () => {

    }
</script>

<template>
    <form class="search-form" @submit="handleSearch">
        <input
            type="search"
            v-model="search"
            placeholder="Rechercher sur GoodLife"
            id="search"
        >
        <button type="submit"><ChSearch></ChSearch></button>
    </form>
</template>

<style scoped>
    .search-form{
        display: flex;
        width: 100%;
    }
    .search-form input{
        width: 100%;
        font-size: 1rem;
        font-weight: 400;
        padding: 1rem;
        border: solid 1px var(--border);
        border-radius: 7px 0 0 7px;
    }

    .search-form button{
        width: 5%;
        background-color: var(--blue);
        color: var(--white);
        border: none;
        border-radius: 0 7px 7px 0;
        font-size: 1.5rem;
        font-weight: 400;
    }
</style>