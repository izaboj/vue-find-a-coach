export default {
  async addNewCoach(context, payload) {
    const coachId = context.rootGetters.userId;
    const newData = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate,
    };
    const token = context.rootGetters.idToken;
    const response = await fetch(
      `https://http-projects-default-rtdb.firebaseio.com/coaches/${coachId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(newData),
      }
    );
    console.log(response);
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      throw new Error(
        responseData.error.message || 'error during adding new coach'
      );
    } else {
      context.commit('addNewCoach', {
        ...newData,
        id: coachId,
      });
    }
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      'https://http-projects-default-rtdb.firebaseio.com/coaches.json',
      {
        method: 'GET',
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || ' Feild to fetch data');
      throw error;
    } else {
      //  response.json() return promise
      const coaches = [];
      for (const key in responseData) {
        const data = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          areas: responseData[key].areas,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
        };
        coaches.push(data);
      }
      context.commit('setCoaches', coaches);
      context.commit('setFetchTimeStamp');
    }
  },
};
