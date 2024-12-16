import {defineStore} from 'pinia';

type Product = {
    id: string;
    title: string;
    price: number;
    description: string;
    quantity : number ;
    image: string;
};

export const useCatStore = defineStore('cat', {
    state: () => ({
        items: [] as Array<Product>,
    }),

    getters: {

        cartCount: (state): number => state.items.length,
        totalPrice: (state): number => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    },

    actions: {
        // ajouter un article au panier
        addToCart(product: Product) {

            let i =0 ;
            let finded = false ;
            // cette boucle permet de vérifier si l'article qu'on veut ajouter est déjà dans le panier
            while (i < this.items.length && !finded) {
                // Si oui on incrémenter sa quantité
                if (product.id === this.items[i].id) {
                    this.items[i].quantity++;
                    finded = true;
                }
                i++;
            }

            // sinon on l'ajoute au panier
            if(!finded){
                this.items.push({ ...product, quantity: product.quantity || 1 });
            }
        },

        removeFromCart(productId: string) {
            this.items = this.items.filter((item) => item.id !== productId);
        },

        updateQuantity(productId: string, quantity: number) {
            const existingItem = this.items.find((item) => item.id === productId);

            if (existingItem && quantity > 0) {
                existingItem.quantity = quantity;
            } else if (existingItem && quantity <= 0) {
                this.removeFromCart(productId);
            }
        }
    }
});
