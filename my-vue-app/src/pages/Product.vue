<script setup lang="ts">

import {onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
import Carroussel from "@/components/Carroussel.vue";
import {useCatStore} from '@/stores/orderStore'

const baseUrl = import.meta.env.VITE_BASE_URL
const catStore = useCatStore()

const product = ref<{_id: string, title: string, price: number, description: string, images : Array<string>}>({_id: '', title: '', price: 0, description: '', images: []})
const route = useRoute()
const productId = route.params.productId

const addOnCart = async () => {
    catStore.addToCart({
        id: product.value._id,
        description: product.value.description,
        quantity: 1,
        title: product.value.title,
        price: product.value.price,
        image: product.value.images[0],
    })
  console.log(catStore.$state.items)

}

const getProduct = async () => {
    try {

        const response = await fetch(`${baseUrl}/product/getProduct/${productId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        if(!data.error){
            console.log(data)
            product.value = data.product;
        }

    }
    catch (error) {
        console.log(error);
    }
}
onMounted(() =>{
    getProduct();
})

</script>

<template>
    <div class="product-container">
        <Carroussel :images="product.images" ></Carroussel>
        <div class="container-text">
            <h3 class="title">{{ product.title }}</h3>
            <p class="description">{{ product.description }}</p>
            <h3 class="price">{{ product.price }} € </h3>
        </div>
        <button class="button-cart" @click="addOnCart"> Ajouter au Panier </button>
    </div>
</template>

<style scoped>
.product-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 100%;

}
.container-text {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.container-text .title {
    font-size: 1.5rem;
    font-weight: 600;
}

.container-text .description {
    font-size: 1.2rem;
    font-weight: 400;
}

.container-text .price {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--red);
}
.button-cart{
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--white);
  background-color: var(--blue);
  border: none;
  border-radius: 7px;
}
</style>