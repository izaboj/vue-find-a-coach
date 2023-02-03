export default {
  async addRequest(context, payload) {
    const newData = {
      // coachId: payload.coachId,
      userEmail: payload.email,
      userMessage: payload.message,
    };
    const response = await fetch(
      `https://http-projects-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newData),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'sth went wornd during adding requests'
      );
      throw error;
    } else {
      console.log(responseData, 'response data');
      newData.id = responseData.name;
      context.commit('addRequest', newData);
    }
  },
  async loadRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.idToken;
    const response = await fetch(
      `https://http-projects-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
        token
    );
    const dataReceived = await response.json();

    if (!response.ok) {
      console.log(dataReceived, 'data received');
      const error = new Error(
        dataReceived.message || 'error during fetching requests'
      );
      throw error;
    }

    const newData = [];
    console.log(dataReceived, 'data received');
    for (const key in dataReceived) {
      const req = {
        email: dataReceived[key].userEmail,
        message: dataReceived[key].userMessage,
        coachId: coachId,
        id: key,
      };
      newData.push(req);
    }
    context.commit('setRequests', newData);
  },
};
// `https://http-projects-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
// token
