<script setup lang="ts">
import VignetteProduit from "@/components/VignetteProduit.vue";

const baseUrl = import.meta.env.VITE_BASE_URL;
import {onMounted, ref} from "vue";
const error = ref(false)
const errorMsg = ref("")
const products = ref([])


const getproducts = async () => {

    const response = await fetch(`${baseUrl}/product/getAllProducts` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();

    console.log(data.products);
    if (data.error) {
        error.value = true;
        errorMsg.value = "Oups une erreur c'est produire rechargé la page";
    }
    else
      products.value = data.products;
}
onMounted(() =>{
    getproducts();
})

</script>


<template>
  <div class="product-container">
    <router-link
        v-for="product in products"
        :key="product._id"
        :to="{ name: 'product', params: { productId: product._id } }"
        class="product-link"
    >
      <VignetteProduit
          :image="product.images[0].imageUrl"
          :nom="product.title"
          :description="product.description"
          :prix="product.price"
      />
    </router-link>
    <p v-if="error">{{ errorMsg }}</p>
  </div>
</template>

<style scoped>
.product-container {
    max-width: 1200px;
    margin: 1.5rem auto;
    display: grid;
    justify-content: center;
    align-items: stretch;
    grid-template-columns: repeat(auto-fill, minmax(240px, auto));
    gap: 1rem;
}

</style>