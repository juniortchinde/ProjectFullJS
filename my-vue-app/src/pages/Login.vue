<script setup lang="ts">
import  logo from '@/assets/logo.png'
import {ref} from "vue";
import {useAuthStore} from "@/stores/authStore";
import {useRouter} from "vue-router";


const email = ref('')
const password = ref('')

// Variables pour les erreurs de validation
const emailError = ref('');
const passwordError = ref('');
const loginError = ref('');
const authStore = useAuthStore();
const router = useRouter();

const validateFields = () => {
    emailError.value = '';
    passwordError.value = '';

    // Vérification de l'email
    if (!email.value) {
        emailError.value = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = "Veuillez entrer une adresse email valide.";
    }

    // Vérification du mot de passe
    if (!password.value) {
        passwordError.value = 'Le mot de passe est requis.';
    } else if (password.value.length < 6) {
        passwordError.value = 'Le mot de passe doit comporter au moins 6 caractères.';
    }
    return !emailError.value && !passwordError.value;
};

const handleLogin = async () => {
    loginError.value = '';

    if(!validateFields()){
        return
    }
    try {
        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        const data = await response.json();

        if (!data.error){
            authStore.setToken(data.accessToken);
            router.push({name: 'home'})

        }
        else {
            loginError.value = 'Email ou mot de passe incorrect.';
        }
    } catch (error) {
        console.log(error)
        loginError.value = 'Une erreur est survenue lors de la connexion.';
    }

}
</script>

<template>
    <div class="login-container">

        <div class="logo">
            <img :src=logo>
        </div>
        <div class="form-container">
            <h1> Se connecter</h1>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        :class="{ 'input-error': emailError }"
                        placeholder="Entrez votre email"
                        required
                    />
                    <span v-if="emailError" class="error-message">{{ emailError }}</span>
                </div>

                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        :class="{ 'input-error': passwordError }"
                        placeholder="Entrez votre mot de passe"
                        required
                    />
                    <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
                </div>
                <button type="submit">Connexion </button>
                <p v-if="loginError" class="error-message">{{ loginError }}</p>
            </form>
            <p>Vous n’avez pas encore de compte? <span><router-link to="/register"> S’inscrire </router-link></span></p>
        </div>
    </div>

</template>

<style scoped>

.logo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.logo img{
    width: 26rem;
}

.form-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: solid 1px #ccc;
    border-radius: 5px;
    margin: 2rem 26rem;
    padding: 2rem 5rem 3rem 5rem ;
}
.form-container h1{
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
}
.form-container form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}
.form-container .form-group input {
    height: 2.5rem;
    padding: 0 1rem;
    border: solid 1px #ccc;
    border-radius: 7px;
    font-size: 1rem;
    font-weight: 400;
}

.form-container button{
    margin-top: 2rem;
    padding: .6rem 1.5rem;
    font-size: 1.2rem;
    background: var(--blue);
    color: var(--white);
    border: none;
    border-radius: 10px;
}

.form-container p {
    text-align: center;
    margin-top: 2rem;
    font-size: 1rem;
    font-weight: 400;
}
.error-message{
    margin:0;
    padding:0;
    color:var(--red);
    font-size: 1rem;
    font-weight: 400;
}
</style>