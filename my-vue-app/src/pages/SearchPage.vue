<script setup lang="ts">
import {onMounted, ref} from "vue";
import SearchResult from "@/components/SearchResult.vue";
import  {toRaw} from "vue"
import {useSearchStore} from "@/stores/searchStore"

const baseUrl = import.meta.env.VITE_BASE_URL

// Déclare les variables réactives
const search = ref<string | null >(localStorage.getItem('search'));
const categories = ref<Array<{_id: string, catName: string}>>([]);
const category = ref<string>('');
const minPrice = ref<number>(0);
const maxPrice = ref<number>(99999999999);

const  searchStore = useSearchStore();

const handleFilter = async () => {
  try {

    const response = await fetch(`${baseUrl}/product/searchProducts` +
  `?search=${encodeURIComponent(localStorage.getItem('search') || "")}` +
  `&category=${encodeURIComponent(category.value)}` +
  `&minPrice=${encodeURIComponent(minPrice.value)}` +
  `&maxPrice=${encodeURIComponent(maxPrice.value)}`, {
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

// recuperer les categories
async function getCategories() {
  try {
    const response = await fetch(`${baseUrl}/category/getAllCategories` , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();
    if (!data.error) {
      categories.value = data.categories;
    }
  }
  catch (error) {
    console.error(error);
  }
}
onMounted( () =>{
  getCategories()
})
</script>

<template>
  <div class="filter">
    <form @submit.prevent="handleFilter">
      <div class="form-categories">
        <label for="category">Catégorie</label>
        <select v-model="category" id="category">
          <option v-for="category in categories" :key="category._id" >{{ category.catName }}</option>
        </select>
      </div>

      <div class="form-price">
        <label for="price">Prix minimun</label>
        <input type="number" id="price" v-model="minPrice" required />

      </div>

      <div class="form-price">
        <label for="price">Prix maximum</label>
        <input type="number" id="price" v-model="maxPrice"/>
      </div>
      <button type="submit">Valider les Filtres</button>
    </form>
    <router-link
        v-for="product in toRaw(searchStore.$state.searchResult)"
        :key="product._id"
        :to="{ name: 'product', params: { productId: product._id } }"
        class="product-link"
    >
      <SearchResult
        :image="product.images[0].imageUrl"
        :title="product.title"
        :description="product.description"
        :price="product.price"
      >
      </SearchResult>
    </router-link>
  </div>
</template>
  <div class="filter">
      
  </div>
<style scoped>
.filter {
  max-width: 1000px;
  margin: auto;
  min-height: 70vh;
}
.filter form {

  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
}

.form-categories {
  padding: .7rem 0 .7rem 3rem;
  display: flex;
  gap: 1rem;

}
.form-categories select {
  border: none;
  font-size: 1rem;
}

.form-price {
  padding: .7rem;
  display: flex;
  gap: 1rem;

}
.form-price input {
  font-size: 1rem;
  width: 5rem;
}

form button {
  border: none;
  font-size: 1rem;
  padding: 0.5rem;
  background: var(--blue);
  color: var(--white);
  border-radius: 7px;

}
</style>