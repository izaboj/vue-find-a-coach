import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, // coaches/c1/contact
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiersAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiersAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiersUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});
router.beforeEach(function (to, _, next) {
  if (to.meta.requiersAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiersUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});
export default router;
