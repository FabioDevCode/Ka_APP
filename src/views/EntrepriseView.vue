<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useApiStore } from '@/stores/api';
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';

const url = useApiStore().url;
const url_pdf = useApiStore().url_pdf;
const { id } = useRoute().params;
const loader = ref(false);

let ent = ref({
	id: 0,
	nom_raison_sociale: "",
	siren: "",
	siret: "",
	complement_adresse: "",
	numero_voie: "",
	type_voie: "",
	libelle_voie: "",
	code_postal: "",
	libelle_commune: "",
	nombre_etablissements: "",
	finances_annee: "",
	finances_ca: "",
	latitude: "",
	longitude: "",
	image: ""
});

onMounted(async() => {
	const call = await fetch(`${url}/${id}`)
	const data = await call.json()

	for(const [key, value] of Object.entries(data)) {
		ent.value[key] = value
	}

	if(ent.value.latitude && ent.value.longitude) {
		const mapOptions = {
			center: [ent.value.latitude, ent.value.longitude],
			zoom: 14,
			zoomControl: false,
			boxZoom: false,
			doubleClickZoom: false,
			dragging: false,
			attributionControl: false,
			scrollWheelZoom: false,
			keyboard: false,
		}
		// Création d'un objet de carte
		const map = new L.map('mapContainer', mapOptions);
		// Création d'un objet Layer
		const layer = new L.TileLayer(' http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' );
		// Ajout du pointer
		L.marker([ent.value.latitude, ent.value.longitude]).addTo(map)
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

function getPdf() {
	loader.value = true;
	document.getElementById('btn_pdf').setAttribute('disabled', 'true');

	fetch(`${url_pdf}/pdf`, {
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
		},
		method: "POST",
		body: JSON.stringify({
			url: window.location.href
		})
	})
	.then(resp => resp.arrayBuffer())
	.then(resp => {
		const file = new Blob([resp], {type: 'application/pdf'})
		const url = window.URL.createObjectURL(file);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'entrepise.pdf';
		document.body.appendChild(link);
		link.click();
		loader.value = false;
		setTimeout(()=>{
			document.getElementById('btn_pdf').removeAttribute('disabled');
		}, 500)
	})
	.catch(err => console.error(err));
}
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
			<div id="mapContainer" name="mapContainer"></div>
			<img id="imageMap" src="" alt="">
		</div>

		<n-button @click="getPdf()" id="btn_pdf" type="error">
			<p v-if="!loader">Télécharger en PDF</p>
			<template v-if="loader" #icon>
				<n-icon>
					<svg class="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6V3"></path><path d="M16.25 7.75L18.4 5.6"></path><path d="M18 12h3"></path><path d="M16.25 16.25l2.15 2.15"></path><path d="M12 18v3"></path><path d="M7.75 16.25L5.6 18.4"></path><path d="M6 12H3"></path><path d="M7.75 7.75L5.6 5.6"></path></g></svg>
				</n-icon>
			</template>
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
		height: 300px;
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
		margin: 0 auto 150px auto;
	}

	.none_coordonnes {
		border: 1px solid #E3E3E3;
		background-color: #F3F3F3;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.2em;
	}

	.loader {
		animation: rotation 1s infinite linear;
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
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
