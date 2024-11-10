<script setup lang="ts">
import  logo from '@/assets/logo.png'
import {ref} from "vue";
import {useAuthStore} from "@/stores/authStore";
import {useRouter} from "vue-router";

const firstname = ref("");
const lastname = ref("");
const email = ref('')
const password = ref('')

// Variables pour les erreurs de validation
const firstnameError = ref('');
const lastnameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const registerError = ref('');
const authStore = useAuthStore();
const router = useRouter();

const validateFields = () => {
    firstnameError.value = '';
    lastnameError.value = '';
    emailError.value = '';
    passwordError.value = '';

    // verification du nom
    if(!firstname){
        firstnameError.value = "Le nom est requis.";
    }
    else if(!/^[a-zA-Z0-9\s\-]+$/.test(firstname.value)) {
        firstnameError.value = 'Le nom contient des caractères invalides.';
    }
    // verification du prénom
    if(!lastname){
        lastnameError.value = "Le nom est requis.";
    }
    else if(!/^[a-zA-Z0-9\s\-]+$/.test(lastname.value)) {
        lastnameError.value = 'Le prénom contient des caractères invalides.';
    }

    // Vérification de l'email
    if (!email.value) {
        emailError.value = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = "Veuillez entrer une adresse email valide.";
    }

    // Vérification du mot de passe
    if (!password.value) {
        passwordError.value = 'Le mot de passe est requis.';
    } else if (password.value.length < 8) {
        passwordError.value = 'Le mot de passe doit comporter au moins 6 caractères.';
    }
    return !emailError.value && !passwordError.value;
};

const handleRegister = async () => {
    registerError.value = '';

    if(!validateFields()){
        return
    }
    try {
        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                password: password.value
            })
        });

        const data = await response.json();

        if (!data.error){
            authStore.setToken(data.accessToken);
            router.push({name: 'login'})

        }
        else {
            registerError.value = data.message;
        }
    } catch (error) {
        console.log(error)
        registerError.value = 'Une erreur est survenue lors de la connexion.';
    }

}
</script>

<template>
    <div class="login-container">

        <div class="logo">
            <img :src=logo>
        </div>
        <div class="form-container">
            <h1> S'inscrire</h1>
            <form @submit.prevent="handleRegister">
                <div class="form-group">
                    <label for="firstname">Nom</label>
                    <input
                        type="text"
                        id="firstname"
                        v-model="firstname"
                        :class="{ 'input-error': firstnameError }"
                        placeholder="Entrez votre nom"
                        required
                    />
                    <span v-if="firstnameError" class="error-message">{{ firstnameError }}</span>
                </div>
                <div class="form-group">
                    <label for="lastname">Prénom</label>
                    <input
                        type="text"
                        id="lastname"
                        v-model="lastname"
                        :class="{ 'input-error': lastnameError }"
                        placeholder="Entrez votre prénom"
                        required
                    />
                    <span v-if="emailError" class="error-message">{{ emailError }}</span>
                </div>
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
                <p v-if="registerError" class="error-message">{{ registerError }}</p>
            </form>
            <p>Vous n’avez pas encore de compte? <span><router-link to="/"> Se connecter </router-link></span></p>
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
    width: 25rem;
}

.form-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: solid 1px #ccc;
    border-radius: 5px;
    margin: 1.5rem 26rem;
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