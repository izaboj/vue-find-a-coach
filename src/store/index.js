import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index.js';
import requestModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  namespaced: true,
  modules: {
    coachesN: coachesModule,
    requestN: requestModule,
    authModule,
  },
});

export default store;
