import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', () => {
    const url = 'http://localhost:3333/api/entreprise';

    return {
        url
    }
});