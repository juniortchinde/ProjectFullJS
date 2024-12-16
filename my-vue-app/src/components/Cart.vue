<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true
  },
  title : {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description : {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="product">
    <img :src="image" alt=""/>
    <div class="product-info"  >
      <h3 class="title">  {{title}} </h3>
      <p class="description">{{description}}</p>
      <p class="price"> {{price}} </p>
      <div class="quantity">
        <button>-</button>
        <p>{{quantity}}</p>
        <button>+</button>
      </div>
      <button class="delete"> Suprimer</button>
    </div>
  </div>
</template>

<style scoped>
.product {
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: .2rem;
  border-radius: 7px;
  background: var(--background);
}
.product img {
  height: 200px;
  object-fit: contain;
}

.product-info {
  display: flex;
  width: 60%;
  flex-direction: column;
  gap: 1rem;
}
.product-info .title {
  padding-top: .7rem;
  text-align: center;
  font-size: 2rem;
}
.product-info .description {
  font-size: 1rem;
}
.product-info .price {
  font-size: 1.5rem;
  color: var(--red);
  font-weight: bold;
}

.product-info .quantity {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  width: 50%;
  background: var(--border);
  border-radius: 7px;
  font-size: 1.2rem;
}
.product-info .quantity button {
  background: var(--border);
  border: none;
  font-size: 1.2rem;
}

.product-info .delete {
  background: var(--red) ;
  color: var(--white);
  padding: 0.5rem;
  border-radius: 7px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  align-items: end;
  width: 50%;
}

</style>