<script setup>
import { useApiStore } from '@/stores/api';
import { useEntrepriseStore } from '@/stores/entreprise';
import { useRouter } from 'vue-router';

const url = useApiStore().url;
const router = useRouter();

defineProps({
    title: {
        type: String,
        default: 'Titre Carte'
    },
    src: {
        type: String,
        default: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
    },
    id: {
        type: Number,
        default: 1
    }
});

function getOneEnt(id) {
    fetch(`${url}/${id}`)
    .then(resp => resp.json())
	.then(data => {
        useEntrepriseStore().ent = data;
        router.push('/entreprise');
	});
}

</script>

<template>
    <n-card :title="title">
        <template #cover>
            <img :src="src">
        </template>

        <n-button type="default" dashed @click="getOneEnt(id)">
            Détails
        </n-button>
    </n-card>
</template>

<style scoped>
    .n-card {
        overflow: hidden;
        max-width: 24%;
        min-width: 270px;
    }

    .n-card:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }

    .n-card img {
        height: 290px;
        width: 290px;
    }
</style>