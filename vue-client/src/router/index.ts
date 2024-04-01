import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue')
        },
        {
            path: '/create',
            name: 'create',
            component: () => import('../views/CreateView.vue')
        },
        {
            path: '/edit/:gameId',
            name: 'edit',
            component: () => import('../views/CreateView.vue')
        },
        {
            path: '/game/:pin',
            name: 'game',
            component: () => import('../views/GameView.vue')
        }
    ]
})

export default router
