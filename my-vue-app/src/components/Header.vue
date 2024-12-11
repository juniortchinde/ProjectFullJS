<script setup lang="ts">

import NavBar from "@/components/navBar.vue";
import Categories from "@/components/Categories.vue";
import {AnOutlinedMenu, ReMoneyEuroCircleLine} from '@kalimahapps/vue-icons';
import { MdRoundHelpOutline } from '@kalimahapps/vue-icons';
import { BxUser } from '@kalimahapps/vue-icons';
import { FeShoppingCart } from '@kalimahapps/vue-icons';
import Logged from "@/components/Logged.vue";

</script>

<template>
    <header class="header">
        <navBar></navBar>
        <div class="option-container">
            <categories></categories>
            <div class="option-item">
                <router-link to="/sell">
                    <ReMoneyEuroCircleLine></ReMoneyEuroCircleLine>
                    <span>Mettre en vente</span>
                </router-link>
            </div>
            <div class="option-item">
                <router-link to="/help">
                    <MdRoundHelpOutline></MdRoundHelpOutline>
                    <span>Aide</span>
                </router-link>
            </div>

            <div class="option-item">
                <Logged></Logged>
            </div>

            <div class="option-item">
                <router-link to="/shopping-cart">
                    <FeShoppingCart></FeShoppingCart>
                    <span>Panier</span>

                </router-link>


            </div>

        </div>
    </header>
</template>

<style scoped>
.header {
    display: flex;
    flex-direction: column;
    padding-bottom:1rem ;
    border-bottom: solid 1px var(--border); ;
}
.option-container {
    display: flex;
    justify-content: space-between;
    margin: .5rem 2rem;
}
.option-container .option-item{
    display: flex;
    gap: .5rem;
    font-size: 1rem;
    font-weight: 400;
}

.option-container .option-item:hover{
  color: var(--blue);
}

.option-container .option-item  a{
    display: flex;
    align-items: end;
    gap: .5rem;
}

.option-container .option-item svg {
    gap: .5rem;
    color: var(--icons);
    font-size: 1.5rem;
}

</style>