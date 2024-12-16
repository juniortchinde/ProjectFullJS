<script setup lang="ts">
import {onMounted, ref} from "vue";
import {AnOutlinedMenu} from "@kalimahapps/vue-icons";
import { AkCross } from '@kalimahapps/vue-icons';
import { BxCategory } from '@kalimahapps/vue-icons';
const baseUrl = import.meta.env.VITE_BASE_URL;

const categories = ref<Array<{_id: string, catName: string}>>([]);
const errorMsg = ref("");

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
    else {
        errorMsg.value = "Oups Une erreur est survenue.";
    }
  }
  catch (error) {
    console.error(error);
  }
}

// afficher le menu ou pas
const isMenuOpen = ref(false);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}
onMounted (()=> {
  getCategories();
} )
</script>

<template>
    <div class="categories-container">
        <button @click="toggleMenu" class="dropdown-toggle">
            <AnOutlinedMenu v-if="!isMenuOpen"></AnOutlinedMenu>
            <AkCross v-else ></AkCross>
            <span> Parcourir les catégories</span>
        </button>
        <ul v-if="isMenuOpen" class="categories-menu">
            <li v-for="(category, index) in categories" :key="category.catName">
                <BxCategory/>
                <span v-if="errorMsg">{{errorMsg}}</span>
                <span v-else>{{ category.catName }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.categories-container .dropdown-toggle {
    display: flex;
    align-items: end;
    gap: .5rem;
    font-size: 1rem;
    font-weight: 400;
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: transparent;
}

.categories-container .dropdown-toggle:hover {
    color: var(--blue);
}
.categories-container svg {
    color: var(--icons);
    font-size: 1.5rem;
}
.categories-menu{
    width: 17%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: solid 1px var(--border);
    border-bottom: none;
    border-right: none;
    margin: 1.5rem 0;
    position: absolute;
    left: 0;
    padding: 2rem;
    background: var(--white);
    z-index: 10;
}
.categories-menu li {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 500;
}
.categories-menu li:hover {
    color: var(--blue);
}
</style>