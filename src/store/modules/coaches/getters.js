export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  getCoach(_, getters) {
    return (id) => {
      return getters.coaches.find((el) => el.id === id);
    };
  },
  isCoach(_, getters, _2, rootGetters) {
    const userId = rootGetters.userId;
    const coaches = getters.coaches;
    return coaches.some((el) => el.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTime = new Date().getTime();
    //ms na secundy
    const diff = (currentTime - lastFetch) / 1000 > 60;
    return diff;
  },
};
