import './assets/main.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import native from 'naive-ui'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(native)
app.use(router)

app.mount('#app')