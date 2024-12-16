import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import pinia from "@/plugins/pinia";
const app = createApp(App)
import  {createRouter, createWebHistory} from 'vue-router'


import Home from "@/pages/Home.vue";
import Product from "@/pages/Product.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import ShoppingCart from "@/pages/ShoppingCart.vue";
import Sell from "@/pages/Sell.vue";
import Profile from "@/pages/Profile.vue";
import SearchPage from"@/pages/SearchPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home, name: 'home'},
        { path: '/product/:productId', component: Product, name: 'product', props: true },
        { path: '/login', component: Login, name: 'login'},
        { path: '/sell', component: Sell, name: 'register'},
        { path: '/register', component: Register},
        {path: "/shopping-cart", component: ShoppingCart},
        {path: "/profile", component: Profile, name: 'profile'},
        {path: "/search", component: SearchPage, name: 'search'},
    ]
})

app.use(router)
app.use(pinia)
app.mount('#app')
