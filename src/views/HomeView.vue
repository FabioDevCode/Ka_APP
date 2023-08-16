<script setup>
import { onMounted, ref } from "vue";
import { useApiStore } from '@/stores/api';
import Carte from '@/components/Carte.vue';

const url = useApiStore().url;
const LIMIT = 12;

const page = ref(1);
const page_count = ref(50);
let liste = ref([]);
let input_val = ref();

onMounted(() => {
	callApi();
});

function callApi() {
	fetch(`${url}?offset=${page.value - 1}&limit=${LIMIT}`)
	.then(resp => resp.json())
	.then(data => {
		liste.value = data.ent
		page_count.value = data.pages

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}

function reset() {
	if(page.value != 1 || input_val.value.length) {
		page.value = 1;
		input_val.value = '';
		callApi();
	}
}

function search() {
	fetch(`${url}?name=${input_val.value.trim().toUpperCase()}`)
	.then(resp => resp.json())
	.then(data => {
		liste.value = data.ent
		page_count.value = data.pages

		window.scrollTo({
			top: 0,
		});
	})
};
</script>

<template>
	<main>
		<form @submit.prevent>
			<n-input id="search" size="large" status="info" placeholder="Nom de l'entreprise" v-model:value="input_val" @keydown.enter="search()" />

			<n-button id="btn_search" type="primary" @click="search()">
				<template #icon>
					<n-icon>
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"></circle><path d="M21 21l-6-6"></path></g></svg>
					</n-icon>
				</template>
			</n-button>

			<n-button @click="reset()" id="btn_reset" strong secondary type="warning">
				RESET
			</n-button>
		</form>

		<section>
			<h1>
				Liste d'entreprises
			</h1>

			<hr>

			<p v-if="!liste.length">Aucune entreprise trouvée</p>
			<div id="gird">
				<Carte v-for="ent in liste" :key="ent.id" :id="ent.id" :title="ent.nom_raison_sociale" :src="ent.image" />
			</div>
		</section>

		<n-pagination @click="callApi()" v-model:page="page" :page-count="page_count" />

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

	form {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 50px;
        color: white;
    }

    #btn_search, #btn_reset {
        height: 40px;
    }

    #btn_reset {
        margin: 0 auto;
    }

	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin-bottom: 50px;
	}

	section h1 {
		margin-bottom: 25px;
	}

	hr {
		width: 98%;
		margin-bottom: 25px;
		height: 1px;
		background-color: #E3E3E3;
        border: none;
	}

	#gird {
		margin: 0 auto;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 10px;
		flex-shrink: 1;

	}

	.n-pagination {
		margin: 0 auto 100px auto;
	}
</style>
