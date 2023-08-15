<script setup>
import { useEntrepriseStore } from '@/stores/entreprise';

const ent = useEntrepriseStore().ent;
console.log(ent);


</script>

<template>
	<main>
        <h1>
            {{ ent.nom_raison_sociale }}
        </h1>

        <hr>

		<div>
			<n-image width="400" :src="ent.image" :alt="'Building ' + ent.nom_raison_sociale" preview-disabled />





		</div>




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

</style>
