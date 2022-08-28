import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '/',
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/inicio', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true }, },
      { path: '/users', component: () => import('src/pages/UsersPage.vue'), meta: { requiresAuth: true }, },
      { path: '/settings', component: () => import('src/pages/SettingsPage.vue'), meta: { requiresAuth: true }, },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
