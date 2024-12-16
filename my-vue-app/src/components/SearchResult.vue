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
    </div>
  </div>
</template>

<style scoped>
.product {
  display: flex;
  width: 80%;
  margin: 1rem auto;
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

  gap: 2rem;
}
.product-info .title {
  padding-top: .7rem;
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

.product-info .quantity button {
  background: var(--border);
  border: none;
  font-size: 1.2rem;
}

</style>