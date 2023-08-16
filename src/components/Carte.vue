<script setup>
import { useApiStore } from '@/stores/api';
import { useRouter } from 'vue-router';
import { ref } from "vue";

const router = useRouter();
const url_pdf = useApiStore().url_pdf;
const loader = ref(false);

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
    router.push(`/entreprise/${id}`);
}

function getPdf(id) {
    loader.value = true;

	fetch(`${url_pdf}/pdf`, {
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
		},
		method: "POST",
		body: JSON.stringify({
			url: `${window.location.href + 'entreprise/' + id}`
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

		setTimeout(()=>{
            loader.value = false;
			document.getElementById('btn_pdf').removeAttribute('disabled');
		}, 500)
	})
	.catch(err => console.error(err));
}
</script>

<template>
    <n-card :title="title">
        <template #cover>
            <img :src="src">
        </template>

        <div class="btn_card">
            <n-button type="default" dashed @click="getOneEnt(id)">
                Détails
            </n-button>

            <n-button tertiary type="error" @click="getPdf(id)">
                <p v-if="!loader">PDF</p>

                <template #icon v-if="loader">
                    <n-icon>
                        <svg class="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6V3"></path><path d="M16.25 7.75L18.4 5.6"></path><path d="M18 12h3"></path><path d="M16.25 16.25l2.15 2.15"></path><path d="M12 18v3"></path><path d="M7.75 16.25L5.6 18.4"></path><path d="M6 12H3"></path><path d="M7.75 7.75L5.6 5.6"></path></g></svg>
                    </n-icon>
                </template>
            </n-button>
        </div>
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

    .btn_card {
        width: 100%;
        display: flex;
        justify-content: space-between;
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
</style>