import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Visit Pangasinan | Home',
      },
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: () => import('../views/DestinationsView.vue'),
      meta: {
        title: 'Visit Pangasinan | Destinations',
      },
    },
    {
      path: '/heritage',
      redirect: '/destinations',
    },
  ],
})

router.afterEach((to) => {
  document.title = to.meta?.title || 'Visit Pangasinan'
})

export default router
