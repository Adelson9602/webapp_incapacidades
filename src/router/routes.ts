import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '/',
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'inicio', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true }, },
      { path: 'users', component: () => import('src/pages/UsersPage.vue'), meta: { requiresAuth: true }, },
      { path: 'rols', component: () => import('src/pages/RolsPage.vue'), meta: { requiresAuth: true }, },
      { path: 'document_type', component: () => import('src/pages/TypeDocumentPage.vue'), meta: { requiresAuth: true }, },
      { path: 'disability_state', component: () => import('src/pages/DisabilityStatePage.vue'), meta: { requiresAuth: true }, },
      { path: 'ubication', component: () => import('src/pages/UbicationPage.vue'), meta: { requiresAuth: true }, },
      { path: 'position', component: () => import('src/pages/PositionPage.vue'), meta: { requiresAuth: true }, },
      { path: 'company', component: () => import('src/pages/CompanyPage.vue'), meta: { requiresAuth: true }, },
      { path: 'employes', component: () => import('src/pages/EmployesPage.vue'), meta: { requiresAuth: true }, },
      { path: 'settings', component: () => import('src/pages/SettingsPage.vue'), meta: { requiresAuth: true }, },
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
