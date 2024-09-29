import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/login',
    name:'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('@/views/StudentsView.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/logs',
    name: 'logs',
    component: () => import('@/views/LogsView.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/visualize',
    name: 'visualize',
    component: () => import('@/views/VisualizeView.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
