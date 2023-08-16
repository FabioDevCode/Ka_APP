<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEntrepriseStore } from '@/stores/entreprise';
import { onMounted } from "vue";

const ent = useEntrepriseStore().ent;

onMounted(() => {
	if(ent.latitude && ent.longitude) {
		const mapOptions = {
			center: [ent.latitude, ent.longitude],
			zoom: 14
		}
		// Création d'un objet de carte
		const map = new L.map('mapContainer', mapOptions);
		// Création d'un objet Layer
		const layer = new L.TileLayer(' http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' );
		// Ajout du pointer
		L.marker([ent.latitude, ent.longitude]).addTo(map)
		// Ajout d'une couche à la carte
		map.addLayer(layer);
	} else {
		document.querySelector('#mapContainer').classList.add('none_coordonnes');
		document.querySelector('#mapContainer').innerHTML = 'Localisation non communiqué';
	}

	window.scrollTo({
		top: 0,
	});
});
</script>

<template>
	<main>
        <h1>
            {{ ent.nom_raison_sociale }}
        </h1>

        <hr>

		<div class="ent_top">
			<n-image :src="ent.image" :alt="'Building ' + ent.nom_raison_sociale" preview-disabled />

			<div class="ent_top_subinfo">
				<p>
					Chiffre d'affaires {{ ent.finances_annee }} : 
					<span v-if="ent.finances_ca">{{ ent.finances_ca }} €</span>
					<span v-else>non communiqué</span>
				</p>
				<p>
					Nombre d'établissements : 
					<span  v-if="ent.nombre_etablissements?.length">{{ ent.nombre_etablissements }}</span>
					<span v-else>non communiqué</span>
				</p>
				<p>
					Siren : 
					<span v-if="ent.siren">{{ ent.siren }}</span>
					<span v-else>non communiqué</span>
				</p>
				<p>
					Siret : 
					<span v-if="ent.siret">{{ ent.siret }}</span>
					<span v-else>non communiqué</span>
				</p>

			</div>
		</div>

		<div class="ent_bottom">
			<div class="ent_bottom_adress">
				<h2>Adresse</h2>

				<p v-if="ent.complement_adresse">{{ ent.complement_adresse }}</p>
				<p>{{ ent.numero_voie }} {{ ent.type_voie }} {{ ent.libelle_voie }}</p>
				<p>{{ ent.code_postal }}</p>
				<p>{{ ent.libelle_commune }}</p>
			</div>

			<!-- Maps -->
			<div id="mapContainer"></div>
		</div>

		<n-button id="btn_pdf" type="error">
			PDF
		</n-button>
	</main>
</template>

<style scoped>
	main {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		width: 95%;
		max-width: 1200px;
	}

    h1 {
		font-size: 3em;
        margin-bottom: 25px;
    }

    hr {
		width: 98%;
		color: teal;
		margin-bottom: 25px;
		height: 1px;
		background-color: #E3E3E3;
        border: none;
	}

	.ent_top, .ent_bottom {
		height: 400px;
	}

	.ent_top_subinfo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		max-width: 400px;
		min-width: 320px;
	}

	p {
		font-weight: 100;
		font-size: 1.2em;
		margin: 5px 0;
	}

	.n-image {
		width: 100%;
		max-width: 400px;
		min-width: 320px;
		aspect-ratio: 1/1;
		margin-right: 100px;
	}

	.ent_top {
		display: flex;
		margin-bottom: 100px;
	}

	.ent_top span {
		font-size: 1.3em;
		font-weight: 900;
	}

	.ent_bottom {
		height: max-content;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 200px;
	}

	.ent_bottom h2 {
		margin-bottom: 50px;
	}

	.ent_bottom p {
		margin-bottom: 5px;
	}

	.ent_bottom_adress {
		width: 100%;
		max-width: 400px;
		min-width: 320px;
	}

	#mapContainer {
		min-width: 320px;
		width: 100%;
		max-width: 800px;
		height: 400px;
	}

	#btn_pdf {
		margin: 0 auto 50px auto;
	}

	.none_coordonnes {
		border: 1px solid #E3E3E3;
		background-color: #F3F3F3;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.2em;
	}

	@media screen and (max-width: 880px) {
		.ent_top {
			height: max-content;
			flex-direction: column;
			align-items: center;
		}

		.n-image {
			margin: 0 0 50px 0;
		}

		.ent_bottom_adress {
			margin-bottom: 60px;
		}
		.ent_bottom {
			flex-direction: column;
		}
	}

</style>
