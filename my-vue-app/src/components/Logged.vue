<script setup lang="ts">

import {BxUser} from "@kalimahapps/vue-icons";
import {useAuthStore} from "@/stores/authStore";
import {onMounted, ref} from "vue";

const baseUrl = import.meta.env.VITE_BASE_URL

const authStore = useAuthStore();
const username = ref('')
const isAuthenticated = authStore.isAuthenticated();
const getUser = async () => {
    try {

        await authStore.refreshToken();
        if(isAuthenticated) {
            const response = await fetch(`${baseUrl}/user/getUser`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.token}`,
                },
            })
            const data = await response.json();
            if(!data.error){

                username.value = data.user.lastname;
            }
        }

    }
    catch (error) {
        console.log(error);
    }
}
onMounted(() =>{
    getUser();
})
</script>

<template>

    <router-link  v-if="isAuthenticated" to="/profile">
      <BxUser></BxUser>
      <span> {{username}}</span>
    </router-link>
    <router-link  v-else to="/login">
          <BxUser></BxUser>
          <span> Se connecter</span>
    </router-link>
</template>

<style scoped>
svg {
    color: var(--icons);
    font-size: 1.5rem;
}
</style>