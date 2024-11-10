import {defineStore} from 'pinia';
import {ref} from "vue";
export const useAuthStore = defineStore('auth', ()=>{

    // stockage du token
    const token = ref<string | null >(localStorage.getItem('authToken'));
    const setToken = (newToken: string) => {
        token.value = newToken;
        localStorage.setItem('authToken', newToken);
    };

    const refreshToken = async () => {
        try{
            const response = await fetch(`http://localhost:4000/`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (!data.error){
                setToken(data.accessToken);
            }

        }
        catch(err){
            console.log(err);
            logout();
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken');
    }

    const isAuthenticated = () =>  !!token.value;

    return {token, setToken, logout, isAuthenticated, refreshToken};
})