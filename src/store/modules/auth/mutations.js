export default {
  setUser(state, payload) {
    (state.userId = payload.userId),
      (state.idToken = payload.idToken),
      (state.userName = payload.userName);
    state.autoDidLogout = false;
  },
  setAutoLogout(state) {
    state.autoDidLogout = true;
  },
};
