import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import UserDashboard from './components/UserDashboard.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/user-dashboard',
    name: 'user-dashboard',
    component: UserDashboard,
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
