import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import MainLayout from './components/MainLayout.vue';
import UserDashboard from './components/UserDashboard.vue';
import UserManagement from './components/UserManagement.vue';
import CreateUser from './components/CreateUser.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/user-dashboard',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'user-dashboard',
        component: UserDashboard,
      }
    ]
  },
  {
    path: '/user-management',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'user-management',
        component: UserManagement,
      },
      {
        path: '/create-user',
        name: 'CreateUser',
        component: CreateUser
      }
    ]
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
