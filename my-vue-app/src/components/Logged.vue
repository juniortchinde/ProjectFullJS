<script setup lang="ts">

import {BxUser} from "@kalimahapps/vue-icons";
import {useAuthStore} from "@/stores/authStore";
import {onMounted, ref} from "vue";

const authStore = useAuthStore();
const refreshToken = async () => {
    await authStore.refreshToken();
}
onMounted(() => {
    refreshToken()
})

</script>

<template>

    <router-link  v-if="authStore.lastname" to="/profile">
      <BxUser></BxUser>
      <span> {{authStore.lastname}}</span>
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