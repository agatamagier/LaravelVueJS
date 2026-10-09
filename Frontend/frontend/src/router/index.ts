import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/auth/Register.vue'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import { useAuthStore } from '@/store/auth'

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
      meta: {
        requiresGuest: true,
      },
    },
          {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/auth/Dashboard.vue'),
      meta: {
        requiresAuth: true,
      },
    },
        {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue')
    },
    {
      path: '/500',
      name: '500',
      component: () => import('@/views/500.vue')
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth && !auth.isLoggedIn)) next({ name: "Login" })
  else if (to.matched.some((record) => record.meta.requiresGuest && auth.isLoggedIn)) next({ name: "Dashboard" })
  else next()
})

export default router
