import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: null,
      idToken: null,
      userName: null,
      autoDidLogout: false,
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};
