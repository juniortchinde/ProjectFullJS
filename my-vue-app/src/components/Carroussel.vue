<script setup lang="ts" >

import {ref, watch} from "vue";

defineProps({
    images: {
        type: Array as () => string[], // Tableau de chaînes pour les URLs des images
            required:true,
    }
})

const currentIndex = ref(0);

const prevSlide = (images: Array<String>) => {
    currentIndex.value =
        currentIndex.value === 0 ? images.length - 1 : currentIndex.value - 1;
};

const nextSlide = (images: Array<String>) => {
    currentIndex.value =
        currentIndex.value === images.length - 1 ? 0 : currentIndex.value + 1;
};

const goToSlide = (index: number) => {
    currentIndex.value = index;
};

watch(currentIndex, (newIndex) => {
    const carousel = document.querySelector('.carousel-images') as HTMLElement;
    if (carousel) {
        carousel.style.transform = `translateX(-${newIndex * 100}%)`;
    }
});
</script>

<template>
    <div class="carousel">
        <!-- Bouton précédent -->
        <button @click="prevSlide(images)" class="carousel-control prev">‹</button>

        <!-- Conteneur des images -->
        <div class="carousel-images">
            <img
                v-for="(image, index) in images"
                :key="index"
                :src="image"
                :alt="'Image ' + (index + 1)"
                :class="{ active: index === currentIndex }"
            />
        </div>

        <!-- Bouton suivant -->
        <button @click="nextSlide(images)" class="carousel-control next">›</button>

        <!-- Indicateurs -->
        <div class="carousel-indicators">
      <span
          v-for="(image, index) in images"
          :key="'indicator-' + index"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
      ></span>
        </div>
    </div>
</template>



<style scoped>
.carousel {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: auto;
    overflow: hidden;
}

.carousel-images {
    display: flex;
    transition: transform 0.5s ease-in-out;
    transform: translateX(calc(-100% * var(--blue, 0)));
}

.carousel-images img {
    width: 100%;
    flex-shrink: 0;
    object-fit: contain;
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 10;
}

.carousel-control.prev {
    left: 10px;
}

.carousel-control.next {
    right: 10px;
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.carousel-indicators span {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background: gray;
    border-radius: 50%;
    cursor: pointer;
}

.carousel-indicators span.active {
    background: black;
}
</style>
