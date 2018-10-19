import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: null,
      number: null,
      authToken: null,
    }
  },
  mutations: {
    login(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout(state) {
      state.user.name = null
      state.user.number = null
      state.user.authToken = null
    }
  }
})
