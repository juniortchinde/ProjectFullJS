<script setup lang="ts">
import {useCatStore} from '@/stores/orderStore'

import {toRaw} from "vue"
import Cart from "@/components/Cart.vue";

const catStore = useCatStore();
const items = toRaw(catStore.$state.items);
const total = catStore.totalPrice;


</script>

<template>
  <h1> Mon panier de Commande </h1>
    <div class="cart-container"  v-if="items.length && items.length > 0">
        <Cart
            v-for="item in items"
            :title="item.title"
            :description="item.description"
            :price="item.price"
            :image="item.image"
            :quantity="item.quantity"
        >
        </Cart>
        <div class="total-order">
          <h3> Prix total :</h3>
          <p> {{total}}</p>
          <button> Passer la Commande </button>
        </div>
    </div>
    <div class="no-products" v-else>
    <p> Pas encore de produit dans votre panier </p>
  </div>
</template>

<style scoped>
h1 {
  margin: 1.5rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}
.cart-container {
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  margin: auto;
  gap: 2rem;
}


.total-order {
  display: flex;
  width: 20%;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.total-order h3 {
  font-size: 2rem;
  font-weight: bold;
}

.total-order p {
  font-size: 1.5rem;
  font-weight: bold;
}
.total-order button {
  border: none;
  padding: 0.7rem;
  border-radius: 7px;
  background: var(--blue);
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;

}

.no-products {
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
  font-size: 3rem ;
  color: var(--icons);
}


</style>
