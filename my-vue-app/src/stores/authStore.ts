import {defineStore} from 'pinia';
import {ref} from "vue";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAuthStore = defineStore('auth', ()=>{

    // stockage du token
    const token = ref<string | null >(localStorage.getItem('authToken'));
    const lastname = ref<string | null >(localStorage.getItem('lastname'));

    const setToken = (newToken: string, newLastname: string) => {
        token.value = newToken;
        lastname.value= newLastname;
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('lastname', newLastname);
    };

    const refreshToken = async () => {
        try{

            const response = await fetch(`${baseUrl}/refreshToken`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (!data.error){
                setToken(data.accessToken, data.lastname);
            }
            else {
                logout();
            }

        }
        catch(err){
            console.log(err);
            logout();
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('lastname');
    }

    const isAuthenticated = () =>  !!token.value;

    return {token, lastname, setToken, logout, isAuthenticated, refreshToken};
})