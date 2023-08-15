import { ref } from "vue";
import { defineStore } from 'pinia'

export const useEntrepriseStore = defineStore('entreprise', () => {
    const ent = ref({
        id: 1,
        nom_raison_sociale: "LA POSTE",
        siren: "356000000",
        siret: "35600000000048",
        complement_adresse: "DIRECTION GENERALE DE LA POSTE",
        numero_voie: "9",
        type_voie: "RUE",
        libelle_voie: "DU COLONEL PIERRE AVIA",
        code_postal: "75015",
        libelle_commune: "PARIS 15",
        latitude: "48.83002",
        longitude: "2.275688",
        image: "http://127.0.0.1:3333/images/building_03.webp"
    });

    return {
        ent
    }
});