<script setup lang="ts">
import {useCatStore} from '@/stores/orderStore'
import {loadConfigFromFile} from "vite";
import image from '@/assets/mini-frigo-domo-do906k03.jpg'


const catStore = useCatStore();
const items = catStore.items;
const total = catStore.totalPrice;

</script>

<template>
  <h1> Mon panier de Commande </h1>
    <div class="cart-container">
      <div class="product">
        <div class="product-image">
          <img :src="image" alt=""/>
        </div>
        <div class="product-info">
          <h3> Title </h3>
          <p> price</p>
          <button> quantité</button>
          <button> Suprimer</button>
        </div>
      </div>
        <div class="total-order">
          <h3> Prix total </h3>
          <button> Passer la Commande </button>
        </div>
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
  display: flex;
  max-width: 1200px;
  margin: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.cart-container .product-image {
  width: 30%;
}

.product-info {
  display: flex;
  width: 50%;
  gap: 2rem;
  margin: auto;
  flex-direction: column;
}

.product-image img{
  width: auto;
  height: 15rem;
  object-fit: contain;

}

.product-info button{
  width: 50%;
  padding: 7px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
}


.product {
  display: flex;
  flex-direction: row;
  width: 80%;
  background: #FAFAFB;

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


</style>
