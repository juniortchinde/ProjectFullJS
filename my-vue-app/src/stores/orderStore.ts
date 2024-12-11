import {defineStore} from 'pinia';



const baseUrl = import.meta.env.BASE_URL;

export const useCatStore = defineStore('cat', {
    state: (): [] => ({
        items: [],
    }),

    getters: {
        cartCount: (state): Number => state.items.length,
        totalPrice: (state) => state.items.reduce((total, item) => total+ item.price  * item.quantity, 0),

    },

    actions : {
        addToCart: (product: Object & {quantity? : number}) => {
            const existingItem = this.items.find((item) => it.id === product.id);
            if (existingItem) {
                existingItem.quantity = product.quantity || 1;
            }
            else {
                this.items.push({...product, quantity: product.quantity || 1});
            }
        },

        removeFromCart: (productId: string) => {
            this.items = this.items.filter((item) => item.id !== productId);
        },

        updateQuantity(productId: number, quantity: number) {
            const existingItem = this.items.find((item) => item.id === productId);

            if (existingItem && quantity > 0) {
                existingItem.quantity = quantity;
            }

            else if (existingItem && quantity <= 0) {
                this.removeFromCart(productId);
            }
        }
    }
})