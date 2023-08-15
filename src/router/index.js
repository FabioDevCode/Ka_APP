import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EntrepriseView from '../views/EntrepriseView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/entreprise',
      name: 'entreprise',
      component: EntrepriseView
    }
  ]
})

export default router;