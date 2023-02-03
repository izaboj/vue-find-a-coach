export default {
  requests(state, getters, rootState, rootGetters) {
    const coachID = rootGetters.userId;
    return state.requests.filter((req) => req.coachId === coachID);
  },
  hasRequests(state, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
