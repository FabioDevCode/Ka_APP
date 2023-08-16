import './assets/main.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import native from 'naive-ui'
import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(native)
app.use(router)

app.mount('#app')