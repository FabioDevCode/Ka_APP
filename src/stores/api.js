import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', () => {
    const url = 'http://localhost:3333/api/entreprise';
    const url_pdf = 'http://localhost:3333/api/generate';

    return {
        url,
        url_pdf
    }
});