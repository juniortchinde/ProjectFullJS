import {defineStore} from 'pinia';
type Product = {
    _id: string;
    title: string;
    price: number;
    description: string;
    images: Array<string>;
};

export const useSearchStore = defineStore('search', {
    state: () => ({
        searchResult: [] as Array<Product>,
    }),
    actions: {
        setSearchResult (newSearchResult: Array<Product>) {
            this.searchResult = newSearchResult;
        }
    }
});
