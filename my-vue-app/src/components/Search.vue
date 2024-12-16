<script setup lang="ts">
    import {ref} from "vue";
    import {useRouter} from "vue-router"
    import { ChSearch } from '@kalimahapps/vue-icons';
    const baseUrl = import.meta.env.VITE_BASE_URL;
    import {useSearchStore} from "@/stores/searchStore"

    const router = useRouter()
    const searchStore = useSearchStore()

    const search =  ref<string>('');

    const openSearchPage =async () => {
        await router.push('/search');
    }

    const handleSearch = async () => {
      try {
        localStorage.setItem('search', search.value);

        const response = await fetch(`${baseUrl}/product/searchProducts?search=${encodeURIComponent(search.value)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();

          if (!data.error) {
              searchStore.setSearchResult(data.products);
              console.log(searchStore.$state.searchResult)
          }
      }
      catch (error) {
        console.log(error)
      }
    }

</script>

<template>
    <form class="search-form" @submit.prevent="handleSearch">
        <input
            @click="openSearchPage"
            type="search"
            v-model="search"
            placeholder="Rechercher sur GoodLife"
            id="search"
            required
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