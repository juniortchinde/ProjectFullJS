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
import Basket from "@/pages/Basket.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home, name: 'home'},
        { path: '/product/:productId', component: Product},
        { path: '/login', component: Login, name: 'login'},
        { path: '/register', component: Register},
        {path: "/basket", component: Basket},

    ]
})

app.use(router)
app.use(pinia)
app.mount('#app')
