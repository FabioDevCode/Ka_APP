import { ref } from "vue";
import { defineStore } from 'pinia'

export const useEntrepriseStore = defineStore('entreprise', {
    state: () => {
        return {
            ent: ref({
                // SKELETON EXEMPLE
                // id: 1,
                // nom_raison_sociale: "ENTREPRISE",
                // siren: "3560063400",
                // siret: "35600063000048",
                // complement_adresse: "DIRECTION GENERALE",
                // numero_voie: "1",
                // type_voie: "RUE",
                // libelle_voie: "DU CAPITAINE JACK SPARROW",
                // code_postal: "75015",
                // libelle_commune: "PARIS 15",
                // nombre_etablissements: "12546",
                // finances_annee: "2021",
                // finances_ca: "2358796790",
                // latitude: "",
                // longitude: "",
                // image: "http://127.0.0.1:3333/images/building_03.webp"
            })
        }
    },
    persist: true
});