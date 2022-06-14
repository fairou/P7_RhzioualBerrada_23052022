import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      userId: 0,
      isConnect: false,
      isAdmin: false,
    },
  },
  
  mutations: {
    initUser(state, data) {
      console.log(data)
      state.user.userId = data.userId;
      state.user.isAdmin = data.isAdmin;
      state.user.isConnect = data.isConnect;
    }
  },
  actions: {},
  modules: {
  }
});