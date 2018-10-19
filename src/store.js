import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import eventObj from './events'
let events = eventObj.events

export default new Vuex.Store({
  state: {
    user: {
      name: null,
      number: null,
      authToken: null,
    },
    events
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
