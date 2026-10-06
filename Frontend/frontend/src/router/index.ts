import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/auth/Register.vue'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/auth/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
      {
      path: '/register',
      name: 'register',
      component: Register,
    },
          {
      path: '/login',
      name: 'login',
      component: Login,
    },
          {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/auth/Dashboard.vue'),
    }
  ],
})

export default router
